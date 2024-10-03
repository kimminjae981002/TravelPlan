import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '유저 ID',
    required: true,
    example: 'test',
  })
  @IsNotEmpty({ message: 'ID를 작성해주세요.' })
  @MinLength(4, { message: '아이디는 4글자 이상 20글자 이하로 해주세요.' })
  @MaxLength(20, { message: '아이디는 4글자 이상 20글자 이하로 해주세요.' })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '123123123',
  })
  @Length(8, 20, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  password: string;

  @ApiProperty({
    description: '비밀번호 체크',
    required: true,
    example: '123123123',
  })
  @Length(8, 20, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  passwordCheck: string;

  @ApiProperty({
    description: '유저 이름',
    required: true,
    example: '홍길동',
  })
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @MinLength(2, { message: '닉네임은 2글자 이상 10글자 이하로 해주세요.' })
  @MaxLength(10, { message: '닉네임은 2글자 이상 10글자 이하로 해주세요.' })
  name: string;
}
