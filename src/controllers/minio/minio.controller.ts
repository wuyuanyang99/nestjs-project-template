import { IsNotEmpty, MinLength } from 'class-validator';
import { Respond } from 'src/common/entities/respond.entity';
import { Body, Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CombineDecorator } from 'src/common/decorators/request.decorators';
import { MinioService } from './minio.service';
import { isStringeEmptyOrHasSpace } from 'utils/index.util';
import {
  ReqBaseBucketParams,
  ReqBaseObjectParams,
  ReqGetObjectListV2,
} from './dto/index.dto';

@ApiTags('minio')
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  /**
   * 简单测试
   * @param id
   * @returns
   */
  @CombineDecorator('GET', 'hello')
  async hello(@Query('Id') id: number) {
    return typeof id;
  }

  //#region 桶相关
  /**
   * 获取所有桶
   * @returns
   */
  @CombineDecorator('GET', 'getBucketList', String, true)
  async getBucketList() {
    return this.minioService.getBucketList();
  }

  /**
   * 新增单个桶
   * @param {string} bucketName - 新增的桶名
   * @returns
   */
  @CombineDecorator('GET', 'createBucket')
  async createBucket(@Query('bucketName') bucketName: string) {
    if (isStringeEmptyOrHasSpace(bucketName)) {
      return Respond.Fail('错误的桶命名', bucketName);
    }
    return this.minioService.createBucket(bucketName);
  }

  /**
   * 查询桶是否存在
   * @param bucketName 想要查询的桶名称
   * @returns true、false 是否存在
   */
  @CombineDecorator('GET', 'isBucketExists/:bucketName')
  async isBucketExists(@Param('bucketName') bucketName: string) {
    return this.minioService.isBucketExists(bucketName);
  }

  /**
   * 删除桶
   * @param bucketName 想要删除的桶名称
   * @returns 如果成功返回桶名称、否则返回null
   */
  @CombineDecorator('GET', 'deleteBucket/:bucketName')
  async deleteBucket(@Query('bucketName') bucketName: string) {
    return this.minioService.deleteBucket(bucketName);
  }

  /**
   * 查询桶下的文件项
   * @param request 想要查询的桶名称及其他配置项
   * @returns
   */
  @CombineDecorator('POST', 'getObjectList')
  async getObjectList(@Body() request: ReqGetObjectListV2) {
    return this.minioService.getObjectList(request);
  }

  /**
   * 获取桶下未上传完成的文件
   * @param request 想要查询未完成上传的文件的桶名称及其他配置项
   * @returns
   */
  @CombineDecorator('POST', 'listIncompleteUploads')
  async listIncompleteUploads(@Body() request: ReqBaseBucketParams) {
    return this.minioService.listIncompleteUploads(request);
  }
  //#endregion 桶相关

  //#region 文件(object)相关
  @CombineDecorator('POST', 'getObject')
  async getObject(@Body() request: ReqBaseObjectParams) {
    return this.minioService.getObject(request);
  }
  //#endregion 文件(object)相关
}
