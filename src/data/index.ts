import type { App, CategorySlug, Comparison, Flag, Guide, Listicle } from "./types";
import { photoVaults } from "./apps/photo-vaults";
import { appLockers } from "./apps/app-lockers";
import { encryptionApps } from "./apps/encryption";
import { listicles } from "./articles/listicles";
import { guides } from "./articles/guides";
import { comparisons } from "./articles/comparisons";
import { categories, categoryBySlug } from "./categories";

export { categories, categoryBySlug, listicles, guides, comparisons };

export const apps: App[] = [...photoVaults, ...appLockers, ...encryptionApps];

const appMap = new Map(apps.map((a) => [a.slug, a]));
if (appMap.size !== apps.length) throw new Error("Duplicate app slug");

export function getApp(slug: string): App {
  const a = appMap.get(slug);
  if (!a) throw new Error(`Unknown app slug: ${slug}`);
  return a;
}
export const hasApp = (slug: string) => appMap.has(slug);

export const appsIn = (cat: CategorySlug) => apps.filter((a) => a.categories.includes(cat));

// ---- Privacy checklist -------------------------------------------------------
export const FEATURE_LABELS: { key: keyof App["features"]; label: string; hint: string }[] = [
  { key: "encryption", label: "Encrypts files", hint: "Files are encrypted on the device, not just hidden behind a PIN" },
  { key: "endToEnd", label: "End-to-end encrypted cloud", hint: "Backups or sync can't be read by the company" },
  { key: "biometric", label: "Face ID / fingerprint", hint: "Unlock with biometrics" },
  { key: "decoy", label: "Decoy PIN or vault", hint: "A second PIN opens a fake, harmless vault" },
  { key: "intruderAlert", label: "Intruder alerts", hint: "Photographs or logs failed unlock attempts" },
  { key: "disguise", label: "Hidden or disguised icon", hint: "The app can hide or disguise itself" },
  { key: "cloudBackup", label: "Cloud backup", hint: "Your hidden items can be backed up or synced" },
  { key: "noAccount", label: "No account needed", hint: "Works without signing up" },
  { key: "adFree", label: "No ads", hint: "The free version shows no ads" },
];

export const flagText: Record<Flag, string> = {
  yes: "Yes",
  no: "No",
  partial: "Partly",
  unknown: "Not confirmed",
};

/** Count of checklist items an app clearly has (partial = half). Shown as "6.5 / 9". */
export function checklistScore(a: App) {
  let s = 0;
  for (const { key } of FEATURE_LABELS) {
    const f = a.features[key];
    if (f === "yes") s += 1;
    else if (f === "partial") s += 0.5;
  }
  return s;
}

// ---- Articles ----------------------------------------------------------------
export type ArticleRef = {
  slug: string;
  url: string;
  title: string;
  description: string;
  kind: "list" | "guide" | "compare";
  category: CategorySlug;
  updated: string;
};

export const listUrl = (slug: string) => `/${slug}/`;
export const guideUrl = (slug: string) => `/guides/${slug}/`;
export const reviewUrl = (slug: string) => `/reviews/${slug}/`;
export const altUrl = (slug: string) => `/alternatives/${slug}/`;
export const compareSlug = (c: Comparison) => `${c.a}-vs-${c.b}`;
export const compareUrl = (c: Comparison) => `/compare/${compareSlug(c)}/`;
export const categoryUrl = (slug: string) => `/category/${slug}/`;

const listRef = (l: Listicle): ArticleRef => ({
  slug: l.slug,
  url: listUrl(l.slug),
  title: l.title,
  description: l.description,
  kind: "list",
  category: l.category,
  updated: l.updated,
});
const guideRef = (g: Guide): ArticleRef => ({
  slug: g.slug,
  url: guideUrl(g.slug),
  title: g.title,
  description: g.description,
  kind: "guide",
  category: g.category,
  updated: g.updated,
});

export const allArticles: ArticleRef[] = [...listicles.map(listRef), ...guides.map(guideRef)];

export function articleBySlug(slug: string): ArticleRef | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function relatedArticles(slugs: string[], category: CategorySlug, self: string, n = 4): ArticleRef[] {
  const out: ArticleRef[] = [];
  const add = (a?: ArticleRef) => {
    if (a && a.slug !== self && !out.some((o) => o.slug === a.slug)) out.push(a);
  };
  slugs.forEach((s) => add(articleBySlug(s)));
  allArticles.filter((a) => a.category === category).forEach(add);
  allArticles.forEach(add);
  return out.slice(0, n);
}

/** Listicles an app is ranked in, with its position. */
export function listingsFor(appSlug: string) {
  return listicles
    .map((l) => ({ list: l, rank: l.entries.findIndex((e) => e.app === appSlug) + 1, entry: l.entries.find((e) => e.app === appSlug) }))
    .filter((x) => x.rank > 0);
}

export const comparisonsFor = (appSlug: string) => comparisons.filter((c) => c.a === appSlug || c.b === appSlug);

export function comparisonBetween(x: string, y: string) {
  return comparisons.find((c) => (c.a === x && c.b === y) || (c.a === y && c.b === x));
}

/** Alternatives: apps that share the primary category, best-ranked first, then shared platforms. */
export function alternativesFor(app: App, n = 7): App[] {
  const primary = app.categories[0];
  const pillar = listicles.find((l) => l.category === primary);
  const order = new Map((pillar?.entries ?? []).map((e, i) => [e.app, i]));
  const sharedPlatforms = (b: App) => b.platforms.filter((p) => app.platforms.includes(p)).length;
  return apps
    .filter((b) => b.slug !== app.slug && !b.discontinued && b.categories.some((c) => app.categories.includes(c)))
    .filter((b) => sharedPlatforms(b) > 0)
    .sort((x, y) => {
      const ox = order.get(x.slug) ?? 99;
      const oy = order.get(y.slug) ?? 99;
      if (ox !== oy) return ox - oy;
      return checklistScore(y) - checklistScore(x);
    })
    .slice(0, n);
}

export const hasAltPage = (a: App) => alternativesFor(a, 7).length >= 4;

// Integrity checks run at build time so a typo in a slug fails the build instead of shipping a broken page.
for (const l of listicles) for (const e of l.entries) getApp(e.app);
for (const g of guides) for (const s of g.apps) getApp(s);
for (const c of comparisons) {
  getApp(c.a);
  getApp(c.b);
}
