import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { type Cluster, LAUNCH_DATE, clusterHubPath, clusterItems, clusterPages, inch } from "@/lib/compat";
import { compatPath } from "@/lib/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { formatDate } from "./SizeTable";
import { articleLd, ogId } from "@/lib/ld";

const WORD = { yes: "Yes", no: "No", loosely: "Yes, loosely", depends: "Depends on the holder" } as const;
const TYPE_NAMES: Record<string, string> = {
  "will-it-fit": "Will it fit?",
  dimensions: "Dimensions",
  "best-that-fits": "Best picks that fit",
  "how-to": "How to measure",
  question: "Questions",
};

export function clusterHubMeta(c: Cluster): Metadata {
  const h = c.hub!;
  const url = clusterHubPath(c);
  return {
    title: { absolute: h.title },
    description: h.meta,
    alternates: { canonical: url },
    openGraph: { title: h.title, description: h.meta, url, type: "article", images: [`/og/${ogId(url)}`] },
  };
}

/** /will-it-fit/{cluster}/: the answer (a lookup table of every sourced item), then every page in the cluster by type. */
export function ClusterHub({ c }: { c: Cluster }) {
  const h = c.hub!;
  const url = clusterHubPath(c);
  const items = clusterItems(c);
  const pages = clusterPages(c);
  const map = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/clusters.json"), "utf8")) as { pages: Record<string, { cluster: string; type: string }> };
  const byType = Object.entries(TYPE_NAMES)
    .map(([type, name]) => ({ type, name, paths: Object.entries(map.pages).filter(([p, v]) => v.cluster === c.id && v.type === type && p !== url).map(([p]) => p) }))
    .filter((g) => g.paths.length);
  const titleOf = (p: string) => pages.find((x) => compatPath(x.slug) === p)?.h1 ?? p;
  const against = items[0]?.against;
  const sources = [...new Map(items.flatMap((i) => [i.item.source, i.against.source]).filter((s) => !!s).map((s) => [s!.url, s!])).values()];
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <article className="prose" data-pagefind-body style={{ maxWidth: "none" }}>
        <h1>{h.question}</h1>
        <section className="answer" aria-labelledby="short-answer">
          <h2 id="short-answer">The short answer</h2>
          <p>{h.intro}</p>
          <p className="muted method">
            Updated {new Date(`${h.updated}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}. Compared using
            manufacturer dimensions and published specs; no hands-on test.
          </p>
        </section>

        <section aria-labelledby="table">
          <h2 id="table">Base widths, narrowest first</h2>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Bottle</th>
                  <th scope="col">Base width</th>
                  <th scope="col">In a typical {against?.name ?? "holder"}{against?.d ? ` (${inch(against.d)} in)` : ""}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.item.id}>
                    <th scope="row" style={{ whiteSpace: "normal" }}>
                      {i.slug ? <Link href={compatPath(i.slug)}>{i.item.name}</Link> : i.item.name}
                    </th>
                    <td>
                      {inch(i.item.d)} in ({(Number(i.item.d) * 2.54).toFixed(1)} cm)
                    </td>
                    <td className={`verdict verdict-${i.verdict}`}>{WORD[i.verdict]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {against?.note && <p className="table-note">Cup holders: {against.note}</p>}
        </section>

        {byType.map((g) => (
          <section key={g.type} aria-labelledby={`t-${g.type}`}>
            <h2 id={`t-${g.type}`}>{g.name}</h2>
            <ul className="link-cols">
              {g.paths.map((p) => (
                <li key={p}>
                  <Link href={p}>{titleOf(p)}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section aria-labelledby="sources">
          <h2 id="sources">Where the numbers come from</h2>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" target="_blank">
                  {s.name}
                </a>{" "}
                <span className="muted">(checked {formatDate(s.checked ?? LAUNCH_DATE)})</span>
              </li>
            ))}
          </ul>
        </section>
        <p>
          <Link href="/will-it-fit/">All will-it-fit answers</Link>
        </p>
        <Breadcrumbs items={[{ name: "Will it fit?", href: "/will-it-fit/" }, { name: c.name, href: url }]} />
      </article>
      <JsonLd data={articleLd({ headline: h.question, description: h.meta, path: url, dateModified: h.updated })} />
    </div>
  );
}
