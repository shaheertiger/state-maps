import { z } from "zod";

/**
 * Content schemas. Every JSON file under content/ and data/ is parsed with these
 * at build time (scripts/validate.ts and lib/content.ts). A file that does not
 * match fails the build.
 */

export const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "lowercase-hyphen slug");

export const CATEGORY_SLUGS = [
  "suits",
  "footwear",
  "running",
  "boots",
  "jeans-pants",
  "tops-outerwear",
  "lingerie",
  "hats-helmets",
  "sports-gear",
  "jewelry-watches",
  "eyewear",
  "baby",
  "health",
] as const;
export const categorySlug = z.enum(CATEGORY_SLUGS);
export type CategorySlug = z.infer<typeof categorySlug>;

/** Diagram silhouettes and the named fit points each one can label. See lib/diagrams.tsx. */
export const SHAPE_ANCHORS = {
  jacket: ["collar", "shoulders", "chest", "button", "waist", "sleeve", "cuff", "hem", "armhole"],
  shirt: ["collar", "shoulders", "chest", "armhole", "sleeve", "cuff", "waist", "hem"],
  torso: ["neck", "shoulders", "chest", "armhole", "waist", "hem", "sides"],
  pants: ["waist", "rise", "seat", "thigh", "knee", "leg", "hem"],
  shorts: ["waist", "rise", "seat", "thigh", "hem"],
  shoe: ["toe", "ball", "instep", "arch", "heel", "collar", "length"],
  boot: ["toe", "ball", "instep", "arch", "heel", "shaft", "calf"],
  sandal: ["toe", "edge", "strap", "arch", "heel", "length"],
  bra: ["band", "cups", "underwire", "gore", "straps", "neckline"],
  ring: ["band", "finger", "knuckle", "gap"],
  wrist: ["wrist", "bone", "gap", "clasp", "case"],
  glasses: ["frame", "lens", "bridge", "temple", "ear"],
  hat: ["crown", "brim", "brow", "sides", "back"],
  helmet: ["brow", "forehead", "sides", "ears", "back", "strap"],
  glove: ["fingertips", "fingers", "palm", "thumb", "knuckles", "wrist"],
  leg: ["toe", "heel", "ankle", "calf", "knee", "top"],
  dog: ["neck", "chest", "girth", "shoulders", "legs"],
  diaper: ["waist", "tabs", "legs", "rise", "back"],
  generic: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
} as const;
export type Shape = keyof typeof SHAPE_ANCHORS;
export const shape = z.enum(Object.keys(SHAPE_ANCHORS) as [Shape, ...Shape[]]);

const sentence = z.string().min(2);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const source = z.object({ name: sentence, url: z.url() });

/** A shopping suggestion. `query` becomes a retailer search link (affiliate-tagged). */
export const pick = z.object({
  label: sentence, // "Running shoes in wide (2E) widths"
  why: sentence, // one honest line: who it suits and why
  query: sentence, // search phrase sent to the retailer, e.g. "mens running shoes wide 2E"
});

export const faq = z.object({ q: sentence, a: sentence });

export const sizeTable = z.object({
  caption: sentence,
  headers: z.array(z.string()).min(2),
  rows: z.array(z.array(z.string())).min(2),
  note: z.string().optional(),
  source: source.optional(),
});

/** Template A — "How Should {Item} Fit?" */
export const fitGuide = z
  .object({
    slug,
    item: sentence, // "suit jacket"
    h1: sentence, // "How Should a Suit Jacket Fit?"
    category: categorySlug,
    shape,
    keywords: z.array(z.string()).min(1), // real queries this page targets, best first
    answer: sentence, // 40–60 words, answers the H1 in the first sentence
    intro: z.string().optional(),
    checklist: z
      .array(
        z.object({
          point: sentence, // "Shoulders"
          anchor: z.string(), // must be one of SHAPE_ANCHORS[shape]
          good: sentence,
          tooTight: sentence,
          tooLoose: sentence,
        }),
      )
      .min(3)
      .max(8),
    variations: z.object({
      heading: sentence,
      intro: z.string().optional(),
      items: z.array(z.object({ name: sentence, text: sentence })).min(2),
    }),
    measure: z.object({
      heading: z.string().optional(),
      intro: z.string().optional(),
      steps: z.array(sentence).min(3),
      tip: z.string().optional(),
    }),
    sizeTable: sizeTable.optional(),
    problems: z.array(z.object({ problem: sentence, fix: sentence })).min(3),
    extra: z.array(z.object({ heading: sentence, body: sentence })).optional(),
    picks: z.array(pick).min(3).max(5),
    faqs: z.array(faq).min(5).max(8),
    related: z.array(slug).optional(),
    caution: z.string().optional(), // health/safety note shown in a callout (medical items)
    sources: z.array(source).optional(),
    /** Snippet overrides. Title = "{h1} {checklist count} {titleSuffix}", so the number is always the real count. */
    titleSuffix: z.string().optional(), // "Checks (and Signs It's Too Small)"
    meta: z.string().max(170).optional(),
    updated: isoDate,
  })
  .superRefine((g, ctx) => {
    const anchors = SHAPE_ANCHORS[g.shape] as readonly string[];
    g.checklist.forEach((c, i) => {
      if (!anchors.includes(c.anchor))
        ctx.addIssue({
          code: "custom",
          path: ["checklist", i, "anchor"],
          message: `anchor "${c.anchor}" is not valid for shape "${g.shape}" (use one of: ${anchors.join(", ")})`,
        });
    });
    const words = g.answer.trim().split(/\s+/).length;
    if (words < 35 || words > 70)
      ctx.addIssue({ code: "custom", path: ["answer"], message: `answer box is ${words} words; keep it 40–60` });
  });
export type FitGuide = z.infer<typeof fitGuide>;

/** Template C — brand sizing. Only official brand sources. */
export const brandProduct = z.object({
  slug,
  name: sentence, // "Boston Clog"
  h1: sentence,
  keywords: z.array(z.string()).min(1),
  answer: sentence,
  title: z.string().optional(), // <title> override, e.g. "Do Air Jordan 4s Run Small? Size Up or True to Size (Chart)"
  meta: z.string().max(170).optional(),
  updated: isoDate.optional(), // date this page's copy last changed, if later than the brand's `checked`
  body: z.array(z.object({ heading: sentence, body: sentence })).min(1),
  faqs: z.array(faq).min(3).max(8),
  picks: z.array(pick).min(1).max(5),
});

export const brandSizing = z.object({
  slug, // "dr-martens"
  brand: sentence, // "Dr. Martens"
  h1: sentence, // "How Do Dr. Martens Fit?"
  category: categorySlug,
  keywords: z.array(z.string()).min(1),
  verdict: z.enum(["true to size", "runs small", "runs large", "varies by model", "size down", "size up"]),
  answer: sentence,
  sizeChart: sizeTable.extend({ source }), // source is REQUIRED for brand charts
  sections: z.array(z.object({ heading: sentence, body: sentence })).min(2),
  comparison: z.string().optional(), // how it compares with Nike/Converse/etc.
  faqs: z.array(faq).min(3).max(8),
  picks: z.array(pick).min(1).max(5),
  products: z.array(brandProduct).optional(),
  sources: z.array(source).min(1),
  checked: isoDate, // date the sources were last checked
});
export type BrandSizing = z.infer<typeof brandSizing>;

export const category = z.object({
  slug: categorySlug,
  name: sentence,
  short: sentence,
  description: sentence,
  intro: sentence,
  faqs: z.array(faq).min(3),
});
export type Category = z.infer<typeof category>;
