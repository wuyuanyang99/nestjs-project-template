import { Injectable } from '@nestjs/common';
import { Respond } from 'src/common/entities/respond.entity';
import { CustomConfigService } from 'src/modules/config/config.service';
import githubApi from 'utils/github.api.util';

@Injectable()
export class GithubService {
  constructor(private readonly _config: CustomConfigService) {}
  async Hello() {
    const result = await githubApi.getRepoUpdateTime(
      'owner',
      'nestjs-doc',
    );
    return Respond.Success(result);
  }
}
