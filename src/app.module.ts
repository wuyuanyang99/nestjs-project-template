//#region 其他引入
import { Module } from '@nestjs/common';
//#endregion

//#region 功能服务模块引入
import { MihoyoModule } from './controllers/mihoyo/mihoyo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CustomConfigModule } from './modules/config/config.module';
import { MinioModule } from './controllers/minio/minio.module';
import { GithubModule } from './controllers/github/github.module';
import { LoggerModule } from './modules/logger/logger.module';
//#endregion

@Module({
  imports: [
    MihoyoModule,
    PrismaModule,
    CustomConfigModule,
    MinioModule,
    GithubModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
