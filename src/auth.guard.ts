// auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { verifyToken } from './utils';
import { GqlExecutionContext } from '@nestjs/graphql';

//AuthGuard 类实现了 CanActivate 接口，这意味着它可以作为一个守卫来控制对某些路由或资源的访问
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const authorization = ctx.getContext().req.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('authorization is not found');
    const token = authorization.replace('Bearer ', '');
    if (!verifyToken(token)) throw new UnauthorizedException('Invalid token');
    return true;
  }
}
