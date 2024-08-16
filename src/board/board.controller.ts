import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInfo } from '../common/decorator/user.decorator';
import { User } from '../user/user.entity';
import { PaginateBoardDto } from '../common/dto/paginate.dto';

@ApiTags('Boards')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * 리뷰 작성
   * @param createBoardDto 제목, 내용
   * @param userId 유저아이디
   * @param name 닉네임
   * @returns
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@UserInfo() user: User, @Body() createBoardDto: CreateBoardDto) {
    const { title } = createBoardDto;

    if (title.trim() === '') {
      throw new BadRequestException({
        success: false,
        message: '공백만 사용할 수는 없습니다',
      });
    }

    await this.boardService.create(createBoardDto, user.name);
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
}
