import { SITE, abs } from "./site";
import { allEntries } from "./urls";

/**
 * Shared structured data. Organization and WebSite are emitted on every page by the layout; pages
 * point at them by @id. The author is a Person only when SITE.author names a real person who writes
 * or checks the pages: never an invented persona. Until then the author is the Organization.
 */
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const PERSON_ID = `${SITE.url}/about/#author`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.organization,
  alternateName: SITE.fullName,
  description: SITE.description,
  url: `${SITE.url}/`,
  logo: { "@type": "ImageObject", url: abs("/icon.svg") },
};
export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE.name,
  alternateName: SITE.fullName,
  url: `${SITE.url}/`,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  potentialAction: { "@type": "SearchAction", target: `${SITE.url}/search/?q={search_term_string}`, "query-input": "required name=search_term_string" },
};
export const personLd = SITE.author
  ? { "@context": "https://schema.org", "@type": "Person", "@id": PERSON_ID, name: SITE.author.name, ...(SITE.author.role ? { jobTitle: SITE.author.role } : {}), url: abs("/about/"), worksFor: { "@id": ORG_ID } }
  : null;
export const authorRef = SITE.author ? { "@id": PERSON_ID } : { "@id": ORG_ID };
export const publisherRef = { "@id": ORG_ID };

/** lastmod for a path, from the same source as the sitemap. */
export const lastmodOf = (path: string) => allEntries().find((e) => e.path === path)?.lastmod;

export function articleLd({ headline, description, path, dateModified }: { headline: string; description?: string; path: string; dateModified?: string }) {
  const modified = dateModified ?? lastmodOf(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description ? { description } : {}),
    ...(modified ? { dateModified: modified } : {}),
    inLanguage: "en-US",
    mainEntityOfPage: abs(path),
    isPartOf: { "@id": WEBSITE_ID },
    author: authorRef,
    publisher: publisherRef,
    image: abs(`/og/${ogId(path)}`),
  };
}

/** One og:image per page: /og/{ogId(path)} ("/" -> "home.png", "/fit/bra/" -> "fit-bra.png"). */
export const ogId = (path: string) => (path === "/" ? "home.png" : `${path.replace(/^\/|\/$/g, "").replace(/\//g, "-")}.png`);
