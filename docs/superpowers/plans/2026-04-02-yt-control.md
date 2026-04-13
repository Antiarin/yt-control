# YT Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Manifest V3 Chrome extension that lets users toggle 14 YouTube UI elements on/off via a glassmorphic popup, using CSS injection.

**Architecture:** Content script injects/removes `<style>` elements on YouTube pages based on toggle states stored in `chrome.storage.sync`. A popup with glassmorphic UI and categorized tabs lets users flip toggles. A minimal service worker sets defaults on install.

**Tech Stack:** Vanilla HTML/CSS/JS, Chrome Extension Manifest V3, `chrome.storage.sync`, CSS injection

---

## File Structure

```
yt-control/
  manifest.json          -- Extension manifest (permissions, content script, popup, service worker)
  service-worker.js      -- Sets default storage values on install
  content.js             -- Injected into YouTube; manages CSS style injection
  popup/
    popup.html           -- Popup markup
    popup.css            -- Glassmorphic styles
    popup.js             -- Toggle logic, tab filtering, storage sync
  icons/
    icon-16.png          -- Toolbar icon
    icon-48.png          -- Extensions page icon
    icon-128.png         -- Chrome Web Store icon
```

---

### Task 1: Manifest + Project Skeleton

**Files:**
- Create: `manifest.json`
- Create: `service-worker.js` (placeholder)
- Create: `content.js` (placeholder)
- Create: `popup/popup.html` (placeholder)

- [ ] **Step 1: Create `manifest.json`**

```json
{
  "manifest_version": 3,
  "name": "YT Control",
  "description": "Take control of YouTube — toggle recommendations, Shorts, comments, and 11 more UI elements on or off.",
  "version": "1.0.0",
  "permissions": ["storage"],
  "host_permissions": ["*://*.youtube.com/*"],
  "background": {
    "service_worker": "service-worker.js"
  },
  "content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

- [ ] **Step 2: Create placeholder files**

`service-worker.js`:
```js
// YT Control - Service Worker
// Initializes default settings on install
```

`content.js`:
```js
// YT Control - Content Script
// Injects CSS to hide YouTube UI elements based on user settings
```

`popup/popup.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YT Control</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div id="app">YT Control</div>
  <script src="popup.js"></script>
</body>
</html>
```

Create empty files: `popup/popup.css`, `popup/popup.js`

- [ ] **Step 3: Create placeholder icons**

Create the `icons/` directory. For now, generate simple colored square PNGs (16x16, 48x48, 128x128) using an inline canvas script or any quick method. These are temporary -- a purple square with "YT" text is fine. They just need to exist so Chrome doesn't error.

- [ ] **Step 4: Verify extension loads in Chrome**

1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the `yt-control/` directory
4. Expected: Extension appears in the list with no errors. Clicking the extension icon shows a popup with "YT Control" text.

- [ ] **Step 5: Commit**

```bash
git add manifest.json service-worker.js content.js popup/ icons/
git commit -m "feat: project skeleton with manifest, placeholders, and temp icons"
```

---

### Task 2: Service Worker -- Default Storage Values

**Files:**
- Modify: `service-worker.js`

- [ ] **Step 1: Implement `service-worker.js`**

```js
const DEFAULTS = {
  masterEnabled: true,
  homeFeed: true,
  shortsShelf: true,
  trending: true,
  shortsTab: true,
  subscriptions: true,
  notifications: true,
  relatedVideos: true,
  comments: true,
  autoplay: true,
  endScreen: true,
  liveChat: true,
  searchSuggestions: true,
  thumbnails: true,
  voiceSearch: true
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(null, (existing) => {
    const merged = { ...DEFAULTS, ...existing };
    chrome.storage.sync.set(merged);
  });
});
```

This merges defaults with any existing values so that updating the extension doesn't reset user preferences.

- [ ] **Step 2: Verify defaults are set**

1. Go to `chrome://extensions/`, find YT Control, click the service worker link to open DevTools
2. In the console, run: `chrome.storage.sync.get(null, console.log)`
3. Expected: All 15 keys present, all `true`

- [ ] **Step 3: Commit**

```bash
git add service-worker.js
git commit -m "feat: service worker sets default toggle values on install"
```

---

### Task 3: Content Script -- CSS Injection Engine

