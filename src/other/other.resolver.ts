import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { Other } from './other.model';
import { AuthGuard } from '../auth.guard';

//定义解析器，使用AuthGuard守卫
@Resolver(() => Other)
//只有通过AuthGuard守卫的用户才能访问
@UseGuards(AuthGuard)
export class OtherResolver {
  constructor() {}
  @Query(() => Other, { nullable: true })
  async other(): Promise<Other> {
    //返回一个Other对象，其中test字段为'test'
    return {
      test: 'test',
    };
  }
}
