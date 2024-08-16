import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { typeOrmModuleAsyncOptions } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../src/auth/auth.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
