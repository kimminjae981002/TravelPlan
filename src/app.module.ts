import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { typeOrmModuleAsyncOptions } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      // 저장 경로를 절대 경로로 설정
      dest: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    UserModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
