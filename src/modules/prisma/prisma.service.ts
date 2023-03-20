import { Injectable } from '@nestjs/common';
import { PrismaClient as MihoyoClient } from 'prisma/generated/mihoyo_client';
import { PrismaClient as SysUserClient } from 'prisma/generated/sys_user_client';

@Injectable()
export class _MihoyoDb extends MihoyoClient {
  constructor() {
    // pass PrismaClientOptions e.g. logging levels or error formatting
    super();
  }

  //#region 额外配置

  // 自配置启动连接
  // The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
  // async onModuleInit() {
  //   console.log('onModuleInit');
  //   await this.$connect();
  // }

  //// We don't bother with onModuleDestroy, since Prisma has its own shutdown hooks where it will destroy the connection.
  //// For more info on enableShutdownHooks, please see Issues with enableShutdownHooks
  //// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     console.log('beforeExit');
  //     await app.close();
  //   });
  // }

  //#endregion
}

@Injectable()
export class _SysUserDb extends SysUserClient {
  constructor() {
    // pass PrismaClientOptions e.g. logging levels or error formatting
    super();
  }

  //#region 额外配置

  //// 自配置启动连接
  //// The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
  // async onModuleInit() {
  //   console.log('onModuleInit');
  //   await this.$connect();
  // }

  //// We don't bother with onModuleDestroy, since Prisma has its own shutdown hooks where it will destroy the connection.
  //// For more info on enableShutdownHooks, please see Issues with enableShutdownHooks
  //// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     console.log('beforeExit');
  //     await app.close();
  //   });
  // }

  //#endregion
}
