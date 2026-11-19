import Link from "next/link";
import { amazonSearch } from "@/lib/site";

export function Picks({ items, id = "shop", heading }: { items: { label: string; why: string; query: string }[]; id?: string; heading: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      <p className="disclosure">
        These are search links to a retailer. If you buy through them we may earn a commission, at no cost to you.{" "}
        <Link href="/affiliate-disclosure/">How we make money</Link>.
      </p>
      <ul className="picks">
        {items.map((p) => (
          <li key={p.label}>
            <div>
              <strong>{p.label}</strong>
              <div className="muted">{p.why}</div>
            </div>
            <a className="shop" href={amazonSearch(p.query)} rel="sponsored nofollow noopener" target="_blank">
              See options on Amazon
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
