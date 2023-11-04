import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const GetUser = createParamDecorator((_: unknown, input: ExecutionContext) => {
  const request = input.switchToHttp().getRequest();
  return request.user;
});

export default GetUser;
