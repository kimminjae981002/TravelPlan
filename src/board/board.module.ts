import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid4 } from 'uuid';
import { join } from 'path';
import multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    MulterModule.register({
      storage: multerS3({
        s3: new S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        }),
        bucket: 'blog-image-s3',
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
      }),
    }),
    TypeOrmModule.forFeature([Board]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [BoardService, AuthInterceptor],
  controllers: [BoardController],
})
export class BoardModule {}
