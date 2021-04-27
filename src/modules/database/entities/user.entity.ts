import { AccountEntity } from './account.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  surname: string;

  @Column('integer')
  age: number;

  @Column('varchar', { length: 100, default: 'USER' })
  role: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column('varchar', { length: 200, nullable: true })
  city: string;

  @Column('text')
  email: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToMany((type) => AccountEntity, (account) => account.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  account: AccountEntity[];
}
