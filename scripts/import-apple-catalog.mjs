#!/usr/bin/env node
/**
 * Fetch distinct iPhone software records from Apple's documented public Search API.
 * No descriptions, artwork, ratings, prices or inferred security features are collected.
 * Requests are spaced below the documented ~20 calls/minute limit.
 *   npm run import            # resume from data/apple-import-cache.json
 *   node scripts/import-apple-catalog.mjs --target 4500
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const TERMS = ['photo vault','private photos','password manager','authenticator','secure messenger','encrypted notes','document scanner','cloud storage','private browser','photo manager','video storage','journal diary','PDF editor','file manager','family organizer','budget planner','banking','secure email','contacts backup','calendar planner','health tracker','medical records','voice recorder','photo backup','security camera','privacy protection','digital wallet','expense tracker','business documents','receipt scanner','photo albums','VPN privacy','two factor authentication','secure documents','personal finance','screen time','parental control','private journal','encrypted storage','notes organizer','task manager','document signing','password generator','photo transfer','video editor','social networking','messaging chat','email client','work schedule','habit tracker','investment portfolio','insurance documents','travel documents','passport scanner','tax organizer','personal diary','fitness log','baby tracker','medication reminder','therapy journal','period tracker','sleep tracker','home inventory','address book','family calendar','photo organizer','photo collage','video recorder','audio notes','meeting recorder','transcription notes','business scanner','PDF scanner','PDF reader','digital notebook','handwriting notes','expense manager','money manager','savings tracker','bill tracker','invoice maker','bookkeeping','credit union','mobile banking','stock tracker','crypto wallet','payment wallet','secure chat','team messaging','work chat','dating app','private dating','family messaging','location sharing','family safety','emergency contacts','personal safety','device security','network scanner','WiFi analyzer','privacy browser','ad blocker','Safari extensions','bookmark manager','web clipper','reading list','photo cleaner','duplicate photos','photo metadata','EXIF editor','watermark photos','image editor','photo captions','camera manual','video compression','file sharing','document storage','contact manager','calendar reminders','project planner','time tracker','workout journal','food diary','symptom tracker','blood pressure log','diabetes tracker','pregnancy tracker','caregiver organizer','patient portal','clinical records','appointment scheduler','secure collaboration','business password','identity protection','subscription tracker','warranty organizer','car documents','property inventory','household budget','couples budget','wedding planner','event organizer','family photos','baby photos','digital scrapbook','memory journal','mood diary','gratitude journal','writing notebook','student planner','study notes','research organizer','document annotation','PDF annotation','scanner OCR','text scanner','business cards','contact scanner','personal CRM','sales CRM','small business','freelancer invoices','rental property','tax receipts','expense receipts','travel expenses','trip planner','packing list','travel journal','offline maps','GPX tracker','hiking journal','running log','cycling tracker','nutrition tracker','meal planner','pet health','veterinary records','health journal','mindfulness journal','private camera','photo encryption','file encryption','secure backup','recovery codes','account security','identity wallet','document wallet','membership cards','loyalty cards','digital signature','team calendar','shift calendar','school calendar','password safe','TOTP','passkey','privacy dashboard','secure mail','private cloud','business email','email organizer','photo sharing','video sharing','family archive','personal archive','record keeper','data backup','file browser','archive manager','zip files','document converter','scan to PDF','secure fax','digital forms','inventory tracker','asset manager'];
const ALLOWED = new Set([6000, 6002, 6005, 6007, 6008, 6015, 6013, 6020, 6012]);
const args = process.argv.slice(2);
const target = Number(args[args.indexOf("--target") + 1]) || 4500;
const resume = args.includes("--resume");
const root = new URL("../", import.meta.url);
const cachePath = new URL("data/apple-import-cache.json", root);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (name, id) => (name.normalize("NFKD").replace(/[^\x00-\x7f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 65).replace(/-+$/, "") || "iphone-app") + "-" + id;

let records = {}, queries = [];
if (resume && existsSync(cachePath)) {
  const saved = JSON.parse(readFileSync(cachePath, "utf8"));
  records = Object.fromEntries(saved.records.map((r) => [String(r.id), r]));
  queries = saved.queries;
}
for (const term of TERMS) {
  if (Object.keys(records).length >= target) break;
  if (queries.includes(term)) continue;
  const url = "https://itunes.apple.com/search?" + new URLSearchParams({ term, country: "us", media: "software", entity: "software", limit: "200", lang: "en_us", explicit: "No" });
  try {
    const res = await fetch(url, { headers: { "User-Agent": "statemaps.net-reference-catalog/1.0" }, signal: AbortSignal.timeout(45000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = Buffer.from(await res.arrayBuffer());
    const payload = JSON.parse(raw.toString("utf8"));
    const now = new Date().toISOString();
    for (const r of payload.results ?? []) {
      if (r.kind !== "software" || !ALLOWED.has(Number(r.primaryGenreId))) continue;
      if (!(r.supportedDevices ?? []).some((d) => String(d).toLowerCase().startsWith("iphone"))) continue;
      if (!["trackId", "trackName", "sellerName", "bundleId", "version", "minimumOsVersion", "trackViewUrl", "currentVersionReleaseDate"].every((k) => r[k])) continue;
      const id = String(r.trackId);
      if (records[id]) continue;
      const source = r.trackViewUrl.split("?")[0];
      if (new URL(source).hostname !== "apps.apple.com") continue;
      records[id] = {
        id: r.trackId, slug: slug(r.trackName, r.trackId), name: r.trackName, developer: r.sellerName, bundleId: r.bundleId,
        category: r.primaryGenreName, categoryId: Number(r.primaryGenreId), genres: r.genres ?? [], minimumIos: r.minimumOsVersion, version: r.version,
        updatedAt: r.currentVersionReleaseDate, releasedAt: r.releaseDate ?? null, fileSizeBytes: r.fileSizeBytes ?? null, ageRating: r.trackContentRating ?? null,
        languages: r.languageCodesISO2A ?? [], developerUrl: String(r.sellerUrl ?? "").startsWith("https://") ? r.sellerUrl : null, sourceUrl: source,
        lookupUrl: `https://itunes.apple.com/lookup?id=${id}&country=us`, retrievedAt: now, importQuery: term, responseSha256: createHash("sha256").update(raw).digest("hex"),
      };
    }
    queries.push(term);
    writeFileSync(cachePath, JSON.stringify({ records: Object.values(records), queries }, null, 2));
    console.log(`${queries.length} queries; ${Object.keys(records).length} distinct verified iPhone records; latest: ${term}`);
  } catch (e) {
    console.log(`Query failed (${term}): ${e.message}`);
  }
  await sleep(3200);
}
const all = Object.values(records);
if (all.length < target) { console.error(`Only ${all.length} records verified; target ${target} not met. No placeholder records generated.`); process.exit(1); }
const selected = all.slice(0, target);
writeFileSync(new URL("data/apple-apps.json", root), JSON.stringify(selected));
const times = selected.map((r) => r.retrievedAt).sort();
writeFileSync(new URL("data/apple-catalog-provenance.json", root), JSON.stringify({
  provider: "Apple public iTunes Search API", documentation: "https://performance-partners.apple.com/search-api", storefront: "US", pageLanguage: "en",
  target, count: selected.length, queryCount: queries.length, queries, retrievedFrom: times[0], retrievedThrough: times[times.length - 1],
  selection: "First complete, distinct iPhone software records from the listed privacy-relevant query sequence; selected genres only. No security ranking or search-volume inference.",
}, null, 2));
console.log(`Wrote ${selected.length} sourced records. Next: npm run enrich && npm run data`);
