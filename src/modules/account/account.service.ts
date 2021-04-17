import { UpdateBalanceDTO } from './dtos/update-balance.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { UpdateAccountDTO } from './dtos/update-account.dto';
import { Account } from './classes/account.class';

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
    return this.accounts.map((a) => new Account(a));
  }

  public getOne(id: number): Account {
    const account = this.accounts.find((u) => u.id === id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return new Account(account);
  }

  public create(body: CreateAccountDTO): Account {
    const newAccount = { ...body, id: this.accounts.length + 1 };
    this.accounts.push(newAccount);
    return new Account(newAccount);
  }

  public update(id: number, body: UpdateAccountDTO): Account {
    const account = this.getOne(id);
    Object.assign(account, body);
    return new Account(account);
  }

  public delete(id: number): Account {
    const account = this.accounts.find((u) => u.id === id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    this.accounts = this.accounts.filter((u) => u.id !== id);
    return new Account(account);
  }

  public updateBalance(id: number, body: UpdateBalanceDTO): Account {
    const account = this.accounts.find((u) => u.id === id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    if (account.amount + body.amount < 0) {
      throw new BadRequestException(`The account doesn't have money`);
    }
    account.amount += body.amount;
    return new Account(account);
  }
}
