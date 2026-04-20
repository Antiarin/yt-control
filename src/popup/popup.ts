(() => {
  type CssFeatureKey =
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

  type BehaviorKey = 'stopAutoplay' | 'shortsToWatch' | 'dismissStillWatching' | 'autoSkipAds';

  type FeatureKey = CssFeatureKey | BehaviorKey;

  type Settings = {
    masterEnabled?: boolean;
  } & Partial<Record<FeatureKey, boolean>>;

  const CSS_FEATURE_KEYS: readonly CssFeatureKey[] = [
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

  const BEHAVIOR_KEYS: readonly BehaviorKey[] = [
    'stopAutoplay',
    'shortsToWatch',
    'dismissStillWatching',
    'autoSkipAds',
  ];

  const ALL_FEATURE_KEYS: readonly FeatureKey[] = [...CSS_FEATURE_KEYS, ...BEHAVIOR_KEYS];

  const ALL_TAB = 'all';
  let activeTab = ALL_TAB;

  function requireElement<T extends Element>(selector: string, root: ParentNode = document): T {
    const element = root.querySelector<T>(selector);
    if (!element) throw new Error(`Missing element: ${selector}`);
    return element;
  }

  function getRow(key: FeatureKey): HTMLElement {
    return requireElement<HTMLElement>(`.toggle-row[data-key="${key}"]`);
  }

  function getCheckbox(root: ParentNode): HTMLInputElement {
    return requireElement<HTMLInputElement>('input[type="checkbox"]', root);
  }

  function setCountText(visibleCount: number): void {
    requireElement<HTMLElement>('#countText').textContent =
      `${visibleCount} of ${ALL_FEATURE_KEYS.length} shown`;
  }

  function updateMasterState(enabled: boolean): void {
    document.querySelectorAll<HTMLElement>('.toggle-row').forEach((row) => {
      row.classList.toggle('disabled', !enabled);
    });
  }

  function filterByTab(): void {
    let visibleCount = 0;
    document.querySelectorAll<HTMLElement>('.toggle-row').forEach((row) => {
      const isVisible = activeTab === ALL_TAB || row.dataset.cat === activeTab;
      row.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });
    setCountText(visibleCount);
  }

  function updateCount(): void {
    const visibleCount = document.querySelectorAll('.toggle-row:not(.hidden)').length;
    setCountText(visibleCount);
  }

  function initializeSettings(rawSettings: Record<string, unknown>): void {
    const settings = rawSettings as Settings;
    const masterEnabled = settings.masterEnabled !== false;
    requireElement<HTMLInputElement>('#masterEnabled').checked = masterEnabled;

    // CSS toggle: checked means feature is shown (default state)
    for (const key of CSS_FEATURE_KEYS) {
      getCheckbox(getRow(key)).checked = settings[key] !== false;
    }

    // Behavior toggle: checked means the intervention is active
    for (const key of BEHAVIOR_KEYS) {
      getCheckbox(getRow(key)).checked = settings[key] === true;
    }

    updateMasterState(masterEnabled);
    updateCount();
  }

  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(null, initializeSettings);

    requireElement<HTMLInputElement>('#masterEnabled').addEventListener('change', (event) => {
      const checkbox = event.currentTarget as HTMLInputElement;
      chrome.storage.sync.set({ masterEnabled: checkbox.checked });
      updateMasterState(checkbox.checked);
    });

    for (const key of ALL_FEATURE_KEYS) {
      getCheckbox(getRow(key)).addEventListener('change', (event) => {
        const checkbox = event.currentTarget as HTMLInputElement;
        chrome.storage.sync.set({ [key]: checkbox.checked });
      });
    }

    document.querySelectorAll<HTMLButtonElement>('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        requireElement<HTMLButtonElement>('.tab.active').classList.remove('active');
        tab.classList.add('active');
        activeTab = tab.dataset.tab ?? ALL_TAB;
        filterByTab();
      });
    });
  });
})();
