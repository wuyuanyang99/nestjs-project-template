import * as moment from 'moment';
import { handleBaseStringfy } from './index.util';

export interface QueryParams {
  query?: Record<string, any>;
  params?: Record<string, any>;
  body?: Record<string, any>;
}

interface RequestParams {
  hostname: string;
  method: string;
  url: string;
}
export const LoggerDataFormat = (
  { hostname, method, url }: RequestParams,
  params: QueryParams,
  Response: any,
  timeCost: number = -1,
) => {
  return `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  时间：${moment().format()}   URL：${method} ${url}    
  Host: ${hostname}   耗时：${timeCost}ms
  Query:${handleBaseStringfy(params.query, '')}
  Params:${handleBaseStringfy(params.params, '')}
  Body:${handleBaseStringfy(params.body, '')}
  Response:${handleBaseStringfy(Response, '')}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

`;
};
