import got from 'got';

export async function send(webhookURL: string, message: string, fileURL = '') {
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

  return res.success;
}
