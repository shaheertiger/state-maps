import type { Metadata } from "next";
import Link from "next/link";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import SiteTheme from "@/components/theme-provider";
import MeasurementConsent from "@/components/measurement-consent";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "iPhone Photo Privacy Guides", template: "%s | Private Photo Guide" }, description: site.description, robots: { index: process.env.VERCEL_ENV !== "preview", follow: true }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = [{ "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/icon.svg` }, { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }];
  return <html lang="en"><body><AppRouterCacheProvider options={{ enableCssLayer: true }}><SiteTheme>
    <a className="skip-link" href="#content">Skip to content</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <header><div className="wrap nav"><Link href="/" className="logo">✦ Private Photo Guide</Link><nav aria-label="Main navigation"><Link href="/guides">Guides</Link><Link href="/privacy-settings">Settings library</Link><Link href="/privacy-checklist">Build a review</Link></nav></div></header>
    {children}
    <footer><div className="wrap"><p>Independent guidance for iPhone photo privacy. Not affiliated with Apple.</p><nav aria-label="Footer"><Link href="/about">About</Link> · <Link href="/contact">Corrections</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Using this guide</Link></nav></div></footer>
    <MeasurementConsent />
  </SiteTheme></AppRouterCacheProvider></body></html>;
}
