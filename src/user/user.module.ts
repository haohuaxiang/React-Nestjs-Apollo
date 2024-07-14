import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

//导入数据库操作依赖
import { PrismaModule } from '../prisma/prisma.module';
//导入用户相关依赖
import { UserService } from './user.service';
//导入用户相关resolver，GraphQL依赖
import { UserResolver } from './user.resolver';
import { UserExceptionFilter } from './user-exception.filter';

//定义用户模块，包含相关服务、解析器、过滤器等依赖
@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    UserResolver,
    {
      provide: APP_FILTER,
      useClass: UserExceptionFilter,
    },
  ],
})
export class UserModule {}
