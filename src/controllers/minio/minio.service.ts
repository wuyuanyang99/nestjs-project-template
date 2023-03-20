import * as Minio from 'minio';
import { Injectable, Post } from '@nestjs/common';
import { CustomConfigService } from 'src/modules/config/config.service';
import { Respond } from 'src/common/entities/respond.entity';
import { LoggerService } from 'src/modules/logger/logger.service';
import {
  ReqBaseBucketParams,
  ReqBaseObjectParams,
  ReqGetObjectListV2,
} from './dto/index.dto';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  constructor(
    private readonly _config: CustomConfigService,
    private readonly logger: LoggerService,
  ) {
    this.minioClient = new Minio.Client(this._config.MinioClientOptions);
  }

  async getBucketList() {
    return this.minioClient
      .listBuckets()
      .then((res) => res.map((bucket) => bucket.name));
  }

  async createBucket(bucketName: string) {
    return this.minioClient
      .makeBucket(bucketName, 'cn-south-1')
      .then(() => bucketName)
      .catch(() => null);
  }

  async isBucketExists(bucketName: string) {
    return this.minioClient.bucketExists(bucketName).catch(() => false);
  }

  async deleteBucket(bucketName: string) {
    return this.minioClient
      .removeBucket(bucketName)
      .then(() => bucketName)
      .catch(() => null);
  }

  async getObjectList(request: ReqGetObjectListV2) {
    const isBucketExists = await this.isBucketExists(request.bucketName);
    if (!isBucketExists) {
      return Respond.NotFind(request.bucketName);
    }
    const data = [];
    const stream = this.minioClient.listObjectsV2(
      request.bucketName,
      request.prefix,
      request.recursive,
      request.startAfter,
    );
    for await (const obj of stream) {
      const { name, size, lastModified, prefix } = obj as Minio.BucketItem;
      data.push({ name, size, lastModified, prefix });
    }
    return data;
  }

  async listIncompleteUploads(request: ReqBaseBucketParams) {
    const isBucketExists = await this.isBucketExists(request.bucketName);
    if (!isBucketExists) {
      return Respond.NotFind(request.bucketName);
    }
    const data = [];
    const stream = await this.minioClient.listIncompleteUploads(
      request.bucketName,
      request.prefix,
      request.recursive,
    );
    // typeof obj is IncompleteUploadedBucketItem;
    for await (const obj of stream) {
      data.push(obj);
    }
    return data;
  }

  async getObject(request: ReqBaseObjectParams) {
    const isBucketExists = await this.isBucketExists(request.bucketName);
    if (!isBucketExists) {
      return Respond.NotFind(request.bucketName);
    }
    return await this.minioClient
      .fGetObject(request.bucketName, request.objectName, 'files/minio')
      .then(() => true)
      .catch(() => false);
  }
}
