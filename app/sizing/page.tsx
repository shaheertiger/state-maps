import { articleLd } from "@/lib/ld";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { allBrands } from "@/lib/content";
import { brandPath } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Brand Sizing: Does It Run Small or True to Size?",
  description: "How popular shoe, boot and accessory brands size, taken from each brand's own size chart and fit advice, with the date we last checked.",
  alternates: { canonical: "/sizing/" }, openGraph: { url: "/sizing/", images: ["/og/sizing.png"] },
};

export default function SizingHub() {
  const brands = [...allBrands()].sort((a, b) => a.brand.localeCompare(b.brand));
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <h1>Does it run small?</h1>
      <Breadcrumbs items={[{ name: "Brand sizing", href: "/sizing/" }]} />
      <JsonLd data={articleLd({ headline: "Does it run small?", description: metadata.description ?? undefined, path: "/sizing/" })} />
      <p className="lede">
        How each brand sizes, taken only from the brand&rsquo;s own size chart and published fit advice. We link the source and show the
        date we last checked it. We don&rsquo;t publish a brand until we can source it properly.
      </p>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">How it fits</th>
              <th scope="col">Models</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.slug}>
                <th scope="row">
                  <Link href={brandPath(b.slug)}>{b.brand}</Link>
                </th>
                <td>{b.verdict}</td>
                <td style={{ whiteSpace: "normal" }}>
                  {(b.products ?? []).map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ", "}
                      <Link href={brandPath(b.slug, p.slug)}>{p.name}</Link>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
