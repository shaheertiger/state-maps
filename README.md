# Fit Guides

A fully static site that answers three questions people ask right before they buy:

1. **How should {item} fit?** Fit guides at `/fit/{item}/`
2. **Will {A} fit {B}?** Compatibility answers at `/will-it-fit/{a}-on-{b}/`
3. **How does {brand} fit?** Brand sizing at `/sizing/{brand}/`

Plus five browser-only tools at `/tools/` and 13 category hubs. The plan this implements is in `research/PLAN.md`; the keyword research is in `research/` (the source `.xlsx`, `keywords.json` and `wave1-fit-guides.json`).

## Stack

- **Next.js (App Router) with `output: "export"`**: every page is pre-built HTML. No functions, ISR, middleware or image optimisation, so hosting cost is flat.
- **Content as JSON** in `content/` and `data/`, validated with Zod (`lib/schema.ts`, `lib/compat.ts`) before every build.
- **Tailwind v4** plus a small hand-written stylesheet (`app/globals.css`) with one self-hosted variable font (Archivo).
- **Inline SVG diagrams** generated from data (`lib/diagrams.tsx`, `components/Overlay.tsx`).
- **Pagefind** for static search, built into `out/pagefind/` after `next build`.
- **OG images** rendered once at build to `/og/*.png`.

## Commands

```bash
npm install
npm run dev        # local preview (search only works on a full build)
npm run validate   # content checks only
npm run build      # validate → next build → pagefind → built-site checks
```

`npm run build` fails if:

- content breaks the schema
- an answer box is missing or outside 40–60 words
- a guide has fewer than 900 words
- a page has too few FAQs
- a title has an unresolved `{` or a double space
- copy claims invented testing or reviews ("we tested", "customers say")
- a compatibility verdict doesn't match its data
- an internal link is broken
- a page has two H1s
- titles or descriptions are duplicated
- a canonical is wrong

## Content

| Type | Where | Template |
|---|---|---|
| Fit guide | `content/fit/{slug}.json` | `components/GuidePage.tsx` |
| Brand sizing | `content/sizing/{brand}.json` | `components/BrandPage.tsx` |
| Will it fit | `data/dimensions.json` + `data/compat.json` | `app/will-it-fit/[slug]/page.tsx` |
| Category hubs | `data/categories.json` | `components/HubPage.tsx` |
| Airline limits | `data/airlines.json` | `components/tools/CarryOnChecker.tsx` |

- **Writing a guide:** follow `research/WRITER-BRIEF.md`. Validate a single file with `npx tsx scripts/validate.ts content/fit/<slug>.json`.
- **Brand pages:** only publish a brand whose own size chart you can read and cite (`research/BRAND-BRIEF.md`). Pages that couldn't meet that rule are parked in `research/held-brands/`.
- **Will-it-fit pages:** never type numbers into copy. Use `[[a.w]]`-style tokens (`research/COMPAT-BRIEF.md`). The engine computes the verdict, and each pair's `expect` must agree with it.

## Configuration

Copy `.env.example` and set these in Vercel's project settings:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin, used for canonicals, sitemaps, robots.txt and structured data. If unset on Vercel, the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`) is used. Set it once your custom domain is live. |
| `NEXT_PUBLIC_AMAZON_TAG` | Amazon Associates tracking ID added to shopping links |
| `NEXT_PUBLIC_CF_BEACON` | Optional Cloudflare Web Analytics token |

The site name, tagline and contact email live in `lib/site.ts`.

## Deploying on Vercel (Pro, about $20/month flat)

1. Import the repo. `vercel.json` sets everything: framework "Other" (plain static files, no Next.js runtime), `npm ci`, `npm run build` and output directory `out`. Leave the dashboard build settings on their defaults so they don't override it.
2. Add the environment variables above.
3. Turn on **Spend Management** with a low cap (for example $30) and alerts.
4. Add firewall or bot-protection rules for scrapers. `robots.txt` already allows search and AI-search crawlers.
5. Production deploys from `main` only. Batch content changes rather than deploying every small commit.
6. Submit `/sitemap.xml` (an index of `sitemap-fit.xml`, `sitemap-will-it-fit.xml`, `sitemap-sizing.xml`, `sitemap-tools.xml` and `sitemap-pages.xml`) to Google Search Console and Bing Webmaster Tools. The build checks that every sitemap URL is a real page and every page is in a sitemap.

Preview deployments on `*.vercel.app` send `X-Robots-Tag: noindex`. Redirects for merged pages live in `vercel.json`. The same `out/` folder also deploys unchanged to Cloudflare Pages if you ever want $0 hosting.

## What's next (from the plan)

- **Wave 2:** once more than 70% of Wave 1 is indexed, take the next 350 rows from `research/fit-guides-site-plan-keywords.xlsx` (tab *Pages to build*, `Wave 2`). Add brands that can be sourced (UGG, On and Timberland are pending sources).
- **Month 2+:** pull the extra Semrush seeds listed in §1 of the plan (`size chart`, `true to size`, `run small`, …) and fold the long tail into hub FAQs.
