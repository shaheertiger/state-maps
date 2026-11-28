import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { fitGuide, brandSizing, category, type FitGuide, type BrandSizing, type Category, type CategorySlug } from "./schema";

const root = process.cwd();
const readDir = <T,>(dir: string, schema: z.ZodType<T>): T[] => {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => schema.parse(JSON.parse(fs.readFileSync(path.join(full, f), "utf8"))));
};

let guides: FitGuide[] | null = null;
export function allGuides(): FitGuide[] {
  return (guides ??= readDir("content/fit", fitGuide));
}
export const getGuide = (slug: string) => allGuides().find((g) => g.slug === slug);

let brands: BrandSizing[] | null = null;
export function allBrands(): BrandSizing[] {
  return (brands ??= readDir("content/sizing", brandSizing));
}
export const getBrand = (slug: string) => allBrands().find((b) => b.slug === slug);

let cats: Category[] | null = null;
export function allCategories(): Category[] {
  return (cats ??= z.array(category).parse(JSON.parse(fs.readFileSync(path.join(root, "data/categories.json"), "utf8"))));
}
export const getCategory = (slug: string) => allCategories().find((c) => c.slug === slug);

/** Search volume per guide from the keyword research, used to order lists by demand. */
let volumes: Map<string, number> | null = null;
export function guideVolume(slug: string): number {
  if (!volumes) {
    volumes = new Map();
    const file = path.join(root, "research/wave1-fit-guides.json");
    if (fs.existsSync(file))
      for (const p of JSON.parse(fs.readFileSync(file, "utf8")) as { slug: string; volume: number }[]) volumes.set(p.slug, p.volume);
  }
  return volumes.get(slug) ?? 0;
}

export const guidesIn = (cat: CategorySlug) =>
  allGuides()
    .filter((g) => g.category === cat)
    .sort((a, b) => guideVolume(b.slug) - guideVolume(a.slug));

export function relatedGuides(g: FitGuide, n = 8): FitGuide[] {
  const picked = (g.related ?? []).map(getGuide).filter((x): x is FitGuide => !!x);
  for (const other of guidesIn(g.category)) {
    if (picked.length >= n) break;
    if (other.slug !== g.slug && !picked.includes(other)) picked.push(other);
  }
  return picked.slice(0, n);
}

/** "How Should a Suit Jacket Fit? 6-Point Fit Checklist" */
export const guideTitle = (g: FitGuide) => `${g.h1} ${g.checklist.length} ${g.titleSuffix ?? "-Point Fit Checklist"}`.replace(" -Point", "-Point");
export const guideMeta = (g: FitGuide) => {
  if (g.meta) return g.meta;
  const first = g.answer.split(/(?<=[.!?])\s/)[0];
  const meta = `${first} See the fit checklist, how to measure and common fixes.`;
  return meta.length > 300 ? `${first.slice(0, 240)}…` : meta;
};

export const titleCaseItem = (s: string) => s.replace(/\b([a-z])/g, (m) => m.toUpperCase());
