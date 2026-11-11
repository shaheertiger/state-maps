import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, categories } from "@/lib/content";
import ArticleCards from "@/components/article-cards";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { liveTasks, terms, apps } from '@/lib/catalog';
import { appleApps } from '@/lib/apple-apps';
export const metadata = pageMetadata("iPhone Privacy Database | statemaps.net", site.description, "/");
const explore: [string, string, string][] = [['/app-privacy', 'Sourced app directory', 'Distinct iPhone app listing records with developer, compatibility and source data.'], ['/apps', 'App privacy references', 'Controls and access boundaries, organized by app.'], ['/compare', 'Comparisons', 'Compare storage, recovery and sharing choices.'], ['/tools', 'Tools', 'Browser-local metadata inspection and privacy review.'], ['/glossary', 'Glossary', 'Plain definitions of the terms behind the controls.']];

/** The hero moment: one real control, rendered as a settings sheet with its steps, its limit and its source. */
function ControlCard() {
  const t = liveTasks.find(x => x.slug === 'hide-apps') ?? liveTasks[0];
  return <figure className="control-card" aria-label={`Example reference: ${t.name}`}>
    <div className="control-head"><span className="control-kicker">Privacy task</span><span className="control-meta">iOS 18 and later</span></div>
    <p className="control-title">{t.name}</p>
    <p className="control-method">{t.method}</p>
    <ol className="control-steps">{t.steps.map(s => <li key={s}>{s}</li>)}</ol>
    <div className="limit"><span className="limit-label">Does not</span><p>{t.limit}</p></div>
    <figcaption className="control-source">Source: <a href={t.source.url}>{t.source.title}</a></figcaption>
  </figure>;
}

export default function Home() {
  return <main id="content" data-page-template="home">
    <section className="hero"><div className="wrap hero-grid">
      <div className="hero-text reveal">
        <h1>Find the control. Understand its limits</h1>
        <p className="lead">Look up apps, follow a privacy task, inspect photo metadata or build a review of your own setup. Every answer says what the setting leaves accessible and links to its source.</p>
        <form className="hero-search" action="/guides" method="get" role="search"><label htmlFor="hero-q" className="sr-only">Search the guides</label><input id="hero-q" name="q" type="search" placeholder="Hide photos, lock notes, iCloud sharing" maxLength={200} autoComplete="off" /><button className="button" type="submit">Search</button></form>
        <Link className="text-link" href="/tools/privacy-checkup">Or build your privacy review <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
      </div>
      <ControlCard />
    </div></section>
    <div className="wrap">
      <dl className="stats">
        <div className="stat-card"><dt>App records</dt><dd>{appleApps.length.toLocaleString('en-US')}</dd></div>
        <div className="stat-card"><dt>Guides with sources</dt><dd>{articles.length}</dd></div>
        <div className="stat-card"><dt>Privacy tasks</dt><dd>{liveTasks.length}</dd></div>
        <div className="stat-card"><dt>Definitions</dt><dd>{terms.length}</dd></div>
      </dl>

      <section className="section"><div className="section-head"><h2>Start with a privacy task</h2><Link className="section-link" href="/hide-apps">Task hub</Link></div>
        <div className="grid">{liveTasks.map(t => <Link className="card" href={`/${t.slug}`} key={t.slug}><span className="card-meta">{t.method}</span><h3>{t.name}</h3><p>{t.answer}</p></Link>)}</div></section>

      <section className="panel-band"><div><h2>Build a review of your own setup</h2><p>Answer questions about photo access, cloud copies and recovery. You get an action list you can save, download or print. It runs in your browser and nothing is uploaded.</p></div><Link className="button" href="/tools/privacy-checkup">Start the privacy checkup</Link></section>

      <section className="section"><div className="section-head"><h2>Explore the database</h2></div>
        <div className="grid">{explore.map(([href, title, description]) => <Link className="card" href={href} key={href}><h3>{title}</h3><p>{description}</p></Link>)}</div>
        <p className="inline-links"><span>App references</span>{apps.map(a => <Link href={`/apps/${a.slug}`} key={a.slug}>{a.name}</Link>)}</p></section>

      <section className="section"><div className="section-head"><h2>Start with your situation</h2></div>
        <div className="grid">{categories.map(c => <Link className="card" href={`/guides/${c.slug}`} key={c.slug}><span className="card-meta">{articles.filter(a => a.category === c.slug).length} guides</span><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div></section>

      <section className="section"><div className="section-head"><h2>Practical guides, with sources</h2><Link className="section-link" href="/guides">All {articles.length} guides</Link></div><ArticleCards items={articles.slice(0, 6)} /></section>

      <section className="callout"><h2>A setting has limits. Know them before you rely on it</h2><p>The privacy settings library explains what each control changes, what it leaves accessible and how to test the result with a harmless sample.</p><Link href="/privacy-settings">Explore the settings library</Link></section>

      <section className="section"><div className="section-head"><h2>Know the words behind the controls</h2><Link className="section-link" href="/glossary">All definitions</Link></div>
        <ul className="term-list">{terms.map(t => <li key={t.slug}><Link href={`/glossary/${t.slug}`}>{t.name}</Link></li>)}</ul></section>
    </div>
  </main>;
}
