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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StringToArrayPipe } from '../../common/pipes/string-to-array.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { User } from './classes/user.class';
import { BadRequest } from '../../common/classes/bad-request.class';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
@ApiBearerAuth()
@Roles('USER')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'ids', type: Number, isArray: true, example: [1,2], required: false })
  @ApiQuery({ name: 'email', type: String, example: 'pepe@gmail.com', required: false })
  getAll(
    @Query('ids', new StringToArrayPipe(false)) ids: number[],
    @Query('email') emailFilter: string,
    @Pagination() pagination: PaginationDto,
  ) {
    return this.userService.getAll(emailFilter, ids, pagination);
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.I_AM_A_TEAPOT }),
    )
    id: number,
  ) {
    return this.userService.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created', type: User })
  @ApiBadRequestResponse({ description: 'Validation Error', type: BadRequest })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
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
