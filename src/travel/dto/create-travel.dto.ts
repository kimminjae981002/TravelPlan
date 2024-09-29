import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTravelDto {
  @ApiProperty({
    description: '지역',
    required: true,
    example: '서울',
  })
  @IsNotEmpty({ message: '국내 지역을 작성해주세요.' })
  location: string;

  @ApiProperty({
    description: '일정 기간',
    required: true,
    example: 3,
  })
  @IsNotEmpty({ message: '일정 기간을 작성해주세요.' })
  day: number;
}
