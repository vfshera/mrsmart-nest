import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Csrf = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.csrfToken();
  },
);
