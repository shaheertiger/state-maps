import { ORG, articleLd, breadcrumbLd, faqLd } from "./schema";
import { SITE, abs } from "./site";
import { type App, getCategory, allTypes } from "./data";
import { CARDS } from "./labels";

/** Article + SoftwareApplication (the subject) + the label as a Dataset of PropertyValues + breadcrumb + FAQ. */
export function appGraph(o: { app: App; path: string; headline: string; description: string; crumbs: { name: string; href?: string }[]; faq: [string, string][] }) {
  const { app: a, path } = o;
  const u = abs(path);
  const values = a.status === "reported"
    ? (["track", "linked", "notLinked"] as const).map((k) => ({ "@type": "PropertyValue", name: CARDS[k].title, value: a[k].length ? a[k].join(", ") : "None declared" }))
      .concat(a.notCollected && !allTypes(a).length ? [{ "@type": "PropertyValue", name: "Data Not Collected", value: "Yes" }] : [])
    : [{ "@type": "PropertyValue", name: "Privacy details", value: "No Details Provided" }];
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      { ...articleLd({ path, headline: o.headline, description: o.description, section: getCategory(a.category).name, published: a.retrievedAt ?? SITE.verifiedISO, modified: a.privacyCheckedAt ?? SITE.verifiedISO }), about: { "@id": `${u}#app` }, isBasedOn: { "@id": `${u}#label` } },
      {
        "@type": "SoftwareApplication",
        "@id": `${u}#app`,
        name: a.name,
        operatingSystem: a.minimumIos ? `iOS ${a.minimumIos} or later` : "iOS",
        applicationCategory: getCategory(a.category).name,
        softwareVersion: a.version ?? undefined,
        ...(a.updatedAt ? { dateModified: a.updatedAt } : {}),
        author: { "@type": "Organization", name: a.developer, ...(a.developerUrl ? { url: a.developerUrl } : {}) },
        sameAs: a.sourceUrl,
      },
      {
        "@type": "Dataset",
        "@id": `${u}#label`,
        name: `${a.display} App Store privacy label`,
        description: `Developer-reported App Store privacy details for ${a.name}.`,
        url: u,
        isAccessibleForFree: true,
        creator: { "@type": "Organization", name: a.developer },
        isBasedOn: a.sourceUrl,
        dateModified: a.privacyCheckedAt ?? SITE.verifiedISO,
        variableMeasured: values,
      },
      breadcrumbLd(o.crumbs, path),
      ...(o.faq.length ? [faqLd(o.faq)] : []),
    ],
  };
}
