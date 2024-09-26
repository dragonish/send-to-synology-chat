import 'dotenv/config';
import 'mocha';
import { expect } from 'chai';
import { send } from '../src/sendNotify';

let webhookURL = '';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('sendNotify', function () {
  before(function () {
    webhookURL = process.env.WEBHOOK_URL || '';
    if (!webhookURL) {
      console.error('The webhook URL is empty! Please write the value of the WEBHOOK_URL variable in the .env file.');
      process.exit(1);
    }
  });

  it('send text message', async function () {
    expect(await send(webhookURL, 'First line of message to post in the channel.\nAlso you can have a second line of message.')).to.be.true;
  });

  it('send a message with empty content', async function () {
    this.timeout(6000);
    await delay(3000);
    expect(await send(webhookURL, '')).to.be.false;
  });

  it('upload file', async function () {
    this.timeout(15000);
    await delay(3000);
    expect(await send(webhookURL, '', 'https://github.githubassets.com/favicons/favicon.png')).to.be.true;
  });

  it('send text message and upload file', async function () {
    this.timeout(15000);
    await delay(3000);
    expect(
      await send(
        webhookURL,
        'First line of message to post in the channel.\nAlso you can have a second line of message.',
        'https://github.githubassets.com/favicons/favicon.png'
      )
    ).to.be.true;
  });
});
