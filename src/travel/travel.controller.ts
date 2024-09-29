import { CreateTravelDto } from './dto/create-travel.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { UserInfo } from '../common/decorator/user.decorator';

@ApiTags('Travels')
@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}
  /**
   * 여행 생성
   * @param CreateTravelDto
   * @returns
   */
  @UseInterceptors(AuthInterceptor) // 이미지 업로드 처리
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTravelDto: CreateTravelDto,
    @UserInfo() user: User,
  ) {
    try {
      await this.travelService.create(createTravelDto, user.id);
      return {
        success: true,
        message: 'okay',
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
