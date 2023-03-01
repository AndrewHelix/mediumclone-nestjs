import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from 'types/expressRequestInterface';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequest>();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
