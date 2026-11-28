/**
 * Saves a Vercel Web Analytics pull to research/vercel/END_START.json for perf-report.ts.
 *
 * The daily run pulls it with the Vercel MCP tool aggregate_pageviews (by: requestPath, one call per
 * engine, filtered on that engine's referrer hostnames below, limit 100) and pipes the rows in:
 *
 *   echo '[{"requestPath":"/fit/bra/","visitors":3}]' | npx tsx scripts/vercel-save.ts --engine duckduckgo --start 2026-11-21 --end 2026-11-28
 *
 * Several engines for the same window merge into one file. "Others" rows are dropped.
 */
import fs from "node:fs";
import path from "node:path";

export const ENGINES: Record<string, string[]> = {
  bing: ["bing.com", "cn.bing.com", "msn.com"],
  duckduckgo: ["duckduckgo.com", "noai.duckduckgo.com"],
  yahoo: ["search.yahoo.com", "uk.search.yahoo.com", "ca.search.yahoo.com", "au.search.yahoo.com"],
  ecosia: ["ecosia.org"],
  brave: ["search.brave.com"], // own index: reported separately, never counted as Bing
  google: ["google.com"],
};

const args = process.argv.slice(2);
const opt = (k: string) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : undefined;
};
const engine = opt("--engine"), start = opt("--start"), end = opt("--end");
if (!engine || !ENGINES[engine] || !start || !end) {
  console.error(`usage: vercel-save.ts --engine ${Object.keys(ENGINES).join("|")} --start YYYY-MM-DD --end YYYY-MM-DD < rows.json`);
  process.exit(1);
}
const rows = JSON.parse(fs.readFileSync(0, "utf8")) as { requestPath: string; visitors: number }[];
const file = path.join(process.cwd(), "research/vercel", `${end}_${start}.json`);
fs.mkdirSync(path.dirname(file), { recursive: true });
const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { start, end, engines: {} };
data.engines[engine] = Object.fromEntries(rows.filter((r) => r.requestPath?.startsWith("/")).map((r) => [r.requestPath, r.visitors]));
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`saved ${Object.keys(data.engines[engine]).length} ${engine} rows to ${path.relative(process.cwd(), file)}`);
