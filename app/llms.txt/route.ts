import { indexablePaths as htmlPaths } from "@/lib/markdown";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export function GET() { const body = [`# ${site.name}`, `> ${site.description}`, "## Pages", ...htmlPaths.map(path => `- [${path === "/" ? "Home" : path.slice(1).replaceAll("-", " ")}](${site.url}${path === "/" ? "/index.md" : path + ".md"})`)].join("\n\n"); return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
