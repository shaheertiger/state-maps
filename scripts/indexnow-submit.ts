/**
 * IndexNow: tell Bing (and the other IndexNow engines) which URLs are new or changed.
 *
 * Runs after the build, on production builds only (VERCEL_ENV=production), so preview
 * deploys never ping. Reads the built sitemaps in out/, compares each URL's lastmod with
 * data/indexnow-last.json, and posts only new or changed URLs. With no snapshot file it
 * posts every URL in the sitemaps.
 *
 * The snapshot is a committed file, so a Vercel build can't save it: refresh it in the
 * repo after a production deploy with `npm run indexnow:snapshot` (writes the file from
 * the local build without posting). Until then a later build re-posts the same changed
 * URLs, which IndexNow accepts.
 *
 *   tsx scripts/indexnow-submit.ts            post (production only)
 *   tsx scripts/indexnow-submit.ts --dry-run  print what would be posted
 *   tsx scripts/indexnow-submit.ts --snapshot write data/indexnow-last.json, post nothing
 *
 * Never fails the build: an IndexNow error is logged and the script exits 0.
 */
import fs from "node:fs";
import path from "node:path";
import { SITE } from "../lib/site";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const root = process.cwd();
const out = path.join(root, "out");
const snapshotFile = path.join(root, "data/indexnow-last.json");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const snapshotOnly = args.has("--snapshot");

type Snapshot = { submitted: string; urls: Record<string, string> };

function key(): string {
  const files = fs.readdirSync(path.join(root, "public")).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (files.length !== 1) throw new Error(`expected one IndexNow key file in public/, found ${files.length}`);
  const k = fs.readFileSync(path.join(root, "public", files[0]), "utf8").trim();
  if (`${k}.txt` !== files[0]) throw new Error(`public/${files[0]} must contain its own key`);
  return k;
}

function sitemapUrls(): Record<string, string> {
  const read = (f: string) => fs.readFileSync(path.join(out, f), "utf8");
  const urls: Record<string, string> = {};
  const index = read("sitemap.xml");
  for (const [, loc] of index.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)) {
    const xml = read(loc.slice(SITE.url.length + 1));
    for (const [, u, lm] of xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)) urls[u] = lm;
  }
  if (Object.keys(urls).length === 0) throw new Error("no URLs found in out/sitemap*.xml");
  return urls;
}

async function main() {
  const production = process.env.VERCEL_ENV === "production";
  if (!production && !dryRun && !snapshotOnly) {
    console.log("indexnow: skipped (not a production build)");
    return;
  }
  if (SITE.url.includes("example.com")) {
    console.log("indexnow: skipped (SITE.url is the placeholder)");
    return;
  }
  const current = sitemapUrls();
  const today = new Date().toISOString().slice(0, 10);
  if (snapshotOnly) {
    fs.writeFileSync(snapshotFile, JSON.stringify({ submitted: today, urls: current } satisfies Snapshot, null, 2) + "\n");
    console.log(`indexnow: wrote snapshot of ${Object.keys(current).length} URLs to data/indexnow-last.json`);
    return;
  }
  const last: Snapshot | null = fs.existsSync(snapshotFile) ? JSON.parse(fs.readFileSync(snapshotFile, "utf8")) : null;
  const changed = Object.entries(current)
    .filter(([u, lm]) => !last || last.urls[u] !== lm)
    .map(([u]) => u);
  console.log(`indexnow: ${changed.length} of ${Object.keys(current).length} URLs ${last ? `new or changed since ${last.submitted}` : "(first submission: all)"}`);
  if (changed.length === 0) return;
  if (dryRun) {
    for (const u of changed) console.log(`  ${u}`);
    return;
  }
  const k = key();
  const host = new URL(SITE.url).host;
  for (let i = 0; i < changed.length; i += 10000) {
    const urlList = changed.slice(i, i + 10000);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: k, keyLocation: `${SITE.url}/${k}.txt`, urlList }),
    });
    // 200 OK, 202 Accepted (key check pending) are success; 403 bad key, 422 URL/host mismatch, 429 too many.
    console.log(`indexnow: POST ${urlList.length} URLs -> ${res.status} ${res.statusText}`);
    if (res.status !== 200 && res.status !== 202) console.warn(`indexnow: ${(await res.text()).slice(0, 300)}`);
  }
  // Saved for local runs; on Vercel this file isn't kept (see the note at the top).
  fs.writeFileSync(snapshotFile, JSON.stringify({ submitted: today, urls: current } satisfies Snapshot, null, 2) + "\n");
}

main().catch((e) => {
  console.warn(`indexnow: failed, build continues: ${e instanceof Error ? e.message : e}`);
});
