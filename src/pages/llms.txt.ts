import { APPS, CATEGORIES, reported, tracks, url } from "../lib/data";
import { DATA_TYPES } from "../lib/labels";
import { TOOLS } from "../lib/tools";
import { articles } from "../lib/editorial/content";
import { SITE, abs } from "../lib/site";

/** Plain-text map of the site for AI answer engines. */
export const GET = () => {
  const rep = APPS.filter(reported);
  const lines = [
    `# ${SITE.name} (${SITE.domain})`,
    "",
    `> What ${APPS.length} iPhone apps disclose on their App Store privacy labels: data used to track you, data linked to you, data not linked to you, or no data collected. Labels are developer-reported; ${SITE.name} does not test apps. Snapshot: ${SITE.verifiedLabel}.`,
    "",
    `Key figures: ${rep.length} apps have labels; ${Math.round((rep.filter(tracks).length / rep.length) * 100)}% declare tracking.`,
    "",
    "## URL patterns",
    `- Is {app} safe? (full label explained): ${abs("/is-{app}-safe/")}`,
    `- Does {app} track you?: ${abs("/does-{app}-track-you/")}`,
    `- How to lock {app} on iPhone: ${abs("/how-to-lock-{app}-on-iphone/")}`,
    "",
    "## Hubs",
    `- [All apps by category](${abs("/app-privacy/")})`,
    ...CATEGORIES.map((c) => `- [${c.name} apps](${abs(url.category(c.slug))}): ${c.count} apps`),
    `- [Who tracks you? A–Z](${abs("/does-it-track-you/")})`,
    `- [Data types explained](${abs("/data-types/")})`,
    ...DATA_TYPES.map((d) => `- [${d.name}](${abs(url.dataType(d.slug))}): ${d.plain}`),
    "",
    "## Tools",
    ...TOOLS.map((t) => `- [${t.name}](${abs(`/tools/${t.slug}/`)}): ${t.blurb}`),
    "",
    "## Guides",
    ...articles.map((a) => `- [${a.title}](${abs(`/blog/${a.slug}/`)}): ${a.description}`),
    "",
    `Methodology: ${abs("/data-methodology/")} · Corrections: ${SITE.issues}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
};
