import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Fit and Sizing Guides: How Should It Fit? Will It Fit?", template: "%s" },
  description: SITE.description,
  openGraph: { siteName: SITE.fullName, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#151b27" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const beacon = process.env.NEXT_PUBLIC_CF_BEACON;
  return (
    <html lang="en-US" className={archivo.variable}>
      <body>
        {/* Content comes first in the source so crawlers and screen readers start at the H1 and
            answer; CSS (.site-top order) still draws the header at the top. */}
        <main id="main">{children}</main>
        <Header />
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.organization,
            alternateName: SITE.fullName,
            description: SITE.description,
            url: SITE.url,
            logo: `${SITE.url}/icon.svg`,
          }}
        />
        {/* Vercel Web Analytics (cookie-free), loaded as Vercel documents for static HTML: no package.
            The Nov 19 rebuild shipped without it, so Vercel recorded 0 visitors from Nov 20. */}
        <script dangerouslySetInnerHTML={{ __html: "window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};" }} />
        <script defer src="/_vercel/insights/script.js" />
        {beacon && (
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: beacon })} />
        )}
      </body>
    </html>
  );
}
