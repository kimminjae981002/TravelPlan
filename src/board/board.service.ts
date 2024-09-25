import {
  Injectable,
  NotFoundException,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { PaginateBoardDto } from '../common/dto/paginate.dto';
import moment from 'moment-timezone';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(
    createBoardDto: CreateBoardDto,
    name: string,
    image?: string,
    userId?: number,
  ) {
    const { title, content } = createBoardDto;
    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    const newBoard = this.boardRepository.create({
      title,
      content,
      createdAt,
      userName: name,
      image,
      user: { id: userId },
    });

    await this.boardRepository.save(newBoard);
  }

  async findAll(query: PaginateBoardDto) {
    const [boards, totalCount]: [Board[], number] = await this.boardRepository
      .createQueryBuilder('b')
      .select([
        'b.id',
        'b.title',
        'b.content',
        'b.userName',
        'b.image',
        'b.userId',
        'b.createdAt',
        'b.updatedAt',
      ])
      .skip(query.take * (query.page - 1))
      .take(query.take)
      .orderBy('b.createdAt', query.order__createdAt)
      .getManyAndCount();

    return {
      boards: boards.map((board) => ({
        id: board.id,
        title: board.title,
        content: board.content,
        userName: board.userName,
        createdAt: moment(board.createdAt)
          .tz('Asia/Seoul')
          .format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(board.updatedAt)
          .tz('Asia/Seoul')
          .format('YYYY-MM-DD HH:mm:ss'),
        image: board.image,
      })),

      totalCount,
    };
  }

  async findOne(@Param('boardId') boardId: number) {
    const board = await this.boardRepository
      .createQueryBuilder('b')
      .select([
        'b.id',
        'b.title',
        'b.content',
        'b.userName',
        'b.image',
        'b.userId',
        'b.createdAt',
        'b.updatedAt',
      ])
      .where('b.id = :boardId', { boardId })
      .getOne();

    if (!board) {
      throw new NotFoundException(`${boardId} 게시글을 찾을 수 없습니다.`);
    }

    return {
      id: board.id,
      title: board.title,
      content: board.content,
      userName: board.userName,
      createdAt: moment(board.createdAt)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(board.updatedAt)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss'),
      image: board.image,
    };
  }

  async updateBoard(
    @Param('boardId') boardId: number,
    updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`${boardId} 게시글을 찾을 수 없습니다.`);
    }

    board.title = updateBoardDto.title || board.title;
    board.content = updateBoardDto.content || board.content;
    board.image = updateBoardDto.image || board.image;

    return this.boardRepository.save(board);
  }

  async deleteBoard(@Param('boardId') boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`${boardId} 게시글을 찾을 수 없습니다.`);
    }

    return await this.boardRepository.delete(board);
  }
}
