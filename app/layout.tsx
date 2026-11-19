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
  title: { default: `${SITE.name}: How Should It Fit? Will It Fit?`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, locale: "en_US", type: "website" },
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.organization,
            url: SITE.url,
            logo: `${SITE.url}/icon.svg`,
          }}
        />
        {beacon && (
          <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: beacon })} />
        )}
      </body>
    </html>
  );
}
