import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { typeOrmModuleAsyncOptions } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { BoardModule } from './board/board.module';
@Module({
  imports: [
    // 환경변수 로딩
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    // typeorm 설정
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    UserModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
