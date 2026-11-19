import Link from "next/link";
import type { BrandSizing } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { Picks } from "./Picks";
import { SizeTable, formatDate } from "./SizeTable";
import { JsonLd } from "./JsonLd";
import { abs, brandPath, hubPath, SITE } from "@/lib/site";
import { getCategory, guidesIn } from "@/lib/content";

const paras = (s: string) => s.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>);

export function BrandPage({ b }: { b: BrandSizing }) {
  const cat = getCategory(b.category);
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <Breadcrumbs items={[{ name: "Brand sizing", href: "/sizing/" }, { name: b.brand, href: brandPath(b.slug) }]} />
      <article className="prose" data-pagefind-body>
        <h1>{b.h1}</h1>
        <section className="answer" aria-labelledby="short-answer">
          <h2 id="short-answer">The short answer: {b.verdict}</h2>
          <p>{b.answer}</p>
        </section>
        <h2 id="chart">{b.brand} size chart</h2>
        <SizeTable table={b.sizeChart} checked={b.checked} />
        {b.sections.map((s, i) => (
          <section key={s.heading} aria-labelledby={`s-${i}`}>
            <h2 id={`s-${i}`}>{s.heading}</h2>
            {paras(s.body)}
          </section>
        ))}
        {b.comparison && (
          <section aria-labelledby="compare">
            <h2 id="compare">How {b.brand} sizing compares</h2>
            {paras(b.comparison)}
          </section>
        )}
        {b.products && b.products.length > 0 && (
          <section aria-labelledby="models">
            <h2 id="models">Sizing by model</h2>
            <ul className="link-cols">
              {b.products.map((p) => (
                <li key={p.slug}>
                  <Link href={brandPath(b.slug, p.slug)}>{p.h1}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Picks items={b.picks} heading={`Shop ${b.brand}`} />
        <Faq items={b.faqs} />
        <Sources b={b} />
        {cat && (
          <section aria-labelledby="general" data-pagefind-ignore>
            <h2 id="general">General fit guides</h2>
            <ul className="link-cols">
              {guidesIn(cat.slug)
                .slice(0, 6)
                .map((g) => (
                  <li key={g.slug}>
                    <Link href={`/fit/${g.slug}/`}>{g.h1}</Link>
                  </li>
                ))}
            </ul>
            <p>
              <Link href={hubPath(cat.slug)}>All {cat.name.toLowerCase()} guides</Link>
            </p>
          </section>
        )}
      </article>
      <ArticleLd b={b} headline={b.h1} path={brandPath(b.slug)} />
    </div>
  );
}

export function BrandProductPage({ b, slug }: { b: BrandSizing; slug: string }) {
  const p = b.products!.find((x) => x.slug === slug)!;
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <Breadcrumbs
        items={[
          { name: "Brand sizing", href: "/sizing/" },
          { name: b.brand, href: brandPath(b.slug) },
          { name: p.name, href: brandPath(b.slug, p.slug) },
        ]}
      />
      <article className="prose" data-pagefind-body>
        <h1>{p.h1}</h1>
        <section className="answer" aria-labelledby="short-answer">
          <h2 id="short-answer">The short answer</h2>
          <p>{p.answer}</p>
        </section>
        {p.body.map((s, i) => (
          <section key={s.heading} aria-labelledby={`s-${i}`}>
            <h2 id={`s-${i}`}>{s.heading}</h2>
            {paras(s.body)}
          </section>
        ))}
        <h2 id="chart">{b.brand} size chart</h2>
        <SizeTable table={b.sizeChart} checked={b.checked} />
        <Picks items={p.picks} heading={`Shop the ${p.name}`} />
        <Faq items={p.faqs} />
        <Sources b={b} />
        <p>
          <Link href={brandPath(b.slug)}>How {b.brand} fits overall</Link>
        </p>
      </article>
      <ArticleLd b={b} headline={p.h1} path={brandPath(b.slug, p.slug)} />
    </div>
  );
}

function Sources({ b }: { b: BrandSizing }) {
  return (
    <section aria-labelledby="sources">
      <h2 id="sources">Sources</h2>
      <p className="muted">From {b.brand}&rsquo;s own published size and fit guidance, last checked {formatDate(b.checked)}.</p>
      <ul>
        {b.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} rel="noopener" target="_blank">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArticleLd({ b, headline, path }: { b: BrandSizing; headline: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        dateModified: b.checked,
        inLanguage: "en-US",
        mainEntityOfPage: abs(path),
        author: { "@type": "Organization", name: SITE.organization, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.organization },
        about: { "@type": "Brand", name: b.brand },
      }}
    />
  );
}
