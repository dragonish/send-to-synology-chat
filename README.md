# send-to-synology-chat

> A GitHub Action.

## Feature

Send a message to Synology Chat.

## Example workflow

```yaml
name: Send Message
on: [push]

jobs:
  send-message:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Send notification
        uses: dragonish/send-to-synology-chat@v1
        with:
          webhook-url: ${{ secrets.WEBHOOK_URL }}
          message: "${{ github.repository }}\n\n#${{ job.status }}"
```

## Inputs

- `webhook-url`: Your Synology Chat incoming webhook URL.
- `message`: A message text. Optional.
- `file-url`: To upload file. Optional.

## Outputs

- `success`: Informs whether sending was successful. Values: `"true"` or `"false"`.

## License

[MIT](./LICENSE) license
