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

  const FEATURE_KEYS: readonly FeatureKey[] = [
    'homeFeed',
    'shortsShelf',
    'trending',
    'shortsTab',
    'subscriptions',
    'notifications',
    'relatedVideos',
    'comments',
    'autoplay',
    'endScreen',
    'liveChat',
    'searchSuggestions',
    'thumbnails',
    'voiceSearch',
  ];

  const FEATURES: Record<FeatureKey, string> = {
    homeFeed: [
      'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] #contents.ytd-rich-grid-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] ytd-rich-item-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] ytd-rich-section-renderer { display: none !important; }',
    ].join('\n'),
    shortsShelf: [
      'ytd-reel-shelf-renderer { display: none !important; }',
      'ytd-rich-shelf-renderer[is-shorts] { display: none !important; }',
      'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]) { display: none !important; }',
      'ytd-rich-section-renderer[is-shorts] { display: none !important; }',
    ].join('\n'),
    trending: [
      'ytd-guide-section-renderer:has(a[title="Shopping"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Music"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Gaming"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="shopping"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="gaming"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="movies"]) { display: none !important; }',
      '#guide-section-title:has(span:empty) ~ #items { display: none !important; }',
    ].join('\n'),
    shortsTab: [
      'a[title="Shorts"] { display: none !important; }',
      'ytd-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: none !important; }',
      'ytd-mini-guide-entry-renderer:has(a[title="Shorts"]) { display: none !important; }',
    ].join('\n'),
    subscriptions: [
      'ytd-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; }',
    ].join('\n'),
    notifications: 'ytd-notification-topbar-button-renderer { display: none !important; }',
    relatedVideos: [
      'ytd-watch-next-secondary-results-renderer { display: none !important; }',
      '#related { display: none !important; }',
      '#secondary-inner #related { display: none !important; }',
    ].join('\n'),
    comments: '#comments, ytd-comments { display: none !important; }',
    autoplay: '.ytp-autonav-toggle-button-container { display: none !important; }',
    endScreen: [
      '.ytp-ce-element { display: none !important; }',
      '.ytp-endscreen-content { display: none !important; }',
    ].join('\n'),
    liveChat: 'ytd-live-chat-frame { display: none !important; }',
    searchSuggestions: [
      '.sbdd_b { display: none !important; }',
      '.ytSearchboxComponentSuggestionsContainer { display: none !important; }',
    ].join('\n'),
    thumbnails: [
      'ytd-thumbnail { display: none !important; }',
      'yt-thumbnail-view-model { display: none !important; }',
      'ytd-playlist-thumbnail { display: none !important; }',
      '.yt-lockup-view-model-wiz__content-image { display: none !important; }',
      '#thumbnail-container { display: none !important; }',
    ].join('\n'),
    voiceSearch: '#voice-search-button { display: none !important; }',
  };

  function injectCSS(key: FeatureKey): void {
    if (document.getElementById(`ytc-${key}`)) {
      return;
    }

    const style = document.createElement('style');
    style.id = `ytc-${key}`;
    style.textContent = FEATURES[key];
    document.head.appendChild(style);
  }

  function removeCSS(key: FeatureKey): void {
    document.getElementById(`ytc-${key}`)?.remove();
  }

  function applyAll(rawSettings: Record<string, unknown>): void {
    const settings = rawSettings as Settings;
    const masterEnabled = settings.masterEnabled !== false;

    for (const key of FEATURE_KEYS) {
      if (!masterEnabled || settings[key] !== false) {
        removeCSS(key);
      } else {
        injectCSS(key);
      }
    }
  }

  chrome.storage.sync.get(null, applyAll);

  chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get(null, applyAll);
  });

  document.addEventListener('yt-navigate-finish', () => {
    chrome.storage.sync.get(null, applyAll);
  });
})();
