/**
 * Pulls Bing Webmaster query, page and daily stats into data/bing/YYYY-MM-DD.json.
 * Copied from the treadmillreviewsusa.com loop (scripts/bing-fetch.mjs), saved as one JSON file.
 *
 *   npx tsx scripts/bing-fetch.ts
 *
 * Key: BING_WEBMASTER_KEY (or `apikey`, the name the sister sites' environment uses). Generate it in
 * Bing Webmaster Tools > Settings > API access, store it as an environment variable in the cloud
 * environment's settings, and never commit it. Only Get* methods are called.
 *
 * Bing reports queries and pages in weekly buckets (and lags about a week); they are rolled up over
 * the last 28 days, never before the current site's launch, with the average position weighted by
 * impressions. Only URLs in the current sitemap are kept (www and non-www merged); `dropped` counts
 * the rest. The daily overview (impressions and clicks per day) is complete and kept as-is.
 */
import fs from "node:fs";
import path from "node:path";
import { allEntries } from "../lib/urls";
import { allBrands, allGuides } from "../lib/content";
import { compatPages } from "../lib/compat";
import { LAUNCH_DATE } from "../lib/compat";

const KEY = process.env.BING_WEBMASTER_KEY || process.env.apikey;
if (!KEY) {
  console.error("BING_WEBMASTER_KEY is not set (Bing Webmaster Tools > Settings > API access > Generate; add it to the environment settings).");
  process.exit(2);
}
const SITE = process.env.BING_SITE_URL ?? "https://statemaps.net/";
const API = "https://ssl.bing.com/webmaster/api.svc/json";
const today = process.env.PERF_TODAY ?? new Date().toISOString().slice(0, 10);
const WINDOW = 28;
const since = Math.max(Date.parse(today) - WINDOW * 864e5, Date.parse(LAUNCH_DATE));
const livePaths = new Set(allEntries().map((e) => e.path));
/**
 * A query is kept when it names something this site covers (a guide's item, a brand or product, a
 * will-it-fit item) or asks about fit or size. Bing still shows a few queries for URLs that aren't on
 * this site any more; those match neither and aren't kept.
 */
const STOP = new Set("the and for with your from car".split(" "));
const words = (t: string) => t.toLowerCase().match(/[a-z0-9]{3,}/g)?.filter((w) => !STOP.has(w)) ?? [];
const items = new Set(
  [
    ...allGuides().map((g) => g.item),
    ...allBrands().flatMap((b) => [b.brand, ...(b.products ?? []).map((p) => p.name)]),
    ...compatPages().flatMap((p) => [p.a.name, p.b.name]),
  ].flatMap(words),
);
const FIT_WORDS = /\b(fits?|fitting|fitted|sizes?|sizing|sized|measure(ment)?s?|true to size|runs? (small|large|big)|cup ?holders?)\b/i;
export const onTopic = (q: string) => FIT_WORDS.test(q) || words(q).some((w) => items.has(w));
/** "https://www.statemaps.net/fit/bra/" -> "/fit/bra/" when it's a live page, else null. */
export const livePath = (u: string) => {
  try {
    const p = new URL(u).pathname;
    return livePaths.has(p) ? p : null;
  } catch {
    return null;
  }
};

type Row = { Date: string; Query: string; Impressions: number; Clicks: number; AvgImpressionPosition: number; AvgClickPosition?: number };
export type Stat = { key: string; impressions: number; clicks: number; ctr: number; position: number | null };
export type BingSnapshot = {
  site: string;
  fetched: string;
  window: { start: string; end: string; days: number };
  dropped: { pages: number; impressions: number; queries: number };
  totals: { impressions: number; clicks: number };
  daily: { date: string; impressions: number; clicks: number }[];
  pages: Stat[];
  queries: Stat[];
};

async function call(method: string): Promise<Row[]> {
  const url = `${API}/${method}?siteUrl=${encodeURIComponent(SITE)}&apikey=${encodeURIComponent(KEY!)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await res.text();
  // Never echo the URL: it carries the key.
  if (!res.ok) throw new Error(`${method}: HTTP ${res.status} ${text.slice(0, 200)}`);
  const json = JSON.parse(text);
  return (json.d ?? json) as Row[];
}
const ms = (d: string) => Number(String(d).match(/\/Date\((\d+)/)?.[1] ?? Date.parse(d));
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

function rollup(rows: Row[]): Stat[] {
  const m = new Map<string, { imp: number; clk: number; posW: number }>();
  for (const r of rows) {
    if (ms(r.Date) < since) continue;
    const a = m.get(r.Query) ?? { imp: 0, clk: 0, posW: 0 };
    a.imp += r.Impressions || 0;
    a.clk += r.Clicks || 0;
    a.posW += (r.AvgImpressionPosition || 0) * (r.Impressions || 0);
    m.set(r.Query, a);
  }
  return [...m.entries()]
    .map(([key, a]) => ({
      key,
      impressions: a.imp,
      clicks: a.clk,
      ctr: a.imp ? Math.round((1e4 * a.clk) / a.imp) / 100 : 0,
      position: a.imp ? Math.round((100 * a.posW) / a.imp) / 100 : null,
    }))
    .sort((a, b) => b.impressions - a.impressions || a.key.localeCompare(b.key));
}

async function main() {
  const [q, p, d] = await Promise.all([call("GetQueryStats"), call("GetPageStats"), call("GetRankAndTrafficStats")]);
  const daily = d
    .map((r) => ({ date: iso(ms(r.Date)), impressions: r.Impressions || 0, clicks: r.Clicks || 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const all = rollup(p);
  const pages = all.filter((x) => livePath(x.key)).map((x) => ({ ...x, key: livePath(x.key)! }));
  const gone = all.filter((x) => !livePath(x.key));
  const allQueries = rollup(q);
  const queries = allQueries.filter((x) => onTopic(x.key));
  const snap: BingSnapshot = {
    site: SITE,
    fetched: today,
    window: { start: iso(since), end: today, days: Math.round((Date.parse(today) - since) / 864e5) },
    dropped: { pages: gone.length, impressions: gone.reduce((s, x) => s + x.impressions, 0), queries: allQueries.length - queries.length },
    // Site totals from the daily series (complete), over the same window.
    totals: daily
      .filter((x) => Date.parse(x.date) >= since)
      .reduce((t, x) => ({ impressions: t.impressions + x.impressions, clicks: t.clicks + x.clicks }), { impressions: 0, clicks: 0 }),
    daily,
    pages,
    queries,
  };
  const dir = path.join(process.cwd(), "data/bing");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${today}.json`);
  fs.writeFileSync(file, JSON.stringify(snap, null, 2) + "\n");
  console.log(`bing: ${snap.queries.length} queries (${snap.dropped.queries} off-site dropped), ${pages.length} pages, ${daily.length} days, ${snap.totals.impressions} impressions, ${snap.totals.clicks} clicks -> ${path.relative(process.cwd(), file)}`);
}

main().catch((e) => {
  console.error(`bing-fetch failed: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
