import type { Metadata } from "next";
import Link from "next/link";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import SiteTheme from "@/components/theme-provider";
import MeasurementConsent from "@/components/measurement-consent";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageChrome from "@/components/page-chrome";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/seo";
import "./globals.css";
export const viewport = { themeColor: "#4f46e5" };
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "iPhone Privacy Database", template: "%s | statemaps.net" }, description: site.description, robots: { index: process.env.VERCEL_ENV !== "preview", follow: true }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = [{ "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/icon.svg` }, { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:`${site.url}/guides?q={search_term_string}`},"query-input":"required name=search_term_string"} }];
  return <html lang="en"><body><AppRouterCacheProvider options={{ enableCssLayer: true }}><SiteTheme>
    <a className="skip-link" href="#content">Skip to content</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <SiteHeader />
    {children}
    <SiteFooter />
    <PageChrome />
    <MeasurementConsent />
  </SiteTheme></AppRouterCacheProvider></body></html>;
}
