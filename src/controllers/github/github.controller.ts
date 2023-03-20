import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CombineDecorator } from 'src/common/decorators/request.decorators';
import { GithubService } from './github.service';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  /**
   * 测试用接口
   */
  @CombineDecorator('GET', 'Hello', String)
  async Hello() {
    return await this.githubService.Hello();
  }
}
