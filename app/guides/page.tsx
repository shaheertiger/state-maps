import Directory from "@/components/directory";
import { articles, categories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("All iPhone Privacy Guides", "Find guidance on hidden photos, iCloud sharing, vaults, app access and recovery.", "/guides");
export default function Guides() { return <main id="content" className="wrap article wide"><span className="eyebrow">The guide library</span><h1>Find your next step.</h1><p className="lead">Browse by concern or search for the control you need. Each guide links to its sources.</p><Directory items={articles.map(a => ({ title: a.title, description: a.description, group: categories.find(c => c.slug === a.category)!.name, href: `/blog/${a.slug}` }))} /><h2>Explore a topic</h2><div className="grid">{categories.map(c => <a className="card" href={`/guides/${c.slug}`} key={c.slug}><h3>{c.name}</h3><p>{c.description}</p></a>)}</div></main>; }