**Files:**
- Modify: `content.js`

- [ ] **Step 1: Define the feature-to-CSS mapping**

Write the full `FEATURES` map at the top of `content.js`. Each key matches a storage key, each value is the CSS rule to inject when that feature is set to `false` (hidden).

```js
const FEATURES = {
  homeFeed: `ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { display: none !important; }`,
  shortsShelf: `ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer { display: none !important; }`,
  trending: `ytd-guide-entry-renderer:has(a[href*="explore"]) { display: none !important; }`,
  shortsTab: `ytd-guide-entry-renderer:has(a[title="Shorts"]), ytd-mini-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }`,
  subscriptions: `ytd-guide-entry-renderer:has(a[href*="feed/subscriptions"]) { display: none !important; }`,
  notifications: `ytd-notification-topbar-button-renderer { display: none !important; }`,
  relatedVideos: `ytd-watch-next-secondary-results-renderer { display: none !important; }`,
  comments: `#comments, ytd-comments { display: none !important; }`,
  autoplay: `.ytp-autonav-toggle-button-container { display: none !important; }`,
  endScreen: `.ytp-ce-element { display: none !important; }`,
  liveChat: `ytd-live-chat-frame { display: none !important; }`,
  searchSuggestions: `.sbdd_b, ytd-searchbox .ytSearchboxComponentSuggestionRenderer { display: none !important; }`,
  thumbnails: `ytd-thumbnail img { visibility: hidden !important; }`,
  voiceSearch: `#voice-search-button { display: none !important; }`
};
```

- [ ] **Step 2: Implement inject/remove helpers and the apply function**

Append below the `FEATURES` map:

```js
function injectCSS(key) {
  if (document.getElementById(`ytc-${key}`)) return;
  const style = document.createElement('style');
  style.id = `ytc-${key}`;
  style.textContent = FEATURES[key];
  document.head.appendChild(style);
}

function removeCSS(key) {
  const el = document.getElementById(`ytc-${key}`);
  if (el) el.remove();
}

function applyAll(settings) {
  const masterEnabled = settings.masterEnabled !== false;
  for (const key of Object.keys(FEATURES)) {
    if (!masterEnabled || settings[key] !== false) {
      removeCSS(key);
    } else {
      injectCSS(key);
    }
  }
}
```

Logic: CSS is injected only when `masterEnabled` is `true` AND the individual toggle is `false`. When master is off, all styles are removed (YouTube returns to normal).

- [ ] **Step 3: Implement initialization and live-update listeners**

Append below the helpers:

```js
// Apply settings on page load
chrome.storage.sync.get(null, applyAll);

// Live-update when settings change (from popup)
chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(null, applyAll);
});

// Re-apply after YouTube SPA navigation
document.addEventListener('yt-navigate-finish', () => {
  chrome.storage.sync.get(null, applyAll);
});
```

- [ ] **Step 4: Verify CSS injection works**

1. Reload the extension at `chrome://extensions/`
2. Go to `youtube.com`
3. Open DevTools console and run:
   ```js
   chrome.storage.sync.set({ comments: false });
   ```
4. Expected: A `<style id="ytc-comments">` element appears in `<head>`, and the comments section disappears from any video page
5. Run: `chrome.storage.sync.set({ comments: true });`
6. Expected: The `<style>` element is removed, comments reappear

- [ ] **Step 5: Commit**

```bash
git add content.js
git commit -m "feat: content script with CSS injection engine and live-update listeners"
```

---

### Task 4: Popup HTML Structure

**Files:**
- Modify: `popup/popup.html`

- [ ] **Step 1: Write the full popup markup**

