import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
} from 'class-validator';

export class UpdateAccountDTO {
  @IsString()
  @IsEnum(['ACTIVED', 'BLOCKED', 'DISABLED'])
  @IsUppercase()
  @IsOptional()
  status: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  alias: string;

  @IsOptional()
  @IsNumber()
  amount;
}
