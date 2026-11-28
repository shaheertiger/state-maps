/**
 * Builds docs/what-works.md (and data/what-works.json) from the saved search data, the way
 * treadmillreviewsusa.com's perf-report.mjs does: a scoreboard per page TYPE, a verdict for each
 * type, and the short lists the weekly routine works from.
 *
 *   npx tsx scripts/bing-fetch.ts      # first: save today's Bing data to research/bing/
 *   npx tsx scripts/perf-report.ts     # then: rebuild docs/what-works.md
 *
 * Inputs
 *   research/bing/*.json    Bing snapshots (scripts/bing-fetch.ts, or a Webmaster UI export saved in
 *                           the same shape). Site totals come from the newest snapshot's daily series;
 *                           per-page numbers from the newest snapshot that lists the page.
 *   research/vercel/*.json  optional Vercel Web Analytics pulls: { start, end, engines: { bing: { "/path/": visitors } } }
 *                           Bing, DuckDuckGo, Yahoo and Ecosia run on Bing's index and are added up as
 *                           "Bing family"; Brave runs its own index and is shown on its own.
 *
 * The snippet change log between the snippet-log markers in docs/what-works.md is kept as-is.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { allEntries, type Entry } from "../lib/urls";
import { compatPages, LAUNCH_DATE } from "../lib/compat";
import { allBrands, allGuides } from "../lib/content";

const ROOT = process.cwd();
const TODAY = process.env.PERF_TODAY ?? new Date().toISOString().slice(0, 10);
const OUT_MD = path.join(ROOT, "docs/what-works.md");
const OUT_JSON = path.join(ROOT, "data/what-works.json");
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

// ---------- rules (printed at the top of the report; the daily run follows them) ----------
export const RULES = {
  doubleDown: 2, // impressions per page >= 2x the site average
  stopPages: 10, // a type with >= 10 pages aged 14+ days and 0 impressions among them
  stopAgeDays: 14,
  rewrite: { minPos: 4, maxPos: 10, minImpressions: 20, perWeek: 3, judgeAfterDays: 14 },
};

// ---------- page inventory ----------
type PageType = "will-it-fit" | "fit" | "sizing" | "tools" | "other";
const typeOf = (p: string): PageType =>
  p.startsWith("/will-it-fit/") ? "will-it-fit" : p.startsWith("/fit/") ? "fit" : p.startsWith("/sizing/") ? "sizing" : p.startsWith("/tools/") ? "tools" : "other";
const TYPES: PageType[] = ["will-it-fit", "fit", "sizing", "tools"];

const gitAdded = (file: string): string | null => {
  try {
    const out = execSync(`git log --diff-filter=A --format=%as -- "${file}"`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim().split("\n");
    return out[out.length - 1] || null;
  } catch {
    return null;
  }
};
function publishedDates(): Map<string, string> {
  const m = new Map<string, string>();
  for (const g of allGuides()) m.set(`/fit/${g.slug}/`, gitAdded(`content/fit/${g.slug}.json`) ?? g.updated);
  for (const b of allBrands()) m.set(`/sizing/${b.slug}/`, gitAdded(`content/sizing/${b.slug}.json`) ?? b.checked);
  for (const p of compatPages()) m.set(`/will-it-fit/${p.slug}/`, p.pair.published ?? LAUNCH_DATE);
  return m;
}

// ---------- data ----------
type Stat = { key: string; impressions: number; clicks: number; ctr: number; position: number | null };
type Snap = {
  fetched: string;
  source?: string;
  window: { start: string; end: string; days: number };
  totals: { impressions: number; clicks: number };
  partial?: boolean;
  typeImpressionsPerPage?: Partial<Record<PageType, number>>;
  daily: { date: string; impressions: number; clicks: number }[];
  pages: Stat[];
  queries: Stat[];
};
const readDir = <T,>(dir: string): { file: string; data: T }[] => {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => ({ file: `${dir}/${f}`, data: JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T }));
};
const snaps = readDir<Snap>("research/bing").sort((a, b) => a.data.window.end.localeCompare(b.data.window.end) || a.file.localeCompare(b.file));
type VercelPull = { start: string; end: string; engines: Record<string, Record<string, number>> };
const vercel = readDir<VercelPull>("research/vercel");
const BING_FAMILY = ["bing", "duckduckgo", "yahoo", "ecosia"];

// ---------- per-page numbers: newest snapshot that lists the page ----------
type PageStat = Stat & { from: string };
const pageStats = new Map<string, PageStat>();
for (const s of snaps) for (const p of s.data.pages) pageStats.set(p.key, { ...p, from: s.file });

const entries: Entry[] = allEntries();
const published = publishedDates();
const live = entries.map((e) => {
  const st = pageStats.get(e.path);
  const pub = published.get(e.path) ?? LAUNCH_DATE;
  return { path: e.path, title: e.title, type: typeOf(e.path), published: pub, age: days(pub, TODAY), imp: st?.impressions ?? 0, clk: st?.clicks ?? 0, pos: st?.position ?? null };
});

// Site totals: newest snapshot's daily series (complete), else its totals.
const latest = snaps[snaps.length - 1]?.data;
const pageSum = (type: PageType) => live.filter((x) => x.type === type);
const scoreboard = TYPES.map((type) => {
  const pages = pageSum(type);
  const imp = pages.reduce((s, x) => s + x.imp, 0);
  const clk = pages.reduce((s, x) => s + x.clk, 0);
  const withPos = pages.filter((x) => x.pos !== null);
  const posImp = withPos.reduce((s, x) => s + x.imp, 0);
  const posW = withPos.reduce((s, x) => s + x.pos! * x.imp, 0);
  const vf: Record<string, number> = {};
  for (const v of vercel) for (const [eng, rows] of Object.entries(v.data.engines)) for (const [p, n] of Object.entries(rows)) if (typeOf(p) === type) vf[eng] = (vf[eng] ?? 0) + n;
  return {
    type,
    pages: pages.length,
    aged: pages.filter((x) => x.age >= RULES.stopAgeDays).length,
    agedZero: pages.filter((x) => x.age >= RULES.stopAgeDays && x.imp === 0).length,
    impressions: imp,
    clicks: clk,
    position: posImp ? Math.round((10 * posW) / posImp) / 10 : null,
    perPage: pages.length ? imp / pages.length : 0,
    vercel: vf,
  };
});
const totalPages = scoreboard.reduce((s, x) => s + x.pages, 0);

// Per-type rates: the snapshot whose listed pages carry the most impressions is the page source.
// Bing's API lists few pages (weekly buckets, about a week late); a Webmaster UI export lists more.
// When that source is top-pages-only, its owner-read per-type rates stand in for the computed ones.
const pageSource = [...snaps].sort((a, b) => b.data.pages.reduce((t, x) => t + x.impressions, 0) - a.data.pages.reduce((t, x) => t + x.impressions, 0))[0];
const ownerRates = pageSource?.data.partial ? pageSource.data.typeImpressionsPerPage : undefined;
const board = scoreboard.map((s) => ({ ...s, perPageShown: ownerRates?.[s.type] ?? s.perPage, verdict: "" }));
const avgShown = totalPages ? board.reduce((t, s) => t + s.perPageShown * s.pages, 0) / totalPages : 0;
for (const s of board)
  s.verdict =
    s.aged >= RULES.stopPages && s.impressions === 0 && s.perPageShown === 0
      ? "STOP"
      : avgShown > 0 && s.perPageShown >= RULES.doubleDown * avgShown
        ? "DOUBLE DOWN"
        : "HOLD";

// ---------- snippet log (kept between markers) ----------
const existing = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, "utf8") : "";
const logBlock = existing.match(/<!-- snippet-log:start -->[\s\S]*?<!-- snippet-log:end -->/)?.[0] ?? "<!-- snippet-log:start -->\n## Snippet change log\n\n_No changes yet._\n<!-- snippet-log:end -->";
const logged = [...logBlock.matchAll(/^\| (\d{4}-\d{2}-\d{2}) \| (\/[^ |]*) \|/gm)].map((m) => ({ date: m[1], url: m[2] }));
const changedRecently = new Set(logged.filter((l) => days(l.date, TODAY) < RULES.rewrite.judgeAfterDays).map((l) => l.url));
const thisWeek = logged.filter((l) => days(l.date, TODAY) < 7).length;
const due = logged.filter((l) => days(l.date, TODAY) >= RULES.rewrite.judgeAfterDays);

// ---------- lists ----------
const R = RULES.rewrite;
const rewrite = live
  .filter((x) => x.pos !== null && x.pos >= R.minPos && x.pos <= R.maxPos && x.imp >= R.minImpressions && x.clk === 0 && !changedRecently.has(x.path))
  .sort((a, b) => b.imp - a.imp)
  .slice(0, Math.max(0, R.perWeek - thisWeek));
const top = [...live].filter((x) => x.imp > 0).sort((a, b) => b.imp - a.imp || (a.pos ?? 99) - (b.pos ?? 99));
const topWillItFit = top.filter((x) => x.type === "will-it-fit" && x.path !== "/will-it-fit/").slice(0, 6);
const withQueries = snaps.filter((s) => s.data.queries.length);
const queries = withQueries[withQueries.length - 1]?.data.queries ?? [];
const prevQ = withQueries.length > 1 ? withQueries[withQueries.length - 2].data.queries : null;
const top3 = (qs: Stat[]) => new Set(qs.filter((q) => q.position !== null && q.position <= 3).map((q) => q.key));
const nowTop3 = top3(queries), wasTop3 = top3(prevQ ?? []);
const entering = prevQ ? [...nowTop3].filter((q) => !wasTop3.has(q)) : [];
const leaving = prevQ ? [...wasTop3].filter((q) => !nowTop3.has(q)) : [];
const fourToTen = queries.filter((q) => q.position !== null && q.position > 3 && q.position <= 10).slice(0, 15);
const lowCtrTop5 = queries.filter((q) => q.position !== null && q.position <= 5 && q.impressions >= 5 && q.ctr < 10).slice(0, 10);
const prevKeys = new Set((prevQ ?? []).map((q) => q.key));
const newLong = queries.filter((q) => q.key.split(/\s+/).length >= 4 && !prevKeys.has(q.key)).slice(0, 15);

// Week over week from the newest daily series.
const daily = latest?.daily ?? [];
const sumRange = (from: string, to: string) =>
  daily.filter((d) => d.date >= from && d.date <= to).reduce((t, d) => ({ i: t.i + d.impressions, c: t.c + d.clicks }), { i: 0, c: 0 });
const lastDay = daily.length ? daily[daily.length - 1].date : TODAY;
const shift = (d: string, n: number) => new Date(Date.parse(d) + n * 864e5).toISOString().slice(0, 10);
const thisWk = sumRange(shift(lastDay, -6), lastDay), lastWk = sumRange(shift(lastDay, -13), shift(lastDay, -7));

// Next pages planned (research/queue.json, kept by the daily publishing run).
const queueFile = path.join(ROOT, "research/queue.json");
const queue: { url: string; cluster: string; status: string }[] = fs.existsSync(queueFile) ? JSON.parse(fs.readFileSync(queueFile, "utf8")).items ?? [] : [];
const planned = queue.filter((q) => q.status === "planned").slice(0, 5);

// ---------- write ----------
const fmt = (n: number, d = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(d));
const pos = (p: number | null) => (p === null ? "—" : fmt(p));
const vercelCols = (v: Record<string, number>) => {
  const fam = BING_FAMILY.reduce((s, e) => s + (v[e] ?? 0), 0);
  return vercel.length ? ` ${fam} | ${v.brave ?? 0} |` : "";
};
const md = `# What works

Generated by \`scripts/perf-report.ts\` on ${TODAY}. Don't edit by hand except the snippet change log,
which the script keeps. Data: ${snaps.map((s) => `\`${s.file}\` (${s.data.window.start} → ${s.data.window.end}${s.data.partial ? ", top pages only" : ""})`).join(", ") || "none yet"}${vercel.length ? `; Vercel: ${vercel.map((v) => `\`${v.file}\``).join(", ")}` : ""}.

## Verdict rules (the daily run follows these)

- **DOUBLE DOWN**: a page type earns Bing impressions per page at least **${RULES.doubleDown}×** the site average. Most new pages go here.
- **HOLD**: near or below the average. Improve existing pages; add few new ones.
- **STOP**: **${RULES.stopPages}+** pages of a type are ${RULES.stopAgeDays}+ days old and the type has **0** impressions. Publish no more of it.
- **Snippet rewrite**: a page at #${R.minPos}–${R.maxPos} with ${R.minImpressions}+ impressions and 0 clicks. At most **${R.perWeek} a week** (Bing playbook, Nov 28; the original plan said 5), each logged below and judged after **${R.judgeAfterDays} days** against untouched pages: keep or revert.
- Count Bing + DuckDuckGo + Yahoo + Ecosia visitors as Bing traffic (they use Bing's index). Brave runs its own index and is shown separately.
- One page per distinct topic, not per size or variant: sizes go in a table on the main page unless the data shows a size page earns on its own.

## Weekly summary (for the Monday report)

1. Bing: ${thisWk.i} impressions, ${thisWk.c} clicks in the last 7 days (to ${lastDay}) vs ${lastWk.i} and ${lastWk.c} the week before.
2. Top 5 pages: ${top.slice(0, 5).map((x) => `${x.path} (${x.imp})`).join(", ") || "no data"}.
3. Verdicts: ${board.map((s) => `${s.type} ${s.verdict}`).join(", ")}.
4. Snippet changes: ${thisWeek} in the last 7 days; ${due.length} ready to judge.
5. Next 5 pages: ${planned.map((q) => `${q.url} (${q.cluster})`).join(", ") || "queue empty"}.

## Scoreboard by page type

Site average: **${fmt(avgShown, 2)}** impressions per page across ${totalPages} pages.${ownerRates ? ` Per-page rates come from the owner's full Bing report (\`${pageSource.file}\` lists top pages only).` : ""}

| Page type | Live pages | Bing impr. (listed pages) | Clicks | Avg pos. | Impr. per page | ×avg |${vercel.length ? " Bing-family visitors | Brave |" : ""} Verdict |
|---|---|---|---|---|---|---|${vercel.length ? "---|---|" : ""}---|
${board.map((s) => `| ${s.type} | ${s.pages} | ${s.impressions} | ${s.clicks} | ${pos(s.position)} | ${fmt(s.perPageShown, 2)} | ${avgShown ? fmt(s.perPageShown / avgShown, 1) : "—"} |${vercelCols(s.vercel)} **${s.verdict}** |`).join("\n")}

Bing site totals (daily series): last 7 days ${thisWk.i} impressions, ${thisWk.c} clicks; the 7 before ${lastWk.i} impressions, ${lastWk.c} clicks.

## Top pages

| Page | Impr. | Clicks | Pos. |
|---|---|---|---|
${top.slice(0, 10).map((x) => `| ${x.path} | ${x.imp} | ${x.clk} | ${pos(x.pos)} |`).join("\n") || "| — | | | |"}

## Snippet rewrites due (#${R.minPos}–${R.maxPos}, ${R.minImpressions}+ impressions, 0 clicks)

${rewrite.length ? rewrite.map((x) => `- ${x.path}: ${x.imp} impressions at #${pos(x.pos)}`).join("\n") : `_None this week${thisWeek ? ` (${thisWeek} already changed in the last 7 days)` : ""}._`}

${due.length ? `Changes ready to judge (${R.judgeAfterDays}+ days old): ${due.map((d) => `${d.url} (${d.date})`).join(", ")}.` : `No change is ${R.judgeAfterDays} days old yet.`}

## Queries

${prevQ ? `- Entering the top 3: ${entering.slice(0, 10).join("; ") || "none"}
- Leaving the top 3: ${leaving.slice(0, 10).join("; ") || "none"}` : `- In the top 3 now (first snapshot with queries, nothing to compare yet): ${[...nowTop3].slice(0, 10).join("; ") || "none"}`}

#4–10 by impressions:

${fourToTen.map((q) => `- ${q.key}: ${q.impressions} at #${pos(q.position)}`).join("\n") || "_None._"}

Top-5 queries under 10% CTR (5+ impressions): ${lowCtrTop5.map((q) => `${q.key} (#${pos(q.position)}, ${q.impressions})`).join("; ") || "none"}

New 4+ word queries:

${newLong.map((q) => `- ${q.key}: ${q.impressions} at #${pos(q.position)}`).join("\n") || "_None._"}

## Homepage will-it-fit links (top 6 by Bing impressions)

${topWillItFit.map((x) => `- ${x.path} (${x.imp})`).join("\n") || "_No data yet._"}

${logBlock}
`;
fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_MD, md);
fs.writeFileSync(
  OUT_JSON,
  JSON.stringify({ generated: TODAY, average: avgShown, types: Object.fromEntries(board.map((s) => [s.type, { pages: s.pages, impressions: s.impressions, perPage: s.perPageShown, verdict: s.verdict }])), homeWillItFit: topWillItFit.map((x) => x.path), rewrite: rewrite.map((x) => x.path) }, null, 2) + "\n",
);
console.log(`what-works: ${board.map((s) => `${s.type} ${fmt(s.perPageShown, 2)}/page ${s.verdict}`).join(", ")}`);
