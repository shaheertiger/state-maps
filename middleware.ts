import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { htmlPaths } from "./lib/route-index";
import { site } from "./lib/site";
const known = new Set(htmlPaths);
// Same pattern as lib/legacy-app.ts, inlined so the slug map is not bundled into middleware.
const legacyAppPattern = /^\/(?:is-([a-z0-9-]+)-safe|does-([a-z0-9-]+)-track-you|how-to-lock-([a-z0-9-]+)-on-iphone)$/;
const negotiate = createDualmarkMiddleware({ siteUrl: site.url });
export default async function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path.endsWith(".md")) path = path === "/index.md" ? "/" : path.slice(0, -3);
  if (!known.has(path)) {
    // Old name-only app URLs from the Nov 6-11 build resolve in a server route (app/legacy-app).
    const legacy = legacyAppPattern.exec(request.nextUrl.pathname);
    if (legacy) return NextResponse.rewrite(new URL(`/legacy-app/${legacy[1] || legacy[2] || legacy[3]}`, request.url));
    return NextResponse.next();
  }
  const response = await negotiate(request);
  const vary = new Set((response.headers.get("Vary") || "").split(",").map(s => s.trim()).filter(Boolean));
  vary.add("Accept"); vary.add("User-Agent");
  response.headers.set("Vary", [...vary].join(", "));
  return response;
}
export const config = { matcher: [{ source: "/((?!_next/|favicon.ico|md/|og/|sitemaps/|sitemap.xml|robots.txt|llms.txt|social-image|icon|apple-icon).*)", missing: [{ type: "header", key: "next-router-prefetch" }] }] };
