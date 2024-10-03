import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTravelDto {
  @ApiProperty({
    description: '지역 관광지, 맛집',
    required: true,
    example: '서울 맛집',
  })
  @IsNotEmpty({ message: '국내 지역을 작성해주세요.' })
  keyword: string;
}
