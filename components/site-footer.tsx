import Link from 'next/link';
import { liveTasks } from '@/lib/catalog';
import { categories } from '@/lib/content';
import { relatedProductUrl } from '@/lib/related-product';

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div className="footer-brand">
        <Link href="/" className="logo"><span className="logo-mark" aria-hidden="true">✦</span>statemaps<span className="logo-tld">.net</span></Link>
        <p>Independent guidance for iPhone photo privacy. Every guide links to its sources. Not affiliated with Apple.</p>
        <p>For photos and documents you choose to store separately, explore <a href={relatedProductUrl}>VaultForYou</a>.</p>
      </div>
      <nav aria-label="Popular tasks"><p className="footer-title">Popular tasks</p>{liveTasks.slice(0, 6).map(t => <Link href={`/${t.slug}`} key={t.slug}>{t.name}</Link>)}</nav>
      <nav aria-label="Guide topics"><p className="footer-title">Guides</p>{categories.map(c => <Link href={`/guides/${c.slug}`} key={c.slug}>{c.name}</Link>)}<Link href="/privacy-settings">Settings library</Link></nav>
      <nav aria-label="Footer"><p className="footer-title">statemaps.net</p><Link href="/about">About</Link><Link href="/data-methodology">Data methodology</Link><Link href="/contact">Corrections</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Using this guide</Link></nav>
    </div>
    <div className="wrap footer-base"><span>© {new Date().getFullYear()} statemaps.net</span><span>Controls vary by software version. Verify on your device.</span></div>
  </footer>;
}
