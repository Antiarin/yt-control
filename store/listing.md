# Chrome Web Store submission copy

Paste-ready text for the CWS developer dashboard. Last revised 2026-04-21.

---

## Name
```
YT Control
```

(Keep exactly; no "for YouTube" suffix — trademark risk.)

---

## Summary / short description

**132 character limit. This appears under the name in search results.**

```
Clean up YouTube. 27 toggles to hide recommendations, Shorts, comments, ads, and more — in a side panel that stays with you.
```

(128 chars.)

---

## Category
```
Productivity
```

(Alternatives: "Accessibility" works too. Avoid "News & Weather" or "Fun" — wrong audience.)

---

## Detailed description

**Paste as-is. ~1,900 chars of the ~16,000 allowed. CWS reviewers and users skim — length past ~2,000 chars is wasted effort.**

```
YT Control puts YouTube's interface on your terms. One side panel. 27 toggles. Zero tracking.

━━━━━━━━━━━━━━━━━━━━━━━━

HIDE 23 UI ELEMENTS

Home page
• Recommendations feed
• Filter chips (All, Music, Mixes, Live…)
• Shorts shelf
• Community posts
• Promotional banners and masthead ads

Watch page
• Related videos sidebar
• Comments
• Autoplay toggle button
• End-screen cards
• Live chat
• Ambient mode (color-bleed glow behind videos)
• Merch and product shelves
• Chapters panel

Left sidebar
• Shorts tab
• Subscriptions tab
• You tab
• Playables
• Explore categories (Gaming, Music, News, Movies, Live, Fashion, Courses, Sports, Podcasts, Shopping)

Header
• Notifications bell
• Create button
• Search suggestions
• Voice search button
• Thumbnails (global)

━━━━━━━━━━━━━━━━━━━━━━━━

4 BEHAVIOR CONTROLS

• Stop Autoplay — automatically pauses videos that start playing on load
• Dismiss "Are You Still Watching?" — detects the dialog and clicks continue
• Auto-skip Ads — clicks the Skip Ad button when it becomes clickable (does NOT block ad requests or bypass the 5-second wait; off by default, opt-in only)
• Redirect Shorts — rewrites /shorts/ URLs to the normal /watch player

━━━━━━━━━━━━━━━━━━━━━━━━

BUILT FOR PEOPLE WHO USE YOUTUBE AS A TOOL

• Side panel UI — always visible while you browse, no popup dismissal
• Amber glassmorphic dark theme
• CSS-only hiding where possible — flicker-free, works through YouTube's SPA navigation
• Settings sync across devices via Chrome sync
• Master switch to disable everything at once
• Open-source (MIT) — every line of code is inspectable

━━━━━━━━━━━━━━━━━━━━━━━━

PRIVACY

No data collection. No analytics. No remote configuration. The extension stores your toggle preferences in Chrome's synced storage and makes zero outgoing network requests of its own.

Full privacy policy: https://github.com/Antiarin/yt-control/blob/main/PRIVACY.md

Source code: https://github.com/Antiarin/yt-control
```

---

## Permission justifications

CWS asks you to justify each permission during submission. Paste these verbatim.

**`storage`**
```
Used to save the user's toggle preferences (which UI elements to hide, which behaviors to enable) so they persist between sessions and sync across devices via chrome.storage.sync. No data is transmitted off-device by the extension.
```

**`sidePanel`**
```
Used to display the extension's UI as a side panel alongside YouTube, giving the user continuous access to toggle preferences while watching.
```

**Host permission: `*://*.youtube.com/*`**
```
Required to inject CSS rules that hide selected interface elements and to run small behavior scripts (stop autoplay, dismiss the "Are you still watching?" dialog, click the visible Skip Ad button, redirect /shorts/ URLs to /watch). The extension does not modify any other site and makes no network requests.
```

---

## Single-purpose description

CWS now requires a single-sentence purpose. Use:

```
Lets users hide selected YouTube UI elements and override selected YouTube behaviors from a persistent side panel.
```

---

## Promo images

CWS accepts up to three promo sizes; only the small tile is required.

**Small promotional tile** — 440×280, mandatory.

Suggested composition (either screenshot `store/promo-small.html` in the repo, or design your own):
- Amber play-triangle-plus-gear logo (reuse `icons/icon-128.png`) on the left, ~120px square
- "YT Control" in bold (~36pt) + "YouTube, your way" tagline underneath (~14pt, reduced-opacity white)
- Three amber toggle dots arranged along the right edge to hint at the UI
- Deep charcoal background (#15151a) with a subtle amber radial glow in the top-left

**Marquee promotional tile** — 1400×560, optional but doubles impressions if CWS features you.

**Screenshots** — 1280×800 or 640×400, up to 5. At minimum: one hero shot + one full toggle list. Repo contains `store/hero.html` and `store/catalog.html` as starter compositions you can open in Chrome and screenshot directly (see instructions in each file).

---

## Keywords / tags

Not a free-form field — CWS auto-extracts from the description. To influence it: make sure the description naturally includes words users search for. The description above is already tuned for:

- "hide youtube recommendations"
- "hide shorts"
- "disable youtube autoplay"
- "skip youtube ads"
- "are you still watching"
- "youtube distraction"
- "youtube focus"
- "youtube shorts redirect"
- "remove youtube comments"

Don't keyword-stuff — CWS downranks that now.

---

## Submission checklist

Before clicking "Submit for review":

- [ ] Version bumped in `manifest.json` if this isn't the first submission
- [ ] `npm run build` clean
- [ ] Zip the `dist/` folder contents (not the folder itself — CWS refuses nested zips)
- [ ] Privacy policy URL points to `https://github.com/Antiarin/yt-control/blob/main/PRIVACY.md`
- [ ] All three permission justifications filled in
- [ ] At least one 1280×800 screenshot uploaded
- [ ] 440×280 small promo tile uploaded
- [ ] Category: Productivity
- [ ] Visibility: Public
- [ ] Pricing: Free
- [ ] "Single purpose" field filled
- [ ] Do NOT upload an extra marketing banner or inflate screenshots with stock phone mockups — reviewers flag them as stock/generic

Expected review time for YouTube-modifying extensions: 3–10 business days, longer if reviewer questions anything. Respond to any reviewer message the same day — the queue resets.
