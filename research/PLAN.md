# FULL PLAN — Fit & Sizing Guides Site (US English first)

> Paste this whole document into your coding/content agent. Replace `{SITE}` and `{DOMAIN}`.
> Keyword source: Semrush US "fit" broad-match exports (18 Nov 2026), cleaned of noise. Companion file: `fit-guides-site-plan-keywords.xlsx`.

---

## 0. GOAL

Build `{SITE}`: the clearest answers on the web to three questions people ask right before they buy:
1. **"How should {item} fit?"** (suit jacket, bra, running shoes, jeans, cowboy boots, ring, watch, glasses…)
2. **"Will {A} fit {B}?"** (queen mattress on a full frame, full sheets on a queen, Owala bottle in a cup holder, mattress in a minivan…)
3. **"How does {brand product} fit / does it run small?"** (Birkenstocks, Doc Martens, On Cloud, Essentials hoodies…)

Hosting target: **~$20/month flat (Vercel Pro), no usage overage.**

---

## 1. WHAT THE DATA SAYS

| Fact | Number |
|---|---|
| Clean keywords (fit guides + size compatibility) | 3,426 |
| Monthly searches | ~254,000 |
| Candidate pages | 2,175 (459 with ≥100 searches/mo) |
| Typical keyword difficulty | 5–20 (median ~16; compatibility ~12) |
| Brand sizing keywords ("how do X fit", "true to size") | 604 · ~46,400 searches/mo |
| CPC | mostly $0 — AdSense alone pays little; **affiliate is the main income** |

Biggest topics: bra · shoes · running shoes · suit jacket · jeans · Birkenstocks · ring · suit · glasses · cowboy boots · Oura ring · watch · blazer · cowboy hat · sandals/flip-flops · dress shirt/pants · diapers · baseball glove · shin guards.
Easiest wins: mattress/sheet/frame combinations (KD 3–14), wedding band (KD 4), dress pants (KD 5), shin guards (KD 6.5), ring (KD 5.5).

**This export undercounts the niche** (it only contains queries with the word "fit"). Before scaling past Wave 2, export these Semrush seeds (US): `size chart`, `true to size`, `run small`, `runs big`, `what size`, `size calculator`, `size guide`, `dimensions`, `carry on size`, `will it fit`, `size up or down`.

---

## 2. SITE STRUCTURE

```
/                                  Home: search box, top categories, top guides, tools
/fit/                              All fit guides (A–Z + by category)
/fit/{category}/                   Hub: suits, footwear, running, boots, jeans-pants, tops-outerwear,
                                        lingerie, hats-helmets, sports-gear, jewelry-watches, eyewear, baby
/fit/{item}/                       "How Should {Item} Fit?"                      ← template A
/will-it-fit/                      Compatibility hub
/will-it-fit/{a}-on-{b}/           "Will {A} Fit {B}?"                            ← template B
/sizing/{brand}/                   Brand hub
/sizing/{brand}/{product}/         "How Do {Brand Product} Fit?"                  ← template C
/tools/{tool}/                     Calculators & charts                           ← template D
/about/  /methodology/  /affiliate-disclosure/  /contact/
```

Rules: lowercase hyphen slugs, no IDs, no dates in URLs, `trailingSlash: true`, one URL per intent (merge "queen mattress full frame" and "queen mattress full bed frame" into one page).

---

## 3. PAGE TEMPLATES

### A — Fit guide ("How Should a Suit Jacket Fit?")
1. Breadcrumb → H1 = the main query.
2. **Answer box (40–60 words):** the 3–5 checkpoints in one paragraph.
3. **Fit checklist by body point** (table): checkpoint · what good looks like · too tight · too loose. E.g. shoulders, sleeve length, chest/button, jacket length, collar gap.
4. **Diagram:** one simple inline SVG with labelled fit points (generated from the checklist data, no image files).
5. **Variations:** by style or activity (slim vs classic suit; running vs trail shoes; sports vs everyday bra).
6. **How to measure yourself** (numbered steps).
7. **Size conversion table** (US / UK / EU / cm) where sizes exist.
8. **Common problems & fixes** ("heel slips", "gaps at the cup", "sleeve too long → tailor").
9. **Best-fitting picks (affiliate block)** — 3–5 products known for a particular fit, each with one honest line. Clearly labelled.
10. **FAQ (5–8)** from real keywords in the spreadsheet ("should running shoes be tight or loose", "how much room at the toe").
11. Related guides (6–10, same category) + category hub link.
Length: 900–1,800 words of item-specific content.

