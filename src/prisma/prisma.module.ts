import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//PrismaModule 的模块
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
