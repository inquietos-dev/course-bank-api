import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  token: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
