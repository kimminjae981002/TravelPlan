import { CreateTravelDto } from './dto/create-travel.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}
  /**
   * 여행 생성
   * @param CreateTravelDto
   * @returns
   */
  @Post('travel')
  async create(@Body() createTravelDto: CreateTravelDto) {
    try {
      await this.travelService.create(createTravelDto);
      return {
        success: true,
        message: 'okay',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
      };
    }
  }
}
