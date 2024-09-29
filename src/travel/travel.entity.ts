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

  @ApiProperty({ description: '지역', example: '서울' })
  @Column({ type: 'varchar', nullable: false })
  location: string;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.travels)
  user: User;

  @Column()
  userId: number;
}
