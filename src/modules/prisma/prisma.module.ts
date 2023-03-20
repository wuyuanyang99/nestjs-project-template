import { Global, Module } from '@nestjs/common';
import { _MihoyoDb, _SysUserDb } from './prisma.service';

@Global() // 👈 makes PrismaService globally available
@Module({
  providers: [_MihoyoDb, _SysUserDb],
  exports: [_MihoyoDb, _SysUserDb], // 👈 export PrismaService for DI
})
export class PrismaModule {}
