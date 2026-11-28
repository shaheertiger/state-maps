import { allBrands, allCategories, allGuides, guidesIn } from "./content";
import { compatPages, LAUNCH_DATE } from "./compat";
import { TOOLS, abs, brandPath, compatPath, guidePath, hubPath } from "./site";

export type Entry = { path: string; lastmod: string; title: string; kind: "fit" | "hub" | "compat" | "sizing" | "tool" | "page" };

/**
 * lastmod is the date a page's content last changed, never the build time:
 * guides use `updated`, will-it-fit pages `updated` (or launch), brand pages `checked`,
 * products the later of `checked` and their own `updated`, and list pages the newest
 * date among the pages they list. Fixed pages carry the date they were last edited below.
 */
const PAGE_UPDATED: Record<string, string> = {
  about: "2026-11-28",
  methodology: LAUNCH_DATE,
  "affiliate-disclosure": "2026-11-28",
  contact: "2026-11-28",
  privacy: "2026-11-28",
};
const newest = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), LAUNCH_DATE);

export function allEntries(): Entry[] {
  const guides = allGuides();
  const compat = compatPages();
  const brands = allBrands();
  const productDate = (checked: string, updated?: string) => newest([checked, updated ?? checked]);
  const sizingDates = brands.flatMap((b) => [b.checked, ...(b.products ?? []).map((p) => productDate(b.checked, p.updated))]);
  const fitDate = newest(guides.map((g) => g.updated));
  const compatDate = newest(compat.map((p) => p.updated));
  const sizingDate = newest(sizingDates);
  const e: Entry[] = [
    { path: "/", lastmod: newest([fitDate, compatDate, sizingDate]), title: "Home", kind: "page" },
    { path: "/fit/", lastmod: fitDate, title: "How should it fit?", kind: "hub" },
    { path: "/will-it-fit/", lastmod: compatDate, title: "Will it fit?", kind: "compat" },
    { path: "/sizing/", lastmod: sizingDate, title: "Brand sizing", kind: "sizing" },
    { path: "/tools/", lastmod: LAUNCH_DATE, title: "Tools", kind: "tool" },
    ...Object.entries(PAGE_UPDATED).map(([p, d]) => ({ path: `/${p}/`, lastmod: d, title: p, kind: "page" as const })),
  ];
  for (const c of allCategories())
    e.push({ path: hubPath(c.slug), lastmod: newest(guidesIn(c.slug).map((g) => g.updated)), title: c.name, kind: "hub" });
  for (const g of guides) e.push({ path: guidePath(g.slug), lastmod: g.updated, title: g.h1, kind: "fit" });
  for (const p of compat) e.push({ path: compatPath(p.slug), lastmod: p.updated, title: p.h1, kind: "compat" });
  for (const b of brands) {
    e.push({ path: brandPath(b.slug), lastmod: b.checked, title: b.h1, kind: "sizing" });
    for (const p of b.products ?? []) e.push({ path: brandPath(b.slug, p.slug), lastmod: productDate(b.checked, p.updated), title: p.h1, kind: "sizing" });
  }
  for (const t of TOOLS) e.push({ path: `/tools/${t.slug}/`, lastmod: LAUNCH_DATE, title: t.name, kind: "tool" });
  return e;
}

export function urlset(entries: Entry[]) {
  const body = entries.map((x) => `  <url><loc>${abs(x.path)}</loc><lastmod>${x.lastmod}</lastmod></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

/** Newest lastmod in a child sitemap, for the sitemap index. */
export const sitemapLastmod = (entries: Entry[]) => newest(entries.map((x) => x.lastmod));

export const SITEMAPS = {
  "sitemap-fit.xml": (x: Entry) => x.kind === "fit" || x.kind === "hub",
  "sitemap-will-it-fit.xml": (x: Entry) => x.kind === "compat",
  "sitemap-sizing.xml": (x: Entry) => x.kind === "sizing",
  "sitemap-tools.xml": (x: Entry) => x.kind === "tool",
  "sitemap-pages.xml": (x: Entry) => x.kind === "page",
} as const;
