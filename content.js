// YT Control - Content Script
// Injects CSS to hide YouTube UI elements based on user settings

// Part 1: Feature-to-CSS mapping
const FEATURES = {
  homeFeed: `ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { display: none !important; }`,
  shortsShelf: `ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer { display: none !important; }`,
  trending: `ytd-guide-entry-renderer:has(a[href="/feed/trending"]), ytd-guide-entry-renderer:has(a[href="/feed/explore"]), ytd-mini-guide-entry-renderer:has(a[href="/feed/trending"]), ytd-mini-guide-entry-renderer:has(a[href="/feed/explore"]) { display: none !important; }`,
  shortsTab: `ytd-guide-entry-renderer:has(a[title="Shorts"]), ytd-mini-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }`,
  subscriptions: `ytd-guide-entry-renderer:has(a[href*="feed/subscriptions"]), ytd-guide-section-renderer:has(a[href="/feed/subscriptions"]), ytd-mini-guide-entry-renderer:has(a[href*="feed/subscriptions"]) { display: none !important; }`,
  notifications: `ytd-notification-topbar-button-renderer { display: none !important; }`,
  relatedVideos: `ytd-watch-next-secondary-results-renderer { display: none !important; }`,
  comments: `#comments, ytd-comments { display: none !important; }`,
  autoplay: `.ytp-autonav-toggle-button-container { display: none !important; }`,
  endScreen: `.ytp-ce-element { display: none !important; }`,
  liveChat: `ytd-live-chat-frame { display: none !important; }`,
  searchSuggestions: `.sbdd_b, ytd-searchbox .ytSearchboxComponentSuggestionRenderer { display: none !important; }`,
  thumbnails: `ytd-thumbnail, yt-thumbnail-view-model, ytd-playlist-thumbnail, .rich-thumbnail, #thumbnail, #video-preview, .yt-lockup-view-model-wiz__content-image, #thumbnail-container, .shortsLockupViewModelHostThumbnailContainer { display: none !important; }`,
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
