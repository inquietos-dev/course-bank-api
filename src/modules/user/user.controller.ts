import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id) {
    return this.userService.getOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() body) {}

  @Patch(':id')
  update() {}

  @Delete(':id')
  delete() {}
}
