// 引入所需内置对象
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

// 们需要访问底层平台 `Request`和 `Response`
import { Request, Response } from 'express';
import { Respond } from 'src/common/entities/respond.entity';

// 它负责捕获作为`HttpException`类实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // HttpException 属于基础异常类，可自定义内容
    // 如果是自定义的异常类则抛出自定义的status
    // 否则就是内置HTTP异常类，然后抛出其对应的内置Status内容
    const status = exception.getStatus();
    // 用于接收主动发错的错误信息
    const { message, code } = exception.getResponse() as any;
    response.status(status).json(Respond.Error(code || status, message));
  }
}
