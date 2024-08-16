import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { typeOrmModuleAsyncOptions } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configModuleValidationSchema } from './configs/env-validation.config';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { AuthInterceptor } from '../src/auth/auth.interceptor';
import { AuthMiddleware } from './auth/auth.middleware';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    UserModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('reviews', 'services'); // 미들웨어를 적용할 라우트
  }
}
