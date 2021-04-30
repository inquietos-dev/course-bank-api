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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'Pepe', type: String })
  @IsString()
  @Length(2)
  name: string;

  @ApiProperty({ example: 'Gonzalez', type: String })
  @IsString()
  @Length(2)
  @IsOptional()
  surname: string;

  @ApiProperty({ example: 'USER', enum: usersConstant.types, type: String })
  @IsEnum(usersConstant.types)
  @IsUppercase()
  role: string;

  @ApiProperty({ example: 'a123456789', type: String })
  @IsString()
  @Length(8, 150)
  password: string;

  @ApiProperty({ example: 'pepe@gmail.com', type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 33, type: Number })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'SEG', type: String })
  @IsString()
  @Length(3, 3)
  city: string;
}
