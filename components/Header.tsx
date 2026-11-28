import Link from "next/link";
import { SITE } from "@/lib/site";
import { Tape } from "./Tape";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <div className="site-top">
      <Tape />
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brand">
            <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1" y="6" width="22" height="12" rx="2" fill="#F3C631" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 6v5M9 6v3M13 6v5M17 6v3M21 6v5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="brand-name">{SITE.name}</span>
            <span className="brand-desc">{SITE.descriptor}</span>
          </Link>
          <nav className="nav" id="site-nav" aria-label="Main">
            <Link href="/fit/">How should it fit?</Link>
            <Link href="/will-it-fit/">Will it fit?</Link>
            <Link href="/sizing/">Brand sizing</Link>
            <Link href="/tools/">Tools</Link>
          </nav>
          <div className="header-search">
            <SearchBox compact />
          </div>
        </div>
      </header>
    </div>
  );
}
