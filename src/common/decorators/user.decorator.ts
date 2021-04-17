import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();

    if (property) {
      return user[property];
    }

    return user;
  },
);
