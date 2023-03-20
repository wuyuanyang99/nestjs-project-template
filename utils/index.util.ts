import * as fs from 'fs';
import * as path from 'path';

/**
 * 判断两个类型是否相同
 */
export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T1,
>() => T1 extends B ? 1 : 2
  ? true
  : false;

export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const isNumber = (val: unknown): val is number =>
  typeof val === 'number';

export const isSymbol = (val: unknown): val is symbol =>
  typeof val === 'symbol';

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<string, any> =>
  val != null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);

/**
 * 保存文件到指定目录文件
 * @param {string} prePath - 需要保存的文件目录
 * @param {string} data - 需要保存的文件内容
 * @param {string} fileName - 需要保存的文件名称
 */
export const AppendFile = (
  prePath: string,
  data: string,
  fileName: string = 'default',
) => {
  try {
    fs.mkdir(prePath, () => {
      fs.appendFile(path.join(prePath, fileName), data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param data 需要字符串化的数据
 * @param defaultOutput 默认的返回内容、如、本来返回null，undefined，{}，[],可以修改为默认返回内容
 * @returns
 */
export const handleBaseStringfy = (data: any, defaultOutput?: string) => {
  const result = JSON.stringify(data) ?? 'undefined';
  const isDefaultStr = typeof defaultOutput === 'undefined';
  return !isDefaultStr
    ? result.replace(new RegExp(/[]|{}|null|undefined$/g), defaultOutput)
    : result;
};

export const isStringeEmptyOrHasSpace = (str: string) => {
  const WHITE_SPACE = ' ';
  return str === '' || str.includes(WHITE_SPACE);
};
