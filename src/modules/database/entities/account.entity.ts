import { MovementEntity } from './movement.entity';
import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Column('float')
  amount: number;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToMany((type) => UserEntity, (user) => user.account)
  @JoinTable({
    name: 'user2account',
    joinColumn: { name: 'account_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user: UserEntity[];

  @OneToMany(
    (type) => MovementEntity,
    (movement: MovementEntity) => movement.account,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  movements: MovementEntity[];
}
