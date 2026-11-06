#!/usr/bin/env node
/**
 * Post-build checks on dist/ (runs after `astro build`; fails the build on errors):
 *  - every internal link points at a built page or file, with a trailing slash
 *  - every indexable page has a unique <title>, a description, a canonical and valid JSON-LD
 *  - sitemaps list exactly the indexable pages
 *  - app and question pages carry enough main content and ship no client JS
 *  - an acceptance page has the expected title, answer text and schema types
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const HOST = "https://statemaps.net";
const DIST = new URL("../dist/", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(DIST);
const pages = files.filter((f) => f.endsWith(".html"));
const errors = [];
const warn = [];
const titles = new Map();
const relOf = (file) => "/" + relative(DIST, file).replace(/index\.html$/, "");
const existsCache = new Map();
const exists = (href) => {
  const p = decodeURI(href.split(/[?#]/)[0]);
  if (existsCache.has(p)) return existsCache.get(p);
  const f = join(DIST, p);
  const ok = p === "/" || (existsSync(f) && (statSync(f).isFile() || existsSync(join(f, "index.html"))));
  existsCache.set(p, ok);
  return ok;
};
const isEntity = (rel) => /^\/(is-.+-safe|does-.+-track-you|how-to-lock-.+-on-iphone)\/$/.test(rel);
const MIN_WORDS = { app: 1000, variant: 700 };
const wordsIn = (html) => {
  const main = (html.match(/<main[\s\S]*?<\/main>/) ?? [html])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, "");
  return (main.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").match(/[\p{L}\p{N}][\p{L}\p{N}'’–-]*/gu) ?? []).length;
};
let thin = 0;
const minSeen = { app: Infinity, variant: Infinity };
const indexable = [];

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const rel = relOf(file);
  const noindex = /name="robots" content="noindex/.test(html);
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith("//")) continue;
    const p = href.split(/[?#]/)[0];
    if (!exists(href)) errors.push(`${rel}: broken link ${href}`);
    else if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith("/")) errors.push(`${rel}: link without trailing slash ${href}`);
  }
  if (noindex || rel === "/404.html") continue;
  indexable.push(rel);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/name="description" content="([^"]*)"/)?.[1] ?? "";
  if (!title) errors.push(`${rel}: missing title`);
  else if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, rel);
  const plainDesc = desc.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
  if (!plainDesc) errors.push(`${rel}: missing description`);
  else if (plainDesc.length > 160) warn.push(`${rel}: description ${plainDesc.length} chars`);
  if (!html.includes(`rel="canonical" href="${HOST}${rel}"`)) errors.push(`${rel}: canonical is not self-referencing`);
  if (!html.includes("application/ld+json")) errors.push(`${rel}: missing JSON-LD`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(m[1]); } catch { errors.push(`${rel}: invalid JSON-LD`); }
  }
  if (isEntity(rel)) {
    const kind = rel.startsWith("/is-") ? "app" : "variant";
    const n = wordsIn(html);
    minSeen[kind] = Math.min(minSeen[kind], n);
    if (n < MIN_WORDS[kind]) { thin++; if (thin <= 10) errors.push(`${rel}: only ${n} words (min ${MIN_WORDS[kind]})`); }
    // Only Vercel Analytics (and the optional consent loader) may add script to entity pages.
    const scripts = [...html.matchAll(/<script(?![^>]*application\/ld\+json)([^>]*)>([\s\S]*?)<\/script>/g)];
    const bad = scripts.filter(([, attrs, body]) => !/_vercel\/insights|vercel-analytics|va\.vercel-scripts/.test(attrs + body) && !/sm-consent/.test(body));
    if (bad.length) errors.push(`${rel}: app page ships client JS`);
  }
}
if (thin > 10) errors.push(`…${thin - 10} more pages under the word minimum`);

// Sitemaps: every listed URL is a built, indexable page; every indexable page is listed.
const listed = new Set();
const idx = readFileSync(join(DIST, "sitemap.xml"), "utf8");
for (const [, loc] of idx.matchAll(/<loc>https:\/\/statemaps\.net(\/[^<]+)<\/loc>/g)) {
  const xml = readFileSync(join(DIST, loc), "utf8");
  if ((xml.match(/<url>/g) ?? []).length > 50000 || xml.length > 50 * 1024 * 1024) errors.push(`${loc}: over sitemap limits`);
  for (const [, p] of xml.matchAll(/<loc>https:\/\/statemaps\.net([^<]+)<\/loc>/g)) {
    if (listed.has(p)) errors.push(`${loc}: duplicate ${p}`);
    listed.add(p);
    if (!exists(p)) errors.push(`${loc}: lists missing page ${p}`);
  }
}
const indexableSet = new Set(indexable);
for (const p of indexable) if (!listed.has(p)) errors.push(`${p}: indexable page missing from sitemaps`);
for (const p of listed) if (!indexableSet.has(p)) errors.push(`sitemap lists non-indexable page ${p}`);

for (const f of ["favicon.ico", "favicon.svg", "favicon-96x96.png", "apple-touch-icon.png", "site.webmanifest", "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "robots.txt", "sitemap.xml", "og.png", "404.html", "search-index.json", "llms.txt"]) if (!existsSync(join(DIST, f))) errors.push(`missing ${f}`);

// Acceptance page.
const gp = readFileSync(join(DIST, "is-google-photos-safe/index.html"), "utf8");
if (!/<title>Is Google Photos Safe\? .+<\/title>/.test(gp)) errors.push("google photos: unexpected title");
for (const t of ["Data Linked to You", "Google LLC", "Settings › Privacy &amp; Security", "Require Face ID"]) if (!gp.includes(t)) errors.push(`google photos: text "${t}" missing`);
for (const t of ['"Article"', '"BreadcrumbList"', '"FAQPage"', '"Organization"', '"SoftwareApplication"', '"Dataset"', '"PropertyValue"']) if (!gp.includes(t)) errors.push(`google photos: JSON-LD ${t} missing`);
// Old app URLs forward to the new ones.
const fwd = readFileSync(join(DIST, "app-privacy/private-photo-vault-pic-safe-417571834/index.html"), "utf8");
if (!/http-equiv="refresh" content="0;url=\/is-[^"]+-safe\/"/.test(fwd)) errors.push("old /app-privacy/{slug}/ URL does not forward");

const css = files.filter((f) => f.endsWith(".css")).reduce((n, f) => n + statSync(f).size, 0);
const htmlBytes = pages.reduce((n, f) => n + statSync(f).size, 0);
console.log(`check-build: ${pages.length} HTML files, ${indexable.length} indexable, ${titles.size} unique titles, ${listed.size} sitemap URLs, shortest app page ${minSeen.app} words, shortest question page ${minSeen.variant} words, CSS ${(css / 1024).toFixed(1)} KB, HTML ${(htmlBytes / 1048576).toFixed(0)} MB`);
if (css > 80 * 1024) errors.push("CSS over the 80 KB budget");
warn.slice(0, 10).forEach((w) => console.warn("warn:", w));
if (warn.length > 10) console.warn(`warn: …and ${warn.length - 10} more`);
if (errors.length) {
  errors.slice(0, 40).forEach((e) => console.error("error:", e));
  console.error(`check-build: ${errors.length} error(s)`);
  process.exit(1);
}
console.log("check-build: ok");
