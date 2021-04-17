import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
