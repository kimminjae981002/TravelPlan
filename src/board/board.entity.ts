import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

export enum Rating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'date' })
  creationDate: string;

  @Column({ type: 'enum', enum: Rating })
  rating: Rating;

  @Column({ length: 50 })
  userName: string;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;
}
