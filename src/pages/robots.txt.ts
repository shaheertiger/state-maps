import { SITE } from "../lib/site";
export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /search/\n\nSitemap: ${SITE.url}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain" } });
}
