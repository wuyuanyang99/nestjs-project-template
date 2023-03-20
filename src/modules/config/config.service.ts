import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Minio from 'minio';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  get ServerHost(): string {
    return this.configService.get('SERVER_HOST') || 'localhost';
  }

  get CommonPwd(): string {
    return this.configService.get('CommonPwd') || '';
  }

  get MinioClientOptions(): Minio.ClientOptions {
    return {
      endPoint: this.ServerHost,
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: this.CommonPwd,
    };
  }

  get GithubToken(): string {
    return this.configService.get('GITHUB_TOKEN') || '';
  }

  get ProjectConsoleInfo(): string {
    return (
      this.configService.get('project') ||
      '-------------------服务已启动----------------------'
    );
  }
}
