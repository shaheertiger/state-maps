/**
 * Builds docs/what-works.md (and data/what-works.json) from the saved search data, the way
 * treadmillreviewsusa.com's perf-report.mjs does, organised by the cluster map in data/clusters.json.
 *
 *   npx tsx scripts/bing-fetch.ts      # first: save today's Bing data to data/bing/
 *   npx tsx scripts/perf-report.ts     # then: rebuild docs/what-works.md
 *
 * Inputs
 *   data/clusters.json   every live page -> { cluster, type }
 *   data/bing/*.json     Bing snapshots (scripts/bing-fetch.ts, or a Webmaster UI export in the same
 *                        shape). Site totals come from the newest daily series; per-page numbers from
 *                        the newest snapshot that lists the page.
 *   data/vercel/*.json   optional Vercel referrer pulls (scripts/vercel-save.ts). Bing, DuckDuckGo,
 *                        Yahoo and Ecosia count as Bing traffic; Brave is shown on its own.
 *   research/queue.json  optional: the next pages planned { items: [{ url, cluster, type, status }] }
 *
 * The snippet change log between the snippet-log markers in docs/what-works.md is kept as-is.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { allEntries } from "../lib/urls";
import { compatPages, LAUNCH_DATE } from "../lib/compat";
import { allBrands, allGuides } from "../lib/content";

const ROOT = process.cwd();
const TODAY = process.env.PERF_TODAY ?? new Date().toISOString().slice(0, 10);
const OUT_MD = path.join(ROOT, "docs/what-works.md");
const OUT_JSON = path.join(ROOT, "data/what-works.json");
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
const readJson = <T,>(f: string): T | null => (fs.existsSync(path.join(ROOT, f)) ? (JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8")) as T) : null);

// ---------- rules (printed at the top of the report; the daily run follows them) ----------
export const RULES = {
  doubleDown: 2, // impressions per page >= 2x the site average
  stopPages: 10, // 10+ pages of a group aged 14+ days with 0 impressions, and the group has none at all
  stopAgeDays: 14,
  clusterTarget: 15,
  // Required page types per buildable cluster (minimum counts), in build order.
  required: { "will-it-fit": 10, dimensions: 1, "best-that-fits": 1, "how-to": 1, question: 2, hub: 1 } as Record<string, number>,
  rewrite: { minImpressions: 300, maxCtr: 1, minPos: 4, maxPos: 10, floor: 20, perWeek: 5, judgeAfterDays: 14 },
};

// ---------- inventory ----------
type ClusterMap = { target: number; types: string[]; clusters: Record<string, { name: string; status: string; order?: number }>; pages: Record<string, { cluster: string; type: string }> };
const mapOrNull = readJson<ClusterMap>("data/clusters.json");
if (!mapOrNull) throw new Error("data/clusters.json missing");
const map: ClusterMap = mapOrNull;
const gitAdded = (file: string): string | null => {
  try {
    const out = execSync(`git log --diff-filter=A --format=%as -- "${file}"`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim().split("\n");
    return out[out.length - 1] || null;
  } catch {
    return null;
  }
};
const published = new Map<string, string>();
for (const g of allGuides()) published.set(`/fit/${g.slug}/`, gitAdded(`content/fit/${g.slug}.json`) ?? g.updated);
for (const b of allBrands()) published.set(`/sizing/${b.slug}/`, gitAdded(`content/sizing/${b.slug}.json`) ?? b.checked);
for (const p of compatPages()) published.set(`/will-it-fit/${p.slug}/`, p.pair.published ?? LAUNCH_DATE);

// ---------- data ----------
type Stat = { key: string; impressions: number; clicks: number; ctr: number; position: number | null };
type Snap = {
  fetched: string;
  window: { start: string; end: string; days: number };
  totals: { impressions: number; clicks: number };
  partial?: boolean;
  typeImpressionsPerPage?: Record<string, number>;
  daily: { date: string; impressions: number; clicks: number }[];
  pages: Stat[];
  queries: Stat[];
};
const readDir = <T,>(dir: string) =>
  fs.existsSync(path.join(ROOT, dir))
    ? fs
        .readdirSync(path.join(ROOT, dir))
        .filter((f) => f.endsWith(".json"))
        .sort()
        .map((f) => ({ file: `${dir}/${f}`, data: JSON.parse(fs.readFileSync(path.join(ROOT, dir, f), "utf8")) as T }))
    : [];
const snaps = readDir<Snap>("data/bing").sort((a, b) => a.data.window.end.localeCompare(b.data.window.end) || a.file.localeCompare(b.file));
const vercel = readDir<{ start: string; end: string; engines: Record<string, Record<string, number>> }>("data/vercel");
const BING_FAMILY = ["bing", "duckduckgo", "yahoo", "ecosia"];

const pageStats = new Map<string, Stat>();
for (const s of snaps) for (const p of s.data.pages) pageStats.set(p.key, p);

const live = allEntries().map((e) => {
  const st = pageStats.get(e.path);
  const m = map.pages[e.path] ?? { cluster: "unassigned", type: "unassigned" };
  const pub = published.get(e.path) ?? LAUNCH_DATE;
  const visits: Record<string, number> = {};
  for (const v of vercel) for (const [eng, rows] of Object.entries(v.data.engines)) if (rows[e.path]) visits[eng] = (visits[eng] ?? 0) + rows[e.path];
  return { path: e.path, title: e.title, cluster: m.cluster, type: m.type, age: days(pub, TODAY), imp: st?.impressions ?? 0, clk: st?.clicks ?? 0, pos: st?.position ?? null, visits };
});
type Live = (typeof live)[number];
const scored = live.filter((x) => x.type !== "page" && x.cluster !== "site");
const avg = scored.length ? scored.reduce((s, x) => s + x.imp, 0) / scored.length : 0;

function group(key: "cluster" | "type") {
  const keys = [...new Set(scored.map((x) => x[key]))];
  return keys
    .map((k) => {
      const pages = scored.filter((x) => x[key] === k);
      const imp = pages.reduce((s, x) => s + x.imp, 0);
      const clk = pages.reduce((s, x) => s + x.clk, 0);
      const withPos = pages.filter((x) => x.pos !== null && x.imp > 0);
      const posImp = withPos.reduce((s, x) => s + x.imp, 0);
      const pos = posImp ? Math.round((10 * withPos.reduce((s, x) => s + x.pos! * x.imp, 0)) / posImp) / 10 : null;
      const perPage = pages.length ? imp / pages.length : 0;
      const agedZero = pages.filter((x) => x.age >= RULES.stopAgeDays && x.imp === 0).length;
      const fam = pages.reduce((s, x) => s + BING_FAMILY.reduce((t, e) => t + (x.visits[e] ?? 0), 0), 0);
      const brave = pages.reduce((s, x) => s + (x.visits.brave ?? 0), 0);
      let verdict = agedZero >= RULES.stopPages && imp === 0 ? "STOP" : avg > 0 && perPage >= RULES.doubleDown * avg ? "DOUBLE DOWN" : "HOLD";
      // Clusters the owner put on hold (/fit/ and /sizing/) stay on hold whatever the ratio says.
      if (key === "cluster" && map.clusters[k]?.status === "hold" && verdict === "DOUBLE DOWN") verdict = "HOLD (owner: improve, don't add)";
      const types: Record<string, number> = {};
      for (const p of pages) types[p.type] = (types[p.type] ?? 0) + 1;
      return { key: k, pages: pages.length, imp, clk, pos, perPage, agedZero, fam, brave, verdict, types };
    })
    .sort((a, b) => b.perPage - a.perPage || b.pages - a.pages);
}
const byCluster = group("cluster");
const byType = group("type");

// ---------- cluster build progress ----------
const buildable = Object.entries(map.clusters)
  .filter(([, c]) => ["current", "next", "planned"].includes(c.status))
  .sort(([, a], [, b]) => (a.order ?? 99) - (b.order ?? 99));
const progress = buildable.map(([id, c]) => {
  const pages = live.filter((x) => x.cluster === id);
  const have: Record<string, number> = {};
  for (const p of pages) have[p.type] = (have[p.type] ?? 0) + 1;
  const missing = Object.entries(RULES.required)
    .filter(([t, n]) => (have[t] ?? 0) < n)
    .map(([t, n]) => `${t} ${have[t] ?? 0}/${n}`);
  return { id, name: c.name, status: c.status, count: pages.length, missing, done: pages.length >= RULES.clusterTarget && missing.length === 0 };
});
const current = progress.find((p) => p.status === "current");

// ---------- snippet log + rewrite candidates ----------
const existing = fs.existsSync(OUT_MD) ? fs.readFileSync(OUT_MD, "utf8") : "";
const logBlock = existing.match(/<!-- snippet-log:start -->[\s\S]*?<!-- snippet-log:end -->/)?.[0] ?? "<!-- snippet-log:start -->\n## Snippet change log\n\n_No changes yet._\n<!-- snippet-log:end -->";
const logged = [...logBlock.matchAll(/^\| (\d{4}-\d{2}-\d{2}) \| (\/[^ |]*) \|/gm)].map((m) => ({ date: m[1], url: m[2] }));
const R = RULES.rewrite;
const changedRecently = new Set(logged.filter((l) => days(l.date, TODAY) < R.judgeAfterDays).map((l) => l.url));
const thisWeek = logged.filter((l) => days(l.date, TODAY) < 7).length;
const due = logged.filter((l) => days(l.date, TODAY) >= R.judgeAfterDays);
const ctr = (x: Live) => (x.imp ? (100 * x.clk) / x.imp : 0);
const rewrite = live
  .filter((x) => !changedRecently.has(x.path))
  .filter((x) => (x.imp >= R.minImpressions && ctr(x) < R.maxCtr) || (x.pos !== null && x.pos >= R.minPos && x.pos <= R.maxPos && x.imp >= R.floor && x.clk === 0))
  .sort((a, b) => b.imp - a.imp)
  .slice(0, Math.max(0, R.perWeek - thisWeek));

// ---------- lists ----------
const top = [...live].filter((x) => x.imp > 0).sort((a, b) => b.imp - a.imp || (a.pos ?? 99) - (b.pos ?? 99));
const topWillItFit = top.filter((x) => x.type === "will-it-fit").slice(0, 6);
const withQueries = snaps.filter((s) => s.data.queries.length);
const queries = withQueries[withQueries.length - 1]?.data.queries ?? [];
const prevQ = withQueries.length > 1 ? withQueries[withQueries.length - 2].data.queries : null;
const top3 = (qs: Stat[]) => new Set(qs.filter((q) => q.position !== null && q.position <= 3).map((q) => q.key));
const nowTop3 = top3(queries), wasTop3 = top3(prevQ ?? []);
const fourToTen = queries.filter((q) => q.position !== null && q.position > 3 && q.position <= 10).slice(0, 15);
const prevKeys = new Set((prevQ ?? []).map((q) => q.key));
const newLong = queries.filter((q) => q.key.split(/\s+/).length >= 4 && !prevKeys.has(q.key)).slice(0, 20);

const latest = snaps[snaps.length - 1]?.data;
const daily = [...snaps].reverse().find((s) => s.data.daily.length)?.data.daily ?? [];
const lastDay = daily.length ? daily[daily.length - 1].date : TODAY;
const shift = (d: string, n: number) => new Date(Date.parse(d) + n * 864e5).toISOString().slice(0, 10);
const sumRange = (from: string, to: string) => daily.filter((d) => d.date >= from && d.date <= to).reduce((t, d) => ({ i: t.i + d.impressions, c: t.c + d.clicks }), { i: 0, c: 0 });
const thisWk = sumRange(shift(lastDay, -6), lastDay), lastWk = sumRange(shift(lastDay, -13), shift(lastDay, -7));
const partial = snaps.filter((s) => s.data.partial);

const queue = readJson<{ items: { url: string; cluster: string; type: string; status: string }[] }>("research/queue.json")?.items ?? [];
const planned = queue.filter((q) => q.status === "planned").slice(0, 5);

// ---------- write ----------
const fmt = (n: number, d = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(d));
const pos = (p: number | null) => (p === null ? "—" : fmt(p));
const cname = (id: string) => map.clusters[id]?.name ?? id;
const table = (rows: ReturnType<typeof group>, label: (k: string) => string) =>
  `| ${rows === byCluster ? "Cluster" : "Page type"} | Pages | Bing impr. | Clicks | Avg pos. | Impr./page | ×avg |${vercel.length ? " Bing-family visitors | Brave |" : ""} Verdict |\n|---|---|---|---|---|---|---|${vercel.length ? "---|---|" : ""}---|\n` +
  rows.map((s) => `| ${label(s.key)} | ${s.pages} | ${s.imp} | ${s.clk} | ${pos(s.pos)} | ${fmt(s.perPage, 2)} | ${avg ? fmt(s.perPage / avg, 1) : "—"} |${vercel.length ? ` ${s.fam} | ${s.brave} |` : ""} **${s.verdict}** |`).join("\n");

const md = `# What works

Generated by \`scripts/perf-report.ts\` on ${TODAY} from \`data/clusters.json\` and ${snaps.map((s) => `\`${s.file}\` (${s.data.window.start} → ${s.data.window.end}${s.data.partial ? ", top pages only" : ""})`).join(", ") || "no Bing data yet"}${vercel.length ? ` plus ${vercel.length} Vercel pull(s)` : ""}. Don't edit by hand except the snippet change log, which the script keeps.

## Verdict rules (the daily run follows these)

- **DOUBLE DOWN**: impressions per page at least **${RULES.doubleDown}×** the site average.
- **HOLD**: near or below the average. Improve the pages that earn; add few new ones.
- **STOP**: **${RULES.stopPages}+** pages ${RULES.stopAgeDays}+ days old with 0 impressions, and the group has none at all. Publish no more of it.
- **Clusters**: finish the current cluster to **${RULES.clusterTarget}+ pages** with every page type (${Object.entries(RULES.required).map(([t, n]) => `${t} ${n}+`).join(", ")}) before starting the next. /fit/ and /sizing/ are on HOLD: improve, don't add.
- **CTR rewrite** (before new pages that day): ${R.minImpressions}+ impressions under ${R.maxCtr}% CTR, or #${R.minPos}–${R.maxPos} with ${R.floor}+ impressions and 0 clicks. At most **${R.perWeek} a week**, logged below, judged after **${R.judgeAfterDays} days** against untouched pages.
- Bing + DuckDuckGo + Yahoo + Ecosia visitors count as Bing traffic; Brave runs its own index and is shown separately.

## Weekly summary (for the Monday report)

1. Bing: ${thisWk.i} impressions, ${thisWk.c} clicks in the 7 days to ${lastDay}, vs ${lastWk.i} and ${lastWk.c} the week before.
2. Top 5 pages: ${top.slice(0, 5).map((x) => `${x.path} (${x.imp})`).join(", ") || "no data"}.
3. Impressions per page by cluster: ${byCluster.filter((c) => c.imp > 0 || buildable.some(([id]) => id === c.key)).map((c) => `${c.key} ${fmt(c.perPage, 2)}`).join(", ")}.
4. Current cluster: ${current ? `${current.name}, ${current.count}/${RULES.clusterTarget} pages; missing ${current.missing.join(", ") || "nothing"}` : "none set"}.
5. Next 5 pages: ${planned.map((q) => `${q.url} (${q.type})`).join(", ") || "queue empty"}.

## Cluster build progress

| # | Cluster | Status | Pages | Missing page types |
|---|---|---|---|---|
${progress.map((p, i) => `| ${i + 1} | ${p.name} | ${p.status} | ${p.count}/${RULES.clusterTarget} | ${p.missing.join(", ") || (p.done ? "complete" : "—")} |`).join("\n")}

## By cluster

Site average: **${fmt(avg, 2)}** impressions per page over ${scored.length} pages (home and about pages excluded).${partial.length ? ` Per-page numbers include ${partial.map((s) => `\`${s.file}\``).join(", ")}, which lists top pages only, so smaller pages read as 0 until the Bing API's page report catches up (about a week behind).` : ""}

${table(byCluster, cname)}

## By page type

${table(byType, (k) => k)}
${partial.length && partial[partial.length - 1].data.typeImpressionsPerPage ? `\nFrom the owner's full Bing report (${partial[partial.length - 1].data.window.start} → ${partial[partial.length - 1].data.window.end}), impressions per page by section: ${Object.entries(partial[partial.length - 1].data.typeImpressionsPerPage!).map(([k, v]) => `/${k}/ ${v}`).join(", ")}.\n` : ""}
Bing site totals (daily series): ${latest ? `${latest.totals.impressions} impressions, ${latest.totals.clicks} clicks over ${latest.window.start} → ${latest.window.end}` : "none yet"}.

## Top pages

| Page | Cluster | Impr. | Clicks | Pos. |
|---|---|---|---|---|
${top.slice(0, 10).map((x) => `| ${x.path} | ${x.cluster} | ${x.imp} | ${x.clk} | ${pos(x.pos)} |`).join("\n") || "| — | | | | |"}

## CTR rewrites due

${rewrite.length ? rewrite.map((x) => `- ${x.path}: ${x.imp} impressions, ${fmt(ctr(x), 1)}% CTR at #${pos(x.pos)}`).join("\n") : `_None due${thisWeek ? ` (${thisWeek} changed in the last 7 days; the weekly cap is ${R.perWeek})` : ""}._`}

${due.length ? `Changes ready to judge (${R.judgeAfterDays}+ days old): ${due.map((d) => `${d.url} (${d.date})`).join(", ")}.` : `No change is ${R.judgeAfterDays} days old yet.`}

## Queries

${prevQ ? `- Entering the top 3: ${[...nowTop3].filter((q) => !wasTop3.has(q)).slice(0, 10).join("; ") || "none"}\n- Leaving the top 3: ${[...wasTop3].filter((q) => !nowTop3.has(q)).slice(0, 10).join("; ") || "none"}` : `- In the top 3 now (first snapshot with queries): ${[...nowTop3].slice(0, 10).join("; ") || "none"}`}

#4–10 by impressions:

${fourToTen.map((q) => `- ${q.key}: ${q.impressions} at #${pos(q.position)}`).join("\n") || "_None._"}

New 4+ word queries (question-page candidates):

${newLong.map((q) => `- ${q.key}: ${q.impressions} at #${pos(q.position)}`).join("\n") || "_None._"}

## Homepage will-it-fit links (top 6 by Bing impressions)

${topWillItFit.map((x) => `- ${x.path} (${x.imp})`).join("\n") || "_No data yet._"}

${logBlock}
`;
fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_MD, md);
fs.writeFileSync(
  OUT_JSON,
  JSON.stringify(
    {
      generated: TODAY,
      average: Math.round(avg * 100) / 100,
      clusters: Object.fromEntries(byCluster.map((s) => [s.key, { pages: s.pages, impressions: s.imp, perPage: Math.round(s.perPage * 100) / 100, verdict: s.verdict }])),
      types: Object.fromEntries(byType.map((s) => [s.key, { pages: s.pages, impressions: s.imp, perPage: Math.round(s.perPage * 100) / 100, verdict: s.verdict }])),
      progress,
      homeWillItFit: topWillItFit.map((x) => x.path),
      rewrite: rewrite.map((x) => x.path),
    },
    null,
    2,
  ) + "\n",
);
console.log(`what-works: avg ${fmt(avg, 2)}/page; ${byCluster.filter((c) => c.imp).map((c) => `${c.key} ${fmt(c.perPage, 2)} ${c.verdict}`).join(", ")}`);
