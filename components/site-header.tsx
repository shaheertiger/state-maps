import Link from 'next/link';
import { liveTasks, apps, terms, tools } from '@/lib/catalog';
import { categories } from '@/lib/content';
import { appleApps } from '@/lib/apple-apps';
import { iconFor } from '@/lib/ui';

function Search({ id }: { id: string }) {
  return <form className="header-search" action="/guides" method="get" role="search">
    <label htmlFor={id} className="sr-only">Search guides</label>
    <span aria-hidden="true" className="header-search-icon">⌕</span>
    <input id={id} name="q" type="search" placeholder="Search guides, e.g. hide photos" maxLength={200} autoComplete="off" />
  </form>;
}

export default function SiteHeader() {
  const count = appleApps.length.toLocaleString('en-US');
  return <header className="site-header">
    <div className="wrap nav">
      <Link href="/" className="logo"><span className="logo-mark" aria-hidden="true">✦</span>statemaps<span className="logo-tld">.net</span></Link>
      <nav aria-label="Main navigation" className="main-nav">
        <div className="menu">
          <Link href="/hide-apps" className="menu-trigger">Privacy tasks <span aria-hidden="true">▾</span></Link>
          <div className="menu-panel menu-panel-wide">
            <p className="menu-label">Follow a task, step by step</p>
            <div className="menu-grid">{liveTasks.map(t => <Link href={`/${t.slug}`} key={t.slug} className="menu-item"><span className="menu-icon" aria-hidden="true">{iconFor(t.name)}</span><span><strong>{t.name}</strong><small>{t.method}</small></span></Link>)}</div>
          </div>
        </div>
        <div className="menu">
          <Link href="/app-privacy" className="menu-trigger">Apps <span aria-hidden="true">▾</span></Link>
          <div className="menu-panel">
            <Link href="/app-privacy" className="menu-feature"><span className="menu-icon" aria-hidden="true">🗂️</span><span><strong>App directory</strong><small>{count} sourced App Store records</small></span></Link>
            <p className="menu-label">Privacy references</p>
            <div className="menu-chips">{apps.map(a => <Link href={`/apps/${a.slug}`} key={a.slug} className="chip">{a.name}</Link>)}</div>
            <Link href="/apps" className="menu-all">All app references →</Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/tools" className="menu-trigger">Tools <span aria-hidden="true">▾</span></Link>
          <div className="menu-panel">
            {tools.map(t => <Link href={`/tools/${t.slug}`} key={t.slug} className="menu-item"><span className="menu-icon" aria-hidden="true">{iconFor(t.name)}</span><span><strong>{t.name}</strong><small>{t.description}</small></span></Link>)}
            <Link href="/compare/photo-storage-options" className="menu-item"><span className="menu-icon" aria-hidden="true">⚖️</span><span><strong>Storage comparison</strong><small>Vaults, iCloud and hidden albums</small></span></Link>
            <Link href="/best/vault-apps" className="menu-item"><span className="menu-icon" aria-hidden="true">🛡️</span><span><strong>Choose a vault</strong><small>Start from your threat model</small></span></Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/guides" className="menu-trigger">Guides <span aria-hidden="true">▾</span></Link>
          <div className="menu-panel">
            {categories.map(c => <Link href={`/guides/${c.slug}`} key={c.slug} className="menu-item"><span className="menu-icon" aria-hidden="true">{iconFor(c.name)}</span><span><strong>{c.name}</strong><small>{c.description}</small></span></Link>)}
            <Link href="/guides" className="menu-all">Browse all guides →</Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/glossary" className="menu-trigger">Glossary <span aria-hidden="true">▾</span></Link>
          <div className="menu-panel">
            <div className="menu-chips">{terms.map(t => <Link href={`/glossary/${t.slug}`} key={t.slug} className="chip">{t.name}</Link>)}</div>
            <Link href="/glossary" className="menu-all">All definitions →</Link>
          </div>
        </div>
      </nav>
      <div className="header-actions">
        <Search id="header-q" />
        <Link href="/tools/privacy-checkup" className="button button-sm">Free checkup</Link>
      </div>
      <details className="mobile-menu">
        <summary aria-label="Open menu"><span aria-hidden="true">☰</span></summary>
        <div className="mobile-panel">
          <Search id="mobile-q" />
          <p className="menu-label">Privacy tasks</p>
          <div className="menu-chips">{liveTasks.map(t => <Link href={`/${t.slug}`} key={t.slug} className="chip"><span aria-hidden="true">{iconFor(t.name)}</span> {t.name}</Link>)}</div>
          <p className="menu-label">Explore</p>
          <div className="mobile-links">
            <Link href="/app-privacy">🗂️ App directory</Link><Link href="/apps">📱 App references</Link><Link href="/tools">🧰 Tools</Link><Link href="/guides">📚 Guides</Link><Link href="/glossary">📖 Glossary</Link><Link href="/privacy-settings">⚙️ Settings library</Link>
          </div>
          <Link href="/tools/privacy-checkup" className="button">Start the free privacy checkup</Link>
        </div>
      </details>
    </div>
  </header>;
}
