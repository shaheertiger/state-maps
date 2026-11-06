#!/usr/bin/env node
/**
 * Read developer-reported privacy cards from each app's public App Store page.
 * No authentication, private endpoints, third-party sites, reviews, artwork or descriptions are used.
 * Stops instead of retrying hard if the source rate-limits or denies access.
 *   npm run enrich && npm run data
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const appsPath = new URL("data/apple-apps.json", root);
const cachePath = new URL("data/apple-privacy-cache.json", root);
const apps = JSON.parse(readFileSync(appsPath, "utf8"));
const results = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ");
const clean = (s) => unescape(s.replace(/<[^>]+>/g, " ")).split(/\s+/).filter(Boolean).join(" ");
let last = 0;
async function pace() { const wait = Math.max(0, 200 - (Date.now() - last)); if (wait) await sleep(wait); last = Date.now(); }

async function readOne(app) {
  for (let attempt = 0; attempt < 3; attempt++) {
    await pace();
    try {
      const res = await fetch(app.sourceUrl, { headers: { "User-Agent": "statemaps.net-public-catalog/1.0", "Accept-Language": "en-US,en;q=0.9" }, signal: AbortSignal.timeout(40000) });
      if (res.status === 403 || res.status === 429) { if (attempt === 2) return { privacyStatus: `http-${res.status}`, privacyCards: [] }; await sleep(30000); continue; }
      if (res.status === 404 || res.status === 410) return { privacyStatus: `http-${res.status}`, privacyCards: [] };
      if (!res.ok) { await sleep(2 ** attempt * 1000); continue; }
      const raw = Buffer.from(await res.arrayBuffer());
      const page = raw.toString("utf8");
      const m = page.match(/<section\b[^>]*\bid="privacyTypes"[^>]*>([\s\S]*?)<\/section>/);
      const cards = [];
      if (m) for (const [, heading, body] of m[1].matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|$)/g)) {
        const categories = [...new Set([...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((x) => clean(x[1])).filter(Boolean))];
        cards.push({ type: clean(heading), categories });
      }
      return { privacyStatus: cards.length ? "reported" : "not-extracted", privacyCards: cards, privacyCheckedAt: new Date().toISOString(), privacySourceUrl: app.sourceUrl, privacyResponseSha256: createHash("sha256").update(raw).digest("hex") };
    } catch { await sleep(2 ** attempt * 1000); }
  }
  return { privacyStatus: "fetch-failed", privacyCards: [] };
}

const pending = apps.filter((a) => !results[String(a.id)]);
const queue = [...pending];
let done = 0;
async function worker() {
  while (queue.length) {
    const app = queue.shift();
    results[String(app.id)] = await readOne(app);
    if (++done % 25 === 0) {
      writeFileSync(cachePath, JSON.stringify(results));
      const vals = Object.values(results);
      console.log(`${vals.length}/${apps.length} privacy sources checked; ${vals.filter((r) => r.privacyStatus === "reported").length} labels extracted`);
      if (vals.filter((r) => /http-(403|429)/.test(r.privacyStatus)).length >= 20) { console.error("Public source access is rate-limited or denied; stopping instead of bypassing it."); process.exit(1); }
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
writeFileSync(cachePath, JSON.stringify(results));
for (const app of apps) {
  let r = results[String(app.id)];
  if (r.privacyCards?.length && r.privacyCards.every((c) => c.type === "No Details Provided")) r = { ...r, privacyStatus: "not-provided" };
  Object.assign(app, r);
}
writeFileSync(appsPath, JSON.stringify(apps));
console.log("Saved source-backed privacy labels; unavailable or unparsed labels remain explicitly unknown.");