Replace the placeholder `popup/popup.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=360, initial-scale=1.0">
  <title>YT Control</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="popup-bg">
    <div class="glass-card">

      <!-- Header -->
      <div class="header">
        <div class="header-left">
          <span class="logo">✦ YT Control</span>
          <span class="tagline">YouTube, your way</span>
        </div>
        <div class="header-right">
          <span class="master-label">Master</span>
          <label class="toggle master-toggle">
            <input type="checkbox" id="masterEnabled" checked>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="tab-bar">
        <button class="tab active" data-tab="all">All</button>
        <button class="tab" data-tab="home">Home</button>
        <button class="tab" data-tab="watch">Watch</button>
        <button class="tab" data-tab="nav">Nav</button>
        <button class="tab" data-tab="search">Search</button>
      </div>

      <!-- Toggle List -->
      <div class="toggle-list" id="toggleList">
        <!-- Home -->
        <div class="toggle-row" data-key="homeFeed" data-cat="home">
          <div class="toggle-info"><span class="toggle-icon">🏠</span><span class="toggle-label">Recommendations</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="shortsShelf" data-cat="home">
          <div class="toggle-info"><span class="toggle-icon">🎬</span><span class="toggle-label">Shorts Shelf</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="trending" data-cat="home">
          <div class="toggle-info"><span class="toggle-icon">🔥</span><span class="toggle-label">Trending / Explore</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>

        <!-- Nav -->
        <div class="toggle-row" data-key="shortsTab" data-cat="nav">
          <div class="toggle-info"><span class="toggle-icon">⚡</span><span class="toggle-label">Shorts Tab</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="subscriptions" data-cat="nav">
          <div class="toggle-info"><span class="toggle-icon">📺</span><span class="toggle-label">Subscriptions Tab</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="notifications" data-cat="nav">
          <div class="toggle-info"><span class="toggle-icon">🔔</span><span class="toggle-label">Notifications Bell</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>

        <!-- Watch -->
        <div class="toggle-row" data-key="relatedVideos" data-cat="watch">
          <div class="toggle-info"><span class="toggle-icon">📋</span><span class="toggle-label">Related Videos</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="comments" data-cat="watch">
          <div class="toggle-info"><span class="toggle-icon">💬</span><span class="toggle-label">Comments</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="autoplay" data-cat="watch">
          <div class="toggle-info"><span class="toggle-icon">⏭️</span><span class="toggle-label">Autoplay</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="endScreen" data-cat="watch">
          <div class="toggle-info"><span class="toggle-icon">🎴</span><span class="toggle-label">End Screen Cards</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="liveChat" data-cat="watch">
          <div class="toggle-info"><span class="toggle-icon">📡</span><span class="toggle-label">Live Chat</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>

        <!-- Search -->
        <div class="toggle-row" data-key="searchSuggestions" data-cat="search">
          <div class="toggle-info"><span class="toggle-icon">🔍</span><span class="toggle-label">Search Suggestions</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="thumbnails" data-cat="search">
          <div class="toggle-info"><span class="toggle-icon">🖼️</span><span class="toggle-label">Thumbnails</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row" data-key="voiceSearch" data-cat="search">
          <div class="toggle-info"><span class="toggle-icon">🎙️</span><span class="toggle-label">Voice Search</span></div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer" id="footer">
        <span id="countText">14 of 14 shown</span>
      </div>

    </div>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify markup renders**

1. Reload extension at `chrome://extensions/`
2. Click the extension icon
3. Expected: Raw unstyled HTML with all 14 toggles listed, master switch at top, tab buttons visible

- [ ] **Step 3: Commit**

```bash
git add popup/popup.html
git commit -m "feat: popup HTML structure with all 14 toggles, tabs, and master switch"
```

---

### Task 5: Popup CSS -- Glassmorphic Styling

**Files:**
- Modify: `popup/popup.css`

- [ ] **Step 1: Write the full glassmorphic stylesheet**

```css
/* === Reset === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 360px;
  height: 500px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}

/* === Background === */
.popup-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 16px;
  display: flex;
  align-items: stretch;
}

/* === Glass Card === */
.glass-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* === Header === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.tagline {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.master-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* === Tab Bar === */
.tab-bar {
  display: flex;
  gap: 2px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  background: none;
  border: none;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.7);
}

.tab.active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
}

/* === Toggle List === */
.toggle-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4px;
}

.toggle-list::-webkit-scrollbar {
  width: 4px;
}

.toggle-list::-webkit-scrollbar-track {
  background: transparent;
}

.toggle-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

/* === Toggle Row === */
.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: opacity 0.2s ease, transform 0.15s ease;
}

.toggle-row.hidden {
  display: none;
}

.toggle-row.disabled {
  opacity: 0.35;
  pointer-events: none;
}

.toggle-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-icon {
  font-size: 14px;
  width: 20px;
  text-align: center;
}

.toggle-label {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

/* === Toggle Switch === */
.toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
  flex-shrink: 0;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  transition: background 0.25s ease;
}

.slider::before {
  content: '';
  position: absolute;
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  transition: transform 0.25s ease, background 0.25s ease;
}

.toggle input:checked + .slider {
  background: rgba(255, 255, 255, 0.35);
}

.toggle input:checked + .slider::before {
  transform: translateX(18px);
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* === Master Toggle (larger) === */
.master-toggle {
  width: 40px;
  height: 20px;
}

.master-toggle .slider {
  border-radius: 10px;
}

.master-toggle .slider::before {
  height: 16px;
  width: 16px;
}

.master-toggle input:checked + .slider::before {
  transform: translateX(20px);
}

/* === Footer === */
.footer {
  text-align: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

#countText {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
}
```

