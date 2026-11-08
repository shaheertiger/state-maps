import { SITE, abs } from "./site";
import { plain } from "./md";
import type { App, Faq } from "../data/types";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const iso = (d: string) => (d.length === 10 ? `${d}T09:00:00+00:00` : d);

export const organization = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: abs("/logo.png"), width: 512, height: 512 },
  email: SITE.email,
});

export const website = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/search/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const article = (o: {
  type?: "Article" | "BlogPosting" | "TechArticle" | "Review";
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": o.type ?? "Article",
  headline: o.title,
  description: o.description,
  url: abs(o.path),
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(o.path) },
  datePublished: iso(o.published),
  dateModified: iso(o.updated),
  author: { "@type": "Organization", name: SITE.author.name, url: abs(SITE.author.url) },
  publisher: { "@id": ORG_ID, "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: abs("/logo.png") } },
  image: { "@type": "ImageObject", url: abs(o.image ?? "/og.png"), width: 1200, height: 630 },
  ...(o.section ? { articleSection: o.section } : {}),
  ...(o.keywords?.length ? { keywords: o.keywords.join(", ") } : {}),
  ...(o.wordCount ? { wordCount: o.wordCount } : {}),
  inLanguage: "en-US",
  isPartOf: { "@id": SITE_ID },
});

export const faqPage = (faq: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
  })),
});

const os = (a: App) => a.platforms.join(", ");
const appCategory = (a: App) =>
  a.categories[0] === "private-notes" ? "ProductivityApplication" : a.builtIn ? "UtilitiesApplication" : "SecurityApplication";

export const softwareApp = (a: App, path: string) => ({
  "@type": "SoftwareApplication",
  name: a.name,
  url: abs(path),
  applicationCategory: appCategory(a),
  operatingSystem: os(a),
  description: a.oneLiner,
  ...(a.developer ? { author: { "@type": "Organization", name: a.developer } } : {}),
  ...(a.website ? { sameAs: a.website } : {}),
});

export const itemList = (name: string, items: { app: App; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, item: softwareApp(it.app, it.path) })),
});
