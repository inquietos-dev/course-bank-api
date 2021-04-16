import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Query('limit') limit) {
    return this.userService.getAll(parseInt(limit));
  }

  @Get(':id')
  getOne(@Param('id') id) {
    return this.userService.getOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body) {
    return this.userService.update(parseInt(id, 10), body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.userService.delete(parseInt(id));
  }
}
