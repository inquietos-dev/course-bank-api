import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AccountService {
  accounts = [
    {
      id: 1,
      alias: 'Cuenta personal',
      status: 'active',
      amount: 100.24,
    },
    {
      id: 2,
      alias: 'Cuenta pareja',
      status: 'blocked',
      amount: 5862.25,
    },
  ];

  public getAll() {
    return this.accounts;
  }

  public getOne(id: number) {
    const user = this.accounts.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return user;
  }

  public create(body: any) {
    body.id = this.accounts.length + 1;
    this.accounts.push(body);
    return body;
  }

  public update(id: number, body: any) {
    const user = this.getOne(id);
    Object.assign(user, body);
  }

  public delete(id: number) {
    const user = this.accounts.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    this.accounts = this.accounts.filter((u) => u.id !== id);
    return user;
  }
}
