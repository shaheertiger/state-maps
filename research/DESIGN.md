# Design plan

**Subject:** fit and sizing answers for shoppers about to buy. Mostly arriving from Google on a phone, wanting one answer fast, then the detail.

**World it borrows from:** the tailor's bench. That means measuring tape, chalk marks on cloth, pattern paper and size tags. It doesn't borrow from editorial magazines.

## Tokens
| Name | Hex | Role |
|---|---|---|
| paper | #F2F4F0 | page background, a cool pattern-paper grey-green (deliberately not cream) |
| ink | #18202E | text, rules, the navy of a marking pen |
| tape | #F3C631 | measuring-tape yellow: the header strip, diagram pins, focus ring |
| chalk | #2B5FA6 | tailor's chalk blue: links and diagram line work |
| pin | #B23A2E | "too tight" |
| sage | #2F7354 | "fits right" |

Dark mode swaps to an ink background (#151B27) with chalk lightened to #8FB3E8. Tape yellow stays.

## Type
One family, Archivo, used at two widths. Headlines use Archivo at 72% width and weight 800, like the condensed lettering on a size tag. Body text uses the normal width at 400. The scale is 1.25 (Elements-style), with 17px body text at 1.6 line height and a 68ch measure.

## Layout
Everything is left-aligned. Guide pages have a main column (68ch) and a right rail holding the fit diagram and "On this page". On mobile it becomes one column, with the diagram placed after the answer.

```
[tape strip ───────────────────────────────]
Fit Guides   How should it fit · Will it fit · Brand sizing · Tools   [search]
Breadcrumb
HOW SHOULD A SUIT JACKET FIT?          ┌ diagram ┐
┌ short answer (label w/ stitch) ┐     │  ①②③   │
Checklist table                        └─────────┘
...                                     On this page
```

## Principles
- The tape strip is the one bold element. Everything else stays quiet: hairline rules, no shadows, no gradients, no card grid.
- Status is always text plus colour: "Fits right", "Too tight", "Too loose".
- Numbers only where they mean something. The diagram pins are numbered because they map to checklist rows.
- No all-caps eyebrows, no monospace labels, no arrows on links.
