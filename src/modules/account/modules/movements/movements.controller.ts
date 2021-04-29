import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MovementsService } from './movements.service';

@Controller('account/:accountId/movement')
export class MovementsController {
  constructor(private movementService: MovementsService) {}

  @Get()
  async getAll(
    @Param('accountId', ParseIntPipe) accountId: number,
  ) {
    return this.movementService.getAll(accountId);
  };

  @Get(':id')
  async getOne(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('id', ParseIntPipe) movementId: number,
  ) {
    return this.movementService.getOne(accountId, movementId);
  }

}
