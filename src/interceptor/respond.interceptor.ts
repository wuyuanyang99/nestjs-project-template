import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Respond } from 'src/common/entities/respond.entity';
import { Request, Response } from 'express';
import { LoggerDataFormat, QueryParams } from 'utils/nestjs.util';
import { LoggerService } from 'src/modules/logger/logger.service';
import * as moment from 'moment';

@Injectable()
export class ServiceResponseInterceptor implements NestInterceptor {
  private logger = new LoggerService();
  constructor() {
    this.logger.setContext('ServiceResponseInterceptor');
  }

  private getRequestParams = function ({ query, params, body }: QueryParams) {
    return { query, params, body };
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = moment();
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest<Request>();
        const msg = LoggerDataFormat(
          req,
          this.getRequestParams(req),
          data,
          moment().diff(startTime),
        );
        this.logger.logVerbose(msg);
        return data instanceof Respond ? data : Respond.Success(data);
      }),
    );
  }
}
