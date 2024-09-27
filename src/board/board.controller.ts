import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInfo } from '../common/decorator/user.decorator';
import { User } from '../user/user.entity';
import { PaginateBoardDto } from '../common/dto/paginate.dto';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';

@ApiTags('Boards')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * 게시글 작성
   * @param createBoardDto 제목, 내용
   * @param username 유저아이디
   * @param name 닉네임
   * @param file 이미지 파일
   * @returns
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3: new S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        }),
        bucket: 'blog-image-s3', // 여기에 버킷 이름을 입력하세요
        acl: 'public-read', // 필요에 따라 ACL을 설정하세요
        key: (req, file, cb) => {
          cb(null, `${Date.now().toString()}-${file.originalname}`); // 고유한 파일 이름으로 설정
        },
      }),
    }),
    AuthInterceptor,
  ) // 이미지 업로드 처리
  @UseGuards(JwtAuthGuard)
  async create(
    @UserInfo() user: User,
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    const { title } = createBoardDto;

    if (title.trim() === '') {
      throw new BadRequestException({
        success: false,
        message: '공백만 사용할 수는 없습니다',
      });
    }

    let imagePath = null;
    if (file) {
      imagePath = file.location;
    }

    await this.boardService.create(
      createBoardDto,
      user.name,
      imagePath,
      user.id,
    );

    return { success: true, message: 'okay' };
  }

  @Get()
  async findAll(@Query() query: PaginateBoardDto) {
    const { boards } = await this.boardService.findAll(query);

    return {
      boards,
      success: true,
      message: 'okay',
    };
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: number) {
    return await this.boardService.findOne(boardId);
  }

  @Patch(':boardId')
  @UseInterceptors(FileInterceptor('image'), AuthInterceptor)
  async updateBoard(
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const updateBoard = await this.boardService.updateBoard(
      boardId,
      updateBoardDto,
    );

    return {
      updateBoard,
      success: true,
      message: 'okay',
    };
  }

  @Delete(':boardId')
  @UseInterceptors(FileInterceptor('image'), AuthInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Param('boardId') boardId: number) {
    await this.boardService.deleteBoard(boardId);
    return { success: true, message: 'okay' };
  }
}
