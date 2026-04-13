# YT Control

YT Control is a Chrome extension that lets you hide selected YouTube interface elements such as recommendations, Shorts, comments, related videos, thumbnails, and search suggestions.

The extension opens in the Chrome side panel. The source code is authored in TypeScript and compiled into a loadable extension under `dist/`.

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
4. Select the `dist/` directory inside this project.

Click the extension icon in the toolbar to open the side panel.

## Project Structure

- `src/` contains the TypeScript source files.
- `manifest.json`, `popup/popup.html`, `popup/popup.css`, and `icons/` are the source assets copied into the build output.
- `dist/` contains the compiled extension that Chrome should load.
