import { forwardRef, Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { OpenAi } from './open-ai.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpenAi]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [OpenAiService],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
