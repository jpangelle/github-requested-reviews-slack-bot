import { Request, Response } from '@google-cloud/functions-framework';
import { getGithubRequestedReviews } from './getGithubRequestedReviews';
import { getMessage } from './getMessage';
import { sendSlackMessage } from './sendSlackMessage';

async function main(request: Request, response: Response) {
  const pullRequestsUrls = await getGithubRequestedReviews();

  const message = getMessage(pullRequestsUrls);

  await sendSlackMessage(message);
  response.send('OK');
}

export { main };
