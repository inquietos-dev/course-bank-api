import { IsNumber } from 'class-validator';

export class UpdateBalanceDTO {
  @IsNumber()
  amount: number;
}
