import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 50 })
  userName: string;

  @Column({ type: 'varchar', nullable: true }) // 이미지 필드는 선택적
  image?: string;

  @CreateDateColumn({ type: 'timestamp' }) // 생성됐을 때의 시간
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // 수정되었을 때의 시간
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;
}
