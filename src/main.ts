import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Respond } from 'src/common/entities/respond.entity';
import { PrismaClientExceptionFilter } from 'src/filter/prisma.filter';
import { HttpExceptionFilter } from 'src/filter/respond.filter';
import { ServiceResponseInterceptor } from 'src/interceptor/respond.interceptor';
import { LoggerService } from 'src/modules/logger/logger.service';
import { CustomConfigService } from 'src/modules/config/config.service';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['debug', 'warn', 'error'],
    bufferLogs: true,
  });
  app.useLogger(new LoggerService());
  // 👇 binds ValidationPipe to the entire application
  // validate incoming requests automatically to receive only correct data
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 👇 apply transform to all responses
  // Use @Transform() decorator
  // eg. @Transform(({ value }) => value.toNumber())
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ServiceResponseInterceptor());

  // 全局中间件
  // app.use(new LoggerMiddleware().use);

  //#region swagger配置
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('用于测试和查看接口的文档地址')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [Respond],
  });
  SwaggerModule.setup('swagger', app, document);
  //#endregion

  await app.listen(3000);
  console.log(app.get(CustomConfigService).ProjectConsoleInfo);
}
bootstrap();
