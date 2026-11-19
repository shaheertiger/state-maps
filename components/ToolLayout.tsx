import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { TOOLS, abs, guidePath, SITE, type ToolSlug } from "@/lib/site";
import { getGuide } from "@/lib/content";

export function ToolLayout({
  slug,
  h1,
  intro,
  children,
  faqs,
  guides = [],
}: {
  slug: ToolSlug;
  h1: string;
  intro: string;
  children: React.ReactNode;
  faqs: { q: string; a: string }[];
  guides?: string[];
}) {
  const tool = TOOLS.find((t) => t.slug === slug)!;
  const related = guides.map(getGuide).filter((g) => !!g);
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <Breadcrumbs items={[{ name: "Tools", href: "/tools/" }, { name: tool.name, href: `/tools/${slug}/` }]} />
      <div className="prose" data-pagefind-body>
        <h1>{h1}</h1>
        <p className="lede">{intro}</p>
        {children}
        <Faq items={faqs} />
        {related.length > 0 && (
          <section aria-labelledby="guides" data-pagefind-ignore>
            <h2 id="guides">Fit guides</h2>
            <ul className="link-cols">
              {related.map((g) => (
                <li key={g!.slug}>
                  <Link href={guidePath(g!.slug)}>{g!.h1}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section aria-labelledby="more-tools" data-pagefind-ignore className="no-print">
          <h2 id="more-tools">More free tools</h2>
          <ul className="link-cols">
            {TOOLS.filter((t) => t.slug !== slug).map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}/`}>{t.name}</Link>
                <span className="muted">{t.blurb}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          url: abs(`/tools/${slug}/`),
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: SITE.organization },
        }}
      />
    </div>
  );
}

export const toolMeta = (slug: ToolSlug, description: string) => {
  const t = TOOLS.find((x) => x.slug === slug)!;
  return { title: { absolute: t.title }, description, alternates: { canonical: `/tools/${slug}/` }, openGraph: { title: t.title, description, url: `/tools/${slug}/`, images: [`/og/tool-${slug}.png`] } };
};
