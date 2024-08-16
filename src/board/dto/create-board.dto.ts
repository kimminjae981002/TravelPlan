import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength, IsEnum } from 'class-validator';
import { Rating } from '../board.entity'; // enum 파일의 경로에 맞게 조정

export class CreateReviewDto {
  @ApiProperty({
    description: '리뷰 제목',
    required: true,
    example: '훌륭한 제품!',
  })
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  @MaxLength(100, { message: '제목은 100글자 이하로 해주세요.' })
  title: string;

  @ApiProperty({
    description: '리뷰 내용',
    required: true,
    example: '이 제품은 정말 좋습니다. 품질이 뛰어나고, 사용하기도 편리합니다.',
  })
  @IsNotEmpty({ message: '내용을 작성해주세요.' })
  @MinLength(10, { message: '내용은 10글자 이상으로 해주세요.' })
  @MaxLength(1000, { message: '내용은 1000글자 이하로 해주세요.' })
  content: string;

  @ApiProperty({
    description: '사용자 이름',
    required: true,
    example: '홍길동',
  })
  @IsNotEmpty({ message: '사용자 이름을 작성해주세요.' })
  @MaxLength(10, { message: '사용자 이름은 10글자 이하로 해주세요.' })
  userName: string;

  @ApiProperty({
    description: '리뷰 생성 날짜',
    required: true,
    example: '2024-08-16T14:30:00Z',
  })
  @IsNotEmpty({ message: '생성 날짜를 작성해주세요.' })
  creationDate: string;

  @ApiProperty({
    description: '평점 (1~5)',
    required: true,
    enum: Rating,
    example: Rating.FIVE,
  })
  @IsEnum(Rating, { message: '평점은 1, 2, 3, 4, 5 중 하나여야 합니다.' })
  rating: Rating;
}
