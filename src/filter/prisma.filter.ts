//src/prisma-client-exception.filter.ts
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma as MihoyoPrisma } from 'prisma/generated/mihoyo_client';
import { Prisma as SysUserPrisma } from 'prisma/generated/sys_user_client';
import { Response } from 'express';
import { Respond, RespondStatusEnum } from 'src/common/entities/respond.entity';

@Catch(
  MihoyoPrisma.PrismaClientKnownRequestError,
  SysUserPrisma.PrismaClientKnownRequestError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      | MihoyoPrisma.PrismaClientKnownRequestError
      | SysUserPrisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const errorMetaData = exception.meta;
    const errorCode = exception.code;

    const CONFILCT_STATUS = RespondStatusEnum.Conflict;
    const NOSERVER_STATUS = RespondStatusEnum.NotFound;
    const ERROR_STATUS = RespondStatusEnum.Error;

    const result = new Respond();
    result.setData(errorMetaData);

    /// https://prisma.yoga/reference/api-reference/error-reference
    switch (true) {
      //#region 服务器数据库连接错误
      case errorCode.startsWith('P10'):
        response
          .status(NOSERVER_STATUS)
          .json(new Respond(NOSERVER_STATUS, '服务器连接失败', errorMetaData));
        break;
      //#endregion

      //#region prisma 请求出错
      case ['P2000'].includes(errorCode):
        result.setStatus(CONFILCT_STATUS, '列长度超出');
        response.status(CONFILCT_STATUS).json(result);
        break;
      case ['P2002', 'P2003', 'P2004', 'P2011'].includes(errorCode):
        result.setStatus(CONFILCT_STATUS, '约束错误');
        response.status(CONFILCT_STATUS).json(result);
        break;
      case ['P2005', 'P2006', 'P2007', 'P2021', 'P2022'].includes(errorCode):
        result.setStatus(NOSERVER_STATUS, '数据库字段模型未更新');
        response.status(NOSERVER_STATUS).json(result);
        break;
      case ['P2012', 'P2013'].includes(errorCode):
        result.setStatus(NOSERVER_STATUS, '缺少必需字段或参数');
        response.status(NOSERVER_STATUS).json(result);
        break;
      case ['P2015', 'P2018', 'P2025'].includes(errorCode):
        result.setStatus(NOSERVER_STATUS, '未找到相关数据记录或数据');
        response.status(NOSERVER_STATUS).json(result);
        break;
      case ['P2008', 'P2009', 'P2010'].includes(errorCode):
        result.setStatus(ERROR_STATUS, '查询失败');
        response.status(ERROR_STATUS).json(result);
        break;
      //#endregion

      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
