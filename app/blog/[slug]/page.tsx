import Link from "next/link";
import { notFound } from "next/navigation";
import FAQ from "@/components/faq";
import ArticleCards from "@/components/article-cards";
import { articles, getArticle, getCategory, relatedArticles, vaultComparison } from "@/lib/content";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const a = getArticle((await params).slug); if (!a) return { title: "Guide not found", robots: { index: false } }; return pageMetadata(a.title, a.description, `/blog/${a.slug}`, a); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug); if (!a) notFound();
  const c = getCategory(a.category)!; const url = `${site.url}/blog/${a.slug}`;
  const schema = [{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, mainEntityOfPage: url, datePublished: a.published, dateModified: a.updated, image: `${site.url}/social-image`, author: { "@type": "Organization", name: site.name, url: `${site.url}/about` }, publisher: { "@id": `${site.url}/#organization` }, citation: a.sources.map(s => s.url) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", item: site.url }, { name: c.name, item: `${site.url}/guides/${c.slug}` }, { name: a.title, item: url }].map((v, i) => ({ "@type": "ListItem", position: i + 1, ...v })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }];
  return <main id="content" className="wrap article"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href={`/guides/${c.slug}`}>{c.name}</Link></nav>
    <h1>{a.title}</h1><p className="byline">By <Link href="/about">{site.name}</Link> · Updated <time dateTime={a.updated}>{a.updated}</time></p><p className="lead">{a.intro}</p>
    <nav className="toc" aria-label="On this page"><strong>On this page</strong>{a.sections.map((s, i) => <a href={`#section-${i}`} key={i}>{s.heading}</a>)}<a href="#questions">Questions</a><a href="#sources">Sources</a></nav>
    {a.sections.map((s, i) => <section id={`section-${i}`} key={i}><h2>{s.heading}</h2><p>{s.body}</p>{s.steps && <ol>{s.steps.map(v => <li key={v}>{v}</li>)}</ol>}</section>)}
    {a.slug === "best-photo-vault-apps-iphone" && <section><h2>Options compared</h2><p>Published documentation, reviewed {a.updated}. Check the provider for current pricing. No independent security testing is claimed.</p><div className="table-scroll"><table><caption>Photo storage options and their different access boundaries</caption><thead><tr><th scope="col">Option</th><th scope="col">Suitable for</th><th scope="col">Documented protection</th><th scope="col">Tradeoff to check</th></tr></thead><tbody>{vaultComparison.map(v => <tr key={v.name}><th scope="row"><a href={v.source.url}>{v.name}</a></th><td>{v.fit}</td><td>{v.protection}</td><td>{v.limitation}</td></tr>)}</tbody></table></div></section>}
    <section id="questions"><h2>Frequently asked questions</h2><FAQ items={a.faq} /></section>
    <section id="sources"><h2>Sources and further reading</h2><ul>{a.sources.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul><p>Controls can vary by software version. Verify the workflow on your device before changing or deleting important files.</p></section>
    <aside className="callout"><h2>Turn this into a review</h2><p>Build a short action list for your storage and sharing setup.</p><Link href="/privacy-checklist">Build your privacy review →</Link></aside>
    <h2>Related guides</h2><ArticleCards items={relatedArticles(a)} />
  </main>;
}
