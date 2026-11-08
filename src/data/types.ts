// Shared content types. Every page on the site is built from this data.

export type Platform = "iOS" | "Android" | "Windows" | "macOS" | "Linux" | "Web";

export type CategorySlug =
  | "photo-vault"
  | "app-lock"
  | "hide-apps"
  | "file-encryption"
  | "private-notes";

/** "yes" | "no" | "partial" (e.g. paid-only, or only on one platform) | "unknown" (couldn't confirm) */
export type Flag = "yes" | "no" | "partial" | "unknown";

export interface App {
  slug: string; // kebab-case, unique, used in URLs: /reviews/<slug>/
  name: string; // display name, e.g. "Keepsafe"
  storeName?: string; // full store listing name if different, e.g. "Keepsafe Photo Vault: Hide Private Photos & Videos"
  developer: string; // company/dev; "" if not certain
  categories: CategorySlug[]; // first one is the primary category
  platforms: Platform[];
  builtIn?: boolean; // true for OS features (iOS Hidden folder, Android Private Space, Samsung Secure Folder)
  website?: string; // official homepage ONLY if certain, else omit
  openSource?: boolean;
  discontinued?: string; // set to a short note (e.g. "June 2024") if the app is no longer available

  pricing: {
    model: "Free" | "Freemium" | "Paid" | "Subscription" | "Built-in";
    free: string; // what the free tier gives, e.g. "Unlimited photos, ads, no cloud backup"
    paid: string; // plain-English paid plan description. Avoid exact prices unless certain; say "Optional Premium subscription" etc.
  };

  bestFor: string; // short label, 2-6 words: "Hiding photos with decoy PIN"
  standout: string; // the single standout feature, under 10 words
  oneLiner: string; // one sentence (<= 30 words) that would work as a featured-snippet summary

  whatItIs: string; // 2-3 sentences: what the app is and does
  howItWorks: string[]; // 2-4 short paragraphs: setup, daily use, notable mechanics
  whoFor: string; // 2-3 sentences: which kind of person this fits
  pickIf: string; // "You want ..." (no leading "Pick X if")
  skipIf: string; // "You need ..." (no leading "Skip X if")
  strengths: string[]; // 4-6 short bullets
  tradeoffs: string[]; // 3-5 short bullets, honest
  privacyNotes: string; // 2-4 sentences: where data lives, encryption claims, account requirements, what happens if you uninstall / lose phone

  features: {
    encryption: Flag; // files actually encrypted at rest (not just hidden behind a PIN)
    endToEnd: Flag; // cloud sync/backup is end-to-end / zero-knowledge encrypted
    biometric: Flag; // Face ID / fingerprint unlock
    decoy: Flag; // decoy/fake PIN or fake vault
    intruderAlert: Flag; // break-in photo / intruder selfie / alert
    disguise: Flag; // disguised icon (calculator etc.) or hidden icon
    cloudBackup: Flag; // any cloud backup/sync
    noAccount: Flag; // works without creating an account
    adFree: Flag; // free version has no ads
  };

  faq: { q: string; a: string }[]; // 3-4 app-specific questions people actually search
}

export interface Category {
  slug: CategorySlug;
  name: string; // "Photo & Video Vaults"
  short: string; // "Photo vaults"
  description: string;
  pillar: string; // slug of the main "best of" article for this category
}

export interface ListEntry {
  app: string; // app slug
  badge: string; // "Best Overall", "Best Free", "Best for Android" ...
  why: string; // 1-2 sentences: why it earned this spot ON THIS LIST
}

export interface Faq {
  q: string;
  a: string;
}

export interface Section {
  heading: string;
  body: string[]; // paragraphs, may contain [text](/internal/link/) markdown links
  steps?: { title: string; text: string }[];
  bullets?: string[];
}

/** A "Best X apps" listicle, the money page format. */
export interface Listicle {
  slug: string;
  category: CategorySlug;
  title: string; // <title> + H1, "12 Best Photo Vault Apps in 2026 (iPhone & Android)"
  seoTitle?: string; // optional shorter <title>
  description: string; // meta description 140-160 chars
  keyword: string; // primary keyword
  keywords: string[]; // secondary keywords
  published: string; // ISO date
  updated: string; // ISO date
  intro: string[]; // first paragraph names the winners (bold allowed with **)
  takeaways: string[]; // "Key takeaways" box
  entries: ListEntry[];
  afterList: Section[]; // myth-busting, how to pick, how to set up...
  faq: Faq[];
  related: string[]; // slugs of other articles
}

/** A step-by-step how-to guide. */
export interface Guide {
  slug: string;
  category: CategorySlug;
  title: string;
  description: string;
  keyword: string;
  published: string;
  updated: string;
  answer: string; // the 40-60 word direct answer shown at the top
  intro: string[];
  sections: Section[];
  faq: Faq[];
  apps: string[]; // apps mentioned, rendered as cards
  related: string[];
}

export interface Comparison {
  a: string;
  b: string;
  summary: string; // 2-3 sentence verdict at the top
  winner: "a" | "b" | "tie";
  chooseA: string; // "Choose X if ..."
  chooseB: string;
  differences: { label: string; a: string; b: string }[]; // 4-6 rows
}
