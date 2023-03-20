import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export enum RespondStatusEnum {
  Success = HttpStatus.OK,
  BadRequest = HttpStatus.BAD_REQUEST,
  NotFound = HttpStatus.NOT_FOUND,
  Error = HttpStatus.INTERNAL_SERVER_ERROR,
  Conflict = HttpStatus.CONFLICT,
}
type RespondStatusKeys = keyof typeof RespondStatusEnum;
const RespondDefaultDescription: Record<RespondStatusKeys, string> = {
  Success: '请求成功',
  BadRequest: '请求参数不符合要求',
  NotFound: '未找到目标数据',
  Error: '出现错误',
  Conflict: '出现内部冲突',
};

export interface IRespond<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | Array<T> | null;
  count: number;
}

class RespondClass<T> implements IRespond<T> {
  /**
   * 是否成功取得数据
   */
  success: boolean = false;
  public toggleSuccess() {
    this.success = !this.success;
  }

  /**
   * 请求返回的状态码
   */
  status: number;
  public setStatus(value: RespondStatusEnum, message?: string) {
    this.status = value;
    const EnumKey = RespondStatusEnum[value] as RespondStatusKeys;
    this.message = !message ? RespondDefaultDescription[EnumKey] : message;
  }

  /**
   * 返回的说明信息
   */
  message: string;

  /**
   * 返回的数据信息
   */
  data: T | Array<T> | null;
  public setData(value: T) {
    this.data = !value && value === undefined ? null : value;
  }

  /**
   * 接口数据总数
   * 分页用
   */
  count: number = 0;
  public setCount(value: number) {
    this.count = value;
  }

  constructor(status: RespondStatusEnum = 200, message?: string, data?: any) {
    this.setStatus(status, message);
    this.setData(data);
  }
}

export class Respond<T> extends RespondClass<T> {
  static Success<T>(data?: T, message?: string): Respond<T> {
    const res = new Respond<T>(RespondStatusEnum.Success, message, data);
    res.toggleSuccess();
    return res;
  }

  static NotFind<T>(data?: T, message?: string): Respond<T> {
    return new Respond(RespondStatusEnum.NotFound, message, data);
  }

  static Fail<T>(message?: string, data?: T): Respond<T> {
    return new Respond(RespondStatusEnum.Conflict, message, data);
  }

  static Error<T>(status: number, message: string): Respond<T> {
    return new Respond(status, message, null);
  }
}
