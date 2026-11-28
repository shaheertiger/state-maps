import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

/**
 * Template B engine. Every "Will {A} fit {B}?" page is computed from
 * data/dimensions.json + data/compat.json. Numbers are never typed into copy:
 * editorial text may reference them with [[tokens]] that are resolved here.
 *
 * Tokens: [[a.name]] [[b.name]] [[a.w]] [[a.l]] [[a.h]] [[a.d]] [[b.w]] … (inches, ranges print as "48–50"),
 *         [[a.wcm]] etc. (centimetres), [[diff.w]] [[diff.l]] [[diff.d]] (absolute inch difference, single values only)
 */

const num = z.number().positive();
const range = z.union([num, z.tuple([num, num])]);
const source = z.object({ name: z.string(), url: z.url() });

export const dimItem = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(), // "queen mattress"
  article: z.enum(["a", "an", ""]).default("a"),
  group: z.enum(["mattress", "sheet", "frame", "vehicle", "cup-holder", "bottle", "tv", "storage", "device", "case", "board", "play-yard", "truck-bed", "cart", "car"]),
  shape: z.enum(["rect", "round"]).default("rect"),
  w: range.optional(), // width (in)
  l: range.optional(), // length / depth (in)
  h: range.optional(), // height or thickness (in)
  d: range.optional(), // diameter (in), round items
  dims: z.string().optional(), // human label override e.g. "with seats stowed"
  flexible: z.boolean().optional(), // foam mattress etc. can bend
  note: z.string().optional(),
  source: source.optional(),
});
export type DimItem = z.infer<typeof dimItem>;

export const compatPair = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  a: z.string(),
  b: z.string(),
  relation: z.enum(["on", "in"]),
  mode: z.enum(["fitted-sheet", "footprint", "box", "upright", "round", "standard"]),
  keywords: z.array(z.string()).min(1),
  hub: z.enum(["bedding", "vehicles", "drinkware", "tech", "baby", "moving"]),
  expect: z.enum(["yes", "no", "loosely", "depends"]), // asserted against the computed verdict
  standardVerdict: z.enum(["yes", "no"]).optional(), // mode "standard": verdict decided by a published standard
  answerExtra: z.string(),
  workarounds: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
  picks: z.array(z.object({ label: z.string(), why: z.string(), query: z.string() })).min(1).max(5),
  fitGuides: z.array(z.string()).optional(),
  sources: z.array(source).optional(),
  /** H1 and title question when the computed one doesn't match how people search. Tokens allowed. */
  question: z.string().optional(),
  /** Text after the question in the <title>, e.g. "([[diff.w]] in Too Wide + Cases That Fit)". Default "(Dimensions Compared)". */
  titleHook: z.string().optional(),
  /** Meta description override: the answer plus a reason to click. Tokens allowed; numbers only via tokens. */
  meta: z.string().optional(),
  /** "What does fit": sizes or models compared against the same B (id = a dimensions.json item; slug = its own page). */
  fits: z
    .object({
      intro: z.string().optional(),
      items: z.array(z.object({ id: z.string(), slug: z.string().optional() })).default([]),
    })
    .optional(),
  /** Date the page's content last changed (sitemap lastmod, dateModified). */
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
export type CompatPair = z.infer<typeof compatPair>;

export type Verdict = "yes" | "no" | "loosely" | "depends";
export type CompatPage = {
  slug: string;
  pair: CompatPair;
  a: DimItem;
  b: DimItem;
  verdict: Verdict;
  h1: string;
  title: string;
  meta: string;
  answer: string;
  rows: { label: string; a: string; b: string; diff: string }[];
  keywords: string[];
  workarounds: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  sources: { name: string; url: string }[];
  fits: { intro?: string; rows: { item: DimItem; slug?: string; dims: string; verdict: Verdict }[] } | null;
  updated: string;
};

/** Launch date: the lastmod of every page that hasn't changed since. */
export const LAUNCH_DATE = "2026-11-19";

const lo = (r: number | [number, number]) => (Array.isArray(r) ? r[0] : r);
const hi = (r: number | [number, number]) => (Array.isArray(r) ? r[1] : r);
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
export const inch = (r?: number | [number, number]) => (r === undefined ? "" : Array.isArray(r) ? `${fmt(r[0])}–${fmt(r[1])}` : fmt(r));
export const cm = (r?: number | [number, number]) =>
  r === undefined ? "" : Array.isArray(r) ? `${Math.round(r[0] * 2.54)}–${Math.round(r[1] * 2.54)}` : String(Math.round(r * 2.54));

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const withArticle = (i: DimItem) => (i.article ? `${i.article} ${i.name}` : i.name);
const theItem = (i: DimItem) => (i.article ? `the ${i.name}` : i.name);

