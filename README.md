# YT Control

A Chrome extension that lets you toggle 14 YouTube UI elements on or off -- recommendations, Shorts, comments, related videos, thumbnails, and more.

Opens in the Chrome side panel. Built with TypeScript, compiled to a loadable Manifest V3 extension.

[![CI](https://github.com/Antiarin/yt-control/actions/workflows/ci.yml/badge.svg)](https://github.com/Antiarin/yt-control/actions/workflows/ci.yml)

## Install

Download the latest release from [**Releases**](https://github.com/Antiarin/yt-control/releases/tag/v1.0.0), then:

1. Unzip the downloaded file.
2. Open `chrome://extensions` and enable Developer Mode.
3. Click **Load unpacked** and select the unzipped folder.
4. Click the extension icon in the toolbar to open the side panel.

## Features

- **14 toggles** across Home, Watch, Nav, and Search categories
- **Master switch** to enable/disable all hiding at once
- **Side panel UI** with categorized tabs and glassmorphic dark theme
- **CSS-only injection** for instant, flicker-free toggling
- **Synced settings** across devices via `chrome.storage.sync`
- **SPA-aware** -- re-applies on YouTube client-side navigation

## Development

```sh
npm install
npm run build
```

Load the `dist/` directory as an unpacked extension in Chrome.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript and copy static assets to `dist/` |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | Run ESLint on `src/` |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting without writing |

A pre-commit hook runs ESLint and Prettier on staged files via [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged).

## Project Structure

```
src/
  content.ts          Content script -- CSS injection engine
  service-worker.ts   Sets defaults on install, enables side panel
  popup/popup.ts      Side panel toggle logic and tab filtering
  chrome.d.ts         Minimal Chrome API type declarations
popup/
  popup.html          Side panel markup
  popup.css           Glassmorphic dark theme styles
manifest.json         Extension manifest (copied to dist)
icons/                Extension icons (copied to dist)
```

## License

[MIT](LICENSE)
