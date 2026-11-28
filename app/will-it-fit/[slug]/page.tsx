import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compatPages, HUBS, relatedCompat } from "@/lib/compat";
import { compatPath, guidePath, abs, SITE } from "@/lib/site";
import { getGuide } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Picks } from "@/components/Picks";
import { JsonLd } from "@/components/JsonLd";
import { Overlay } from "@/components/Overlay";
import { formatDate } from "@/components/SizeTable";

export const dynamicParams = false;
const VERDICT_SHORT = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "Depends" } as const;
export const generateStaticParams = () => compatPages().map((p) => ({ slug: p.slug }));
const get = (slug: string) => compatPages().find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return {
    title: { absolute: p.title },
    description: p.meta,
    alternates: { canonical: compatPath(p.slug) },
    openGraph: { title: p.title, description: p.meta, url: compatPath(p.slug), type: "article", images: [`/og/fit-${p.slug}.png`] },
  };
}

export default async function CompatRoute({ params }: { params: Promise<{ slug: string }> }) {
  const p = get((await params).slug);
  if (!p) notFound();
  const siblings = relatedCompat(p);
  const [verdictWord, ...rest] = p.answer.split(/(?<=\.)\s/);
  const guides = (p.pair.fitGuides ?? []).map(getGuide).filter((g) => !!g);
  return (
    <div className="wrap">
      <div className="page-grid">
        <article className="main-col" data-pagefind-body>
          <h1>{p.h1}</h1>
          <section className="answer" aria-labelledby="short-answer">
            <h2 id="short-answer">The short answer</h2>
            <p>
              <span className={`verdict verdict-${p.verdict}`}>{verdictWord}</span> {rest.join(" ")}
            </p>
          </section>

          <section aria-labelledby="dims">
            <h2 id="dims">Dimensions compared</h2>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Measurement</th>
                    <th scope="col">{p.a.name}</th>
                    <th scope="col">{p.b.name}</th>
                    <th scope="col">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.a}</td>
                      <td>{r.b}</td>
                      <td>{r.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(p.a.note || p.b.note || p.b.dims) && (
              <p className="table-note">{[p.a.note, p.b.dims && `${p.b.name}: ${p.b.dims}.`, p.b.note].filter(Boolean).join(" ")}</p>
            )}
            <div className="mobile-diagram">
              <Overlay p={p} />
            </div>
          </section>

          <section aria-labelledby="what-to-do">
            <h2 id="what-to-do">What happens if you try, and what to do instead</h2>
            <dl className="defs">
              {p.workarounds.map((w) => (
                <div key={w.title}>
                  <dt>{w.title}</dt>
                  <dd>{w.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          {p.fits && (
            <section aria-labelledby="what-fits">
              <h2 id="what-fits">What does fit</h2>
              {p.fits.intro && <p>{p.fits.intro}</p>}
              {p.fits.rows.length > 0 && (
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col">Size or model</th>
                        <th scope="col">Size</th>
                        <th scope="col">In a typical {p.b.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.fits.rows.map((f) => {
                        const own = compatPages().find((x) => x.slug === f.slug);
                        return (
                          <tr key={f.item.id}>
                            <th scope="row" style={{ whiteSpace: "normal" }}>
                              {own && own.slug !== p.slug ? <Link href={compatPath(own.slug)}>{f.item.name}</Link> : `${f.item.name} (this page)`}
                            </th>
                            <td>{f.dims}</td>
                            <td className={`verdict verdict-${f.verdict}`}>{VERDICT_SHORT[f.verdict]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          <Picks items={p.pair.picks} heading="What to shop for" />
          <Faq items={p.faqs} />

          {p.sources.length > 0 && (
            <section aria-labelledby="sources">
              <h2 id="sources">Where the numbers come from</h2>
              <ul>
                {p.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" target="_blank">
                      {s.name}
                    </a>{" "}
                    <span className="muted">(checked {formatDate(s.checked)})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="related" data-pagefind-ignore>
            <h2 id="related">More will-it-fit answers</h2>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {siblings.map((s) => (
                    <tr key={s.slug}>
                      <th scope="row" style={{ whiteSpace: "normal" }}>
                        <Link href={compatPath(s.slug)}>{s.h1}</Link>
                      </th>
                      <td className={`verdict verdict-${s.verdict}`}>{VERDICT_SHORT[s.verdict]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {guides.length > 0 && (
              <ul className="link-cols">
                {guides.map((g) => (
                  <li key={g!.slug}>
                    <Link href={guidePath(g!.slug)}>{g!.h1}</Link>
                  </li>
                ))}
              </ul>
            )}
            <p>
              <Link href="/will-it-fit/">All size compatibility questions</Link> or check any combination with the{" "}
              <Link href="/tools/mattress-size-chart/">mattress, sheet and frame checker</Link>.
            </p>
          </section>
          <Breadcrumbs items={[{ name: "Will it fit?", href: "/will-it-fit/" }, { name: p.h1.replace(/\?$/, ""), href: compatPath(p.slug) }]} />
        </article>
        <aside className="rail" data-pagefind-ignore>
          <div className="rail-inner desktop-diagram">
            <Overlay p={p} />
          </div>
        </aside>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.meta,
          dateModified: p.updated,
          inLanguage: "en-US",
          mainEntityOfPage: abs(compatPath(p.slug)),
          author: { "@type": "Organization", name: SITE.organization, url: SITE.url },
          publisher: { "@type": "Organization", name: SITE.organization },
        }}
      />
    </div>
  );
}
