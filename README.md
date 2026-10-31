# Private Photo Guide

A focused iPhone privacy reference site built with Next.js 15, React 19, TypeScript, Material UI, Emotion and Radix FAQ accordions. Includes 15 sourced guides, four topic hubs, eight structured privacy-setting entries, a searchable directory and a browser-local privacy review tool. Every one of the 36 HTML destinations has a Markdown twin through DualMark.

## Local development

Use Node 22 and the committed lockfile:

```sh
npm ci
npm test
npm run typecheck
npm run build
npm start -- --port 3100
```

With the production server running, `npm run check:routes` crawls every sitemap page, Markdown twin, bot/Accept negotiation mode, internal target and error/discovery route. Set `TEST_BASE_URL` to change the test origin. It defaults to `http://127.0.0.1:3100`.

## Vercel deployment

Import this repository as a Next.js project, use Node 22 and the standard `npm run build` build command. No custom output directory or server is needed. Set `NEXT_PUBLIC_SITE_URL` to the intended canonical HTTPS origin before building. If it is absent, Vercel's production-domain environment variable is used; outside Vercel, the fallback is localhost for development, never an invented public domain. See `.env.example`.

After deployment, run the route crawler and DualMark CLI against the production origin:

```sh
TEST_BASE_URL=https://your-domain.example npm run check:routes
npx @dualmark/cli@0.11.0 verify https://your-domain.example/blog/how-to-hide-photos-iphone
```

The example origin must be replaced. Local checks do not establish a successful Vercel deployment or search indexing.

Next.js 15's local production server overwrites the HTML `Vary` value; the local DualMark result is 120/125 (all required checks pass). `vercel.json` also declares the negotiation headers at the hosting layer. Run the crawler with `CHECK_EDGE_HEADERS=1` on the deployed origin to verify those headers instead of assuming hosting preserves them.

## Content and scaling

`lib/content.ts` assembles the guide records and links to primary sources. `lib/settings.ts` is the structured reference dataset. `lib/markdown.ts` serializes the same records used in HTML, avoiding a second independently maintained article copy. New researched records automatically become routes and discovery entries. `docs/content-plan.md` explains the editorial gate and the candidate keyword map. Candidate mappings are not proof that every query is answered.

The privacy review supports explicit local saving, a text download, printing to PDF and links encoding only the selected general choices. It never uploads photos or reads device settings. Do not add analytics events containing answers or completion state.

## Optional account services

`NEXT_PUBLIC_GTM_ID` enables the optional measurement consent interface. The container loads only after opt-in and stays off when the browser requests no tracking. Configure any GA, Clarity, Amplitude or advertising tags in your own container, review consent behavior and update the privacy description to match the live configuration. Do not put private credentials in public variables.

`GOOGLE_SITE_VERIFICATION` adds a Search Console verification token. External DNS/CDN, payment, app-store, email and dataset-inclusion services from a competitor technology profile are not activated or claimed by this repository. No fictitious account IDs, prices, app audits, translations or ranking claims are included.

Public corrections use the repository issue tracker. No private support address or upload endpoint is implied.
