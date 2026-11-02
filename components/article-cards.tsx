import Link from "next/link";
import { getCategory, type Article } from "@/lib/content";
import { iconFor, readingMinutes } from "@/lib/ui";
export default function ArticleCards({ items }: { items: Article[] }) {
  return <div className="grid">{items.map(a => <Link className="card" href={`/blog/${a.slug}`} key={a.slug}><span className="card-icon" aria-hidden="true">{iconFor(a.title)}</span><small style={{ marginTop: 14 }}>{getCategory(a.category)?.name}</small><h3 style={{ marginTop: 4 }}>{a.title}</h3><p>{a.description}</p><span aria-hidden="true">Read guide · {readingMinutes([a.intro, ...a.sections.map(s => s.body)].join(' '))} min →</span></Link>)}</div>;
}
