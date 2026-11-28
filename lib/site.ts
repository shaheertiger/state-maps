/**
 * Production origin used for canonicals, sitemaps, robots.txt and structured data.
 * 1. NEXT_PUBLIC_SITE_URL if set (use this once the custom domain is live).
 * 2. Otherwise Vercel's production domain, which Vercel exposes to every build
 *    (preview builds too, so previews still point canonicals at production).
 * 3. Otherwise a placeholder; the post-build check fails a Vercel build that ends up here.
 */
function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercel ? `https://${vercel}` : "https://www.example.com");
  return url.replace(/\/+$/, "");
}

/** One place to rename the site. */
export const SITE = {
  name: "State Maps",
  /** Always shown next to the name where it identifies the site, so "maps" reads as fit maps, not geography. */
  descriptor: "Fit & sizing guides",
  fullName: "State Maps Fit & Sizing Guides",
  tagline: "Fit and size, mapped: how it should fit, whether it will fit, and how brands size.",
  description:
    "Clear, measured answers to how clothes, shoes and gear should fit, whether one size fits another, and how brands size — with checklists, size charts and calculators.",
  url: siteUrl(),
  locale: "en-US",
  email: "hello@example.com",
  organization: "State Maps",
  /**
   * The real person who writes and checks the guides, shown as the Article author (Person schema).
   * Leave null until the owner names one: never an invented persona or credential.
   */
  author: { name: "Shaheer Ali Khan" } as { name: string; role?: string } | null,
} as const;

export const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Category hub URL slugs that differ from their id (avoid clashing with guide slugs). */
const HUB_PATH_OVERRIDES: Record<string, string> = { boots: "boot-styles" };
export const hubSlug = (category: string) => HUB_PATH_OVERRIDES[category] ?? category;
export const hubPath = (category: string) => `/fit/${hubSlug(category)}/`;
export const guidePath = (slug: string) => `/fit/${slug}/`;
export const compatPath = (slug: string) => `/will-it-fit/${slug}/`;
export const brandPath = (brand: string, product?: string) => `/sizing/${brand}/${product ? `${product}/` : ""}`;

export const amazonSearch = (query: string) => {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;
  const u = new URL("https://www.amazon.com/s");
  u.searchParams.set("k", query);
  if (tag) u.searchParams.set("tag", tag);
  return u.toString();
};

export const TOOLS = [
  {
    slug: "bra-size-calculator",
    name: "Bra size calculator",
    title: "Bra Size Calculator — Free Band and Cup Size Finder",
    blurb: "Two measurements, your US, UK and EU size, plus sister sizes.",
  },
  {
    slug: "ring-size-chart",
    name: "Ring size chart",
    title: "Ring Size Chart — Free Printable Ring Sizer",
    blurb: "US, UK and EU ring sizes by diameter and circumference, with a printable sizer.",
  },
  {
    slug: "shoe-size-converter",
    name: "Shoe size converter",
    title: "Shoe Size Converter — Free US, UK, EU and CM Chart",
    blurb: "Men's, women's and kids' sizes across US, UK, EU and foot length.",
  },
  {
    slug: "mattress-size-chart",
    name: "Mattress size chart",
    title: "Mattress Size Chart — Free Bed, Sheet and Frame Fit Checker",
    blurb: "Every standard bed size, and whether a mattress, sheet or frame will fit.",
  },
  {
    slug: "carry-on-size-checker",
    name: "Carry-on size checker",
    title: "Carry-On Size Checker — Free Airline Bag Size Limits",
    blurb: "Enter your bag's size and see which airlines' carry-on limits it meets.",
  },
] as const;
export type ToolSlug = (typeof TOOLS)[number]["slug"];
