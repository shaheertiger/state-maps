import Link from "next/link";
import { SITE, TOOLS, hubPath } from "@/lib/site";
import { allCategories } from "@/lib/content";

export function Footer() {
  const cats = allCategories();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2>{SITE.name}</h2>
            <p>{SITE.tagline}</p>
            <p>
              Size charts come from brands&rsquo; own published guides and recognised standards, with the date we last checked them.
            </p>
          </div>
          <div>
            <h2>Fit guides</h2>
            <ul>
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link href={hubPath(c.slug)}>{c.short}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Tools</h2>
            <ul>
              {TOOLS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}/`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>About</h2>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/methodology/">How we write guides</Link></li>
              <li><Link href="/affiliate-disclosure/">Affiliate disclosure</Link></li>
              <li><Link href="/privacy/">Privacy</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: 28 }}>© {new Date().getFullYear()} {SITE.name}. General guidance only; always check the maker&rsquo;s size chart before you buy.</p>
      </div>
    </footer>
  );
}
