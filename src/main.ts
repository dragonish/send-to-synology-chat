import * as core from '@actions/core';
import got from 'got';

async function main() {
  const webhookURL = core.getInput('webhook-url', { required: true });
  const message = core.getInput('message');
  const fileURL = core.getInput('file-url');

  if (!webhookURL) {
    core.error('The webhook URL is empty!');
    core.setFailed('The webhook URL is empty!');
    return;
  }

  core.info('Sending notification.');
  const res = await got
    .post(webhookURL, {
      retry: {
        limit: 1,
      },
      timeout: {
        request: 30000,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `payload={"text": "${message}", "file_url": "${fileURL}"}`,
    })
    .json<{ success: boolean }>();

  if (res.success) {
    core.info('Message sent successfully.');
    core.setOutput('success', 'true');
  } else {
    core.warning('Failed to send message!');
    core.setOutput('success', 'false');
  }
}

main();
