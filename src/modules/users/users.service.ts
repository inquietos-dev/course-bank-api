import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './classes/user.class';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AccountService } from '../account/account.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

  constructor(
    private notificationService: NotificationsService,
    private accountService: AccountService,
    private eventEmitter: EventEmitter2,
  ) {}

  public getAll(pagination: PaginationDto): User[] {
    return this.users.splice(pagination.limit).map((u) => new User(u));
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

    this.eventEmitter.emit('notification.send', { email: newUser.email });

    this.accountService.create({
      alias: `Cuenta principal de ${newUser.name}`,
      status: 'pending',
      amount: 0,
    });

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
