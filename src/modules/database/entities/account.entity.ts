import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  status: string;

  @Column('varchar', { length: 200 })
  alias: string;

  @Column('decimal')
  amount: number;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne((type) => UserEntity, (user) => user.account)
  @JoinColumn()
  user: UserEntity;
}
