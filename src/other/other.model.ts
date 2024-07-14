import { Field, ObjectType } from '@nestjs/graphql';

//定义Other类型，返回test字段
@ObjectType()
export class Other {
  @Field()
  test: string;
}