- [ ] **Step 2: Verify styled popup**

1. Reload extension at `chrome://extensions/`
2. Click extension icon
3. Expected: Glassmorphic popup appears with purple-indigo gradient background, frosted glass card, styled tabs, smooth toggle switches, and scrollable list of all 14 features

- [ ] **Step 3: Commit**

```bash
git add popup/popup.css
git commit -m "feat: glassmorphic popup styling with tabs, toggles, and scrollable list"
```

---

### Task 6: Popup JS -- Toggle Logic, Tabs, and Storage Sync

**Files:**
- Modify: `popup/popup.js`

- [ ] **Step 1: Write the complete popup logic**

```js
const FEATURE_KEYS = [
  'homeFeed', 'shortsShelf', 'trending',
  'shortsTab', 'subscriptions', 'notifications',
  'relatedVideos', 'comments', 'autoplay', 'endScreen', 'liveChat',
  'searchSuggestions', 'thumbnails', 'voiceSearch'
];

let activeTab = 'all';

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(null, (settings) => {
    // Set master toggle
    document.getElementById('masterEnabled').checked = settings.masterEnabled !== false;

    // Set individual toggles
    for (const key of FEATURE_KEYS) {
      const row = document.querySelector(`.toggle-row[data-key="${key}"]`);
      if (!row) continue;
      const checkbox = row.querySelector('input[type="checkbox"]');
      checkbox.checked = settings[key] !== false;
    }

    updateMasterState(settings.masterEnabled !== false);
    updateCount();
  });

  // --- Master toggle ---
  document.getElementById('masterEnabled').addEventListener('change', (e) => {
    chrome.storage.sync.set({ masterEnabled: e.target.checked });
    updateMasterState(e.target.checked);
  });

  // --- Individual toggles ---
  for (const key of FEATURE_KEYS) {
    const row = document.querySelector(`.toggle-row[data-key="${key}"]`);
    if (!row) continue;
    const checkbox = row.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [key]: e.target.checked });
    });
  }

  // --- Tabs ---
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active').classList.remove('active');
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      filterByTab();
    });
  });
});

// --- Helpers ---

function updateMasterState(enabled) {
  const rows = document.querySelectorAll('.toggle-row');
  rows.forEach((row) => {
    if (enabled) {
      row.classList.remove('disabled');
    } else {
      row.classList.add('disabled');
    }
  });
}

function filterByTab() {
  const rows = document.querySelectorAll('.toggle-row');
  let visibleCount = 0;

  rows.forEach((row) => {
    if (activeTab === 'all' || row.dataset.cat === activeTab) {
      row.classList.remove('hidden');
      visibleCount++;
    } else {
      row.classList.add('hidden');
    }
  });

  document.getElementById('countText').textContent =
    `${visibleCount} of ${FEATURE_KEYS.length} shown`;
}

function updateCount() {
  const visible = document.querySelectorAll('.toggle-row:not(.hidden)').length;
  document.getElementById('countText').textContent =
    `${visible} of ${FEATURE_KEYS.length} shown`;
}
```

- [ ] **Step 2: Verify popup reads storage**

1. Reload extension at `chrome://extensions/`
2. Open a YouTube tab. Open DevTools console and run:
   ```js
   chrome.storage.sync.set({ comments: false, shortsShelf: false });
   ```
3. Click the extension icon
4. Expected: The "Comments" and "Shorts Shelf" toggles are OFF (slider to the left). All others are ON.

