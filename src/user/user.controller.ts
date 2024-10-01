import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 회원가입
   * @param createUserDto
   * @returns
   */

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const { username, password, passwordCheck, name } = createUserDto;

    const user = await this.userService.findUserByName(name);

    const existingUser = await this.userService.findUserByUsername(username);

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
    const { username, password } = loginUserDto;

    const user = await this.userService.findUserByUsername(username);

    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');

    const { accessToken, refreshToken } = await this.userService.login(
      username,
      password,
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'none',
    });

    return res.json({
      success: true,
      message: 'okay',
      accessToken,
    });
  }

  /**
   * 리프레쉬토큰
   * @returns
   */
  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['jwt'];

    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }

    try {
      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }
  }
}
