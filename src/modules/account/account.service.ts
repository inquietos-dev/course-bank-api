import { UpdateBalanceDTO } from './dtos/update-balance.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { UpdateAccountDTO } from './dtos/update-account.dto';
import { Account } from './classes/account.class';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '../database/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<AccountEntity>,
  ) {}

  public async getAll(
    amountFilter: number,
    statusFilter: string,
    pagination: PaginationDto,
  ): Promise<Account[]> {
    const accountsQuery = this.accountRepository
      .createQueryBuilder('ac')
      .offset(pagination.offset)
      .limit(pagination.limit);

    if (amountFilter) {
      accountsQuery.andWhere('ac.amount > :amount', { amount: amountFilter });
    }

    if (statusFilter) {
      accountsQuery.andWhere('ac.status = :status', { status: statusFilter });
    }
    const accounts = await accountsQuery.getMany();
    return accounts.map((a) => new Account(a));
  }

  private async getOneEntity(id: number): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return account;
  }

  public async getOne(id: number): Promise<Account> {
    const account = await this.getOneEntity(id);
    return new Account(account);
  }

  public async create(body: CreateAccountDTO): Promise<Account> {
    let account = new AccountEntity();
    Object.assign(account, body);
    account = await this.accountRepository.save(account);

    return new Account(account);
  }

  public async update(id: number, body: UpdateAccountDTO): Promise<Account> {
    const account = await this.getOneEntity(id);
    Object.assign(account, body);
    await this.accountRepository.save(account);
    return new Account(account);
  }

  public async delete(id: number): Promise<Account> {
    const account = await this.getOneEntity(id);
    await this.accountRepository.remove(account);
    return new Account(account);
  }

  public async updateBalance(
    id: number,
    body: UpdateBalanceDTO,
  ): Promise<Account> {
    const account = await this.getOneEntity(id);
    if (account.amount + body.amount < 0) {
      throw new BadRequestException(`The account doesn't have money`);
    }
    account.amount += body.amount;
    await this.accountRepository.save(account);
    return new Account(account);
  }
}
