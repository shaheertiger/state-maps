/**
 * Runs after `next build` + Pagefind on the static output in out/.
 * Fails the build on: broken internal links, missing/duplicate titles or
 * descriptions, pages without exactly one H1, canonicals that don't point to
 * the page itself, unresolved template text in titles, the brand name in a
 * title/H1/description, a missing BreadcrumbList, text before the H1, and
 * sitemap entries that aren't canonical 200 pages with a real lastmod, and a
 * missing analytics script.
 */
import fs from "node:fs";
import path from "node:path";
import { SITE } from "../lib/site";

const out = path.join(process.cwd(), "out");
if (!fs.existsSync(out)) {
  console.error("out/ not found — run next build first");
  process.exit(1);
}

const files: string[] = [];
(function walk(dir: string) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f === "_next" || f === "pagefind") continue;
      walk(full);
    } else files.push(full);
  }
})(out);

const exists = (urlPath: string) => {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  if (clean === "" || clean === "/") return true;
  const p = path.join(out, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
};

const errors: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();
const html = files.filter((f) => f.endsWith(".html"));
let pages = 0;

for (const file of html) {
  const rel = "/" + path.relative(out, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const src = fs.readFileSync(file, "utf8");
  const is404 = rel.startsWith("/404") || rel.startsWith("/_not-found");
  // internal links
  for (const m of src.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (href.startsWith("/_next/") || href.startsWith("//")) continue;
    if (!exists(href)) errors.push(`${rel}: broken link ${href}`);
  }
  if (is404 || rel.startsWith("/search/")) continue;
  pages++;
  const h1s = (src.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> elements`);
  const title = src.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (!title) errors.push(`${rel}: no <title>`);
  if (/[{}]|  |undefined/.test(title)) errors.push(`${rel}: bad title "${title}"`);
  if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}: "${title}"`);
  titles.set(title, rel);
  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (!desc) errors.push(`${rel}: no meta description`);
  else if (descs.has(desc)) errors.push(`${rel}: duplicate description with ${descs.get(desc)}`);
  descs.set(desc, rel);
  const canonical = src.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) errors.push(`${rel}: no canonical`);
  else if (canonical !== `${SITE.url}${rel}`) errors.push(`${rel}: canonical is ${canonical}`);
  // The brand name adds nothing to a search result: keep it to the header logo and footer.
  const h1 = (src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "").replace(/<[^>]+>/g, "");
  for (const [what, text] of [["title", title], ["description", desc], ["H1", h1]] as const)
    if (text.toLowerCase().includes(SITE.name.toLowerCase())) errors.push(`${rel}: ${what} mentions "${SITE.name}": "${text}"`);
  if (!src.includes('"@type":"BreadcrumbList"')) errors.push(`${rel}: no BreadcrumbList JSON-LD`);
  // A rebuild that drops the analytics script makes "0 visitors" look like a penalty (Nov 20–28).
  if (!src.includes('src="/_vercel/insights/script.js"')) errors.push(`${rel}: Vercel Web Analytics script missing`);
  // The first text a crawler reads in <body> must be the H1.
  const body = src
    .slice(src.indexOf("<body"))
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<div hidden[^>]*>[\s\S]*?<\/div>/g, "");
  const firstText = body.search(/>[^<]*[^\s<][^<]*</);
  const h1At = body.search(/<h1[\s>]/), h1End = body.indexOf("</h1>");
  if (firstText !== -1 && !(firstText > h1At && firstText < h1End))
    errors.push(`${rel}: text before the H1: "${body.slice(firstText + 1, firstText + 61).replace(/<[\s\S]*/, "").trim()}"`);
}

