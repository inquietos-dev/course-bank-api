import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovementEntity } from '../../../database/entities/movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @Inject('MOVEMENT_REPOSITORY')
    private movementRepository: Repository<MovementEntity>,
  ) {}

  async getAll(accountId: number) {
    const movementsQuery = this.movementRepository.createQueryBuilder('mo');

    if (accountId) {
      movementsQuery.andWhere('account_id = :accountId', { accountId });
    }

    return movementsQuery.getMany();
  }

  async getOne(accountId: number, movementId: number) {
    const movementQuery = this.movementRepository.createQueryBuilder('mo');

    if (accountId) {
      movementQuery.andWhere('account_id = :accountId', { accountId });
    }

    if (movementId) {
      movementQuery.andWhere('id = :movementId', { movementId });
    }

    return movementQuery.getOne();
  }
}