/** Small items (largest side under 20 in) get one decimal in cm so "0.55 in" doesn't print as "1 cm". */
function cmFor(i: DimItem) {
  const sides = [i.w, i.l, i.h, i.d].filter((x) => x !== undefined).map((x) => hi(x!));
  if (Math.max(...sides) >= 20) return cm;
  const one = (n: number) => String(Math.round(n * 25.4) / 10);
  return (r?: number | [number, number]) => (r === undefined ? "" : Array.isArray(r) ? `${one(r[0])}–${one(r[1])}` : one(r));
}

/** "60 × 80 in (152 × 203 cm)", plus "and 39.4 in (100 cm) tall" when hWord is given, plus the item's dims label. */
function dimsLabel(i: DimItem, hWord?: string): string {
  const c = cmFor(i);
  if (i.shape === "round" && i.d !== undefined) return `${inch(i.d)} in (${c(i.d)} cm) across`;
  const parts = [i.w, i.l].filter((x) => x !== undefined) as (number | [number, number])[];
  let s = `${parts.map(inch).join(" × ")} in (${parts.map(c).join(" × ")} cm)`;
  if (hWord && i.h !== undefined) s += ` and ${inch(i.h)} in (${c(i.h)} cm) ${hWord}`;
  if (i.dims) s += `, ${i.dims}`;
  return s;
}

/** Decide whether A fits B. */
function decide(pair: CompatPair, a: DimItem, b: DimItem): Verdict {
  const need = (v: unknown, what: string) => {
    if (v === undefined) throw new Error(`${pair.slug}: ${what} is missing`);
  };
  switch (pair.mode) {
    case "standard":
      need(pair.standardVerdict, "standardVerdict");
      return pair.standardVerdict!;
    case "fitted-sheet": {
      // A = sheet, B = mattress. Smaller in any direction: no. Up to ~6 in bigger: loosely. Otherwise no.
      need(a.w, "a.w"); need(a.l, "a.l"); need(b.w, "b.w"); need(b.l, "b.l");
      const dw = hi(a.w!) - hi(b.w!);
      const dl = hi(a.l!) - hi(b.l!);
      if (dw === 0 && dl === 0) return "yes";
      if (dw < 0 || dl < 0) return "no";
      if (dw <= 6 && dl <= 6) return "loosely";
      return "no";
    }
    case "footprint": {
      // Flat rectangle inside a rectangle (rotation allowed). B may be a range.
      need(a.w, "a.w"); need(a.l, "a.l"); need(b.w, "b.w"); need(b.l, "b.l");
      const [aw, al] = [hi(a.w!), hi(a.l!)].sort((x, y) => x - y);
      const [bwLo, blLo] = [lo(b.w!), lo(b.l!)].sort((x, y) => x - y);
      const [bwHi, blHi] = [hi(b.w!), hi(b.l!)].sort((x, y) => x - y);
      if (pair.relation === "on" && b.group === "frame") {
        if (aw === bwHi && al === blHi) return "yes";
        if (aw > bwHi || al > blHi) return "no";
        return "loosely";
      }
      if (aw <= bwLo && al <= blLo) return "yes";
      if (aw > bwHi || al > blHi) return "no";
      return "depends";
    }
    case "box":
    case "upright": {
      need(a.w, "a.w"); need(a.l, "a.l"); need(a.h, "a.h"); need(b.w, "b.w"); need(b.l, "b.l"); need(b.h, "b.h");
      const fits = (bw: number, bl: number, bh: number) => {
        if (pair.mode === "upright") {
          const [aw, al] = [hi(a.w!), hi(a.l!)].sort((x, y) => x - y);
          const [w, l] = [bw, bl].sort((x, y) => x - y);
          return hi(a.h!) <= bh && aw <= w && al <= l;
        }
        const as = [hi(a.w!), hi(a.l!), hi(a.h!)].sort((x, y) => x - y);
        const bs = [bw, bl, bh].sort((x, y) => x - y);
        return as.every((v, i) => v <= bs[i]);
      };
      if (fits(lo(b.w!), lo(b.l!), lo(b.h!))) return "yes";
      if (!fits(hi(b.w!), hi(b.l!), hi(b.h!))) return "no";
      return "depends";
    }
    case "round": {
      need(a.d, "a.d"); need(b.d, "b.d");
      if (hi(a.d!) <= lo(b.d!)) return "yes";
      if (lo(a.d!) > hi(b.d!)) return "no";
      return "depends";
    }
  }
}

