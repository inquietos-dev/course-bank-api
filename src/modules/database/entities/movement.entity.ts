import {
  Column,
  Connection,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'movement' })
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => AccountEntity, (account) => account.movements)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}
