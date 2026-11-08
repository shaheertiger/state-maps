import { SITE } from "../lib/site";
import { listicles, guides, apps, listUrl, guideUrl, reviewUrl } from "../data/index";
export function GET() {
  const t = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Rankings",
    ...listicles.map((l) => `- [${l.title}](${SITE.url}${listUrl(l.slug)}): ${l.description}`),
    "",
    "## Guides",
    ...guides.map((g) => `- [${g.title}](${SITE.url}${guideUrl(g.slug)}): ${g.answer}`),
    "",
    "## Reviews",
    ...apps.map((a) => `- [${a.name} review](${SITE.url}${reviewUrl(a.slug)}): ${a.oneLiner}`),
    "",
  ].join("\n");
  return new Response(t, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
