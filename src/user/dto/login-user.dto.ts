import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: '유저 ID',
    required: true,
    example: 'ididid',
  })
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty({ message: 'ID를 작성해주세요.' })
  userId: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: 'abc123456@',
  })
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  @MaxLength(20)
  password: string;
}
