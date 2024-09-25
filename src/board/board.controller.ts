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

@ApiTags('Boards')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * 게시글 작성
   * @param createBoardDto 제목, 내용
   * @param userId 유저아이디
   * @param name 닉네임
   * @param file 이미지 파일
   * @returns
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '..', '..', 'uploads')); // uploads 폴더 경로
        },
        filename: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname); // 파일 이름을 원래 이름으로 설정
        },
      }),
    }),
    AuthInterceptor,
  ) // 이미지 업로드 처리
  @UseGuards(JwtAuthGuard)
  async create(
    @UserInfo() user: User,
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file: Express.Multer.File,
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
      imagePath = file.path;
    }

    await this.boardService.create(createBoardDto, user.name, imagePath);
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
