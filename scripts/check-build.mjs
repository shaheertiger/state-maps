// Post-build SEO checks: every page has one <h1>, a title, a meta description and a canonical,
// titles/descriptions are unique, and every internal link points at a page that exists.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const pages = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) pages.push(p);
  }
};
walk(DIST);

const errors = [];
const warn = [];
const titles = new Map();
const descs = new Map();
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  const rel = p.slice(DIST.length);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${rel}: ${h1} <h1> tags`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) errors.push(`${rel}: missing <title>`);
  if (!desc) errors.push(`${rel}: missing meta description`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${rel}: missing canonical`);
  const noindex = /content="noindex/.test(html);
  if (!noindex && title) titles.set(title, [...(titles.get(title) || []), rel]);
  if (!noindex && desc) descs.set(desc, [...(descs.get(desc) || []), rel]);
  if (!noindex && desc && (desc.length < 70 || desc.length > 320)) warn.push(`${rel}: description length ${desc.length}`);
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = href.endsWith("/") ? join(DIST, href, "index.html") : join(DIST, href);
    if (!existsSync(target)) errors.push(`${rel}: broken link ${href}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { errors.push(`${rel}: invalid JSON-LD`); }
  }
}
for (const [t, ps] of titles) if (ps.length > 1) errors.push(`Duplicate title "${t}": ${ps.join(", ")}`);
for (const [d, ps] of descs) if (ps.length > 1) warn.push(`Duplicate description: ${ps.join(", ")}`);

warn.slice(0, 20).forEach((w) => console.warn("warn:", w));
if (errors.length) {
  errors.slice(0, 50).forEach((e) => console.error("error:", e));
  console.error(`\n${errors.length} problem(s) in ${pages.length} pages`);
  process.exit(1);
}
console.log(`check-build: ${pages.length} pages OK`);
