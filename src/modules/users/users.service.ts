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

  public getAll(limit: number) {
    return this.users.splice(limit);
  }

  public getOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  public create(body: any) {
    body.id = this.users.length + 1;
    this.users.push(body);
    return body;
  }

  public update(id: number, body: any) {
    const user = this.getOne(id);
    Object.assign(user, body);
    return user;
  }

  public delete(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }
}
