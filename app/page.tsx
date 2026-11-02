import Link from "next/link";
import { articles, categories } from "@/lib/content";
import ArticleCards from "@/components/article-cards";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { liveTasks, terms, apps } from '@/lib/catalog';
import { appleApps } from '@/lib/apple-apps';
import { iconFor } from '@/lib/ui';
export const metadata = pageMetadata("iPhone Privacy Database | statemaps.net", site.description, "/");
const explore: [string, string, string, string][] = [['/app-privacy', '🗂️', 'Sourced app directory', 'Distinct iPhone app listing records with developer, compatibility and source data.'], ['/apps', '📱', 'App privacy references', 'Controls and access boundaries, organized by app.'], ['/compare', '⚖️', 'Comparisons', 'Compare storage, recovery and sharing choices.'], ['/tools', '🧰', 'Tools', 'Browser-local metadata inspection and privacy review.'], ['/glossary', '📖', 'Glossary', 'Plain definitions of the terms behind the controls.']];
export default function Home() {
  const popular = liveTasks.slice(0, 4);
  return <main id="content" data-page-template="home">
    <section className="hero"><div className="wrap hero-grid">
      <div className="reveal">
        <span className="eyebrow">✦ The iPhone privacy database</span>
        <h1>Find the control. <span className="grad-text">Understand its limits.</span></h1>
        <p className="lead">Look up apps, follow a privacy task, inspect photo metadata or build a review of your own setup.</p>
        <form className="hero-search" action="/guides" method="get" role="search"><label htmlFor="hero-q" className="sr-only">Search the guides</label><span aria-hidden="true">🔎</span><input id="hero-q" name="q" type="search" placeholder="What do you want to keep private?" maxLength={200} autoComplete="off" /><button className="button" type="submit">Search</button></form>
        <div className="popular"><span>Popular:</span>{popular.map(t => <Link className="chip" href={`/${t.slug}`} key={t.slug}><span aria-hidden="true">{iconFor(t.name)}</span>{t.name}</Link>)}</div>
        <div className="actions" style={{ marginTop: 26 }}><Link className="button" href="/tools/privacy-checkup">Build your privacy review</Link><Link className="button button-ghost" href="/apps">Browse app references →</Link></div>
      </div>
      <div className="hero-card reveal reveal-2">
        <span className="float-badge one">🔒 Nothing uploaded</span>
        <h2>Start with a privacy task</h2><p>Step-by-step, with what each setting does not do.</p>
        <div className="hero-card-list">{liveTasks.slice(0, 5).map(t => <Link href={`/${t.slug}`} key={t.slug}><span aria-hidden="true">{iconFor(t.name)}</span>{t.question}<span className="arrow" aria-hidden="true">→</span></Link>)}</div>
        <span className="float-badge two">📚 Every guide cites sources</span>
      </div>
    </div></section>
    <div className="wrap">
      <div className="stats reveal reveal-3">
        <div className="stat-card"><span className="stat-label">App records</span><span className="stat-value">{appleApps.length.toLocaleString('en-US')}<span className="stat-unit">sourced</span></span></div>
        <div className="stat-card"><span className="stat-label">Guides</span><span className="stat-value">{articles.length}<span className="stat-unit">with sources</span></span></div>
        <div className="stat-card"><span className="stat-label">Privacy tasks</span><span className="stat-value">{liveTasks.length}<span className="stat-unit">step by step</span></span></div>
        <div className="stat-card"><span className="stat-label">Definitions</span><span className="stat-value">{terms.length}<span className="stat-unit">plain-English</span></span></div>
      </div>

      <section className="section"><div className="section-head"><div><span className="eyebrow">Step by step</span><h2>Start with a privacy task</h2></div><Link className="section-link" href="/hide-apps">See the task hub →</Link></div>
        <div className="grid">{liveTasks.map(t => <Link className="card" href={`/${t.slug}`} key={t.slug}><span className="card-icon" aria-hidden="true">{iconFor(t.name)}</span><h3>{t.name}</h3><p>{t.answer}</p><span className="card-more" aria-hidden="true">Open the steps →</span></Link>)}</div></section>

      <section className="cta-band"><div><span className="eyebrow">Free · private · 5 minutes</span><h2>How private is your iPhone, really?</h2><p>Answer a few questions about photos, sharing and recovery. Get a personal action list you can save or print.</p><ul><li>Runs entirely in your browser</li><li>Covers photo access, cloud copies and recovery</li><li>Links every step to its source</li></ul></div><div className="cta-side"><Link className="button" href="/tools/privacy-checkup">Start my privacy checkup →</Link><small>No sign-up. No photos uploaded.</small></div></section>

      <section className="section"><div className="section-head"><div><span className="eyebrow">The database</span><h2>Explore the database</h2></div></div>
        <div className="grid">{explore.map(([href, icon, title, description]) => <Link className="card" href={href} key={href}><span className="card-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p><span className="card-more" aria-hidden="true">Explore →</span></Link>)}</div>
        <div className="popular"><span>App references:</span>{apps.map(a => <Link className="chip" href={`/apps/${a.slug}`} key={a.slug}>{a.name}</Link>)}</div></section>

      <section className="section"><div className="section-head"><div><span className="eyebrow">By concern</span><h2>Start with your situation</h2></div></div>
        <div className="grid">{categories.map(c => <Link className="card" href={`/guides/${c.slug}`} key={c.slug}><span className="card-icon" aria-hidden="true">{iconFor(c.name)}</span><h3>{c.name}</h3><p>{c.description}</p><span className="card-more" aria-hidden="true">{articles.filter(a => a.category === c.slug).length} guides →</span></Link>)}</div></section>

      <section className="section"><div className="section-head"><div><span className="eyebrow">Read next</span><h2>Practical guides, with sources</h2></div><Link className="section-link" href="/guides">Browse all {articles.length} guides →</Link></div><ArticleCards items={articles.slice(0, 6)} /></section>

      <section className="callout"><h2>A setting has limits. Know them before you rely on it.</h2><p>The privacy settings library explains what each control changes, what it leaves accessible and how to test the result with a harmless sample.</p><Link href="/privacy-settings">Explore the settings library →</Link></section>

      <section className="section"><div className="section-head"><div><span className="eyebrow">Glossary</span><h2>Know the words behind the controls</h2></div><Link className="section-link" href="/glossary">All definitions →</Link></div>
        <div className="popular" style={{ padding: '18px 0 30px' }}>{terms.map(t => <Link className="chip" href={`/glossary/${t.slug}`} key={t.slug}><span aria-hidden="true">📖</span>{t.name}</Link>)}</div></section>
    </div>
  </main>;
}
