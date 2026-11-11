import Link from 'next/link';
import { Menu, Search as SearchIcon, ChevronDown } from 'lucide-react';
import { liveTasks, apps, terms, tools } from '@/lib/catalog';
import { categories } from '@/lib/content';
import { appleApps } from '@/lib/apple-apps';
import TopicIcon from './icon';

function Search({ id }: { id: string }) {
  return <form className="header-search" action="/guides" method="get" role="search">
    <label htmlFor={id} className="sr-only">Search guides</label>
    <SearchIcon size={16} strokeWidth={1.5} aria-hidden="true" className="header-search-icon" />
    <input id={id} name="q" type="search" placeholder="Search guides" maxLength={200} autoComplete="off" />
  </form>;
}
const Chevron = () => <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />;

export default function SiteHeader() {
  const count = appleApps.length.toLocaleString('en-US');
  return <header className="site-header">
    <div className="wrap nav">
      <Link href="/" className="logo">statemaps<span className="logo-tld">.net</span></Link>
      <nav aria-label="Main navigation" className="main-nav">
        <div className="menu">
          <Link href="/hide-apps" className="menu-trigger">Privacy tasks <Chevron /></Link>
          <div className="menu-panel menu-panel-wide">
            <p className="menu-label">Step-by-step tasks</p>
            <div className="menu-grid">{liveTasks.map(t => <Link href={`/${t.slug}`} key={t.slug} className="menu-item"><TopicIcon name={t.name} /><span><strong>{t.name}</strong><small>{t.method}</small></span></Link>)}</div>
          </div>
        </div>
        <div className="menu">
          <Link href="/app-privacy" className="menu-trigger">Apps <Chevron /></Link>
          <div className="menu-panel">
            <Link href="/app-privacy" className="menu-item"><TopicIcon name="app directory" /><span><strong>App directory</strong><small>{count} sourced App Store records</small></span></Link>
            <p className="menu-label">Privacy references</p>
            <div className="menu-links">{apps.map(a => <Link href={`/apps/${a.slug}`} key={a.slug}>{a.name}</Link>)}</div>
            <Link href="/apps" className="menu-all">All app references</Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/tools" className="menu-trigger">Tools <Chevron /></Link>
          <div className="menu-panel">
            {tools.map(t => <Link href={`/tools/${t.slug}`} key={t.slug} className="menu-item"><TopicIcon name={t.name} /><span><strong>{t.name}</strong><small>{t.description}</small></span></Link>)}
            <Link href="/compare/photo-storage-options" className="menu-item"><TopicIcon name="compare" /><span><strong>Storage comparison</strong><small>Vaults, iCloud and hidden albums</small></span></Link>
            <Link href="/best/vault-apps" className="menu-item"><TopicIcon name="vault" /><span><strong>Choose a vault</strong><small>Start from the access problem you have</small></span></Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/guides" className="menu-trigger">Guides <Chevron /></Link>
          <div className="menu-panel">
            {categories.map(c => <Link href={`/guides/${c.slug}`} key={c.slug} className="menu-item"><TopicIcon name={c.name} /><span><strong>{c.name}</strong><small>{c.description}</small></span></Link>)}
            <Link href="/guides" className="menu-all">All guides</Link>
          </div>
        </div>
        <div className="menu">
          <Link href="/glossary" className="menu-trigger">Glossary <Chevron /></Link>
          <div className="menu-panel">
            <div className="menu-links">{terms.map(t => <Link href={`/glossary/${t.slug}`} key={t.slug}>{t.name}</Link>)}</div>
            <Link href="/glossary" className="menu-all">All definitions</Link>
          </div>
        </div>
      </nav>
      <div className="header-actions">
        <Search id="header-q" />
        <Link href="/tools/privacy-checkup" className="button button-sm">Privacy checkup</Link>
      </div>
      <details className="mobile-menu">
        <summary aria-label="Menu"><Menu size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
        <div className="mobile-panel">
          <Search id="mobile-q" />
          <p className="menu-label">Privacy tasks</p>
          <div className="mobile-links">{liveTasks.map(t => <Link href={`/${t.slug}`} key={t.slug}>{t.name}</Link>)}</div>
          <p className="menu-label">Reference</p>
          <div className="mobile-links">
            <Link href="/app-privacy">App directory</Link><Link href="/apps">App references</Link><Link href="/tools">Tools</Link><Link href="/guides">Guides</Link><Link href="/glossary">Glossary</Link><Link href="/privacy-settings">Settings library</Link>
          </div>
          <Link href="/tools/privacy-checkup" className="button">Start the privacy checkup</Link>
        </div>
      </details>
    </div>
  </header>;
}
