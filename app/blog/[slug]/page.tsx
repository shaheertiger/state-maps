import Link from "next/link";
import { notFound } from "next/navigation";
import FAQ from "@/components/faq";
import ArticleCards from "@/components/article-cards";
import { articles, getArticle, getCategory, relatedArticles, vaultComparison } from "@/lib/content";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import PageToc from '@/components/page-toc';
import {readingMinutes} from '@/lib/ui';
import {guideAnatomy,guideFaq,appVisibilityMethods} from '@/lib/guide-anatomy';
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const a = getArticle((await params).slug); if (!a) return { title: "Guide not found", robots: { index: false } }; return pageMetadata(a.title, a.description, `/blog/${a.slug}`, a); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug); if (!a) notFound();
  const c = getCategory(a.category)!; const url = `${site.url}/blog/${a.slug}`;
  const anatomy=guideAnatomy(a),faq=guideFaq(a);
  const schema = [{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, mainEntityOfPage: url, datePublished: a.published, dateModified: a.updated, image: `${site.url}/social-image`, author: { "@type": "Organization", name: site.name, url: `${site.url}/about` }, publisher: { "@id": `${site.url}/#organization` }, citation: a.sources.map(s => s.url) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", item: site.url }, { name: c.name, item: `${site.url}/guides/${c.slug}` }, { name: a.title, item: url }].map((v, i) => ({ "@type": "ListItem", position: i + 1, ...v })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },...(a.slug==='best-photo-vault-apps-iphone'?[]:[{'@context':'https://schema.org','@type':'HowTo',name:a.title,description:anatomy.answer,step:anatomy.steps.map((text,i)=>({'@type':'HowToStep',position:i+1,text,url:`${url}#method-step-${i+1}`}))}])];
  const minutes=readingMinutes([a.intro,...a.sections.map(s=>s.body)].join(' '));
  const toc=[{id:'method',label:'Method & steps'},...a.sections.map((s,i)=>({id:`section-${i}`,label:s.heading})),...(a.slug==='best-photo-vault-apps-iphone'?[{id:'options',label:'Options compared'}]:[]),{id:'questions',label:'Questions'},{id:'sources',label:'Sources'},{id:'related',label:'Related guides'}];
  return <main id="content" className="wrap article wide" data-page-template="pillar"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> › <Link href="/guides">Guides</Link> › <Link href={`/guides/${c.slug}`}>{c.name}</Link></nav>
    <header className="page-hero"><p className="kicker">{c.name} guide</p><h1>{a.title}</h1><p className="byline">By <Link href="/about">{site.name}</Link><span aria-hidden="true">·</span>Updated <time dateTime={a.updated}>{a.updated}</time><span aria-hidden="true">·</span>{minutes} min read<span aria-hidden="true">·</span>{a.sources.length} sources, documentation reviewed</p>
    <dl className="spec-strip"><div><dt>Platform</dt><dd>{anatomy.platform}</dd></div><div><dt>Method</dt><dd>{anatomy.method}</dd></div><div><dt>Steps</dt><dd>{anatomy.steps.length}, plus verification</dd></div><div><dt>Time</dt><dd>Varies by setup</dd></div><div><dt>Backup impact</dt><dd>Check separately</dd></div></dl></header>
    <aside className="quick-answer"><h2>Quick answer</h2><p>{anatomy.answer}</p></aside>
    <div className="page-grid"><PageToc items={toc}/><div className="page-body">
    <section id="method"><h2>Method and verification steps</h2><p className="lead">{a.intro}</p><div className="table-scroll"><table><caption>Method and verification steps</caption><thead><tr><th>Step</th><th>What to do</th></tr></thead><tbody>{anatomy.steps.map((s,i)=><tr key={s} id={`method-step-${i+1}`}><th scope="row">{i+1}</th><td>{s}</td></tr>)}</tbody></table></div><div className="limit"><span className="limit-label">Does not</span><p className="scope-note">What this does not do: {anatomy.limit}</p></div>
    {a.slug==='how-to-hide-apps-on-iphone'&&<><div className="table-scroll"><table><caption>Five approaches, with different results</caption><thead><tr><th>Approach</th><th>Use it for</th><th>What it does not establish</th></tr></thead><tbody>{appVisibilityMethods.map(([name,use,limit])=><tr key={name}><th scope="row">{name}</th><td>{use}</td><td>{limit}</td></tr>)}</tbody></table></div><p>Choose the task you need: <Link href="/hide-apps">hide apps</Link>, <Link href="/lock-apps">lock apps</Link>, <Link href="/find-hidden-apps">find hidden apps</Link>, <Link href="/unhide-apps">unhide apps</Link>, or <Link href="/hide-photos">hide photos</Link>. Learn how <Link href="/glossary/app-library">App Library</Link>, <Link href="/glossary/face-id">Face ID</Link> and the <Link href="/glossary/device-passcode">device passcode</Link> affect the result.</p></>}</section>
    {a.sections.map((s, i) => <section id={`section-${i}`} key={i}><h2>{s.heading}</h2>{s.body.split('\n\n').map((paragraph,j)=><p key={j}>{paragraph}</p>)}{s.steps && <ol className="steps">{s.steps.map(v => <li key={v}>{v}</li>)}</ol>}</section>)}
    {a.slug === "best-photo-vault-apps-iphone" && <section id="options"><h2>Options compared</h2><p>Published documentation, reviewed {a.updated}. Check the provider for current pricing. No independent security testing is claimed.</p><div className="table-scroll"><table><caption>Photo storage options and their different access boundaries</caption><thead><tr><th scope="col">Option</th><th scope="col">Suitable for</th><th scope="col">Documented protection</th><th scope="col">Tradeoff to check</th></tr></thead><tbody>{vaultComparison.map(v => <tr key={v.name}><th scope="row"><a href={v.source.url}>{v.name}</a></th><td>{v.fit}</td><td>{v.protection}</td><td>{v.limitation}</td></tr>)}</tbody></table></div></section>}
    <aside className="panel-band"><div><h2>Turn this into a review</h2><p>Build a short action list for your storage and sharing setup. It runs in your browser and nothing is uploaded.</p></div><Link className="button" href="/privacy-checklist">Build your privacy review</Link></aside>
    <section id="questions"><h2>Frequently asked questions</h2><FAQ items={faq} /></section>
    <section id="sources"><h2>Sources and further reading</h2><ul className="source-list">{a.sources.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul><p>Controls can vary by software version. Verify the workflow on your device before changing or deleting important files.</p></section>
    <h2 id="related">Related guides</h2><ArticleCards items={relatedArticles(a)} />
    </div></div>
  </main>;
}
