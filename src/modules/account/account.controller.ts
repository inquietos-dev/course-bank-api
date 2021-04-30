import { StringToArrayPipe } from './../../common/pipes/string-to-array.pipe';
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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateBalanceDTO } from './dtos/update-balance.dto';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { User } from '../../common/decorators/user.decorator';
import { ParseFloatPipe } from 'src/common/pipes/parse-float.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Roles('ADMIN')
  async getAll(
    @Pagination() pagination: PaginationDto,
    @Query('amount', new ParseFloatPipe(false)) amountFilter,
    @Query('includes', new StringToArrayPipe(false, 'string')) includes,
    @Query('status') statusFilter,
  ) {
    return this.accountService.getAll(
      amountFilter,
      statusFilter,
      pagination,
      includes,
    );
  }

  @Get(':id')
  @Roles('ADMIN')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includes', new StringToArrayPipe(false, 'string')) includes,
  ) {
    return this.accountService.getOne(id, includes);
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() body: CreateAccountDTO) {
    return this.accountService.create(body);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAccountDTO,
  ) {
    return this.accountService.update(id, body);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.delete(id);
  }

  @Post(':id/balance')
  @Roles('ADMIN')
  async updateBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBalanceDTO,
  ) {
    return this.accountService.updateBalance(id, body);
  }
}
