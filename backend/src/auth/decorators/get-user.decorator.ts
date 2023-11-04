import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../model/user.entity';

const GetUser = createParamDecorator<keyof User, ExecutionContext>((userKey, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as User;

  return userKey ? user?.[userKey] : user;
});

export default GetUser;
