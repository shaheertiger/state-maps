import { SITE } from "../lib/site";
import { allArticles, apps, comparisons, compareUrl, reviewUrl, categories, categoryUrl, hasAltPage, altUrl } from "../data/index";

const DATE = "2026-11-08";
export function GET() {
  const urls: { loc: string; lastmod: string; pri: string }[] = [
    { loc: "/", lastmod: DATE, pri: "1.0" },
    ...allArticles.map((a) => ({ loc: a.url, lastmod: a.updated, pri: a.kind === "list" ? "0.9" : "0.8" })),
    ...categories.map((c) => ({ loc: categoryUrl(c.slug), lastmod: DATE, pri: "0.7" })),
    ...apps.map((a) => ({ loc: reviewUrl(a.slug), lastmod: DATE, pri: "0.7" })),
    ...apps.filter(hasAltPage).map((a) => ({ loc: altUrl(a.slug), lastmod: DATE, pri: "0.6" })),
    ...comparisons.map((c) => ({ loc: compareUrl(c), lastmod: DATE, pri: "0.6" })),
    ...["/reviews/", "/guides/", "/compare/", "/about/", "/how-we-review/", "/editorial-policy/", "/affiliate-disclosure/", "/contact/", "/privacy/", "/terms/"].map((p) => ({ loc: p, lastmod: DATE, pri: "0.4" })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE.url}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.pri}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
