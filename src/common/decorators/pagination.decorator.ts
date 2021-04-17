import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dtos/pagination.dto';

export const Pagination = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const { query } = context.switchToHttp().getRequest();

    if (property) {
      return query[property];
    }

    const pagination: PaginationDto = {};

    if (query.offset) {
      pagination.offset = +query.offset;
    }

    if (query.limit) {
      pagination.limit = +query.limit;
    }

    return pagination;
  },
);
