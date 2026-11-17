import { articles, categories, getCategory, relatedArticles, reviewedDate, vaultComparison, type Article } from "./content";
import {guideExtras} from './guide-extras';
import { infoPages, contactUrl } from "./pages";
import { site } from "./site";
import {catalogPages,catalogMarkdown} from './catalog';
import {guideAnatomy,guideFaq,appVisibilityMethods} from './guide-anatomy';
import {guideApps,guideSettings} from './guide-merge';
import {liveTasks,taskUrl} from './catalog';

const link = (title: string, path: string) => `[${title}](${path.startsWith("http") ? path : site.url + path})`;
export function articleBody(a: Article): string {
  const g=guideAnatomy(a);
  return ['## Quick answer',g.answer,`## At a glance\n\nPlatform: ${g.platform}\n\nMethod: ${g.method}\n\nSteps: ${g.steps.length}; time varies by setup; backup impact needs separate review.`,`## Method and verification steps\n\n${g.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\nWhat this does not do: ${g.limit}`,a.intro,...(a.slug==='how-to-hide-apps-on-iphone'?['## Five approaches, with different results\n\n| Approach | Use it for | What it does not establish |\n|---|---|---|\n'+appVisibilityMethods.map(row=>'| '+row.join(' | ')+' |').join('\n')]:[]), ...a.sections.map(s => `## ${s.heading}\n\n${s.body}${s.steps ? "\n\n" + s.steps.map((v, i) => `${i + 1}. ${v}`).join("\n") : ""}`),...(guideExtras[a.slug]?[`## Common mistakes to avoid\n\n${guideExtras[a.slug].mistakes.map(m=>`### ${m.title}\n\n${m.body}`).join('\n\n')}`,`## The bottom line\n\n${guideExtras[a.slug].bottomLine}`]:[]),
    ...(a.slug === "best-photo-vault-apps-iphone" ? ["## Options compared\n\n| Option | Suitable for | Documented protection | Tradeoff |\n|---|---|---|---|\n" + vaultComparison.map(v => `| ${link(v.name, v.source.url)} | ${v.fit} | ${v.protection} | ${v.limitation} |`).join("\n")] : []),
    ...(guideApps(a.slug).length ? ["## Find your app\n\n| App | Installed type | What to check |\n|---|---|---|\n" + guideApps(a.slug).map(x => `| ${link(x.name, `/apps/${x.slug}`)} | ${x.kind} | ${x.summary} |`).join("\n")] : []),
    ...guideSettings(a.slug).map(s => `## Setting: ${s.title}\n\n${s.answer}\n\n- Where: ${s.path}\n- Changes: ${s.scope}\n- Limits: ${s.limitation}\n\n${s.steps.map((v, i) => `${i + 1}. ${v}`).join("\n")}\n\nCheck the result: ${s.verify}`),
    "## Frequently asked questions", ...guideFaq(a).map(f => `### ${f.q}\n\n${f.a}`), "## Sources", ...a.sources.map(s => `- ${link(s.title, s.url)}`), "## Related guides", ...relatedArticles(a).map(r => `- ${link(r.title, `/blog/${r.slug}`)}`),
  ].join("\n\n");
}
export function articleMarkdown(a: Article) { return [`# ${a.title}`, `> ${a.description}`, `Author: ${site.name}`, `Published: ${a.published}`, `Updated: ${a.updated}`, `Canonical: ${site.url}/blog/${a.slug}`, articleBody(a)].join("\n\n"); }
export function guideListing(category?: string) {
  const c = getCategory(category || "");
  return [`# ${c?.name || "iPhone privacy guides"}`, c?.description || site.description, ...articles.filter(a => !category || a.category === category).map(a => `- ${link(a.title, `/blog/${a.slug}`)}: ${a.description}`)].join("\n\n");
}
export const staticMarkdown: Record<string, () => string> = {
  "/": () => [`# Find the control. Understand its limits.`, site.description,"## Explore the privacy database",...liveTasks.map(t=>`- ${link(t.question,taskUrl(t))}: ${t.answer}`),...catalogPages.filter(p=>p.kind==='directory').map(p=>`- ${link(p.title,p.path)}: ${p.description}`), "## Start with your situation", link("Build a privacy review", "/tools/privacy-checkup"), ...categories.map(c => `- ${link(c.name, `/guides/${c.slug}`)}: ${c.description}`), guideListing()].join("\n\n"),
  "/guides": () => guideListing(), "/blog": () => guideListing(),
  ...Object.fromEntries(Object.entries(infoPages).map(([path, p]) => [path, () => [`# ${p.title}`, p.description, `Updated: ${reviewedDate}`, ...p.sections.map(s => `## ${s.heading}\n\n${s.body}`), ...(path === "/contact" ? [link("Open a public correction issue", contactUrl)] : [])].join("\n\n")])),
};
export {htmlPaths,indexablePaths} from './route-index';
export const catalogMarkdownPages=catalogPages.map(p=>({pattern:p.path,render:()=>catalogMarkdown(p)}));
