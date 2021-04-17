import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  max,
} from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @IsEnum(['ACTIVED', 'BLOCKED', 'DISABLED'])
  @IsUppercase()
  status: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  alias: string;

  @IsOptional()
  @IsNumber()
  amount = 10;
}
