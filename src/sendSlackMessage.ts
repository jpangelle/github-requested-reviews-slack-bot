import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

async function sendSlackMessage(message: { heading: string; body?: string[] }) {
  await axios('https://slack.com/api/chat.postMessage', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${process.env.SLACK_API_TOKEN}`,
    },
    data: JSON.stringify({
      channel: process.env.SLACK_APP_CHANNEL_ID,
      unfurl_links: false,
      unfurl_media: false,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: message.heading,
          },
        },
        ...(message.body
          ? [
              {
                type: 'rich_text',
                elements: message.body.map(url => ({
                  type: 'rich_text_list',
                  elements: [
                    {
                      type: 'rich_text_section',
                      elements: [
                        {
                          type: 'link',
                          url,
                        },
                      ],
                    },
                  ],
                  style: 'bullet',
                  indent: 0,
                })),
              },
            ]
          : []),
      ],
    }),
  });
}

export { sendSlackMessage };
