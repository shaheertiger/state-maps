import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCards from "@/components/article-cards";
import { articles, categories, getCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() { return categories.map(c => ({ category: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) { const c = getCategory((await params).category); return c ? pageMetadata(c.name, c.description, `/guides/${c.slug}`) : { title: "Topic not found", robots: { index: false } }; }
export default async function Category({ params }: { params: Promise<{ category: string }> }) { const c = getCategory((await params).category); if (!c) notFound(); return <main id="content" className="wrap article wide"><nav aria-label="Breadcrumb"><Link href="/guides">All guides</Link> / {c.name}</nav><h1>{c.name}</h1><p className="lead">{c.description}</p><ArticleCards items={articles.filter(a => a.category === c.slug)} /><aside className="callout"><h2>Not sure where to start?</h2><p>Choose your storage setup and access concern to get a focused list of checks.</p><Link href="/privacy-checklist">Build a privacy review →</Link></aside></main>; }
