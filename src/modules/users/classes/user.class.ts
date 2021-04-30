import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { usersConstant } from '../users.constant';

export class User {
  @ApiProperty({ example: 1, type: Number })
  id: number;

  @ApiProperty({ example: 'Pepe', type: String })
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty({ example: 'USER', enum: usersConstant.types, type: String })
  role: string;

  @ApiProperty()
  createdAt: Date;
  @Exclude()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  city: string;

  @Expose()
  @ApiProperty({ example: 'Pepe Gonzalez', type: String })
  get fullname() {
    return `${this.name} ${this.surname}`;
  }

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
