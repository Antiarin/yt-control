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
