export type StrRequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';
export enum EnumRequestMethod {
  Post = 'POST',
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
}

export type StrRequestParamType = 'Query' | 'Param' | 'Body';
export enum EnumRequestParamType {
  Query = 'Query',
  Param = 'Param',
  Body = 'Body',
}

export const SwaggerDecoratorType: Record<string, any> = {
  String: { type: 'string', default: '' },
  Number: { type: 'string', default: 0 },
  Boolean: { type: 'boolean', default: false },
  Null: { type: 'null', default: null },
};

export class BasePagination {
  pageIndex: number;
  pageSize: number;
}

export class BaseKeyValue<K = string, V = string> {
  key: K;
  value: V;
}
