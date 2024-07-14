import { Field, Int, ObjectType } from '@nestjs/graphql';


//为GraphQL提供清晰的用户数据结构，便于客户端进行查询和操作
//定义User对象类型，用于在GraphQL中表示用户数据
@ObjectType()   //将User类转换为GraphQL对象类型
export class User {
  @Field(() => Int)
  id: number;

  @Field()      //将username属性转换为GraphQL字段
  username: string;

  @Field()
  password: string;

  @Field()
  token?: string;
}
