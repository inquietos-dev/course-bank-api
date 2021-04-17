import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
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
  UseInterceptors,
} from '@nestjs/common';
import { StringToArrayPipe } from '../../common/pipes/string-to-array.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(
    @Query('ids', new StringToArrayPipe(false)) ids: number[],
    @Pagination() pagination: PaginationDto,
  ) {
    return this.userService.getAll(pagination);
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
