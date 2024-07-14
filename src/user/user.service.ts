import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserException } from './user-exception.filter';
import { generateToken } from '../utils';
import * as bcrypt from 'bcrypt';

//定义UserService类，并使用Injectable装饰器将其标记为可注入的服务
//UserService类负责处理用户相关的业务逻辑，包括注册、登录等功能
@Injectable()
export class UserService {
  //构造函数注入PrismaService
  constructor(private prisma: PrismaService) {}

  //注册用户
  async createUser(
    username: string,
    password: string,
  ): Promise<User | UserException> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) return new UserException('用户以存在');
    //使用bcrypt库对密码加密，bcrpyt.hash()方法返回一个Promise
    const hashedPassword = await bcrypt.hash(password, 10);
    //将新用户数据插入数据库表
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }
  //根据用户名查找用户
  async findUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  //登录功能：findUnique查找用户
  async login(
    username: string,
    password: string,
  ): Promise<(User & { token: string }) | null | UserException> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) return new UserException('用户名或密码错误');
    //使用bcrypt库对密码进行验证，bcrypt.compare()方法返回一个Promise
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return new UserException('用户名或密码错误');
    //密码验证通过，生成token并返回用户数据
    const token = generateToken(String(user.id));
    //返回用户数据及token
    return {
      ...user,
      token,
    };
  }
}
