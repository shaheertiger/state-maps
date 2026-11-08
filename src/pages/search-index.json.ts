import { allArticles, apps, comparisons, compareUrl, getApp, reviewUrl } from "../data/index";

export function GET() {
  const items = [
    ...allArticles.map((a) => ({ t: a.title, d: a.description, u: a.url, k: a.kind === "list" ? "Ranking" : "Guide" })),
    ...apps.map((a) => ({ t: `${a.name} review`, d: a.oneLiner, u: reviewUrl(a.slug), k: "Review" })),
    ...comparisons.map((c) => ({ t: `${getApp(c.a).name} vs ${getApp(c.b).name}`, d: c.summary, u: compareUrl(c), k: "Comparison" })),
  ];
  return new Response(JSON.stringify(items), { headers: { "Content-Type": "application/json" } });
}
