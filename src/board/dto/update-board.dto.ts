import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    description: '수정 제목',
    required: true,
    example: '수정 제목을 적어주세요.',
  })
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  @MaxLength(100, { message: '제목은 100글자 이하로 해주세요.' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: '수정 내용',
    required: true,
    example: '수정 내용을 적어주세요.',
  })
  @IsNotEmpty({ message: '내용을 작성해주세요.' })
  @MinLength(10, { message: '내용은 10글자 이상으로 해주세요.' })
  @MaxLength(1000, { message: '내용은 1000글자 이하로 해주세요.' })
  @IsOptional()
  @IsString()
  content?: string;
}
