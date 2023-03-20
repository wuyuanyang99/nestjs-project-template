import { Octokit } from 'octokit';
import { Respond } from 'src/common/entities/respond.entity';
import { CustomConfigService } from 'src/modules/config/config.service';

const octokit = new Octokit({
  // auth: _config.getGithubToken,
});

async function getRepoUpdateTime(owner: string, repo: string): Promise<string> {
  return await octokit
    .request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    })
    .then((res) => res.data?.updated_at)
    .catch((err) => err?.message);
}

export default {
  getRepoUpdateTime,
};
