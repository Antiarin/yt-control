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

  const FEATURE_KEYS: readonly FeatureKey[] = [
    'homeFeed',
    'homeChips',
    'shortsShelf',
    'communityPosts',
    'masthead',
    'relatedVideos',
    'comments',
    'autoplay',
    'endScreen',
    'liveChat',
    'ambientMode',
    'merchShelf',
    'chaptersPanel',
    'shortsTab',
    'subscriptions',
    'youTab',
    'playables',
    'explore',
    'notifications',
    'createButton',
    'searchSuggestions',
    'voiceSearch',
    'thumbnails',
  ];

  const FEATURES: Record<FeatureKey, string> = {
    homeFeed: [
      'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] #contents.ytd-rich-grid-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] ytd-rich-item-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] ytd-rich-section-renderer { display: none !important; }',
    ].join('\n'),
    homeChips: [
      'ytd-feed-filter-chip-bar-renderer { display: none !important; }',
      '#chips-wrapper.ytd-feed-filter-chip-bar-renderer { display: none !important; }',
      'ytd-browse[page-subtype="home"] #header.ytd-rich-grid-renderer { display: none !important; }',
    ].join('\n'),
    shortsShelf: [
      'ytd-reel-shelf-renderer { display: none !important; }',
      'ytd-rich-shelf-renderer[is-shorts] { display: none !important; }',
      'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]) { display: none !important; }',
      'ytd-rich-section-renderer[is-shorts] { display: none !important; }',
    ].join('\n'),
    communityPosts: [
      'ytd-post-renderer { display: none !important; }',
      'ytd-rich-item-renderer:has(ytd-post-renderer) { display: none !important; }',
      'ytd-backstage-post-thread-renderer { display: none !important; }',
    ].join('\n'),
    masthead: [
      '#masthead-ad { display: none !important; }',
      'ytd-statement-banner-renderer { display: none !important; }',
      'ytd-brand-video-shelf-renderer { display: none !important; }',
      'ytd-banner-promo-renderer-v2 { display: none !important; }',
      'ytd-banner-promo-renderer { display: none !important; }',
    ].join('\n'),
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
    ambientMode: [
      '.ytp-cinematics-container { display: none !important; }',
      '#cinematics { display: none !important; }',
      '.cinematics-container { display: none !important; }',
    ].join('\n'),
    merchShelf: [
      'ytd-merch-shelf-renderer { display: none !important; }',
      'ytd-product-list-renderer { display: none !important; }',
      'ytd-product-item-renderer { display: none !important; }',
    ].join('\n'),
    chaptersPanel: [
      'ytd-engagement-panel-section-list-renderer[target-id*="chapters"] { display: none !important; }',
      'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-macro-markers-description-chapters"] { display: none !important; }',
      'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-macro-markers-auto-chapters"] { display: none !important; }',
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
    youTab: [
      'ytd-guide-entry-renderer:has(a[title="You"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer:has(a[title="You"]) { display: none !important; }',
      'ytd-guide-entry-renderer:has(a[href="/feed/you"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer:has(a[href="/feed/you"]) { display: none !important; }',
    ].join('\n'),
    playables: [
      'ytd-guide-entry-renderer:has(a[title="Playables"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer:has(a[title="Playables"]) { display: none !important; }',
      'ytd-mini-guide-entry-renderer[aria-label="Playables"] { display: none !important; }',
      'ytd-guide-entry-renderer:has(a[href*="/playables"]) { display: none !important; }',
    ].join('\n'),
    explore: [
      'ytd-guide-section-renderer:has(a[title="Gaming"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Music"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="News"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Movies & Shows"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Live"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Fashion & Beauty"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Courses"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Sports"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Podcasts"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[title="Shopping"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="shopping"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="gaming"]) { display: none !important; }',
      'ytd-guide-section-renderer:has(a[href*="movies"]) { display: none !important; }',
    ].join('\n'),
    notifications: 'ytd-notification-topbar-button-renderer { display: none !important; }',
    createButton: [
      'ytd-topbar-menu-button-renderer:has(yt-icon[icon-name="create"]) { display: none !important; }',
      'ytd-masthead ytd-button-renderer:has(button[aria-label*="Create"]) { display: none !important; }',
      'ytd-masthead button[aria-label*="Create"] { display: none !important; }',
    ].join('\n'),
    searchSuggestions: [
      '.sbdd_b { display: none !important; }',
      '.ytSearchboxComponentSuggestionsContainer { display: none !important; }',
    ].join('\n'),
    voiceSearch: '#voice-search-button { display: none !important; }',
    thumbnails: [
      'ytd-thumbnail { display: none !important; }',
      'yt-thumbnail-view-model { display: none !important; }',
      'ytd-playlist-thumbnail { display: none !important; }',
      '.yt-lockup-view-model-wiz__content-image { display: none !important; }',
      '#thumbnail-container { display: none !important; }',
    ].join('\n'),
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
