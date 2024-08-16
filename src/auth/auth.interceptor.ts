import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // express 요청 응답 객체
    const accessToken = request.headers.authorization?.split(' ')[1];
    const refreshToken = request.cookies['jwt'];

    // 엑세스 토큰이 있으면 검증
    // 엑세스 토큰이 없으면 다음 핸들러로 전달
    if (accessToken) {
      try {
        this.jwtService.verify(accessToken, {
          secret: process.env.JWT_SECRET_KEY,
        });
        return next.handle();
      } catch {
        // 리프레쉬 토큰이 있으면 엑세스 토큰을 헤더에 전달
        if (refreshToken) {
          return from(this.refreshAccessToken(refreshToken)).pipe(
            switchMap((newAccessToken) => {
              response.setHeader('Authorization', `Bearer ${newAccessToken}`);
              return next.handle();
            }),
          );
        }
        // 리프레쉬 토큰이 없으면 에러
        throw new UnauthorizedException(
          '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.',
        );
      }
    }

    throw new UnauthorizedException('액세스 토큰이 제공되지 않았습니다.');
  }

  private async refreshAccessToken(refreshToken: string): Promise<string> {
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
