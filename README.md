# StateMaps

Independent reviews of privacy, vault, app lock and encryption apps. Static site built with Astro + Tailwind, deployed on Vercel.

```bash
npm install
npm run dev      # local dev server
npm run build    # build to dist/ and run SEO checks
```

## How the site is built

Every page is generated from typed data in `src/data/`:

| Data | File | Pages it creates |
| --- | --- | --- |
| Apps (34) | `src/data/apps/*.ts` | `/reviews/<app>/`, `/alternatives/<app>/` |
| Rankings ("Best X apps") | `src/data/articles/list-*.ts` | `/<slug>/` e.g. `/best-photo-vault-apps/` |
| How-to guides | `src/data/articles/guides.ts` | `/guides/<slug>/` |
| Head-to-head comparisons | `src/data/articles/comparisons.ts` | `/compare/<a>-vs-<b>/` |
| Categories | `src/data/categories.ts` | `/category/<slug>/` |

The schema for all of it lives in `src/data/types.ts`. A typo in an app slug fails the build (see the checks at the bottom of `src/data/index.ts`), and `scripts/check-build.mjs` fails the build on broken internal links, missing H1s, missing descriptions or canonicals, duplicate titles, or invalid JSON-LD.

## SEO playbook (copied from pages that rank #1)

The page structure copies four listicles that rank first for "best X apps" searches (NerdSip, The Business Dive, Sallie, Process Street):

1. **Title formula:** number + "Best" + keyword + year + parenthetical modifier, under ~60 characters. Example: `12 Best Photo Vault Apps in 2026 (iPhone & Android)`.
2. **Answer first:** the first paragraph names the winners in bold, so it can be pulled as a featured snippet.
3. **Key takeaways box** under the intro (Sallie).
4. **"At a glance" comparison table** before the details, with columns for best for, platforms, free plan and verdict (NerdSip, Business Dive). It switches to cards on mobile.
5. **Repeating entry block for each app:** badge ("Best Overall"), quick facts, "What it is", "How it works", "Who it's for", Pick if / Skip if, a strengths vs. trade-offs table, pricing, privacy notes, and CTAs (full review, vs page, alternatives).
6. **Sections after the list:** myth-busting, how to choose (numbered steps), setup tips.
7. **E-E-A-T blocks:** "Why you can trust this list", author box, disclosure, methodology page, editorial policy.
8. **FAQ written to match People Also Ask questions**, with `FAQPage` schema.
9. **Topic cluster linking:** every ranking links into single reviews, "X vs Y" pages and "X alternatives" pages, and those link back. This copies NerdSip's "see our X alternatives" / "X vs Y" links.
10. **Structured data on every article:** `BlogPosting`/`TechArticle`, `BreadcrumbList`, `FAQPage`, `ItemList` of `SoftwareApplication` (rankings), `HowTo` (guides), plus `Organization` and `WebSite` with `SearchAction`.
11. **Meta tags:** `max-image-preview:large`, Open Graph article times, `article:section`, `article:tag`, a canonical on every page, trailing-slash URLs.
12. **Freshness:** "Updated" date shown on every article and in schema. Update `updated` in the data when you revise a page.

## Things to do next

- **Put a real person on the byline.** Edit `SITE.author` in `src/lib/site.ts`, and ideally add an author page with a photo and credentials. The top-ranking pages all have named authors.
- **Add first-hand testing.** The content is researched from official docs and store listings. It does not claim hands-on testing. Real screenshots and test notes ("we installed it, deleted it, and tried to restore") are the biggest ranking upgrade you can make. Add them to each app's `howItWorks`.
- **Real app icons and screenshots.** The monogram tiles in `AppIcon.astro` are placeholders.
- **Recheck prices and features** every few months. Apps change fast, and Norton App Lock, for example, was discontinued in 2024.
- **Submit `https://statemaps.net/sitemap.xml`** in Google Search Console.
