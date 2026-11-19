import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { FitDiagram } from "@/lib/diagrams";
import { getGuide } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { allCategories, allGuides, allBrands, guidesIn, guideVolume } from "@/lib/content";
import { compatPages } from "@/lib/compat";
import { SITE, TOOLS, guidePath, hubPath, compatPath, brandPath } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: How Should It Fit? Will It Fit? Does It Run Small?` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

const WORD = { yes: "Yes", no: "No", loosely: "Loosely", depends: "Depends" } as const;

export default function Home() {
  const top = [...allGuides()].sort((a, b) => guideVolume(b.slug) - guideVolume(a.slug)).slice(0, 10);
  const compat = compatPages().slice(0, 10);
  const brands = allBrands().slice(0, 10);
  const sample = getGuide("suit-jacket");
  return (
    <>
      <div className="wrap">
        <section className="hero">
          <div className="hero-text">
          <h1>What are you trying to fit?</h1>
          <p>
            Point-by-point fit checklists, size compatibility answers worked out from real dimensions, and brand sizing taken from the
            brands&rsquo; own charts.
          </p>
          <SearchBox />
          <p className="try">
            Popular:{" "}
            {top.slice(0, 4).map((g) => (
              <Link key={g.slug} href={guidePath(g.slug)}>
                {g.item}
              </Link>
            ))}
            {compat[0] && <Link href={compatPath(compat[0].slug)}>{compat[0].h1.replace(/\?$/, "").toLowerCase()}</Link>}
          </p>
          </div>
          {sample && (
            <figure className="hero-figure">
              <FitDiagram shape={sample.shape} points={sample.checklist} title="The fit points on a suit jacket" />
              <figcaption>
                <ol>
                  {sample.checklist.map((c) => (
                    <li key={c.point}>{c.point}</li>
                  ))}
                </ol>
                <Link href={guidePath(sample.slug)}>See how a suit jacket should fit</Link>
              </figcaption>
            </figure>
          )}
        </section>

        <div className="questions">
          <section aria-labelledby="q-how">
            <h2 id="q-how">How should it fit?</h2>
            <ul>
              {top.map((g) => (
                <li key={g.slug}>
                  <Link href={guidePath(g.slug)}>
                    <span>{g.h1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="more" href="/fit/">
              All {allGuides().length} fit guides
            </Link>
          </section>
          <section aria-labelledby="q-will">
            <h2 id="q-will">Will it fit?</h2>
            <ul>
              {compat.map((p) => (
                <li key={p.slug}>
                  <Link href={compatPath(p.slug)}>
                    <span>{p.h1}</span>
                    <span className={`verdict verdict-${p.verdict}`}>{WORD[p.verdict]}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="more" href="/will-it-fit/">
              All size compatibility answers
            </Link>
          </section>
          <section aria-labelledby="q-brand">
            <h2 id="q-brand">Does it run small?</h2>
            <ul>
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={brandPath(b.slug)}>
                    <span>{b.brand}</span>
                    <span className="muted">{b.verdict}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="more" href="/sizing/">
              All brand sizing guides
            </Link>
          </section>
        </div>
      </div>

      <div className="index-band">
        <div className="wrap">
          <h2>Fit guides by category</h2>
          <div className="cat-index">
            {allCategories().map((c) => (
              <section key={c.slug}>
                <h3>
                  <Link href={hubPath(c.slug)}>{c.name}</Link>
                </h3>
                <p className="muted">
                  {guidesIn(c.slug)
                    .slice(0, 5)
                    .map((g) => g.item)
                    .join(", ")}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 64 }}>
        <h2>Free sizing tools</h2>
        <ul className="tool-list">
          {TOOLS.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}/`}>{t.name}</Link>
              <p>{t.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          potentialAction: { "@type": "SearchAction", target: `${SITE.url}/search/?q={search_term_string}`, "query-input": "required name=search_term_string" },
        }}
      />
    </>
  );
}
