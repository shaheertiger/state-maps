import Link from "next/link";
import type { Category } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { guidesIn } from "@/lib/content";
import { compatPages } from "@/lib/compat";
import { abs, guidePath, hubPath, compatPath, brandPath } from "@/lib/site";
import { allBrands } from "@/lib/content";

export const hubTitle = (c: Category) => `${c.name}: How Should It Fit? (${guidesIn(c.slug).length} Fit Guides)`;
export const hubMeta = (c: Category) => c.description;

const HUB_COMPAT: Partial<Record<Category["slug"], string[]>> = { baby: ["baby"] };

export function HubPage({ c }: { c: Category }) {
  const guides = guidesIn(c.slug);
  const compat = compatPages().filter((p) => HUB_COMPAT[c.slug]?.includes(p.pair.hub));
  const brands = allBrands().filter((b) => b.category === c.slug);
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <div className="prose" data-pagefind-body>
        <h1>{c.name}</h1>
        <Breadcrumbs items={[{ name: "Fit guides", href: "/fit/" }, { name: c.short, href: hubPath(c.slug) }]} />
        <p className="lede">{c.intro}</p>
      </div>
      <section aria-labelledby="guides">
        <h2 id="guides">Fit guides</h2>
        <ul className="link-cols">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={guidePath(g.slug)}>{g.h1}</Link>
              <span className="muted">{g.checklist.map((x) => x.point.toLowerCase()).slice(0, 4).join(", ")}</span>
            </li>
          ))}
        </ul>
      </section>
      {brands.length > 0 && (
        <section aria-labelledby="brands">
          <h2 id="brands">How brands size</h2>
          <ul className="link-cols">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link href={brandPath(b.slug)}>{b.h1}</Link>
                <span className="muted">{b.verdict}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {compat.length > 0 && (
        <section aria-labelledby="compat">
          <h2 id="compat">Will it fit?</h2>
          <ul className="link-cols">
            {compat.map((p) => (
              <li key={p.slug}>
                <Link href={compatPath(p.slug)}>{p.h1}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="prose">
        <Faq items={c.faqs} heading="More questions" />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: c.name,
          description: c.description,
          url: abs(hubPath(c.slug)),
          hasPart: guides.map((g) => ({ "@type": "Article", headline: g.h1, url: abs(guidePath(g.slug)) })),
        }}
      />
    </div>
  );
}
