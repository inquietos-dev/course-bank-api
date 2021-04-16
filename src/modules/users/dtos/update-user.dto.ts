import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
} from 'class-validator';
import { usersConstant } from '../users.constant';

export class UpdateUserDto {
  @IsString()
  @Length(2)
  @IsOptional()
  name: string;

  @IsString()
  @Length(2)
  @IsOptional()
  surname: string;

  @IsEnum(usersConstant.types)
  @IsUppercase()
  @IsOptional()
  role: string;

  @IsString()
  @Length(8, 150)
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumberString()
  @IsOptional()
  age: number;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  city: string;
}
