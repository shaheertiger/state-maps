#!/usr/bin/env node
/**
 * Normalises data/apple-apps.json (the sourced App Store snapshot) into data/apps.json:
 * readable display names, unique clean URL slugs, category/topic slugs and the
 * privacy-label cards split by type. Nothing is invented: a missing value stays missing.
 *   npm run data
 */
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("../", import.meta.url);
const raw = JSON.parse(readFileSync(new URL("data/apple-apps.json", ROOT), "utf8"));

const slugify = (s) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const trimSlug = (s, max = 56) => (s.length <= max ? s : s.slice(0, max).replace(/-[^-]*$/, "")) || s.slice(0, max);
const tidy = (s) => s.replace(/[®™©]/g, "").replace(/[#*]+/g, " ").replace(/\++$/g, "").replace(/\s+/g, " ").replace(/^[\s\-–—:|·.]+|[\s\-–—:|·.,]+$/g, "").trim();

/** "Private Photo Vault - Pic Safe" → "Private Photo Vault"; "Dropbox: Cloud Storage Backup" → "Dropbox". */
const GENERIC = new Set("app apps calculator calc converter vault vaults gallery galleries scanner scan notes note notebook calendar planner wallet authenticator browser budget journal diary recorder photos photo camera files file passwords password manager safe lock locker secret private privacy album albums backup cloud storage email mail messenger chat contacts tracker health finance money bank banking pdf docs documents editor reader video videos voice memo memos todo tasks family hidden hide secure security keeper box drive sign signer fax print printer timer clock fitness".split(" "));
function shortName(name) {
  const parts = name.split(/\s+[-–—|·•]\s*|\s*[-–—|·•]\s+|:\s+|,\s+|\s+\(|\s*[|·•]\s*/).map(tidy).filter(Boolean);
  let first = parts[0] ?? tidy(name);
  // One generic word ("Converter", "Vault") says nothing on its own: keep the next part too.
  if (parts.length > 1 && first.split(" ").every((w) => GENERIC.has(w.toLowerCase()))) first = `${first} ${parts[1]}`.split(" ").slice(0, 6).join(" ");
  return first.length >= 3 && /[a-z0-9]/i.test(first) ? first : tidy(name);
}

const CATEGORY_SLUGS = {
  Productivity: "productivity", Utilities: "utilities", Finance: "finance", "Photo & Video": "photo-video", Business: "business",
  Lifestyle: "lifestyle", "Health & Fitness": "health-fitness", Medical: "medical", "Social Networking": "social-networking",
};

const shorts = raw.map((a) => shortName(a.name));
const shortCount = new Map();
shorts.forEach((s) => shortCount.set(s.toLowerCase(), (shortCount.get(s.toLowerCase()) ?? 0) + 1));
const fullCount = new Map();
raw.forEach((a) => fullCount.set(tidy(a.name).toLowerCase(), (fullCount.get(tidy(a.name).toLowerCase()) ?? 0) + 1));

const seenShort = new Set();
const usedSlugs = new Set();
const apps = raw.map((a, i) => {
  let display = shorts[i];
  const key = display.toLowerCase();
  if (shortCount.get(key) > 1) {
    if (seenShort.has(key)) {
      const full = tidy(a.name);
      display = full.toLowerCase() !== key && fullCount.get(full.toLowerCase()) === 1 ? full : `${display} by ${tidy(a.developer)}`;
    }
    seenShort.add(key);
  }
  let base = trimSlug(slugify(display)) || `app-${a.id}`;
  let slug = base;
  if (usedSlugs.has(slug)) slug = trimSlug(`${base}-${slugify(a.developer).split("-").slice(0, 2).join("-")}`, 70);
  if (usedSlugs.has(slug)) slug = `${base}-${a.id}`;
  usedSlugs.add(slug);

  const cards = a.privacyCards ?? [];
  const pick = (type) => cards.find((c) => c.type === type)?.categories ?? [];
  const status = a.privacyStatus === "reported" && cards.some((c) => c.type !== "No Details Provided") ? "reported" : "not-provided";
  const cat = CATEGORY_SLUGS[a.category];
  if (!cat) throw new Error(`Unknown category ${a.category} for ${a.id}`);
  return {
    id: a.id,
    rank: i + 1,
    slug,
    oldSlug: a.slug,
    name: a.name,
    display,
    developer: a.developer,
    bundleId: a.bundleId,
    category: cat,
    genres: a.genres ?? [],
    topic: slugify(a.importQuery),
    minimumIos: a.minimumIos ?? null,
    version: a.version ?? null,
    updatedAt: a.updatedAt?.slice(0, 10) ?? null,
    releasedAt: a.releasedAt?.slice(0, 10) ?? null,
    sizeMb: a.fileSizeBytes ? Math.round(Number(a.fileSizeBytes) / 1048576) : null,
    ageRating: a.ageRating ?? null,
    languages: a.languages ?? [],
    developerUrl: a.developerUrl ?? null,
    sourceUrl: a.sourceUrl,
    retrievedAt: a.retrievedAt?.slice(0, 10) ?? null,
    privacyCheckedAt: a.privacyCheckedAt?.slice(0, 10) ?? null,
    status,
    track: status === "reported" ? pick("Data Used to Track You") : [],
    linked: status === "reported" ? pick("Data Linked to You") : [],
    notLinked: status === "reported" ? pick("Data Not Linked to You") : [],
    notCollected: status === "reported" && cards.some((c) => c.type === "Data Not Collected"),
  };
});

const topics = [...new Set(raw.map((a) => a.importQuery))].map((q) => ({ slug: slugify(q), query: q }));
writeFileSync(new URL("data/apps.json", ROOT), JSON.stringify({ generatedFrom: "data/apple-apps.json", topics, apps }));
const changed = apps.filter((a) => a.display !== shortName(a.name)).length;
console.log(`build-apps: ${apps.length} apps, ${topics.length} topics, ${apps.filter((a) => a.status === "reported").length} with labels, ${changed} disambiguated names`);
