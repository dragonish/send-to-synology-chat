'use strict';

var core = require('@actions/core');
var got = require('got');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);

async function main() {
    const webhookURL = core__namespace.getInput('webhook-url', { required: true });
    const message = core__namespace.getInput('message');
    const fileURL = core__namespace.getInput('file-url');
    if (!webhookURL) {
        core__namespace.error('The webhook URL is empty!');
        core__namespace.setFailed('The webhook URL is empty!');
        return;
    }
    core__namespace.info('Sending notification.');
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
        .json();
    if (res.success) {
        core__namespace.info('Message sent successfully.');
        core__namespace.setOutput('success', 'true');
    }
    else {
        core__namespace.warning('Failed to send message!');
        core__namespace.setOutput('success', 'false');
    }
}
main();
