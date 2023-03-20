import {
  StrRequestMethod,
  EnumRequestMethod,
  SwaggerDecoratorType,
} from '../entities/common.entity';
import { applyDecorators, Post, Get, Delete, Put, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { Respond } from '../entities/respond.entity';

function GetMethodDecorator(
  method: StrRequestMethod,
  route: string,
): MethodDecorator {
  switch (method) {
    case EnumRequestMethod.Post:
      return Post(route);
    case EnumRequestMethod.Get:
      return Get(route);
    case EnumRequestMethod.Delete:
      return Delete(route);
    case EnumRequestMethod.Put:
      return Put(route);
    default:
      throw new Error(`该装饰器暂不支持'${method}'请求方式`);
  }
}

/**
 * 自定义统一nestjs、swagger装饰器
 * @param method 请求使用的方法：Get|Post|Put|Delete
 * @param route 请求的路由，不能重复
 * @param resModel swagger响应的模型类型
 * @param isArray swagger响应的数据是否是列表
 * @returns
 */
export function CombineDecorator<TModel extends Type<object>>(
  method: StrRequestMethod,
  route: string,
  resModel?: TModel,
  isArray: boolean = false,
) {
  const modelName = resModel?.name ?? 'Null';
  const isBaseTypeOrNull =
    Object.keys(SwaggerDecoratorType).includes(modelName);

  const SchemaItemProperty = isBaseTypeOrNull
    ? SwaggerDecoratorType[modelName]
    : { $ref: getSchemaPath(resModel as TModel) };

  const option: ApiResponseOptions = {
    schema: {
      title: `ResponseOf${modelName}`,
      allOf: [
        { $ref: getSchemaPath(Respond) },
        {
          properties: {
            data: isArray
              ? {
                  type: 'array',
                  items: SchemaItemProperty,
                }
              : SchemaItemProperty,
          },
        },
      ],
    },
  };

  return applyDecorators(
    GetMethodDecorator(method, route),
    ApiOkResponse(option),
  );
}
