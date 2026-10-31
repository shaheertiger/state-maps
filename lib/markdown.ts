import { articles, categories, getCategory, relatedArticles, reviewedDate, vaultComparison, type Article } from "./content";
import { infoPages, contactUrl } from "./pages";
import { reviewActions, reviewQuestions } from "./privacy-review";
import { privacySettings, type PrivacySetting } from "./settings";
import { site } from "./site";

const link = (title: string, path: string) => `[${title}](${path.startsWith("http") ? path : site.url + path})`;
export function articleBody(a: Article): string {
  return [a.intro, ...a.sections.map(s => `## ${s.heading}\n\n${s.body}${s.steps ? "\n\n" + s.steps.map((v, i) => `${i + 1}. ${v}`).join("\n") : ""}`),
    ...(a.slug === "best-photo-vault-apps-iphone" ? ["## Options compared\n\n| Option | Suitable for | Documented protection | Tradeoff |\n|---|---|---|---|\n" + vaultComparison.map(v => `| ${link(v.name, v.source.url)} | ${v.fit} | ${v.protection} | ${v.limitation} |`).join("\n")] : []),
    "## Frequently asked questions", ...a.faq.map(f => `### ${f.q}\n\n${f.a}`), "## Sources", ...a.sources.map(s => `- ${link(s.title, s.url)}`), "## Related guides", ...relatedArticles(a).map(r => `- ${link(r.title, `/blog/${r.slug}`)}`),
  ].join("\n\n");
}
export function articleMarkdown(a: Article) { return [`# ${a.title}`, `> ${a.description}`, `Author: ${site.name}`, `Published: ${a.published}`, `Updated: ${a.updated}`, `Canonical: ${site.url}/blog/${a.slug}`, articleBody(a)].join("\n\n"); }
export function settingMarkdown(s: PrivacySetting) {
  return [`# ${s.title}`, `> ${s.answer}`, `Updated: ${s.updated}`, `Canonical: ${site.url}/privacy-settings/${s.slug}`, "## At a glance", `- Where: ${s.path}\n- Changes: ${s.scope}\n- Limits: ${s.limitation}`, "## Steps", s.steps.map((v, i) => `${i + 1}. ${v}`).join("\n"), "## Check the result", s.verify, "## Source", link(s.source.title, s.source.url), "## Related guide", link(articles.find(a => a.slug === s.guide)!.title, `/blog/${s.guide}`)].join("\n\n");
}
export function guideListing(category?: string) {
  const c = getCategory(category || "");
  return [`# ${c?.name || "iPhone privacy guides"}`, c?.description || site.description, ...articles.filter(a => !category || a.category === category).map(a => `- ${link(a.title, `/blog/${a.slug}`)}: ${a.description}`)].join("\n\n");
}
export const staticMarkdown: Record<string, () => string> = {
  "/": () => [`# Keep your private photos private`, site.description, "## Start with your situation", link("Build a privacy review", "/privacy-checklist"), link("Browse privacy settings", "/privacy-settings"), ...categories.map(c => `- ${link(c.name, `/guides/${c.slug}`)}: ${c.description}`), guideListing()].join("\n\n"),
  "/guides": () => guideListing(), "/blog": () => guideListing(),
  "/privacy-settings": () => ["# iPhone Privacy Settings Library", "Find a setting, understand what it changes, and verify the result. Paths can vary by software version.", ...privacySettings.map(s => `- ${link(s.title, `/privacy-settings/${s.slug}`)}: ${s.answer}`)].join("\n\n"),
  "/privacy-checklist": () => ["# Build your iPhone privacy review", "Choose your goal, storage setup and access concern to get a prioritized review. The tool does not inspect your phone or receive your photos. Choices stay in this browser unless you explicitly save them or share a link. Print your review to save it as PDF, or download a text copy.", "## Review questions", ...reviewQuestions.map(q => `### ${q.label}\n\n${q.options.map(o => `- ${o[1]}`).join("\n")}`), "## Available actions", ...reviewActions.map(a => `### ${a.title}\n\n${a.body}\n\n${link("Read guide", `/blog/${a.slug}`)}`)].join("\n\n"),
  ...Object.fromEntries(Object.entries(infoPages).map(([path, p]) => [path, () => [`# ${p.title}`, p.description, `Updated: ${reviewedDate}`, ...p.sections.map(s => `## ${s.heading}\n\n${s.body}`), ...(path === "/contact" ? [link("Open a public correction issue", contactUrl)] : [])].join("\n\n")])),
};
export const htmlPaths = [ ...Object.keys(staticMarkdown), ...categories.map(c => `/guides/${c.slug}`), ...articles.map(a => `/blog/${a.slug}`), ...privacySettings.map(s => `/privacy-settings/${s.slug}`) ];
