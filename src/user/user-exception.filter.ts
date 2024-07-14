import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';


//定义一个自定义的异常类UserException
export class UserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserException';
  }
}

//定义一个异常过滤器UserExceptionFilter，页面捕捉到UserException异常时，返回一个json格式的错误信息
@Catch(UserException)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: UserException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;
    response.status(200).json({
      errors: [
        {
          message: exception.message,
          extensions: {
            code: 'AUTH_ERROR',
          },
        },
      ],
    });
  }
}
