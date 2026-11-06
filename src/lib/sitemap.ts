import { APPS, CATEGORIES, url, hasTrackPage, hasLockPage, LETTERS, letterOf, allTypes } from "./data";
import { DATA_TYPES } from "./labels";
import { TOOLS } from "./tools";
import { SITE, abs } from "./site";
import { articles, categories as guideCats } from "./editorial/content";
import { privacySettings } from "./editorial/settings";
import { catalogPages } from "./editorial/catalog";

/** lastmod is the snapshot date — it changes only when the data is re-collected. */
const lastmod = SITE.verifiedISO;
const letters = (base: string, f: (a: (typeof APPS)[number]) => boolean) => {
  const have = new Set(APPS.filter(f).map(letterOf));
  return LETTERS.filter((L) => have.has(L)).map((L) => `${base}${L}/`);
};
const usedTypes = new Set(APPS.flatMap((a) => allTypes(a)));

export const SECTIONS: Record<string, () => string[]> = {
  apps: () => APPS.map((a) => url.app(a)),
  questions: () => APPS.flatMap((a) => [...(hasTrackPage(a) ? [url.track(a)] : []), ...(hasLockPage(a) ? [url.lock(a)] : [])]),
  hubs: () => [
    "/", "/app-privacy/", ...CATEGORIES.flatMap((c) => [url.category(c.slug), ...c.topics.map((t) => url.topic(c.slug, t.slug))]),
    "/does-it-track-you/", ...letters("/does-it-track-you/", hasTrackPage), "/is-it-safe/", ...letters("/is-it-safe/", () => true), "/lock-an-app/", ...letters("/lock-an-app/", hasLockPage),
    "/data-types/", ...DATA_TYPES.filter((d) => usedTypes.has(d.name)).map((d) => url.dataType(d.slug)),
    "/tools/", ...TOOLS.map((t) => `/tools/${t.slug}/`), "/data-methodology/",
  ],
  guides: () => [
    "/blog/", "/guides/", ...guideCats.map((c) => `/guides/${c.slug}/`), ...articles.map((a) => `/blog/${a.slug}/`),
    "/privacy-settings/", ...privacySettings.map((s) => `/privacy-settings/${s.slug}/`),
    ...catalogPages.filter((p) => p.index && p.kind !== "tool" && p.path !== "/tools").map((p) => `${p.path}/`),
    "/about/", "/contact/", "/privacy/", "/terms/",
  ],
};

const esc = (s: string) => s.replace(/&/g, "&amp;");
export const urlset = (paths: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `<url><loc>${esc(abs(p))}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;

export const index = () =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(SECTIONS).map((s) => `<sitemap><loc>${abs(`/sitemap-${s}.xml`)}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`;

export const allPaths = () => Object.values(SECTIONS).flatMap((f) => f());
