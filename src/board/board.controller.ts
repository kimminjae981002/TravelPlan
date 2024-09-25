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

@ApiTags('Boards')
@Controller('board')
@UseInterceptors(AuthInterceptor)
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
  @UseInterceptors(FileInterceptor('image')) // 이미지 업로드 처리
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
      imagePath = file.path; // 이미지 저장 경로 (저장 방법에 따라 조정 필요)
    }

    await this.boardService.create(createBoardDto, user.name, imagePath);
    return { success: true, message: 'okay' };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: PaginateBoardDto) {
    const { boards } = await this.boardService.findAll(query);

    return {
      boards,
      success: true,
      message: 'okay',
    };
  }

  @Get(':boardId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('boardId') boardId: number) {
    return await this.boardService.findOne(boardId);
  }

  @Patch(':boardId')
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
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Param('boardId') boardId: number) {
    await this.boardService.deleteBoard(boardId);
    return { success: true, message: 'okay' };
  }
}
