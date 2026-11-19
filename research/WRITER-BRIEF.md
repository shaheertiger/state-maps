# Brief for fit-guide writers

You are writing fit-guide pages for a static US-English site that answers "How should {item} fit?".
Repo: /home/user/state-maps. Do NOT run git commands, do NOT edit files other than the content files you are assigned.

## Read first
- `lib/schema.ts` — the `fitGuide` zod schema (the exact JSON shape) and `SHAPE_ANCHORS` (valid diagram anchors per shape).
- `content/fit/suit-jacket.json` — the finished exemplar. Match its depth, tone and structure.
- `research/wave1-fit-guides.json` — every planned guide: slug, item, category, shape, and the REAL search queries (`keywords`) people type. Use these for your `keywords` array (best 4–8), for the H1, and to choose FAQ questions.

## Output
One file per guide: `content/fit/{slug}.json`. Use the slug, category and shape given in research/wave1-fit-guides.json (you may change `shape` only if another shape clearly fits better).
Validate every file you write and fix all errors:
    cd /home/user/state-maps && npx tsx scripts/validate.ts content/fit/<slug>.json [more files…]

## Rules (from the site plan)
- H1 = the main query phrased naturally ("How Should Running Shoes Fit?", "How Should a Bra Fit?").
- `answer`: 40–60 words. Answer in the first sentence with concrete checkpoints.
- `checklist`: 3–8 body points; each needs good / too tight / too loose (for length-type points "too tight" = too short, "too loose" = too long; make that explicit in the text). Each `anchor` must be valid for the shape.
- Use concrete measurements: "a thumb's width (about ½ in) at the toe", "two fingers under the band", "¼–½ in of shirt cuff".
- `variations`: by style, activity or body type (e.g. road vs trail, slim vs classic).
- `measure`: numbered how-to-measure-yourself steps.
- `sizeTable`: only when a widely published, standard conversion exists (US/UK/EU/cm shoe sizes, ring sizes, bra band/cup conventions, hat sizes). Never invent brand-specific data. Omit it otherwise.
- `problems`: real fit problems and fixes.
- `extra`: 1–3 extra sections of genuinely useful, item-specific detail (break-in, alterations, when to replace, sizing for kids, etc.).
- `picks`: 3–5 honest shopping suggestions as product TYPES/features with a retailer search phrase (`query`). Don't claim specific products have specific measurements, and don't name products you aren't sure of.
- `faqs`: 5–8, drawn from the real keywords (e.g. "should running shoes be tight or loose"). Fold in small variant queries (e.g. "how should cowgirl boots fit" as an FAQ on the cowboy boots page). No duplicate questions.
- `related`: 6–10 slugs of OTHER planned guides (same category first, then close neighbours). Only slugs that exist in research/wave1-fit-guides.json.
- `updated`: "2026-11-19".
- Total item-specific content 900–1,800 words (validator enforces ≥ 900).
- NEVER invent reviews, testimonials, "we tested", "customers say", statistics or studies. No made-up brand claims.
- No curly braces, no double spaces, no "TODO".
- Health items (condom, retainer, night guard, breast pump flange, compression socks, arm sling, also diaper/life jacket/helmets where safety applies): give general fit information only, set `caution` to a short note pointing to the right professional (dentist/orthodontist, lactation consultant, doctor, pharmacist), and add an authoritative source in `sources` (e.g. CDC, NHS, ADA, Mayo Clinic, US Coast Guard, NHTSA, CPSC) only if you are confident the URL is real; otherwise omit `sources`.
- Plain, direct US English. Sentence case. No fluff intros ("When it comes to…"). Write like a knowledgeable salesperson/tailor talking to a customer.
- Use typographic characters: ′ ″ for feet/inches in heights, ½ ¼, en dash for ranges (1–2 in).

When done, reply with the list of files written and confirm each validates.
