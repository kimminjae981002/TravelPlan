import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, name } = createUserDto;

    try {
      const hashRounds = this.configService.get<number>('HASH_ROUNDS');
      const salt = await bcrypt.genSalt(+hashRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      await this.userRepository.save({
        username,
        password: hashPassword,
        name,
      });

      return {
        success: true,
        message: 'okay',
      };
    } catch (err: any) {
      console.error(err);
    }
  }

  // 로그인
  async login(username: string, password: string) {
    const user = await this.findUserByUsername(username);

    if (!compareSync(password, user?.password ?? ''))
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    const accessTokenPayload = {
      id: user.id,
      tokenType: 'access',
    };
    const refreshTokenPayload = { id: user.id, tokenType: 'refresh' };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '7d',
    });

    return {
      success: true,
      message: 'okay',
      accessToken,
      refreshToken,
    };
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserByName(name: string) {
    return await this.userRepository.findOneBy({ name });
  }
}