function resolveTokens(text: string, a: DimItem, b: DimItem, where: string): string {
  return text.replace(/\[\[([a-z]+)\.([a-z]+)\]\]/g, (_m, who: string, key: string) => {
    if (who === "diff") {
      const k = key as "w" | "l" | "h" | "d";
      const av = a[k], bv = b[k];
      if (typeof av !== "number" || typeof bv !== "number") throw new Error(`${where}: [[diff.${key}]] needs single values`);
      return fmt(Math.abs(av - bv));
    }
    const item = who === "a" ? a : who === "b" ? b : null;
    if (!item) throw new Error(`${where}: unknown token [[${who}.${key}]]`);
    if (key === "name") return item.name;
    const isCm = key.endsWith("cm");
    const k = (isCm ? key.slice(0, -2) : key) as "w" | "l" | "h" | "d";
    const v = item[k];
    if (v === undefined) throw new Error(`${where}: [[${who}.${key}]] has no value`);
    return isCm ? cm(v) : inch(v);
  });
}

const VERDICT_WORD: Record<Verdict, string> = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "It depends" };

function verdictSentence(pair: CompatPair, a: DimItem, b: DimItem, v: Verdict): string {
  const A = withArticle(a), B = withArticle(b);
  // Heights only matter (and are only printed) when the check is three-dimensional.
  const hWord = pair.mode === "upright" ? "tall" : pair.mode === "box" ? "deep" : undefined;
  const dimA = dimsLabel(a, hWord), dimB = dimsLabel(b, hWord);
  if (pair.mode === "fitted-sheet" || (pair.mode === "footprint" && pair.relation === "on")) {
    const dw = hi(a.w!) - hi(b.w!), dl = hi(a.l!) - hi(b.l!);
    const parts: string[] = [];
    if (dw) parts.push(`${fmt(Math.abs(dw))} in ${dw > 0 ? "wider" : "narrower"}`);
    if (dl) parts.push(`${fmt(Math.abs(dl))} in ${dl > 0 ? "longer" : "shorter"}`);
    const rel = parts.length ? `${parts.join(" and ")} than` : "exactly the same size as";
    return `${VERDICT_WORD[v]}. ${cap(A)} is ${dimA}, ${rel} ${B} at ${dimB}.`;
  }
  if (pair.mode === "round") return `${VERDICT_WORD[v]}. ${cap(theItem(a))} is ${dimA} at the base; ${b.name}s are typically ${dimB}.`;
  return `${VERDICT_WORD[v]}. ${cap(A)} measures ${dimA}; ${theItem(b)} is ${dimB}.`;
}

function rowsFor(a: DimItem, b: DimItem) {
  const rows: CompatPage["rows"] = [];
  const keys: [keyof DimItem, string][] = [["w", "Width"], ["l", "Length"], ["h", "Height / depth"], ["d", "Diameter"]];
  for (const [k, label] of keys) {
    const av = a[k] as number | [number, number] | undefined, bv = b[k] as number | [number, number] | undefined;
    if (av === undefined && bv === undefined) continue;
    let diff = "—";
    if (typeof av === "number" && typeof bv === "number") {
      const d = av - bv;
      diff = d === 0 ? "same" : `${d > 0 ? "+" : "−"}${fmt(Math.abs(d))} in (${Math.round(Math.abs(d) * 2.54)} cm)`;
    }
    rows.push({
      label,
      a: av === undefined ? "—" : `${inch(av)} in (${cm(av)} cm)`,
      b: bv === undefined ? "—" : `${inch(bv)} in (${cm(bv)} cm)`,
      diff,
    });
  }
  return rows;
}

function questionFor(pair: CompatPair, a: DimItem, b: DimItem) {
  const verb = a.group === "sheet" ? "Do" : pair.mode === "round" ? "Does" : "Will";
  const subj = a.group === "sheet" ? `${a.name.replace(/ sheet$/, "")} sheets` : withArticle(a);
  const prep = pair.relation === "on" ? "on" : "in";
  // Keep unit abbreviations after a number lowercase ("32 oz", not "32 Oz").
  return titleCase(`${verb} ${subj} fit ${prep} ${withArticle(b)}?`).replace(/(\d) (Oz|Ft|Mm|Cm|Lb)\b/g, (_m, d: string, u: string) => `${d} ${u.toLowerCase()}`);
}

