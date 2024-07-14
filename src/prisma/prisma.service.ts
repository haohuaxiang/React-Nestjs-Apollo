import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//定义PrismaService类，继承PrismaClient类，并实现OnModuleInit、OnModuleDestroy接口
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  //实现OnModuleInit接口的onModuleInit方法，连接数据库
  async onModuleInit() {
    //this.$connect()方法用于连接数据库
    await this.$connect();
  }

  //实现OnModuleDestroy接口的onModuleDestroy方法，断开数据库连接
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
