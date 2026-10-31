> Historical first-pass plan. The revised user blueprint and supplied keyword map are tracked in `blueprint-implementation.md`; its phase gates and page-status table supersede the original 36-page scope below.

# Content scope and expansion

This site covers iPhone photo and closely related app privacy: access controls, storage boundaries, sharing, recovery and location metadata. It does not publish general iPhone troubleshooting, food, fitness, unrelated app roundups or translations that do not exist.

The reference sites informed two patterns: a topic hub linking to useful guides, and a structured directory linking to individual fact pages. `lib/content.ts` supplies 15 guides in four categories. `lib/settings.ts` supplies eight distinct settings records with a quick answer, scope, limits, steps, verification instructions, source and review date. Each record receives a crawlable HTML page, metadata, sitemap entry and Markdown twin.

## Keyword inputs

The supplied Vaultaire US ranking export and four additional keyword exports were read without altering the workbooks. `keyword-map.csv` records candidate intent matches and source row locations. It is a research queue, not a coverage certificate or a list of automatically publishable pages. A matching phrase does not prove that the proposed guide satisfies every platform, app or iOS-version variant.

The broad `how-iphone`, `can-iphone` and `best-iphone-app` files each contain 30,003 populated keyword cells. The focused hiding-apps export contains 1,509 rows; the Vaultaire export contains 1,024 ranking records, including repeated queries. Broad exports include unrelated topics. The mapping intentionally does not publish one page per row or add query-volume figures across repeated variants.

Implemented groups include Hidden album access, cloud synchronization, vault comparisons, independent passwords, migration, recovery, Family Sharing visibility, Shared with You, photo location and eligible app hiding. Further clusters need source review before publication: Shared Library exit scenarios, individual app permissions, version-specific differences and app-specific recovery flows. Do not create a separate page unless it answers a distinct intent with materially different verified information.

## Adding an entry

1. Identify a distinct user question in the relevant keyword cluster; consolidate near-duplicates.
2. Read current primary documentation and verify the workflow for the release being described.
3. Add the record to `lib/settings.ts` or add a guide in `lib/content.ts`. Reuse an existing category where appropriate.
4. Include the control's limits, a practical verification step, source links and a truthful review date. Do not invent app tests, prices, security ratings or recovered-photo guarantees.
5. Run type checking, tests, production build and the route crawler. Add a regression check when behavior changes.

The route templates support a larger researched catalog. This release intentionally contains 36 HTML destinations, not 6,900 generated pages. A nutrition site's page count is not evidence that an equally large useful dataset exists for iPhone privacy.

## Stack profile supplied by the user

Implemented core: Next.js 15, React 19, TypeScript, Material UI and Emotion with the Next App Router cache provider. Existing Radix FAQ accordions remain. No Tailwind implementation is claimed; the later supplied profile identifies Material UI/Emotion.

Optional GTM and Search Console identifiers are configurable. Google Analytics, Amplitude, Clarity and conversion services can be configured in the operator's GTM account, subject to consent and a review of their data handling. They are not active just because a technology profile lists them. This site has no product checkout, app store listing or account feature to connect to Stripe or store links.

Cloudflare, Azure, DNS, certificates, email authentication, CrUX/Radar/Common Crawl inclusion and search visibility are external service or dataset states. They are not fabricated in source code. English is the only published language, so there are no invented language alternates or hreflang links.
