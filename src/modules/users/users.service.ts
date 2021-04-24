import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './classes/user.class';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AccountService } from '../account/account.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';

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
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
    private accountService: AccountService,
    private eventEmitter: EventEmitter2,
  ) {}

  public async getAll(
    emailFilter: string,
    ids: number[],
    pagination: PaginationDto,
  ): Promise<User[]> {
    console.log(typeof ids[0]);
    // select * from user u where u.email like '%<emailFilter>%' limit <limit> offset <offset>
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .limit(pagination.limit)
      .offset(pagination.offset);

    if (emailFilter) {
      userQuery.andWhere('u.email like :email', { email: `%${emailFilter}%` });
    }
    if (ids && ids.length > 0) {
      userQuery.andWhere('id in (:...ids)');
      // userQuery.setParameter('ids', ids);
      userQuery.setParameters({ ids });
    }
    const users = await userQuery.getMany();

    return users.map((u) => new User(u));
  }

  private async getOneEntity(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  public async getOne(id: number): Promise<User> {
    const user = await this.getOneEntity(id);
    return new User(user);
  }

  public async create(body: CreateUserDto): Promise<User> {
    let user = new UserEntity();
    user.email = body.email;
    user.name = body.name;
    user.surname = body.surname;
    user.city = body.city;
    user.password = body.password;
    user.role = body.role;
    user.age = body.age;

    user = await this.userRepository.save(user);

    this.eventEmitter.emit('notification.send', { email: user.email });

    return new User(user);
  }

  public async update(id: number, body: any): Promise<User> {
    const user = await this.getOneEntity(id);
    Object.assign(user, body);
    await this.userRepository.save(user);
    return new User(user);
  }

  public async delete(id: number): Promise<User> {
    const user = await this.getOneEntity(id);

    await this.userRepository.remove(user);
    return new User(user);
  }
}
