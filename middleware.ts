import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { htmlPaths } from "./lib/route-index";
import { site } from "./lib/site";
const known = new Set(htmlPaths);
const negotiate = createDualmarkMiddleware({ siteUrl: site.url });
export default async function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path.endsWith(".md")) path = path === "/index.md" ? "/" : path.slice(0, -3);
  if (!known.has(path)) return NextResponse.next();
  const response = await negotiate(request);
  const vary = new Set((response.headers.get("Vary") || "").split(",").map(s => s.trim()).filter(Boolean));
  vary.add("Accept"); vary.add("User-Agent");
  response.headers.set("Vary", [...vary].join(", "));
  return response;
}
export const config = { matcher: [{ source: "/((?!_next/|favicon.ico|md/|og/|sitemaps/|sitemap.xml|robots.txt|llms.txt|social-image|icon|apple-icon).*)", missing: [{ type: "header", key: "next-router-prefetch" }] }] };
