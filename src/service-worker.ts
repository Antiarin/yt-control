(() => {
type FeatureKey =
  | 'homeFeed'
  | 'shortsShelf'
  | 'trending'
  | 'shortsTab'
  | 'subscriptions'
  | 'notifications'
  | 'relatedVideos'
  | 'comments'
  | 'autoplay'
  | 'endScreen'
  | 'liveChat'
  | 'searchSuggestions'
  | 'thumbnails'
  | 'voiceSearch';

type Settings = {
  masterEnabled?: boolean;
} & Partial<Record<FeatureKey, boolean>>;

const DEFAULTS: Required<Settings> = {
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
    chrome.storage.sync.set({ ...DEFAULTS, ...existing });
  });
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error: unknown) => {
    console.error('Failed to enable side panel action behavior:', error);
  });
})();
