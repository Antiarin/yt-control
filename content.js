// YT Control - Content Script
// Injects CSS to hide YouTube UI elements based on user settings

// Part 1: Feature-to-CSS mapping
// Each feature can have multiple CSS rules separated as an array joined by newlines
const FEATURES = {
  homeFeed: [
    `ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { display: none !important; }`,
    `ytd-browse[page-subtype="home"] #contents.ytd-rich-grid-renderer { display: none !important; }`,
    `ytd-browse[page-subtype="home"] ytd-rich-item-renderer { display: none !important; }`,
    `ytd-browse[page-subtype="home"] ytd-rich-section-renderer { display: none !important; }`,
  ].join('\n'),
  shortsShelf: [
    `ytd-reel-shelf-renderer { display: none !important; }`,
    `ytd-rich-shelf-renderer[is-shorts] { display: none !important; }`,
    `ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]) { display: none !important; }`,
    `[is-shorts] { display: none !important; }`,
  ].join('\n'),
  trending: [
    `a[href="/feed/trending"] { display: none !important; }`,
    `a[href="/feed/explore"] { display: none !important; }`,
    `ytd-guide-entry-renderer:has(a[href="/feed/trending"]) { display: none !important; }`,
    `ytd-guide-entry-renderer:has(a[href="/feed/explore"]) { display: none !important; }`,
    `ytd-mini-guide-entry-renderer:has(a[href="/feed/trending"]) { display: none !important; }`,
    `ytd-mini-guide-entry-renderer:has(a[href="/feed/explore"]) { display: none !important; }`,
    `ytd-guide-section-renderer:has(a[href="/feed/shopping"]) { display: none !important; }`,
    `ytd-guide-section-renderer:has(a[href="/feed/gaming"]) { display: none !important; }`,
  ].join('\n'),
  shortsTab: [
    `a[title="Shorts"] { display: none !important; }`,
    `ytd-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }`,
    `ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: none !important; }`,
    `ytd-mini-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }`,
  ].join('\n'),
  subscriptions: [
    `ytd-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }`,
    `ytd-mini-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }`,
    `ytd-guide-section-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }`,
    `ytd-guide-section-renderer.style-scope:nth-of-type(2) { display: none !important; }`,
  ].join('\n'),
  notifications: `ytd-notification-topbar-button-renderer { display: none !important; }`,
  relatedVideos: [
    `ytd-watch-next-secondary-results-renderer { display: none !important; }`,
    `#related { display: none !important; }`,
    `#secondary-inner #related { display: none !important; }`,
  ].join('\n'),
  comments: `#comments, ytd-comments { display: none !important; }`,
  autoplay: `.ytp-autonav-toggle-button-container { display: none !important; }`,
  endScreen: [
    `.ytp-ce-element { display: none !important; }`,
    `.ytp-endscreen-content { display: none !important; }`,
  ].join('\n'),
  liveChat: `ytd-live-chat-frame { display: none !important; }`,
  searchSuggestions: [
    `.sbdd_b { display: none !important; }`,
    `.ytSearchboxComponentSuggestionsContainer { display: none !important; }`,
  ].join('\n'),
  thumbnails: [
    `ytd-thumbnail { display: none !important; }`,
    `yt-thumbnail-view-model { display: none !important; }`,
    `ytd-playlist-thumbnail { display: none !important; }`,
    `.yt-lockup-view-model-wiz__content-image { display: none !important; }`,
    `#thumbnail-container { display: none !important; }`,
  ].join('\n'),
  voiceSearch: `#voice-search-button { display: none !important; }`
};

// Part 2: Inject/remove helpers
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

// Part 3: Initialization and listeners

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
