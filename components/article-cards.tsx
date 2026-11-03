import Link from "next/link";
import { getCategory, type Article } from "@/lib/content";
import { readingMinutes } from "@/lib/ui";
export default function ArticleCards({ items }: { items: Article[] }) {
  return <div className="grid">{items.map(a => <Link className="card" href={`/blog/${a.slug}`} key={a.slug}><span className="card-meta">{getCategory(a.category)?.name} · {readingMinutes([a.intro, ...a.sections.map(s => s.body)].join(' '))} min</span><h3>{a.title}</h3><p>{a.description}</p></Link>)}</div>;
}
