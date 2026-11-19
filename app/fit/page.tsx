import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allCategories, allGuides, guidesIn, titleCaseItem } from "@/lib/content";
import { guidePath, hubPath } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Fit Guides A–Z: How Should It Fit?",
  description: "Every fit guide on the site, from bras and boots to suit jackets and watches, by category and A to Z.",
  alternates: { canonical: "/fit/" },
};

export default function FitIndex() {
  const cats = allCategories();
  const guides = [...allGuides()].sort((a, b) => a.item.localeCompare(b.item));
  const letters = [...new Set(guides.map((g) => g.item[0].toUpperCase()))];
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <Breadcrumbs items={[{ name: "Fit guides", href: "/fit/" }]} />
      <h1>How should it fit?</h1>
      <p className="lede">
        {guides.length} guides, each with a point-by-point fit checklist, how to measure yourself, and fixes for common problems.
      </p>
      <h2>By category</h2>
      <div className="cat-index">
        {cats.map((c) => (
          <section key={c.slug}>
            <h3>
              <Link href={hubPath(c.slug)}>{c.name}</Link>
            </h3>
            <p className="muted">
              {guidesIn(c.slug)
                .slice(0, 6)
                .map((g) => g.item)
                .join(", ")}
            </p>
          </section>
        ))}
      </div>
      <h2>A to Z</h2>
      {letters.map((L) => (
        <section key={L} aria-label={L}>
          <h3>{L}</h3>
          <ul className="link-cols">
            {guides
              .filter((g) => g.item[0].toUpperCase() === L)
              .map((g) => (
                <li key={g.slug}>
                  <Link href={guidePath(g.slug)}>{titleCaseItem(g.item)}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
