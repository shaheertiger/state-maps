import { SITE, abs } from "./site";

export const ORG = {
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: { "@type": "ImageObject", url: abs("/web-app-manifest-512x512.png"), width: 512, height: 512 },
  sameAs: ["https://github.com/shaheertiger/state-maps"],
};

export const breadcrumbLd = (items: { name: string; href?: string }[], path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href ?? path) })),
});

export const faqLd = (faq: [string, string][]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const articleLd = (o: { path: string; headline: string; description: string; about?: object; section?: string; published?: string; modified?: string }) => ({
  "@type": "Article",
  "@id": `${abs(o.path)}#article`,
  headline: o.headline,
  description: o.description,
  url: abs(o.path),
  mainEntityOfPage: abs(o.path),
  image: abs(SITE.ogImage),
  datePublished: o.published ?? SITE.verifiedISO,
  dateModified: o.modified ?? SITE.verifiedISO,
  author: { "@id": ORG["@id"] },
  publisher: { "@id": ORG["@id"] },
  ...(o.about ? { about: o.about } : {}),
  ...(o.section ? { articleSection: o.section } : {}),
});
