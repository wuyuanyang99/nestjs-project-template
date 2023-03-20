import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { CustomConfigService } from './config.service';
import configurations from 'src/common/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      //isGlobal: true,
      load: [configurations],
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
