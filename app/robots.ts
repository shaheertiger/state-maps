import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

// Search and AI-search crawlers are welcome; the site is static and cheap to crawl.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search/"] }],
    sitemap: abs("/sitemap.xml"),
  };
}
