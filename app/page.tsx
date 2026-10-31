import Link from "next/link";
import { articles, categories } from "@/lib/content";
import ArticleCards from "@/components/article-cards";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata = pageMetadata("iPhone Photo Privacy Guides", site.description, "/");
export default function Home() { return <main id="content"><section className="hero"><div className="wrap"><span className="eyebrow">iPhone privacy, explained</span><h1>Keep your private photos private.</h1><p className="lead">Understand the lock, trace the copies, and choose the right next step for your iPhone.</p><div className="actions"><Link className="button" href="/privacy-checklist">Build your privacy review</Link><Link href="/privacy-settings">Look up a setting →</Link></div></div></section>
  <section className="wrap"><h2>Start with your situation</h2><div className="grid">{categories.map(c => <Link className="card" href={`/guides/${c.slug}`} key={c.slug}><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div><h2>Practical guides, with sources</h2><ArticleCards items={articles.slice(0, 6)} /><p><Link href="/guides">Browse all {articles.length} guides →</Link></p></section>
  <section className="wrap callout"><h2>A setting has limits. Know them before you rely on it.</h2><p>The privacy settings library explains what each control changes, what it leaves accessible and how to test the result with a harmless sample.</p><Link href="/privacy-settings">Explore the settings library →</Link></section>
  </main>; }