### B — Compatibility ("Will a Queen Mattress Fit on a Full Frame?")
1. H1 = the question. **Answer box:** "No. A queen mattress (60 × 80 in / 152 × 203 cm) is 6 in wider and 5 in longer than a full frame (54 × 75 in)…"
2. **Dimensions table** (inches and cm) for A and B, with the difference.
3. **Visual overlay:** SVG drawing both outlines to scale.
4. **What happens if you try / workarounds** (overhang, slats, adapter, buy a frame).
5. **Related combinations table** linking every sibling (queen on king, full on queen, twin XL sheets on twin…).
6. FAQ + affiliate block (frames, sheets, toppers).
**Data-driven:** every page is generated from a dimensions dataset (mattress/sheet/frame sizes, bottle diameters × cup-holder sizes, luggage × airline limits, cargo-space × item dimensions). Never type numbers into templates by hand.

### C — Brand sizing ("How Do Doc Martens Fit?")
1. Answer box: "Doc Martens run large in half sizes — most people take their usual whole size or size down…" **Only from the brand's official size chart, published sizing advice and measured specs** — never invented reviews or "customers say".
2. Brand size chart (with source link and date).
3. Fit by model/width; break-in notes; how it compares to Nike/Converse/etc. sizing.
4. FAQ + affiliate links to the product.
Publish only brands you can source properly; start with the top 30 in the `Brand sizing` tab.

### D — Tools (link magnets)
- Bra size calculator
- Ring size chart + printable sizer
- Shoe size converter (US/UK/EU/cm, men/women/kids)
- Mattress, sheet & bed frame size chart (+ "will it fit" checker)
- Carry-on size checker (bag dimensions vs airline limits)
All run **100% in the browser** (no server code).

---

## 4. TITLES & META

- A: `How Should {a/an} {Item} Fit? {N}-Point Fit Checklist` · meta: `{Answer box first sentence} See the fit checklist, how to measure and common fixes.`
- B: `Will {A} Fit {B}? (Dimensions Compared)` · meta: `{Yes/No}. {A} is {dims}; {B} is {dims}. Here's the difference and what to do.`
- C: `How Do {Brand Product} Fit? Sizing Guide (True to Size?)`
- D: `{Tool} — Free {Bra Size Calculator / Ring Size Chart}`
Numbers in titles/meta must come from the same data as the page. No empty variables (build fails if `{` or a double space appears).

---

## 5. STRUCTURED DATA

