import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StringToArrayPipe } from '../../common/pipes/string-to-array.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(
    @Query('ids', new StringToArrayPipe(false)) ids: number[],
    @Query('limit') limit,
  ) {
    return this.userService.getAll(parseInt(limit));
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.I_AM_A_TEAPOT }),
    )
    id,
  ) {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id, 10), body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id) {
    return this.userService.delete(parseInt(id));
  }
}
