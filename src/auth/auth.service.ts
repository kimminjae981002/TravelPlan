import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      // 리프레쉬 토큰 검증
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      // 검증된 리프레쉬 토큰으로 사용자 조회
      const user = await this.userService.findUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }

      // 새로 발급받은 엑세스 토큰 반환
      return this.jwtService.sign(
        { id: user.id, tokenType: 'access' },
        { expiresIn: '15m' },
      );
    } catch {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }
}
