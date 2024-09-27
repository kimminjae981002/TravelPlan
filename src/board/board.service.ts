import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { PaginateBoardDto } from '../common/dto/paginate.dto';
import moment from 'moment-timezone';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';

@Injectable()
export class BoardService {
  private s3Client: S3Client;
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  // S3에 파일 업로드 메서드
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
      Bucket: 'blog-image-s3',
      Key: `${Date.now().toString()}-${file.originalname}`,
      Body: file.buffer, // 파일의 버퍼
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);
      // S3에서의 파일 URL 반환
      return `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('파일 업로드에 실패했습니다.');
    }
  }

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
      userId: board.userId,
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
    return await this.boardRepository.delete(board.id);
  }
}