Every page: `BreadcrumbList`, `WebPage`/`Article` (with `dateModified`, author/organisation), `FAQPage` matching the visible FAQ. Measure-yourself sections: `HowTo` markup is optional (Google no longer shows HowTo rich results, but it's harmless). Tools: `WebApplication`. Validate each template once in the Rich Results Test before generating pages.

---

## 6. CONTENT QUALITY RULES

**Do**
- Answer in the first sentence; put the checklist above the fold.
- Use concrete measurements (½ inch of sleeve cuff, a thumb's width at the toe, 2 fingers under a bra band).
- One page per real intent; merge tiny variants into the main page's FAQ.
- Cite sources for size charts (brand pages, standards) with a "last checked" date.
- Mark affiliate links `rel="sponsored nofollow"` and show the disclosure near the first link.

**Don't**
- Don't invent user reviews, testimonials or "we tested" claims you didn't make.
- Don't publish a brand page without the brand's own sizing source.
- Don't create pages for noise intents (Minecraft, job titles, "how many earths fit in the sun").
- Don't publish thin pages for the 1,675 long-tail topics; fold them into hubs as FAQ answers.
- Don't give medical advice on condoms, braces, dentures or hearing aids beyond general fit information; link to professional guidance.

---

## 7. LAUNCH WAVES

- **Day 1:** Wave 1 = top 150 pages from the spreadsheet + 5 tools + 12 category hubs + compatibility hub + about/methodology/disclosure pages. Submit sitemap to Google Search Console and Bing Webmaster Tools.
- **Weeks 2–4:** Wave 2 = next 350 pages once > 70% of Wave 1 is indexed. Add the top 30 brand sizing pages.
- **Month 2+:** pull the extra Semrush seeds (§1), add new templates they reveal (size charts, carry-on sizes), fold the remaining long tail into hubs.
- **Links:** submit the tools to relevant communities and resource pages; a few genuine links speed up crawling a lot on a new domain.

---

## 8. MONEY

1. **Affiliate first:** Amazon Associates, shoe/apparel retailers, mattress and bedding brands, luggage. Product blocks sit right after the reader learns what size or fit to buy.
2. **AdSense/Ezoic later** (once traffic exists), max 3 ad units per page, never above the answer box, lazy-loaded.
3. Tools pages: no ads above the tool.

---

## 9. VERCEL STACK — CHEAPEST SETUP THAT STILL RANKS

These pages almost never change, so **the whole site is pre-built static HTML**. No server code runs when someone visits a page — that's what keeps cost flat.

| Layer | Choice | Why it's cheap |
|---|---|---|
| Framework | **Next.js (App Router) with `output: 'export'`** (fully static export). Astro is an equally good alternative. | No functions, no ISR, no middleware → no usage meters ticking |
| Hosting | **Vercel Pro ($20/mo, includes $20 usage credit)** | Hobby is non-commercial only (affiliate/ads = commercial) |
| Rendering | All ~2,200 pages generated at build with `generateStaticParams` | Build ≈ a few minutes; zero per-visit compute |
| Data | **JSON/CSV files in the repo** (`data/items.json`, `data/dimensions.json`, `data/brands.json`) validated with Zod at build | No database bill, no DB calls |
| Content | MDX or JSON per page, generated by your scripts + edited by you | Git history = version control |
| Styling | Tailwind CSS, system font stack (or one self-hosted font) | No font requests, no layout shift |
| Diagrams | **Inline SVG generated from data** (fit points, size overlays) | No image files, no image optimisation charges |
| Photos (if any) | Pre-resized WebP at build with `sharp`, served as static files; `images: { unoptimized: true }` | Vercel image optimisation never runs |
| OG images | Pre-generated PNGs in the build script | No per-request rendering |
| Tools | Client-side React components (calculators run in the browser) | No API routes |
| Site search | **Pagefind** (static search index built at deploy) | No search server, free |
| Sitemap/robots | Generated at build (`app/sitemap.ts`, `app/robots.ts` work with static export) | — |
| Analytics | Google Search Console + Bing Webmaster (free); optional Cloudflare Web Analytics (free) or Vercel Web Analytics within plan limits | No paid analytics |
| Forms (contact) | `mailto:` link or a free form service | No function needed |
| DNS | Cloudflare (DNS only, proxy off) or Vercel DNS | Free |

**What static export means you can't use** (and don't need): ISR, middleware, API routes, server actions, Vercel image optimisation. If one day you need them, switch only that route — everything else stays static.

**Settings checklist**
- `next.config`: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
- Redirects for merged/renamed pages: `vercel.json` `redirects` (static rules, no function).
- Headers in `vercel.json`: long cache for `/_next/static/*` and images (`public, max-age=31536000, immutable`); HTML `public, max-age=0, must-revalidate` (Vercel's CDN still caches it).
- Preview deployments: `X-Robots-Tag: noindex` header on non-production hosts (set via `vercel.json` `headers` with a `has: host` condition) and production domain set as canonical everywhere.
- Turn on **Spend Management** with a low cap (e.g. $30) and alerts.
- Turn on **Bot protection / firewall rules** for scrapers; allow Googlebot, Bingbot and AI search crawlers in `robots.txt`.
- Keep the Git integration on `main` only for production; avoid deploying on every tiny commit (batch content changes).

**Expected monthly cost**
| Item | Cost |
|---|---|
| Vercel Pro | $20 (usage for a static site of this size normally fits inside the included credit) |
| Domain | ~$1/mo (≈ $10–15/yr) |
| Database, search, image service, analytics | $0 |
| **Total** | **≈ $21/month** |

Free alternative if you ever want $0 hosting: the same static export deploys unchanged to Cloudflare Pages.

---

## 10. TECH SEO CHECKLIST

- One H1, self-referencing canonical, unique title/meta on every page.
- Breadcrumbs (visible + schema); every page within 3 clicks of home.
- XML sitemap split by type (`sitemap-fit.xml`, `sitemap-will-it-fit.xml`, `sitemap-sizing.xml`, `sitemap-tools.xml`).
- Core Web Vitals: LCP < 2.0 s, CLS < 0.05, minimal JS (tools only load JS on tool pages).
- 404 page returns 404; no broken internal links (check in CI with a link checker).
- `lang="en-US"`; add hreflang only when another language really exists.
- Build fails if: a page has no answer box, fewer than 3 FAQs, an empty template variable, or a link to a page that doesn't exist.

---

## 11. LANGUAGES (later)

Don't translate yet. The Italian and Japanese exports show almost no native-language demand because the seed was the English word "fit". Validate first with native seeds — Italian: `vestibilità`, `come calza`, `taglia`, `veste piccolo`; Japanese: `サイズ感`, `サイズ 選び`, `大きめ`, `小さめ`; then reuse the same templates.

---

## 12. FILES

- `fit-guides-site-plan-keywords.xlsx`:
  - **Pages to build:** wave, type, category, page, title idea, keyword count, volume, median KD, example keywords.
  - **Categories:** pages and volume per category.
  - **All keywords:** every cleaned keyword mapped to its page.
  - **Brand sizing:** brand-fit keywords.