- [ ] **Step 3: Verify popup writes to storage**

1. Click the extension icon
2. Toggle "Recommendations" OFF
3. Expected: On YouTube, the homepage recommendation grid disappears immediately (content script reacts to storage change)
4. Toggle it back ON
5. Expected: Recommendations reappear

- [ ] **Step 4: Verify tab filtering**

1. Click "Watch" tab
2. Expected: Only 5 toggles shown (Related Videos, Comments, Autoplay, End Screen Cards, Live Chat). Footer reads "5 of 14 shown"
3. Click "All" tab
4. Expected: All 14 toggles shown. Footer reads "14 of 14 shown"

- [ ] **Step 5: Verify master switch**

1. Turn master switch OFF
2. Expected: All individual toggle rows become dimmed (0.35 opacity, non-interactive). On YouTube, all elements reappear (all injected styles removed).
3. Turn master switch ON
4. Expected: Rows become interactive again. Previously-hidden elements re-hide.

- [ ] **Step 6: Commit**

```bash
git add popup/popup.js
git commit -m "feat: popup logic with storage sync, tab filtering, and master switch"
```

---

### Task 7: Extension Icons

**Files:**
- Modify: `icons/icon-16.png`
- Modify: `icons/icon-48.png`
- Modify: `icons/icon-128.png`

- [ ] **Step 1: Generate proper extension icons**

Create purple gradient icons with a play-button / control symbol. Use a canvas-based Node script or any image tool. The icon should:
- Have a purple-to-indigo gradient background (matching the popup)
- Show a simple white play-triangle or control/sliders symbol
- Be clean and recognizable at 16px

Generate at 128px, then resize to 48px and 16px.

- [ ] **Step 2: Verify icons display**

1. Reload extension at `chrome://extensions/`
2. Expected: New icon visible in the extensions page and toolbar

- [ ] **Step 3: Commit**

```bash
git add icons/
git commit -m "feat: extension icons with purple gradient design"
```

---

### Task 8: Integration Testing -- Full End-to-End Verification

**Files:** None (testing only)

- [ ] **Step 1: Fresh install test**

1. Remove the extension from `chrome://extensions/`
2. Re-load it as unpacked
3. Expected: All defaults set to `true`. Popup shows all toggles ON. YouTube looks completely normal.

- [ ] **Step 2: Toggle each feature**

Go to YouTube and toggle each of the 14 features OFF one at a time. Verify the target element disappears:

| Feature | Where to check | What disappears |
|---------|---------------|-----------------|
| Recommendations | youtube.com homepage | Video grid |
| Shorts Shelf | youtube.com homepage (scroll down) | Shorts carousel |
| Trending / Explore | Left sidebar | Explore link |
| Shorts Tab | Left sidebar | Shorts link |
| Subscriptions Tab | Left sidebar | Subscriptions link |
| Notifications Bell | Top right of any page | Bell icon |
| Related Videos | Any video watch page | Right sidebar videos |
| Comments | Any video watch page | Comments section below video |
| Autoplay | Any video watch page | Autoplay toggle near title |
| End Screen Cards | Watch a video to near the end | Overlay cards |
| Live Chat | A livestream page | Chat panel |
| Search Suggestions | Click the search bar, start typing | Autocomplete dropdown |
| Thumbnails | Any page with video listings | Thumbnail images (titles remain) |
| Voice Search | Search bar area | Microphone icon |

- [ ] **Step 3: SPA navigation test**

1. Set "Comments" to OFF
2. Watch a video (comments hidden)
3. Click a related video (or navigate via search) -- this is a YouTube SPA navigation
4. Expected: Comments are still hidden on the new video page (content script re-applies on `yt-navigate-finish`)

- [ ] **Step 4: Master switch test**

1. Set several features to OFF (some elements hidden)
2. Toggle master switch OFF
3. Expected: All hidden elements reappear. Toggle rows are dimmed.
4. Toggle master switch ON
5. Expected: Previously hidden elements hide again.

- [ ] **Step 5: Persistence test**

1. Set a few toggles to OFF
2. Close and reopen the browser
3. Click the extension icon
4. Expected: Toggle states are preserved. YouTube elements are hidden as configured.

- [ ] **Step 6: Final commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: adjustments from integration testing"
```
