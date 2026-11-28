import { articleLd } from "@/lib/ld";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free Sizing Tools: Bra, Ring, Shoe, Mattress and Carry-On",
  description: "Free calculators and charts that run in your browser: bra size, ring size, shoe size conversion, mattress and sheet fit, and airline carry-on limits.",
  alternates: { canonical: "/tools/" }, openGraph: { url: "/tools/", images: ["/og/tools.png"] },
};

export default function Tools() {
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <h1>Sizing tools</h1>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools/" }]} />
      <JsonLd data={articleLd({ headline: "Sizing tools", description: metadata.description ?? undefined, path: "/tools/" })} />
      <p className="lede">Free calculators and charts. Everything runs in your browser; nothing you type is sent anywhere.</p>
      <ul className="tool-list">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}/`}>{t.name}</Link>
            <p>{t.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
