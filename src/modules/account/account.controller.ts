import { AccountService } from './account.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAll() {
    return this.accountService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id) {
    return this.accountService.getOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() body) {
    return this.accountService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body) {
    return this.accountService.update(parseInt(id, 10), body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.accountService.delete(parseInt(id, 10));
  }
}
