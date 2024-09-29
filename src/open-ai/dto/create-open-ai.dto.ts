import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOpenAiDto {
  @ApiProperty({
    description: '지역',
    required: true,
    example: '서울',
  })
  @IsNotEmpty({ message: '국내 지역을 작성해주세요.' })
  destination: string;

  @ApiProperty({
    description: '일정',
    required: true,
    example: '3일',
  })
  @IsNotEmpty({ message: '일정을 작성해주세요.' })
  duration: string;

  @ApiProperty({
    description: '구성원',
    required: true,
    example: '가족',
  })
  @IsNotEmpty({ message: '구성원을 작성해주세요.' })
  who: string;

  @ApiProperty({
    description: '계절',
    required: true,
    example: '여름',
  })
  @IsNotEmpty({ message: '계절을 작성해주세요.' })
  season: string;
}
