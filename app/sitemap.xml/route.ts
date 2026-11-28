import { SITEMAPS, allEntries, sitemapLastmod } from "@/lib/urls";
import { abs } from "@/lib/site";

export const dynamic = "force-static";
export function GET() {
  const entries = allEntries();
  const items = (Object.keys(SITEMAPS) as (keyof typeof SITEMAPS)[])
    .map((f) => `  <sitemap><loc>${abs(`/${f}`)}</loc><lastmod>${sitemapLastmod(entries.filter(SITEMAPS[f]))}</lastmod></sitemap>`)
    .join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
