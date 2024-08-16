import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [BoardService, AuthInterceptor],
  controllers: [BoardController],
})
export class BoardModule {}
