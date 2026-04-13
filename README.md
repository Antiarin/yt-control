# YT Control

YT Control is a Chrome extension that lets you hide selected YouTube interface elements such as recommendations, Shorts, comments, related videos, thumbnails, and search suggestions.

The extension now opens in the Chrome side panel instead of a toolbar popup. The source code is authored in TypeScript and compiled to the runtime JavaScript files that Chrome loads.

## Development

Install dependencies:

```sh
npm install
```

Build the extension:

```sh
npm run build
```

Type-check without emitting files:

```sh
npm run typecheck
```

## Load In Chrome

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this `yt-control` directory.

Click the extension icon in the toolbar to open the side panel.

## Project Structure

- `src/` contains the TypeScript source files.
- `content.js`, `service-worker.js`, and `popup/popup.js` are the compiled extension scripts loaded by Chrome.
- `manifest.json` configures the Chrome extension and side panel entrypoint.
