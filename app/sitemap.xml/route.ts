import { SITEMAPS } from "@/lib/urls";
import { abs } from "@/lib/site";

export const dynamic = "force-static";
export function GET() {
  const items = Object.keys(SITEMAPS)
    .map((f) => `  <sitemap><loc>${abs(`/${f}`)}</loc></sitemap>`)
    .join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
