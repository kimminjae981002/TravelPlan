import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import multerS3 from 'multer-s3';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // 파일 크기 제한 (예: 5MB)
      },
    }),
    TypeOrmModule.forFeature([Board]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [BoardService, AuthInterceptor],
  controllers: [BoardController],
})
export class BoardModule {}
