# Brief: "Will {A} fit {B}?" compatibility data

Repo: /home/user/state-maps. Do NOT run git. Only edit data/dimensions.json and data/compat.json.

## How it works
Read `lib/compat.ts` fully. Pages are computed: the engine decides the verdict from dimensions (`decide()`), writes the first answer sentence itself, builds the dimensions table, and asserts your `expect` equals the computed verdict (build fails otherwise — that's the safety net for wrong numbers). Your editorial text (`answerExtra`, `workarounds`, `faqs`) must NOT type measurements by hand: reference them with tokens like [[a.w]], [[b.l]], [[a.wcm]], [[diff.w]] (see top of lib/compat.ts). Plain prose without numbers is fine. Facts that aren't dimensions of A or B (e.g. "a box spring can't bend") are fine in prose.

Items in data/dimensions.json are in inches. Ranges `[min, max]` describe "typical" spaces (vehicles, cup holders). Every non-bedding item needs a `source` (a real, reputable URL you actually opened: manufacturer spec page, CPSC/ASTM, Intel/ATX spec, etc.). Use WebSearch/WebFetch to research. If you can't find solid numbers for an item, use a conservative typical range and say "typical" in `dims` or `note`, or drop the pair and report it.

## Pairs to create in data/compat.json (slug → a / b)
Bedding (mattress/sheet/frame items already exist):
- queen-mattress-on-full-frame (footprint, on) · full-mattress-on-queen-frame · king-mattress-on-queen-frame · king-mattress-on-california-king-frame · california-king-mattress-on-king-frame
- full-sheets-on-queen-bed (fitted-sheet) · queen-sheets-on-full-bed · twin-xl-sheets-on-twin-bed · twin-sheets-on-twin-xl-bed · king-sheets-on-california-king-bed · california-king-sheets-on-king-bed
Vehicles (mode "footprint" for a mattress lying flat; "upright" for a boxed TV that must travel upright):
- queen-mattress-in-minivan · queen-mattress-in-suv · queen-mattress-in-cargo-van · 65-inch-tv-in-car · 55-inch-tv-in-car (for TVs, the item is the TV in its retail box; the space is a typical midsize SUV / hatchback cargo area with rear seats folded — pick and name a clear "typical" vehicle class in `name`, e.g. "midsize SUV (seats folded)")
Drinkware (mode "round"):
- owala-32-oz-in-cup-holder · owala-24-oz-in-cup-holder · owala-in-cup-holder (pick which bottle the general page uses; mention the other sizes in FAQs) — Owala FreeSip base diameters must come from Owala or a major retailer listing; cup holder = typical car cup holder diameter range.
Tech:
- switch-2-in-switch-1-case (mode "box"; Nintendo official dimensions; case interior ≈ Switch 1 body + small tolerance: state as "a case made for the original Switch (sized to 239 × 102 × 14 mm)")
- micro-atx-in-atx-case (mode "standard", standardVerdict "yes", cite the ATX / microATX spec: microATX boards use a subset of ATX mounting holes)
Baby:
- crib-mattress-in-pack-and-play (mode "footprint", in; full-size crib mattress per CPSC 16 CFR 1241 vs a typical play yard floor). Safety: never add a non-matching mattress to a play yard (CPSC). Put that in answerExtra and an FAQ.
Moving:
- car-in-10x20-storage-unit (mode "footprint"; typical midsize sedan/SUV footprint vs 10 × 20 ft unit) · golf-cart-in-truck-bed (mode "footprint", relation in; a typical 2-seat golf cart vs a full-size pickup bed range with tailgate closed; explain tailgate-down and wheel-well width in answerExtra).

## Each pair
- `hub`: bedding | vehicles | drinkware | tech | baby | moving
- `keywords`: real queries from research/keywords.json (`pages` where type == "size compatibility", match on page name), best first; include merged variants (e.g. "queen size mattress / minivan" into queen-mattress-in-minivan).
- `answerExtra`: 1–3 sentences after the computed verdict sentence: what it means in practice.
- `workarounds`: 2–5 {title, text}. `faqs`: 4–7 {q,a} from real queries. `picks`: 1–3 honest retailer search phrases.
- `fitGuides` (optional): slugs from research/wave1-fit-guides.json, rarely relevant.
- No curly braces, no double spaces.

Validate: `cd /home/user/state-maps && npx tsx scripts/validate.ts` (whole-site mode; ignore warnings about missing fit guides / categories, fix every error mentioning compat). For a quick check you can also run:
    npx tsx -e "import('./lib/compat.ts').then(m=>{for(const p of m.compatPages()) console.log(p.slug,'|',p.verdict,'|',p.h1,'\n ',p.answer)})"
Read every generated H1 and answer sentence and make sure they read naturally; adjust item `name`/`article`/`dims` if not. Final reply: list of pairs, verdicts, and any dropped pairs with reasons.
