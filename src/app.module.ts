import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { typeOrmModuleAsyncOptions } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { S3 } from 'aws-sdk';
import multerS3 from 'multer-s3';

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
