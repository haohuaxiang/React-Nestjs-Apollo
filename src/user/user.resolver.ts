import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserException } from './user-exception.filter';

//定义一个UserResolver类，并使用@Resolver()装饰器将其标记为GraphQL的Resolver
//该类中定义了两个GraphQL的查询和一个GraphQL的变更
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  //用户注册，定义突变用于注册新用户
  @Mutation(() => User)
  async register(
    @Args('username') username: string, //请求参数获取用户名
    @Args('password') password: string,
  ): Promise<User | UserException> {
    //返回值类型为User或UserException
    //调用UserService的createUser方法进行用户注册
    return this.userService.createUser(username, password);
  }

  //用户查询
  @Query(() => User, { nullable: true })
  async user(@Args('username') username: string): Promise<User | null> {
    return this.userService.findUserByUsername(username);
  }

  //用户登录，定义突变用于登录
  @Mutation(() => User)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User | null | UserException> {
    //调用UserService的login方法进行登录
    return this.userService.login(username, password);
  }
}
