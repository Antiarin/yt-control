# Privacy Policy

_Last updated: April 21, 2026_

YT Control ("the extension") does not collect, store, transmit, sell, or share any personal data.

## What the extension stores

The extension stores exactly one thing: your toggle preferences (which YouTube UI elements you want hidden, and which behaviors you want active). This data lives in `chrome.storage.sync`, which is Google's per-user synced storage. It is:

- Never transmitted to any server operated by the extension or its author.
- Synced by Google across your signed-in Chrome instances so your preferences follow you between devices. The author of YT Control has no access to this sync traffic.
- Deleted when you uninstall the extension if you also sign out of Chrome or clear extension data.

No analytics, no telemetry, no tracking pixels, no remote configuration. The extension makes zero outgoing network requests of its own.

## Permissions and why they are requested

- `storage` — save your toggle preferences so they persist between sessions.
- `sidePanel` — display the extension UI in Chrome's side panel.
- `host_permissions: *://*.youtube.com/*` — inject CSS and run behavior scripts on YouTube pages. No other sites are affected.

## Contact

Questions or concerns about privacy: open an issue at [github.com/Antiarin/yt-control/issues](https://github.com/Antiarin/yt-control/issues).
