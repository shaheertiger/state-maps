import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { abs } from "@/lib/site";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav className="crumbs" aria-label="Breadcrumb" data-pagefind-ignore>
      <ol>
        {all.map((c, i) => (
          <li key={c.href}>{i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}</li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
        }}
      />
    </nav>
  );
}
