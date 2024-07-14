import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OtherResolver } from './other.resolver';

@Module({
  imports: [PrismaModule],
  providers: [OtherResolver],
})
export class OtherModule {}
