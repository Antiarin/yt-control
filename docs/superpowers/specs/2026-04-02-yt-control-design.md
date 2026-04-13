# YT Control -- Chrome Extension Design Spec

## Overview

A Chrome extension (Manifest V3) that gives users fine-grained control over YouTube's UI. Users toggle 14 YouTube elements on/off via a glassmorphic popup, with a master switch to disable the entire extension. Hiding is done purely through CSS injection -- no DOM manipulation.

## Goals

- Toggle visibility of 14 YouTube UI elements independently
- Master on/off switch to enable/disable the entire extension
- Beautiful glassmorphic popup with categorized tab navigation
- Lightweight, performant, zero-dependency implementation
- Settings sync across devices via `chrome.storage.sync`

## Architecture

### Files

| File | Role |
|------|------|
| `manifest.json` | Extension config, permissions, content script registration |
| `service-worker.js` | Sets default toggle values on install via `chrome.runtime.onInstalled` |
| `popup.html` | Popup markup |
| `popup.css` | Glassmorphic popup styles |
| `popup.js` | Popup logic -- reads/writes toggle states to `chrome.storage.sync` |
| `content.js` | Injected into YouTube pages -- applies CSS rules based on storage state |
| `icons/` | Extension icons (16, 48, 128px) |

### Approach: CSS-Only Injection

The content script injects `<style>` elements with `display: none !important` rules for each disabled feature. This is:
- Simple to implement and maintain
- Instant show/hide with no page flicker
- Very lightweight, near-zero performance impact

### Data Flow

1. User clicks extension icon -- popup opens
2. Popup reads toggle states from `chrome.storage.sync`
3. User flips a toggle -- popup writes updated state to `chrome.storage.sync`
4. Content script listens via `chrome.storage.onChanged` -- instantly injects or removes the corresponding CSS `<style>` element
5. On page load, content script reads all settings and applies CSS for any hidden features

### Permissions

- `storage` -- persist toggle states
- Host permission: `*://*.youtube.com/*` -- content script injection target

No `activeTab` needed -- the content script is statically declared and communicates via `chrome.storage`, not message passing.

## Toggleable Features (14 total)

### Homepage (3)

| # | Feature | CSS Target | Default |
|---|---------|------------|---------|
| 1 | Recommendation Feed | `ytd-browse[page-subtype="home"] ytd-rich-grid-renderer` | Visible |
| 2 | Shorts Shelf | `ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer` | Visible |
| 3 | Trending / Explore | `ytd-guide-entry-renderer a[href*="explore"]` (and parent) | Visible |

### Sidebar & Navigation (3)

| # | Feature | CSS Target | Default |
|---|---------|------------|---------|
| 4 | Shorts Tab | `ytd-guide-entry-renderer a[title="Shorts"]` (and parent) | Visible |
| 5 | Subscriptions Tab | `ytd-guide-entry-renderer a[href*="feed/subscriptions"]` (and parent) | Visible |
| 6 | Notifications Bell | `ytd-notification-topbar-button-renderer` | Visible |

### Video Watch Page (5)

| # | Feature | CSS Target | Default |
|---|---------|------------|---------|
| 7 | Related / Suggested Videos | `#related, #secondary` (on watch page) | Visible |
| 8 | Comments | `#comments, ytd-comments` | Visible |
| 9 | Autoplay Toggle | `.ytp-autonav-toggle-button-container` | Visible |
| 10 | End Screen Cards | `.ytp-ce-element` | Visible |
| 11 | Live Chat | `ytd-live-chat-frame` | Visible |

### Search & Extras (3)

| # | Feature | CSS Target | Default |
|---|---------|------------|---------|
| 12 | Search Suggestions | `.sbdd_b, ytd-search-suggestions` | Visible |
| 13 | Video Thumbnails | `ytd-thumbnail img` (hides thumbnail images; title text in adjacent DOM elements remains visible) | Visible |
| 14 | Voice Search Button | `#voice-search-button` | Visible |

Note: CSS selectors will be verified against live YouTube DOM during implementation and updated as needed. YouTube updates its DOM periodically.

## Popup UI Design

### Visual Style: Glassmorphic + Categorized Tabs

- Purple-indigo gradient background (`linear-gradient(135deg, #667eea, #764ba2)`)
- Frosted glass card (`background: rgba(255,255,255,0.1); backdrop-filter: blur(16px)`)
- Rounded corners, subtle borders, soft shadows
- Popup dimensions: ~360px wide x ~500px tall

### Layout (top to bottom)

1. **Header**: "YT Control" title + tagline ("YouTube, your way") on the left. Master on/off toggle on the right.
2. **Tab bar**: Segmented pill-style tabs -- All / Home / Watch / Nav / Search. "All" shows every toggle. Other tabs filter to their category.
3. **Toggle list**: Scrollable list of toggles. Each row has: emoji icon, feature label, toggle switch. Rows have subtle glass background with rounded corners.
4. **Footer**: Subtle count text ("4 of 14 shown" when filtered)

### Interactions

- Toggle switches animate smoothly between on/off states
- Tab switching filters the list (no page change, just filtering)
- Master switch dims all individual toggles when off
- All state changes persist immediately to `chrome.storage.sync`

## Storage Schema

```json
{
  "masterEnabled": true,
  "homeFeed": true,
  "shortsShelf": true,
  "trending": true,
  "shortsTab": true,
  "subscriptions": true,
  "notifications": true,
  "relatedVideos": true,
  "comments": true,
  "autoplay": true,
  "endScreen": true,
  "liveChat": true,
  "searchSuggestions": true,
  "thumbnails": true,
  "voiceSearch": true
}
```

All values default to `true` (visible). Setting to `false` hides the element. `masterEnabled: false` disables all hiding regardless of individual toggle states.

## Content Script Behavior

- On YouTube page load: read all settings, inject CSS for hidden features
- Each feature gets its own `<style id="ytc-{featureKey}">` element for clean add/remove
- Listen to `chrome.storage.onChanged` for live updates without page reload
- Handle YouTube SPA navigation by re-checking on `yt-navigate-finish` event
- When `masterEnabled` is false: remove all injected styles

## Out of Scope (V1)

- Keyboard shortcuts
- Preset profiles (Focus Mode, Chill Mode, etc.)
- Schedule-based auto-toggling
- Firefox / Safari support
- Dark/light theme toggle in popup (always dark/glassmorphic)
