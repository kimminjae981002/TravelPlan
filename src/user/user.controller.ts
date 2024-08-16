import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 회원가입
   * @param createUserDto
   * @returns
   */

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const { userId, password, passwordCheck, name } = createUserDto;

    const user = await this.userService.findUserByName(name);

    const existingUser = await this.userService.findUserById(userId);

    // 이미 존재하는 사용자 처리
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 아이디로 등록된 사용자가 있습니다.',
      );
    }

    if (user) {
      throw new ConflictException('닉네임이 존재합니다.');
    }

    if (password !== passwordCheck)
      throw new BadRequestException('비밀번호를 확인해주세요.');

    try {
      await this.userService.createUser(createUserDto);
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

  /**
   * 로그인
   * @param loginDto
   * @returns
   */

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { userId, password } = loginUserDto;

    const user = await this.userService.findUserById(userId);

    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');

    const { accessToken, refreshToken } = await this.userService.login(
      userId,
      password,
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: 'okay',
      accessToken,
    });
  }
}
