import { allEntries, urlset, SITEMAPS } from "@/lib/urls";

export const dynamic = "force-static";
export function GET() {
  return urlset(allEntries().filter(SITEMAPS["sitemap-fit.xml"]));
}
