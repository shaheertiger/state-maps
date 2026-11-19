import { allBrands, allCategories, allGuides } from "./content";
import { compatPages } from "./compat";
import { TOOLS, abs, brandPath, compatPath, guidePath, hubPath } from "./site";

export type Entry = { path: string; lastmod: string; title: string; kind: "fit" | "hub" | "compat" | "sizing" | "tool" | "page" };
const BUILD_DATE = "2026-11-19";

export function allEntries(): Entry[] {
  const e: Entry[] = [
    { path: "/", lastmod: BUILD_DATE, title: "Home", kind: "page" },
    { path: "/fit/", lastmod: BUILD_DATE, title: "How should it fit?", kind: "hub" },
    { path: "/will-it-fit/", lastmod: BUILD_DATE, title: "Will it fit?", kind: "compat" },
    { path: "/sizing/", lastmod: BUILD_DATE, title: "Brand sizing", kind: "sizing" },
    { path: "/tools/", lastmod: BUILD_DATE, title: "Tools", kind: "tool" },
    ...["about", "methodology", "affiliate-disclosure", "contact", "privacy"].map((p) => ({ path: `/${p}/`, lastmod: BUILD_DATE, title: p, kind: "page" as const })),
  ];
  for (const c of allCategories()) e.push({ path: hubPath(c.slug), lastmod: BUILD_DATE, title: c.name, kind: "hub" });
  for (const g of allGuides()) e.push({ path: guidePath(g.slug), lastmod: g.updated, title: g.h1, kind: "fit" });
  for (const p of compatPages()) e.push({ path: compatPath(p.slug), lastmod: BUILD_DATE, title: p.h1, kind: "compat" });
  for (const b of allBrands()) {
    e.push({ path: brandPath(b.slug), lastmod: b.checked, title: b.h1, kind: "sizing" });
    for (const p of b.products ?? []) e.push({ path: brandPath(b.slug, p.slug), lastmod: b.checked, title: p.h1, kind: "sizing" });
  }
  for (const t of TOOLS) e.push({ path: `/tools/${t.slug}/`, lastmod: BUILD_DATE, title: t.name, kind: "tool" });
  return e;
}

export function urlset(entries: Entry[]) {
  const body = entries.map((x) => `  <url><loc>${abs(x.path)}</loc><lastmod>${x.lastmod}</lastmod></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

export const SITEMAPS = {
  "sitemap-fit.xml": (x: Entry) => x.kind === "fit" || x.kind === "hub",
  "sitemap-will-it-fit.xml": (x: Entry) => x.kind === "compat",
  "sitemap-sizing.xml": (x: Entry) => x.kind === "sizing",
  "sitemap-tools.xml": (x: Entry) => x.kind === "tool" || x.kind === "page",
} as const;
