import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'openAi' })
export class OpenAi {
  @PrimaryGeneratedColumn() // 자동적으로 숫자가 증가한다.
  id: number;

  @ApiProperty({ description: '지역', example: '서울' })
  @Column({ type: 'varchar', nullable: false })
  destination: string;

  @ApiProperty({ description: '기간', example: '3일' })
  @Column({ type: 'varchar', nullable: false })
  duration: string;

  @ApiProperty({ description: '구성원', example: '가족' })
  @Column({ type: 'varchar', nullable: false })
  who: string;

  @ApiProperty({ description: '계절', example: '여름' })
  @Column({ type: 'varchar', nullable: false })
  season: string;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.openAi)
  user: User;

  @Column()
  userId: number;
}
