import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { PaginateBoardDto } from '../common/dto/paginate.dto';
import moment from 'moment-timezone'; // Import moment-timezone

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto, name: string) {
    const { title, content, rating } = createBoardDto;
    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    });

    const newBoard = await this.boardRepository.create({
      title,
      content,
      rating,
      createdAt,
      userName: name,
    });

    await this.boardRepository.save(newBoard);
  }

  async findAll(query: PaginateBoardDto) {
    const [boards, totalCount]: [Board[], number] = await this.boardRepository
      .createQueryBuilder('b')
      .select(['b.id', 'b.title', 'b.content', 'b.userName', 'b.createdAt'])
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
      })),
      totalCount,
    };
  }
}
