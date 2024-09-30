import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'travels' })
export class Travel {
  @PrimaryGeneratedColumn() // 자동적으로 숫자가 증가한다.
  id: number;

  @ApiProperty({ description: '키워드', example: '지역 관광지, 맛집' })
  @Column({ type: 'varchar', nullable: false })
  keyword: string;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.travels)
  user: User;

  @Column()
  userId: number;
}
