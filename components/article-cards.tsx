import Link from "next/link";
import { getCategory, type Article } from "@/lib/content";
export default function ArticleCards({ items }: { items: Article[] }) {
  return <div className="grid">{items.map(a => <Link className="card" href={`/blog/${a.slug}`} key={a.slug}><small>{getCategory(a.category)?.name}</small><h3>{a.title}</h3><p>{a.description}</p><span aria-hidden="true">Read guide →</span></Link>)}</div>;
}
