/**
 * Markdown twins and llms.txt, written into out/ after `next build`.
 *
 *   /fit/bra/  ->  /fit/bra.md      (home: /index.md)
 *   /llms.txt                        site summary + every page's twin, grouped by section
 *
 * Each twin is the page's main article converted to Markdown (headings, paragraphs, lists, tables,
 * links), headed by its title, canonical URL and last-updated date. Charts and drawings are skipped.
 */
import fs from "node:fs";
import path from "node:path";
import { allEntries, type Entry } from "../lib/urls";
import { SITE, abs } from "../lib/site";

const out = path.join(process.cwd(), "out");
const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)));
const inline = (html: string): string =>
  decode(
    html
      .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_m, href: string, t: string) => `[${inline(t)}](${href.startsWith("/") ? abs(href) : href})`)
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/g, "**$2**")
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/g, "_$2_")
      .replace(/<br\s*\/?>/g, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();

function toMarkdown(html: string): string {
  let h = html
    .replace(/<(script|style|svg|figure|noscript|template|button|form|nav)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const blocks: string[] = [];
  // Tables first, so their cells aren't flattened into paragraphs.
  h = h.replace(/<table\b[\s\S]*?<\/table>/g, (t) => {
    const rows = [...t.matchAll(/<tr\b[\s\S]*?<\/tr>/g)].map((r) => [...r[0].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => inline(c[1]).replace(/\|/g, "\\|")));
    if (!rows.length) return "";
    const w = Math.max(...rows.map((r) => r.length));
    const line = (r: string[]) => `| ${[...r, ...Array(w - r.length).fill("")].join(" | ")} |`;
    blocks.push([line(rows[0]), `|${" --- |".repeat(w)}`, ...rows.slice(1).map(line)].join("\n"));
    return `\n@@BLOCK${blocks.length - 1}@@\n`;
  });
  h = h
    .replace(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/g, (_m, n: string, t: string) => `\n\n${"#".repeat(Number(n))} ${inline(t)}\n\n`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/g, (_m, t: string) => `\n- ${inline(t)}`)
    .replace(/<dt\b[^>]*>([\s\S]*?)<\/dt>/g, (_m, t: string) => `\n\n**${inline(t)}**`)
    .replace(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g, (_m, t: string) => `\n${inline(t)}`)
    .replace(/<summary\b[^>]*>([\s\S]*?)<\/summary>/g, (_m, t: string) => `\n\n**${inline(t)}**\n`)
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (_m, t: string) => `\n\n${inline(t)}\n\n`)
    .replace(/<\/?(ul|ol|dl|div|section|article|details|aside|main|span|header|footer)\b[^>]*>/g, "\n");
  h = decode(h.replace(/<[^>]+>/g, ""));
  h = h.replace(/@@BLOCK(\d+)@@/g, (_m, i: string) => `\n${blocks[Number(i)]}\n`);
  return h
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const twinPath = (p: string) => (p === "/" ? "/index.md" : `${p.replace(/\/$/, "")}.md`);

const entries = allEntries();
let n = 0;
for (const e of entries) {
  const file = path.join(out, e.path, "index.html");
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  const title = decode(src.match(/<title>([^<]*)<\/title>/)?.[1] ?? e.title);
  const desc = decode(src.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const main = src.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const body = toMarkdown(main);
  const md = `---\ntitle: ${JSON.stringify(title)}\nurl: ${abs(e.path)}\nupdated: ${e.lastmod}\n---\n\n${desc ? `> ${desc}\n\n` : ""}${body}\n`;
  const target = path.join(out, twinPath(e.path));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, md);
  n++;
}

const SECTIONS: [string, Entry["kind"][]][] = [
  ["Will it fit? (dimension comparisons)", ["compat"]],
  ["How should it fit? (fit guides)", ["fit", "hub"]],
  ["Brand sizing", ["sizing"]],
  ["Tools", ["tool"]],
  ["About", ["page"]],
];
const llms = [
  `# ${SITE.fullName}`,
  "",
  `> ${SITE.description}`,
  "",
  "Every page has a Markdown version at the same address ending in .md. Dimensions come from makers' spec pages and retailer listings, cited on each page with the date checked.",
  "",
  ...SECTIONS.flatMap(([name, kinds]) => [
    `## ${name}`,
    "",
    ...entries.filter((e) => kinds.includes(e.kind)).map((e) => `- [${e.title}](${abs(twinPath(e.path))})`),
    "",
  ]),
].join("\n");
fs.writeFileSync(path.join(out, "llms.txt"), llms);
console.log(`markdown: ${n} twins + llms.txt`);
