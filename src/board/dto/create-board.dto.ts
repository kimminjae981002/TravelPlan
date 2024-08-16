import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength, IsEnum } from 'class-validator';
import { Rating } from '../board.entity'; // enum 파일의 경로에 맞게 조정

export class CreateBoardDto {
  @ApiProperty({
    description: '리뷰 제목',
    required: true,
    example: '잘 다녀왔습니다.',
  })
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  @MaxLength(100, { message: '제목은 100글자 이하로 해주세요.' })
  title: string;

  @ApiProperty({
    description: '리뷰 내용',
    required: true,
    example: '스스로 계획을 짜다니',
  })
  @IsNotEmpty({ message: '내용을 작성해주세요.' })
  @MinLength(10, { message: '내용은 10글자 이상으로 해주세요.' })
  @MaxLength(1000, { message: '내용은 1000글자 이하로 해주세요.' })
  content: string;

  @ApiProperty({
    description: '평점 (1~5)',
    required: true,
    enum: Rating,
    example: Rating.FIVE,
  })
  @IsEnum(Rating, { message: '평점은 1, 2, 3, 4, 5 중 하나여야 합니다.' })
  rating: Rating;
}
