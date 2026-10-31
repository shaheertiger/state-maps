# VaultForYou blueprint implementation

This repository implements the database foundation from the revised October 31 blueprint. It remains the existing `shaheertiger/state-maps` project. No domain migration, unrelated Vercel project change, product account creation, store listing or deployment is implied.

## Source of truth

The revised `Vaultaire SEO Site Blueprint (1).docx` adds the full content outlines, publication workflow and supplied 5,183-keyword map. The original document has the same architecture and roadmap diagrams. `blueprint-keyword-map.csv` preserves all 5,183 keyword rows and the workbook's source columns; `blueprint-keyword-summary.csv` preserves its 30 target groups. `blueprint-competitor-rankings.csv` preserves 1,024 competitor ranking records. These are supplied historical research figures, not current verified site results. Do not sum overlapping queries into unique people or promise traffic from them.

`blueprint-page-status.csv` maps the supplied target groups to existing references or the queue. It explicitly distinguishes a reference being present from a finished, device-tested pillar. The earlier `keyword-map.csv` remains a separate preliminary candidate map rather than silently replacing the supplied workbook.

## Implemented foundation

| Blueprint component | Implementation |
|---|---|
| Entity tables | Typed task, app, content-type, iOS-version, device, competitor, tool and glossary records in `lib/catalog.ts` |
| Task hubs | Five live hubs with quick answers, methods, limits, step tables, app table and FAQs; 25 task definitions including queued records |
| App pages | Six app references with installation type, distinct access boundary, source and task table |
| Task × App template | Eight downloaded-app combinations; shared methods remain noindex, canonicalized to the relevant app reference and absent from sitemaps |
| Publishing gate | `lib/publishing.ts` requires app-specific steps, answer, sources and editorial attribution before a combination can be indexed; the same app-specific evidence appears in the HTML and Markdown when supplied |
| Comparison templates | Documentation-based storage comparison and selection checklist; no invented product rating, price, security test or VaultForYou #1 claim |
| Tools | Browser-local privacy checkup and bounded JPEG EXIF viewer with optional PNG pixel-copy export |
| Glossary | Twelve sourced terms with definitions, limits, related terms and DefinedTerm markup |
| Guide retrofit | Direct answers, spec strips, method tables, visible documentation-review dates, six FAQs and matching schema; three additional app-control reference guides and an expanded roughly 3,000-word hide-apps pillar |
| Navigation | Sitewide task/app/tool/glossary taxonomy and contextual references |
| Discovery | Sitemap index with eight template groups; indexable records only; Markdown and llms discovery |
| Social previews | Per-page 1280 × 720 title graphics with descriptive alt text |
| Measurement | Optional consent-gated GTM emits template category; photo files and review answers are never analytics events |

## Publication and evidence still required

The current references are not the complete long-form editorial program. The blueprint requests 2,500–4,500-word pillars, 900–1,400-word app-task articles, 600–900-word app pages, 500–800-word tool explanations and device screenshots. The hide-apps worked example has been expanded into the requested word range. Other short references still need that expansion, primary-source review and real device tests. Do not call them finished pillars based on the presence of their routes or templates. No “Tested on iPhone 16 / iOS 26.1” claim, timed 10-second result, screenshot, Review rating or app feature is fabricated.

No store links or product-specific decoy, pattern lock, encrypted backup, revocable-sharing or import behavior were supplied. Product CTAs currently lead to working website tools. Product comparisons and claims require actual feature documentation and test evidence. The blueprint's iOS 17–26 range is not used to invent iOS 19–25 releases. Records distinguish the named releases and verify controls against current documentation.

The blueprint's 150+ links per page is a mature-taxonomy target. Navigation exposes the available taxonomy; it does not manufacture empty pages or unrelated links to meet a count. Likewise, app-specific rows stay unindexed when they merely repeat the shared iOS workflow. A 40-word answer check is an evidence completeness check, not a security assessment or proof of original research.

## Roadmap gates

| Phase | Planned scope | Gate before expansion |
|---|---|---|
| Foundation — Nov 2026 | Retrofit content, database and templates, backlink review | Templates live and guides re-indexed |
| First catalog — Dec 2026–Jan 2027 | Three core hubs, 50 app pages, 500 qualified combinations | 500 pages indexed and 3,000 ranking keywords |
| Scale — Feb–Mar 2027 | 2,500 qualified pages, comparisons and eight useful tools | 10,000 ranking keywords and hub in top 10 |
| Adjacent topics — Apr 2027 | Find My, location and other qualified clusters | 15,000 monthly visits and measured app installs |

These gates are not marked met. Search Console indexing, real ranking data, app-install measurements and backlink review require the actual property and time in market. No disavow file is submitted based only on aggregate backlink counts. A later phase must not be called complete simply because pages can be generated.

## Verification

Run `npm test`, `npm run build` and `npm run check:routes`. The production crawler traverses the sitemap index, verifies HTML/Markdown negotiation and canonicals, checks internal targets, ensures shared-method combinations remain noindex and validates representative per-page image routes. It does not establish ranking, device testing, a measured mobile LCP or external account setup.

The local Next.js HTML Vary limitation remains recorded in the README; do not report 125/125 DualMark until the deployed origin actually passes it.
