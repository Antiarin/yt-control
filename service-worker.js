// YT Control - Service Worker
// Initializes default settings on install

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
