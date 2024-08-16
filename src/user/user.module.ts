import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