// ---------- Sitemaps ----------
const indexable = new Set(
  html
    .map((f) => "/" + path.relative(out, f).replace(/index\.html$/, "").replace(/\\/g, "/"))
    .filter((p) => p.endsWith("/") && !p.startsWith("/404") && !p.startsWith("/_not-found") && !p.startsWith("/search/")),
);
const read = (f: string) => (fs.existsSync(path.join(out, f)) ? fs.readFileSync(path.join(out, f), "utf8") : null);
const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const redirects = new Set<string>(
  (JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8")).redirects ?? []).map((x: { source: string }) => x.source),
);
const today = new Date().toISOString().slice(0, 10);
const badLastmod = (xml: string, file: string) => {
  const blocks = [...xml.matchAll(/<(url|sitemap)>([\s\S]*?)<\/\1>/g)].map((m) => m[2]);
  for (const b of blocks) {
    const lm = b.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    const loc = b.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!lm || !/^\d{4}-\d{2}-\d{2}$/.test(lm)) errors.push(`${file}: ${loc} has no lastmod date`);
    else if (lm > today) errors.push(`${file}: ${loc} lastmod ${lm} is in the future`);
  }
};
const index = read("sitemap.xml");
const inSitemaps = new Map<string, string>();
if (!index) errors.push("out/sitemap.xml missing");
else {
  if (!index.includes("<sitemapindex")) errors.push("sitemap.xml is not a sitemap index");
  badLastmod(index, "sitemap.xml");
  for (const loc of locs(index)) {
    if (!loc.startsWith(`${SITE.url}/`)) errors.push(`sitemap.xml: ${loc} is not on ${SITE.url}`);
    const file = loc.slice(SITE.url.length + 1);
    const xml = read(file);
    if (!xml) {
      errors.push(`sitemap.xml lists ${file}, which wasn't built`);
      continue;
    }
    badLastmod(xml, file);
    const urls = locs(xml);
    if (urls.length === 0) errors.push(`${file} has no URLs`);
    for (const u of urls) {
      if (!u.startsWith(`${SITE.url}/`)) {
        errors.push(`${file}: ${u} is not on ${SITE.url}`);
        continue;
      }
      const p = u.slice(SITE.url.length);
      if (inSitemaps.has(p)) errors.push(`${p} is listed in both ${inSitemaps.get(p)} and ${file}`);
      inSitemaps.set(p, file);
      if (!indexable.has(p)) errors.push(`${file}: ${p} is not a built page`);
      if (redirects.has(p)) errors.push(`${file}: ${p} is a redirect, not a canonical page`);
    }
  }
  for (const p of indexable) if (!inSitemaps.has(p)) errors.push(`${p} is built but missing from every sitemap`);
}
// Every listed page is at most 2 clicks from the homepage.
{
  const linksOf = (p: string) => {
    const f = path.join(out, p, "index.html");
    if (!fs.existsSync(f)) return [];
    return [...fs.readFileSync(f, "utf8").matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((h) => h.endsWith("/"));
  };
  const depth = new Map<string, number>([["/", 0]]);
  let frontier = ["/"];
  for (let d = 1; d <= 2; d++) {
    const next: string[] = [];
    for (const p of frontier) for (const h of linksOf(p)) if (!depth.has(h)) (depth.set(h, d), next.push(h));
    frontier = next;
  }
  for (const p of inSitemaps.keys()) if (!depth.has(p)) errors.push(`${p} is more than 2 clicks from the homepage`);
}
const robots = read("robots.txt") ?? "";
if (!robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`)) errors.push(`robots.txt doesn't point to ${SITE.url}/sitemap.xml`);
if (process.env.VERCEL && SITE.url.includes("example.com"))
  errors.push("SITE.url is the example.com placeholder on Vercel: set NEXT_PUBLIC_SITE_URL in the project settings");

if (!fs.existsSync(path.join(out, "404.html"))) errors.push("out/404.html missing");
if (!fs.existsSync(path.join(out, "pagefind", "pagefind.js"))) errors.push("Pagefind index missing (out/pagefind)");

for (const e of errors) console.error(`error ${e}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s) in the built site.`);
  process.exit(1);
}
console.log(`built site ok: ${pages} indexable pages, ${inSitemaps.size} sitemap URLs on ${SITE.url}, ${files.length} files, no broken internal links`);
