import type { Metadata } from "next";
import Link from "next/link";
import { compatPages, HUBS, CLUSTERS } from "@/lib/compat";
import { compatPath } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Will It Fit? Bottle, Console, Mattress and Car Size Answers",
  description: "Will a Switch 2 fit a Switch 1 case? Will an Owala fit a cup holder? Yes-or-no answers worked out from published dimensions, with the numbers shown.",
  alternates: { canonical: "/will-it-fit/" },
};

const WORD = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "Depends" } as const;

export default function CompatHub() {
  const pages = compatPages();
  const clusters = CLUSTERS.filter((c) => pages.some((p) => c.hubs.includes(p.pair.hub)));
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <h1>Will it fit?</h1>
      <Breadcrumbs items={[{ name: "Will it fit?", href: "/will-it-fit/" }]} />
      <p className="lede">
        Each answer is worked out from the actual dimensions of both things, which we show in a table and a scale drawing. No guesswork,
        and no typing numbers by hand.
      </p>
      <nav aria-label="Clusters">
        <p>
          {clusters.map((c, i) => (
            <span key={c.id}>
              {i > 0 && " · "}
              <a href={`#${c.id}`}>{c.name}</a>
            </span>
          ))}
        </p>
      </nav>
      {clusters.map((c) => (
        <section key={c.id} id={c.id} aria-labelledby={`c-${c.id}`}>
          <h2 id={`c-${c.id}`}>{c.name}</h2>
          {c.hubs
            .filter((k) => pages.some((p) => p.pair.hub === k))
            .map((k) => (
          <div key={k}>
          {c.hubs.length > 1 && <h3>{HUBS[k].name}</h3>}
          <p className="muted">{HUBS[k].blurb}</p>
          <div className="data-table-wrap">
            <table className="data-table">
              <tbody>
                {pages
                  .filter((p) => p.pair.hub === k)
                  .map((p) => (
                    <tr key={p.slug}>
                      <th scope="row" style={{ whiteSpace: "normal" }}>
                        <Link href={compatPath(p.slug)}>{p.h1}</Link>
                      </th>
                      <td className={`verdict verdict-${p.verdict}`}>{WORD[p.verdict]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          </div>
            ))}
        </section>
      ))}
    </div>
  );
}
