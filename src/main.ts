import * as core from '@actions/core';
import { send } from './sendNotify';

async function main() {
  const webhookURL = core.getInput('webhook-url', { required: true });
  const message = core.getInput('message');
  const fileURL = core.getInput('file-url');

  if (!webhookURL) {
    core.error('The webhook-url is empty!');
    core.setFailed('The webhook URL is empty!');
    return;
  }

  if (!message && !fileURL) {
    core.warning('message and file-url are both empty!');
    core.setOutput('success', 'false');
    return;
  }

  core.info('Sending notification.');
  const state = await send(webhookURL, message, fileURL);

  if (state) {
    core.info('Message sent successfully.');
    core.setOutput('success', 'true');
  } else {
    core.warning('Failed to send message!');
    core.setOutput('success', 'false');
  }
}

main();