const SMALL = new Set(["a", "an", "the", "on", "in", "of", "and", "or", "to", "for", "at", "by"]);
export function titleCase(s: string) {
  return s
    .split(" ")
    .map((w, i) => (i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : /^[a-z]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

let cache: CompatPage[] | null = null;
export function compatPages(): CompatPage[] {
  if (cache) return cache;
  const root = process.cwd();
  const dimsFile = path.join(root, "data/dimensions.json");
  const pairsFile = path.join(root, "data/compat.json");
  if (!fs.existsSync(dimsFile) || !fs.existsSync(pairsFile)) return [];
  const items = z.array(dimItem).parse(JSON.parse(fs.readFileSync(dimsFile, "utf8")));
  const pairs = z.array(compatPair).parse(JSON.parse(fs.readFileSync(pairsFile, "utf8")));
  const byId = new Map(items.map((i) => [i.id, i]));
  const seen = new Set<string>();
  cache = pairs.map((pair) => {
    if (seen.has(pair.slug)) throw new Error(`duplicate compat slug ${pair.slug}`);
    seen.add(pair.slug);
    const a = byId.get(pair.a), b = byId.get(pair.b);
    if (!a || !b) throw new Error(`${pair.slug}: unknown item ${!a ? pair.a : pair.b}`);
    const verdict = decide(pair, a, b);
    if (verdict !== pair.expect) throw new Error(`${pair.slug}: computed verdict "${verdict}" but data expects "${pair.expect}" — check the dimensions`);
    const r = (t: string, w: string) => resolveTokens(t, a, b, `${pair.slug} ${w}`);
    const h1 = pair.question ? r(pair.question, "question") : questionFor(pair, a, b);
    const answer = `${verdictSentence(pair, a, b, verdict)} ${r(pair.answerExtra, "answerExtra")}`;
    return {
      slug: pair.slug,
      pair,
      a,
      b,
      verdict,
      h1,
      title: `${h1.replace(/\?$/, "")}? ${pair.titleHook ? r(pair.titleHook, "titleHook") : "(Dimensions Compared)"}`,
      meta: pair.meta
        ? r(pair.meta, "meta")
        : `${VERDICT_WORD[verdict]}. ${cap(withArticle(a))} is ${dimsLabel(a)}; ${withArticle(b)} is ${dimsLabel(b)}. Here's the difference and what to do.`,
      answer,
      rows: rowsFor(a, b),
      keywords: pair.keywords,
      workarounds: pair.workarounds.map((w, i) => ({ title: r(w.title, `workarounds[${i}]`), text: r(w.text, `workarounds[${i}]`) })),
      faqs: pair.faqs.map((f, i) => ({ q: r(f.q, `faqs[${i}]`), a: r(f.a, `faqs[${i}]`) })),
      fits: pair.fits
        ? {
            intro: pair.fits.intro ? r(pair.fits.intro, "fits.intro") : undefined,
            rows: pair.fits.items.map(({ id, slug }) => {
              const item = byId.get(id);
              if (!item) throw new Error(`${pair.slug}: fits lists unknown item ${id}`);
              if (slug && !pairs.some((x) => x.slug === slug)) throw new Error(`${pair.slug}: fits links to unknown page ${slug}`);
              return { item, slug, dims: dimsLabel(item), verdict: decide({ ...pair, a: id }, item, b) };
            }),
          }
        : null,
      updated: pair.updated ?? LAUNCH_DATE,
      sources: [...(pair.sources ?? []), ...[a.source, b.source, ...(pair.fits?.items ?? []).map((f) => byId.get(f.id)?.source)].filter((s): s is { name: string; url: string } => !!s)].filter(
        (s, i, arr) => arr.findIndex((x) => x.url === s.url) === i,
      ),
    };
  });
  return cache;
}

export function dimensionItems(): DimItem[] {
  const file = path.join(process.cwd(), "data/dimensions.json");
  return fs.existsSync(file) ? z.array(dimItem).parse(JSON.parse(fs.readFileSync(file, "utf8"))) : [];
}

export const HUBS: Record<CompatPair["hub"], { name: string; blurb: string }> = {
  bedding: { name: "Mattresses, sheets and bed frames", blurb: "Which mattress fits which frame, and which sheets fit which bed." },
  vehicles: { name: "Will it fit in my car?", blurb: "Mattresses and TVs in minivans, SUVs, cars and cargo vans." },
  drinkware: { name: "Bottles and cup holders", blurb: "Water bottle base sizes compared with typical car cup holders." },
  tech: { name: "Devices, cases and PC parts", blurb: "Cases, consoles and motherboard form factors." },
  baby: { name: "Baby gear", blurb: "Crib and play yard mattresses, and why exact fit matters." },
  moving: { name: "Storage, trucks and moving", blurb: "Cars in storage units and carts in truck beds." },
};
