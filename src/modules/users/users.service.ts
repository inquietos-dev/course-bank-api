import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './classes/user.class';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  users = [
    {
      id: 1,
      name: 'Raul',
      surname: 'Requero',
      role: 'ADMIN',
      createdAt: new Date(),
      password: 'pepe',
      email: 'raul@gmail.com',
      age: 33,
      city: 'SG',
    },
    {
      id: 2,
      name: 'Raul2',
      surname: 'Requero2',
      role: 'USER',
      createdAt: new Date(),
      password: 'pepe',
      email: 'raul2@gmail.com',
      age: 33,
      city: 'SG',
    },
  ];

  public getAll(limit: number): User[] {
    return this.users.splice(limit).map((u) => new User(u));
  }

  public getOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return new User(user);
  }

  public create(body: CreateUserDto): User {
    const newUser = {
      ...body,
      id: this.users.length + 1,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return new User(newUser);
  }

  public update(id: number, body: any): User {
    const user = this.getOne(id);
    Object.assign(user, body);
    return new User(user);
  }

  public delete(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    this.users = this.users.filter((u) => u.id !== id);
    return new User(user);
  }
}
