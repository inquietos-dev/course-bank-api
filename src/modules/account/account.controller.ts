import { UpdateAccountDTO } from './dtos/update-account.dto';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { AccountService } from './account.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateBalanceDTO } from './dtos/update-balance.dto';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAll() {
    return this.accountService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.getOne(id);
  }

  @Post()
  create(@Body() body: CreateAccountDTO) {
    return this.accountService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAccountDTO,
  ) {
    return this.accountService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.delete(id);
  }

  @Post(':id/balance')
  updateBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBalanceDTO,
  ) {}
}
