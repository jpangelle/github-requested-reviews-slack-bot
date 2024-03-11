import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

async function getGithubRequestedReviews() {
  const { data } = await axios(
    `https://api.github.com/search/issues?q=is:pr+is:open+review-requested:${process.env.GITHUB_USERNAME}+org:${process.env.GITHUB_ORGANIZATION}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
    },
  );

  return data.items.map((item: { html_url: string }) => item.html_url);
}

export { getGithubRequestedReviews };
