import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInfo } from '../common/decorator/user.decorator';
import { User } from '../user/user.entity';
import { CreateOpenAiDto } from './dto/create-open-ai.dto';
import { OpenAiService } from './open-ai.service';

@ApiTags('OpenAi')
@Controller('openAi')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}
  /**
   * openAi Api를 이용한 여행 일정
   * @param CreateOpenAiDto
   * @returns
   */
  @UseInterceptors(AuthInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOpenAiDto: CreateOpenAiDto,
    @UserInfo() user: User,
  ) {
    try {
      const travelPlan = await this.openAiService.create(
        createOpenAiDto,
        +user.id,
      );

      return {
        success: true,
        message: 'okay',
        data: travelPlan,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
