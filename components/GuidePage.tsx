import Link from "next/link";
import type { FitGuide } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { Picks } from "./Picks";
import { SizeTable, formatDate } from "./SizeTable";
import { JsonLd } from "./JsonLd";
import { FitDiagram } from "@/lib/diagrams";
import { allBrands, getCategory, relatedGuides, titleCaseItem, guideTitle } from "@/lib/content";
import { abs, brandPath, guidePath, hubPath, SITE } from "@/lib/site";

const paras = (s: string) => s.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>);

export function GuidePage({ g }: { g: FitGuide }) {
  const cat = getCategory(g.category)!;
  const related = relatedGuides(g, 10);
  const brands = allBrands().filter((b) => b.category === g.category);
  const item = titleCaseItem(g.item);
  const toc = [
    ["checklist", "Fit checklist"],
    ["styles", g.variations.heading],
    ["measure", g.measure.heading ?? "How to measure"],
    ...(g.sizeTable ? [["sizes", "Size chart"]] : []),
    ["problems", "Common problems and fixes"],
    ...(g.extra ?? []).map((e, i) => [`more-${i}`, e.heading]),
    ["shop", "What to shop for"],
    ["faq", "Questions people ask"],
  ];
  const diagram = (
    <figure className="diagram-box">
      <FitDiagram shape={g.shape} points={g.checklist} title={`Where to check the fit of a ${g.item}`} />
      <figcaption>
        <p className="fitmap-label">{item} fit map</p>
        <ul className="diagram-key">
          {g.checklist.map((c, i) => (
            <li key={c.point}>
              <span className="pinno">{i + 1}</span>
              {c.point}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
  return (
    <div className="wrap">
      <div className="page-grid">
        <article className="main-col" data-pagefind-body>
          <h1>{g.h1}</h1>
          <section className="answer" aria-labelledby="short-answer">
            <h2 id="short-answer">The short answer</h2>
            <p>{g.answer}</p>
          </section>
          {g.caution && (
            <p className="caution">
              <strong>Check with a professional.</strong> {g.caution}
            </p>
          )}
          {g.intro && <div className="prose">{paras(g.intro)}</div>}

          <div className="mobile-diagram" data-pagefind-ignore>
            {diagram}
          </div>

          <section aria-labelledby="checklist">
            <h2 id="checklist">
              {item} fit checklist: {g.checklist.length} points
            </h2>
            <table className="checklist">
              <thead>
                <tr>
                  <th scope="col">Checkpoint</th>
                  <th scope="col"><span className="st st-good">Fits right</span></th>
                  <th scope="col"><span className="st st-tight">Too tight or short</span></th>
                  <th scope="col"><span className="st st-loose">Too loose or long</span></th>
                </tr>
              </thead>
              <tbody>
                {g.checklist.map((c, i) => (
                  <tr key={c.point}>
                    <th scope="row">
                      <span className="pinno" aria-hidden="true">{i + 1}</span>
                      {c.point}
                    </th>
                    <td>
                      <span className="st st-good" aria-hidden="true">Fits right</span>
                      {c.good}
                    </td>
                    <td>
                      <span className="st st-tight" aria-hidden="true">Too tight</span>
                      {c.tooTight}
                    </td>
                    <td>
                      <span className="st st-loose" aria-hidden="true">Too loose</span>
                      {c.tooLoose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="styles">
            <h2 id="styles">{g.variations.heading}</h2>
            {g.variations.intro && <p>{g.variations.intro}</p>}
            <dl className="defs">
              {g.variations.items.map((v) => (
                <div key={v.name}>
                  <dt>{v.name}</dt>
                  <dd>{v.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="measure">
            <h2 id="measure">{g.measure.heading ?? "How to measure yourself"}</h2>
            {g.measure.intro && <p>{g.measure.intro}</p>}
            <ol className="steps">
              {g.measure.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            {g.measure.tip && <p className="tip">{g.measure.tip}</p>}
          </section>

          {g.sizeTable && (
            <section aria-labelledby="sizes">
              <h2 id="sizes">Size chart</h2>
              <SizeTable table={g.sizeTable} />
            </section>
          )}

          <section aria-labelledby="problems">
            <h2 id="problems">Common problems and fixes</h2>
            <ul className="problems">
              {g.problems.map((p) => (
                <li key={p.problem}>
                  <strong>{p.problem}</strong>
                  {p.fix}
                </li>
              ))}
            </ul>
          </section>

          {(g.extra ?? []).map((e, i) => (
            <section key={e.heading} aria-labelledby={`more-${i}`}>
              <h2 id={`more-${i}`}>{e.heading}</h2>
              {paras(e.body)}
            </section>
          ))}

          <Picks items={g.picks} heading={`What to shop for`} />
          <Faq items={g.faqs} />

          {g.sources && g.sources.length > 0 && (
            <section aria-labelledby="sources">
              <h2 id="sources">Sources</h2>
              <ul>
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" target="_blank">{s.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="muted" style={{ marginTop: 32 }}>
            Updated {formatDate(g.updated)}. <Link href="/methodology/">How we write our guides</Link>.
          </p>

          <section aria-labelledby="related" data-pagefind-ignore>
            <h2 id="related">Related fit guides</h2>
            <ul className="link-cols">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={guidePath(r.slug)}>{r.h1}</Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href={hubPath(cat.slug)}>All {cat.name.toLowerCase()} guides</Link>
            </p>
          </section>
          {brands.length > 0 && (
            <section aria-labelledby="brand-sizing" data-pagefind-ignore>
              <h2 id="brand-sizing">How brands size</h2>
              <ul className="link-cols">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link href={brandPath(b.slug)}>{b.h1}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Breadcrumbs items={[{ name: "Fit guides", href: "/fit/" }, { name: cat.short, href: hubPath(cat.slug) }, { name: item, href: guidePath(g.slug) }]} />
        </article>

        <aside className="rail" data-pagefind-ignore>
          <div className="rail-inner">
            <div className="desktop-diagram">{diagram}</div>
            <nav className="toc" aria-labelledby="toc-h">
              <h2 id="toc-h">On this page</h2>
              <ol>
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guideTitle(g),
          description: g.answer,
          dateModified: g.updated,
          datePublished: g.updated,
          inLanguage: "en-US",
          mainEntityOfPage: abs(guidePath(g.slug)),
          image: abs(`/og/fit-${g.slug}.png`),
          author: { "@type": "Organization", name: SITE.organization, url: SITE.url },
          publisher: { "@type": "Organization", name: SITE.organization, logo: { "@type": "ImageObject", url: abs("/icon.svg") } },
        }}
      />
    </div>
  );
}
