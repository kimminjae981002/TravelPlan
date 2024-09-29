import { forwardRef, Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Travel } from './travel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Travel]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [TravelService],
  controllers: [TravelController],
})
export class TravelModule {}
