import { SITE } from "../lib/site";
import { allArticles } from "../data/index";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export function GET() {
  const items = [...allArticles]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((a) => `<item><title>${esc(a.title)}</title><link>${SITE.url}${a.url}</link><guid>${SITE.url}${a.url}</guid><description>${esc(a.description)}</description><pubDate>${new Date(a.updated + "T09:00:00Z").toUTCString()}</pubDate></item>`)
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name}</title><link>${SITE.url}/</link><description>${esc(SITE.description)}</description><language>en-us</language>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
