import { IsBoolean, IsNotEmpty, IsString, NotContains } from 'class-validator';
import { IsStringNoSpace } from 'src/common/decorators/classValidator.decorators';
export class ReqBaseBucketParams {
  /**
   * minio桶名称
   */
  @IsStringNoSpace()
  bucketName: string;
  /**
   * 桶中文件前的文件夹路径
   */
  @IsString()
  prefix?: string = '';
  /**
   * 是否遍历展示所有文件，就没有桶下的文件夹路径(prefix)了
   */
  @IsBoolean()
  recursive?: boolean = false;
}

export class ReqGetObjectListV2 extends ReqBaseBucketParams {
  /**
   * 文件名模糊搜索
   */
  @IsString()
  startAfter?: string = '';
}

export class ReqBaseObjectParams {
  @IsStringNoSpace()
  bucketName: string = '';

  @IsStringNoSpace()
  objectName: string = '';
}
