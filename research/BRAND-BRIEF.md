# Brief for brand sizing researchers (template C: "How Do {Brand} Fit?")

Repo: /home/user/state-maps. Do NOT run git commands. Only create files in content/sizing/.

## Read first
- `lib/schema.ts` — the `brandSizing` zod schema (exact JSON shape, including optional `products` sub-pages).
- `research/keywords.json` — real search queries. Look in `brandSizing` (array of {k,v}) and in `pages` entries whose `page` mentions the brand. Use the real queries for `keywords`, the H1 and FAQ questions.
- `content/fit/suit-jacket.json` — tone and depth reference (different template, same voice).

## The hard rule
Publish a brand ONLY if you can open and read the brand's OWN official size chart / size guide / fit advice page (or the official product page's fit note) using WebFetch or WebSearch. Every sizing claim (true to size / size down / half sizes / width) must come from that official source. Put those URLs in `sizeChart.source` and `sources`, and set `checked` to "2026-11-19".
- No "customers say", no Reddit consensus, no invented reviews, no "we tested".
- If the official page can't be fetched or doesn't state the fact, don't claim it. Phrase it as what the brand's chart shows (e.g. "Birkenstock lists sizes in EU whole sizes only…").
- The size chart rows must be copied from the official chart (a representative subset is fine, e.g. 8–12 rows). If you can't get the chart, SKIP THE BRAND and say so in your final reply.
- `verdict` must reflect the brand's own advice; use "varies by model" when it differs.
- `picks`: 1–5 retailer search phrases (product types), honest one-line `why`.
- `category`: footwear / running / boots / jewelry-watches / tops-outerwear as fits.
- `products`: add sub-pages only for models that have their own search demand in keywords.json AND official model-specific fit info (e.g. Birkenstock Boston, Jordan 4). Each needs ≥ 3 FAQs.
- No curly braces, no double spaces, no TODO. Plain US English, sentence case.

## Output
`content/sizing/{brand-slug}.json`, then validate:
    cd /home/user/state-maps && npx tsx scripts/validate.ts content/sizing/<slug>.json
Fix every error. Final reply: brands published (with source URLs) and brands skipped (with reason).
