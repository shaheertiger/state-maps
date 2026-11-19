/**
 * Content gate. Runs before `next build` (and on its own via `npm run validate`).
 * Fails on: schema errors, missing answer box, < 3 FAQs, unresolved template
 * variables, links to pages that don't exist, thin fit guides.
 *
 *   npm run validate                 # whole site (fails on any problem)
 *   npm run validate -- content/fit/suit-jacket.json   # just these files (authoring)
 */
import fs from "node:fs";
import path from "node:path";
import { fitGuide, brandSizing, category } from "../lib/schema";
import { compatPages } from "../lib/compat";

const root = process.cwd();
const only = process.argv.slice(2).map((p) => path.resolve(p));
const errors: string[] = [];
const warnings: string[] = [];

function readJson(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`${rel(file)}: invalid JSON (${(e as Error).message})`);
    return null;
  }
}
const rel = (f: string) => path.relative(root, f);
const list = (dir: string) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => path.join(dir, f))
    : [];

function wordCount(value: unknown): number {
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + wordCount(v), 0);
  if (value && typeof value === "object")
    return Object.entries(value).reduce(
      (n, [k, v]) => (["slug", "keywords", "related", "query", "anchor", "shape", "category", "updated", "url", "sources"].includes(k) ? n : n + wordCount(v)),
      0,
    );
  return 0;
}

/** Strings that would render as broken template output. */
function checkStrings(value: unknown, where: string) {
  if (typeof value === "string") {
    if (/[{}]/.test(value)) errors.push(`${where}: contains "{" or "}" (unresolved template variable?): ${value.slice(0, 80)}`);
    if (/ {2,}/.test(value)) errors.push(`${where}: double space: ${value.slice(0, 80)}`);
    if (/\b(undefined|null|NaN|TODO|lorem)\b/i.test(value)) errors.push(`${where}: placeholder text: ${value.slice(0, 80)}`);
    if (/\b(we tested|our testers|customers say|reviewers say|in our testing)\b/i.test(value))
      errors.push(`${where}: invented testing/review claim not allowed: ${value.slice(0, 80)}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => checkStrings(v, `${where}[${i}]`));
  else if (value && typeof value === "object") Object.entries(value).forEach(([k, v]) => checkStrings(v, `${where}.${k}`));
}

const planned = JSON.parse(fs.readFileSync(path.join(root, "research/wave1-fit-guides.json"), "utf8")) as { slug: string }[];
const plannedSlugs = new Set(planned.map((p) => p.slug));

const fitFiles = list(path.join(root, "content/fit"));
const brandFiles = list(path.join(root, "content/sizing"));
const fitSlugs = new Set(fitFiles.map((f) => path.basename(f, ".json")));
const selected = (f: string) => only.length === 0 || only.includes(f);

for (const file of fitFiles.filter(selected)) {
  const data = readJson(file);
  if (!data) continue;
  const r = fitGuide.safeParse(data);
  if (!r.success) {
    for (const issue of r.error.issues) errors.push(`${rel(file)}: ${issue.path.join(".")}: ${issue.message}`);
    continue;
  }
  const g = r.data;
  if (g.slug !== path.basename(file, ".json")) errors.push(`${rel(file)}: slug "${g.slug}" must match file name`);
  checkStrings(g, rel(file));
  const words = wordCount(g);
  if (words < 900) errors.push(`${rel(file)}: only ${words} words of content; fit guides need 900–1,800`);
  if (words > 2400) warnings.push(`${rel(file)}: ${words} words; plan says 900–1,800`);
  for (const r2 of g.related ?? []) {
    if (r2 === g.slug) errors.push(`${rel(file)}: related links to itself`);
    else if (!fitSlugs.has(r2)) {
      if (only.length && plannedSlugs.has(r2)) continue; // authoring mode: page planned, written by someone else
      errors.push(`${rel(file)}: related slug "${r2}" has no page`);
    }
  }
  const seenQ = new Set<string>();
  for (const f of g.faqs) {
    if (seenQ.has(f.q.toLowerCase())) errors.push(`${rel(file)}: duplicate FAQ "${f.q}"`);
    seenQ.add(f.q.toLowerCase());
  }
}

for (const file of brandFiles.filter(selected)) {
  const data = readJson(file);
  if (!data) continue;
  const r = brandSizing.safeParse(data);
  if (!r.success) {
    for (const issue of r.error.issues) errors.push(`${rel(file)}: ${issue.path.join(".")}: ${issue.message}`);
    continue;
  }
  if (r.data.slug !== path.basename(file, ".json")) errors.push(`${rel(file)}: slug must match file name`);
  checkStrings(r.data, rel(file));
}

if (only.length === 0) {
  const cats = readJson(path.join(root, "data/categories.json"));
  if (Array.isArray(cats)) cats.forEach((c, i) => {
    const r = category.safeParse(c);
    if (!r.success) r.error.issues.forEach((issue) => errors.push(`data/categories.json[${i}]: ${issue.path.join(".")}: ${issue.message}`));
    else checkStrings(r.data, `data/categories.json[${i}]`);
  });
  try {
    const pages = compatPages();
    for (const p of pages) checkStrings({ h1: p.h1, title: p.title, meta: p.meta, answer: p.answer }, `compat:${p.slug}`);
  } catch (e) {
    errors.push(`compatibility data: ${(e as Error).message}`);
  }
  // hub URLs and guide URLs share /fit/{slug}/
  const { hubSlug } = await import("../lib/site");
  for (const c of (Array.isArray(cats) ? cats : []) as { slug: string }[])
    if (fitSlugs.has(hubSlug(c.slug))) errors.push(`category hub /fit/${hubSlug(c.slug)}/ clashes with a fit guide of the same slug`);
  const missing = planned.filter((p) => !fitSlugs.has(p.slug)).map((p) => p.slug);
  if (missing.length) warnings.push(`planned Wave 1 guides not written yet (${missing.length}): ${missing.join(", ")}`);
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s). Fix them before building.`);
  process.exit(1);
}
console.log(`content ok (${only.length ? only.length + " file(s)" : `${fitFiles.length} fit guides, ${brandFiles.length} brand pages`})`);
