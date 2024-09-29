import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { Travel } from '../travel/travel.entity';

const role = {
  User: 'user',
  Admin: 'admin',
} as const;
type role = (typeof role)[keyof typeof role]; // 'user' | 'admin'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn() // 자동적으로 숫자가 증가한다.
  id: number;

  @ApiProperty({ description: '유저아이디', example: 'admin' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @ApiProperty({ description: '유저비밀번호', example: 'password' })
  @Column({ type: 'varchar', nullable: false }) // {select: false} select로 가져올 수 없음
  password: string;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'enum', nullable: false, enum: role, default: role.User })
  role: role;

  @CreateDateColumn() // 생성됐을 떄의 시간
  createdAt: Date;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Travel, (travel) => travel.user)
  travels: Travel[];
}
