import { MovementEntity } from './../database/entities/movement.entity';
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
import { Connection, EntityManager, Repository } from 'typeorm';
import { AccountEntity } from '../database/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<AccountEntity>,
    @Inject('DATABASE_CONNECTION')
    private connection: Connection,
  ) {}

  public async getAll(
    amountFilter: number,
    statusFilter: string,
    pagination: PaginationDto,
    includes: string[],
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
    if (includes) {
      includes.forEach((inc) => {
        accountsQuery.leftJoinAndSelect(`ac.${inc}`, inc);
      });
    }
    const accounts = await accountsQuery.getMany();
    return accounts.map((a) => new Account(a));
  }

  private async getOneEntity(
    id: number,
    includes?: string[],
  ): Promise<AccountEntity> {
    const accountsQuery = this.accountRepository.createQueryBuilder('ac');
    if (includes) {
      includes.forEach((inc) => {
        accountsQuery.leftJoinAndSelect(`ac.${inc}`, inc);
      });
    }
    const account = await accountsQuery.getOne();

    if (!account) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return account;
  }

  public async getOne(id: number, includes: string[]): Promise<Account> {
    const account = await this.getOneEntity(id, includes);
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
    return await this.connection.manager.transaction(
      async (entityManager: EntityManager) => {
        const accountRepository = entityManager.getRepository(AccountEntity);
        const movementRepository = entityManager.getRepository(MovementEntity);

        let account = await accountRepository.findOne(id);
        if (!account) {
          throw new NotFoundException('Account does not exist');
        }
        const movement = new MovementEntity();
        movement.amount = body.amount;
        movement.account = account;
        await movementRepository.save(movement);
        if (account.amount + body.amount < 0) {
          throw new BadRequestException(`The account doesn't have money`);
        }
        account.amount += body.amount;
        account = await accountRepository.save(account);
        return new Account(account);
      },
    );
  }
}
