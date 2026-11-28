import type { Metadata } from "next";
import Link from "next/link";
import { compatPages, HUBS } from "@/lib/compat";
import { compatPath } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Will It Fit? Mattress, Sheet, Car and Case Size Answers",
  description: "Will a queen mattress fit a full frame? Do full sheets fit a queen? Yes-or-no answers worked out from real dimensions, with the numbers shown.",
  alternates: { canonical: "/will-it-fit/" },
};

const WORD = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "Depends" } as const;

export default function CompatHub() {
  const pages = compatPages();
  const hubs = Object.entries(HUBS).filter(([k]) => pages.some((p) => p.pair.hub === k));
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <h1>Will it fit?</h1>
      <Breadcrumbs items={[{ name: "Will it fit?", href: "/will-it-fit/" }]} />
      <p className="lede">
        Each answer is worked out from the actual dimensions of both things, which we show in a table and a scale drawing. No guesswork,
        and no typing numbers by hand.
      </p>
      {hubs.map(([k, h]) => (
        <section key={k} aria-labelledby={`h-${k}`}>
          <h2 id={`h-${k}`}>{h.name}</h2>
          <p className="muted">{h.blurb}</p>
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
        </section>
      ))}
    </div>
  );
}
