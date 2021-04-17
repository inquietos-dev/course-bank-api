import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
} from 'class-validator';
import { usersConstant } from '../users.constant';

export class CreateUserDto {
  @IsString()
  @Length(2)
  name: string;

  @IsString()
  @Length(2)
  @IsOptional()
  surname: string;

  @IsEnum(usersConstant.types)
  @IsUppercase()
  role: string;

  @IsString()
  @Length(8, 150)
  password: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  @Length(3, 3)
  city: string;
}
