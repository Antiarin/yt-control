(() => {
  type FeatureKey =
    | 'homeFeed'
    | 'homeChips'
    | 'shortsShelf'
    | 'communityPosts'
    | 'masthead'
    | 'relatedVideos'
    | 'comments'
    | 'autoplay'
    | 'endScreen'
    | 'liveChat'
    | 'ambientMode'
    | 'merchShelf'
    | 'chaptersPanel'
    | 'shortsTab'
    | 'subscriptions'
    | 'youTab'
    | 'playables'
    | 'explore'
    | 'notifications'
    | 'createButton'
    | 'searchSuggestions'
    | 'voiceSearch'
    | 'thumbnails';

  type Settings = {
    masterEnabled?: boolean;
  } & Partial<Record<FeatureKey, boolean>>;

  const DEFAULTS: Required<Settings> = {
    masterEnabled: true,
    homeFeed: true,
    homeChips: true,
    shortsShelf: true,
    communityPosts: true,
    masthead: true,
    relatedVideos: true,
    comments: true,
    autoplay: true,
    endScreen: true,
    liveChat: true,
    ambientMode: true,
    merchShelf: true,
    chaptersPanel: true,
    shortsTab: true,
    subscriptions: true,
    youTab: true,
    playables: true,
    explore: true,
    notifications: true,
    createButton: true,
    searchSuggestions: true,
    voiceSearch: true,
    thumbnails: true,
  };

  function migrateLegacyKeys(existing: Record<string, unknown>): Record<string, unknown> {
    const migrated = { ...existing };

    if ('trending' in migrated) {
      if (!('explore' in migrated)) {
        migrated['explore'] = migrated['trending'];
      }
      delete migrated['trending'];
    }

    return migrated;
  }

  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(null, (existing) => {
      const migrated = migrateLegacyKeys(existing);
      chrome.storage.sync.set({ ...DEFAULTS, ...migrated });

      if ('trending' in existing) {
        chrome.storage.sync.remove('trending');
      }
    });
  });

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error: unknown) => {
    console.error('Failed to enable side panel action behavior:', error);
  });
})();
