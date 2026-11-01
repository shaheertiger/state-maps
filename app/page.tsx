import Link from "next/link";
import { articles, categories } from "@/lib/content";
import ArticleCards from "@/components/article-cards";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {liveTasks} from '@/lib/catalog';
export const metadata = pageMetadata("iPhone Privacy Database | statemaps.net", site.description, "/");
export default function Home() { return <main id="content" data-page-template="home"><section className="hero"><div className="wrap"><span className="eyebrow">The iPhone privacy database</span><h1>Find the control. Understand its limits.</h1><p className="lead">Look up apps, follow a privacy task, inspect photo metadata or build a review of your own setup.</p><div className="actions"><Link className="button" href="/tools/privacy-checkup">Build your privacy review</Link><Link href="/apps">Browse app references →</Link></div></div></section>
  <section className="wrap"><h2>Start with a privacy task</h2><div className="grid">{liveTasks.map(t=><Link className="card" href={`/${t.slug}`} key={t.slug}><h3>{t.name}</h3><p>{t.answer}</p></Link>)}</div><h2>Explore the database</h2><div className="grid">{[['/apps','Apps','Controls and access boundaries, organized by app.'],['/compare','Comparisons','Compare storage, recovery and sharing choices.'],['/tools','Tools','Browser-local metadata inspection and privacy review.'],['/glossary','Glossary','Plain definitions of the terms behind the controls.']].map(([href,title,description])=><Link className="card" href={href} key={href}><h3>{title}</h3><p>{description}</p></Link>)}</div></section>
  <section className="wrap"><h2>Start with your situation</h2><div className="grid">{categories.map(c => <Link className="card" href={`/guides/${c.slug}`} key={c.slug}><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div><h2>Practical guides, with sources</h2><ArticleCards items={articles.slice(0, 6)} /><p><Link href="/guides">Browse all {articles.length} guides →</Link></p></section>
  <section className="wrap callout"><h2>A setting has limits. Know them before you rely on it.</h2><p>The privacy settings library explains what each control changes, what it leaves accessible and how to test the result with a harmless sample.</p><Link href="/privacy-settings">Explore the settings library →</Link></section>
  </main>; }
