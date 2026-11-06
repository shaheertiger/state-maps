# statemaps.net

Programmatic iPhone app-privacy reference: "is {app} safe?", "does {app} track you?" and
"how to lock {app} on iPhone" for 4,500 apps, built from their App Store privacy labels.
Fully static HTML (Astro + Tailwind), deployed on Vercel.

```bash
npm ci
npm run data     # rebuild data/apps.json (clean slugs, label cards) from data/apple-apps.json
npm run dev      # http://localhost:4321
npm run build    # astro build + scripts/check-build.mjs (fails on broken links, duplicate titles, thin pages…)
SM_LIMIT=50 npx astro build   # quick sample build: only the first 50 apps' root pages
npm run og       # re-render the site-wide OG image (public/og.png)
npm run favicons # re-render favicons from the logo SVG
```

## How it fits together

| Path | What it is |
| --- | --- |
| `data/apple-apps.json` | Sourced snapshot: 4,500 App Store records + developer-reported privacy cards, each with retrieval time and SHA-256 of the source response. |
| `scripts/import-apple-catalog.mjs`, `scripts/enrich-app-privacy.mjs` | Collect records from Apple's public Search API and privacy cards from public App Store pages (`npm run import`, `npm run enrich`). Polite pacing; stops if rate-limited. |
| `scripts/build-apps.mjs` | Normalises the snapshot → `data/apps.json`: readable names, unique slugs, category/topic, cards split by type. |
| `src/lib/data.ts` | Types, URL builders, exposure levels, categories, topics, which variant pages exist. |
| `src/lib/labels.ts` | Apple's label vocabulary: sections, 16 data types, iPhone setting for each. |
| `src/lib/content.ts` | Generated copy per app (verdicts, quick answers, settings, FAQ, quizzes, checklists) plus hand-written topic and category notes. |
| `src/pages/[slug].astro` | All root-level app URLs (main page + 2 variants). |
| `src/components/AppPage.astro` | App page template. `VariantPage.astro`: tracking and lock pages. |
| `src/components/HubPage.astro` | Category and topic hubs (filter chips + sortable table, ItemList schema). |
| `src/components/QuestionHub.astro` | A–Z question hubs with one page per letter. |
| `src/pages/data-types/` | One hub per label data type (apps that collect Location, Identifiers…). |
| `src/pages/tools/` | App privacy checker, compare two apps, label decoder, privacy checkup, photo metadata viewer. |
| `src/lib/editorial/` | Hand-written guides, settings, glossary and comparisons from the previous site, rendered at their original URLs via `EditorialPage.astro`. |
| `src/lib/sitemap.ts` | Sitemap index split into apps / questions / hubs / guides; `lastmod` = `SITE.verifiedISO`. |

## URLs

```
/is-{app}-safe/   /does-{app}-track-you/   /how-to-lock-{app}-on-iphone/
/app-privacy/  /app-privacy/{category}/  /app-privacy/{category}/{topic}/
/does-it-track-you/{letter}/  /is-it-safe/{letter}/  /lock-an-app/{letter}/  /data-types/{type}/
/tools/{tool}/  /blog/{guide}/  /guides/{topic}/  /privacy-settings/{setting}/  /glossary/{term}/
```
Variant pages exist only where they have something to say: tracking pages need a privacy label;
lock guides cover finance, health, medical, photo, social and security-type apps.
Old `/app-privacy/{name-id}/` URLs are static forwarding pages (noindex, canonical + instant refresh)
to the new app pages; other legacy paths are redirected in `vercel.json`.

## Editorial rules
- Never invent a fact. Labels are reproduced as developer disclosures, never as tested behaviour.
- "No Details Provided" stays distinct from "Data Not Collected".
- No rankings, "best app" verdicts or security claims the label does not make.
- When you re-collect data, bump `SITE.verifiedISO` / `verifiedLabel` in `src/lib/site.ts`; it drives
  "checked" dates, JSON-LD and sitemap `lastmod`.

## Performance
App pages ship no client JS (checkers, quizzes, tabs and checklists are CSS radio/checkbox inputs, FAQs
are `<details>`). One cached stylesheet (~48 KB) and one icon sprite (`/icons.svg`) are shared by every page.
Ad slots (`AdSlot.astro`) render only with `PUBLIC_ADS=1` and reserve fixed sizes. Optional Google Tag Manager
(`PUBLIC_GTM_ID`) loads only after opt-in and never when the browser sends Do Not Track / GPC.

## Launch checklist
- [ ] Vercel: import the repo (framework Astro; `vercel.json` sets build, headers, redirects, trailing slashes).
- [ ] Search Console: verify `statemaps.net` and submit `https://statemaps.net/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console; after each deploy run `npm run build && npm run indexnow`.
- [ ] Corrections arrive as public issues in this repository.
