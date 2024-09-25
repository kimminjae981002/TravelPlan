import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '유저 ID',
    required: true,
    example: 'testid',
  })
  @IsNotEmpty({ message: 'ID를 작성해주세요.' })
  @MinLength(4, { message: '아이디는 4글자 이상 20글자 이하로 해주세요.' })
  @MaxLength(20, { message: '아이디는 4글자 이상 20글자 이하로 해주세요.' })
  userId: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: 'abc123456',
  })
  @IsStrongPassword(
    { minLength: 8 },
    { message: '비밀번호는 8자리 이상입니다.' },
  )
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: '비밀번호 체크',
    required: true,
    example: 'abc123456',
  })
  @IsStrongPassword(
    { minLength: 8 },
    { message: '비밀번호는 8자리 이상입니다.' },
  )
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
