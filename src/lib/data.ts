import raw from "../../data/apps.json";
import { bySensitivity, HIGH } from "./labels";

export type App = {
  id: number; rank: number; slug: string; oldSlug: string; name: string; display: string; developer: string; bundleId: string;
  category: string; genres: string[]; topic: string; minimumIos: string | null; version: string | null; updatedAt: string | null;
  releasedAt: string | null; sizeMb: number | null; ageRating: string | null; languages: string[]; developerUrl: string | null;
  sourceUrl: string; retrievedAt: string | null; privacyCheckedAt: string | null; status: "reported" | "not-provided";
  track: string[]; linked: string[]; notLinked: string[]; notCollected: boolean;
};
export type Variant = "app" | "track" | "lock";

export const APPS = raw.apps as App[];
const BY_SLUG = new Map(APPS.map((a) => [a.slug, a]));
export const getApp = (slug: string) => BY_SLUG.get(slug);

/** The snapshot date: "updated N months ago" is measured from here, never from the build clock. */
export const SNAPSHOT = new Date("2026-11-01T00:00:00Z");

const TOPIC_NAMES: Record<string, string> = {
  "photo-vault": "Photo vaults", "private-photos": "Private photo apps", "password-manager": "Password managers", authenticator: "Authenticator apps",
  "secure-messenger": "Secure messengers", "encrypted-notes": "Encrypted notes apps", "document-scanner": "Document scanners", "cloud-storage": "Cloud storage apps",
  "private-browser": "Private browsers", "photo-manager": "Photo managers", "video-storage": "Video storage apps", "journal-diary": "Journal & diary apps",
  "pdf-editor": "PDF editors", "file-manager": "File managers", "family-organizer": "Family organizers", "budget-planner": "Budget planners",
  banking: "Banking apps", "secure-email": "Secure email apps", "contacts-backup": "Contacts backup apps", "calendar-planner": "Calendar planners",
  "health-tracker": "Health trackers", "medical-records": "Medical records apps", "voice-recorder": "Voice recorders", "photo-backup": "Photo backup apps",
  "security-camera": "Security camera apps", "privacy-protection": "Privacy protection apps", "digital-wallet": "Digital wallets", "expense-tracker": "Expense trackers",
};
export type Topic = { slug: string; name: string; singular: string; count: number };
export const TOPICS: Topic[] = raw.topics.map((t) => ({
  slug: t.slug,
  name: TOPIC_NAMES[t.slug] ?? t.query,
  singular: (TOPIC_NAMES[t.slug] ?? t.query).replace(/ apps$/, " app").replace(/s$/, "").replace(/ & diary app$/, " & diary app").toLowerCase(),
  count: APPS.filter((a) => a.topic === t.slug).length,
}));
export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug)!;

const CAT_META: Record<string, { name: string; blurb: string }> = {
  productivity: { name: "Productivity", blurb: "notes, scanners, PDF editors, planners and file managers" },
  utilities: { name: "Utilities", blurb: "vaults, authenticators, browsers, cameras and privacy tools" },
  finance: { name: "Finance", blurb: "banking, budgeting, wallet and expense apps" },
  "photo-video": { name: "Photo & Video", blurb: "photo vaults, galleries, backups and video storage" },
  business: { name: "Business", blurb: "documents, email, scanning and team tools" },
  lifestyle: { name: "Lifestyle", blurb: "family organizers, journals and home tools" },
  "health-fitness": { name: "Health & Fitness", blurb: "health trackers, journals and fitness logs" },
  medical: { name: "Medical", blurb: "medical records, patient portals and care apps" },
  "social-networking": { name: "Social Networking", blurb: "messengers, social and family apps" },
};
export type Category = { slug: string; name: string; blurb: string; count: number; topics: { slug: string; name: string; count: number }[] };
/** Topic hubs inside a category need at least this many apps to be worth a page. */
export const MIN_SUB = 8;
export const CATEGORIES: Category[] = Object.entries(CAT_META)
  .map(([slug, m]) => {
    const apps = APPS.filter((a) => a.category === slug);
    const topics = TOPICS.map((t) => ({ slug: t.slug, name: t.name, count: apps.filter((a) => a.topic === t.slug).length }))
      .filter((t) => t.count >= MIN_SUB).sort((a, b) => b.count - a.count);
    return { slug, ...m, count: apps.length, topics };
  })
  .sort((a, b) => b.count - a.count);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;
export const appsIn = (cat: string, topic?: string) => APPS.filter((a) => a.category === cat && (!topic || a.topic === topic));

export const url = {
  app: (a: App) => `/is-${a.slug}-safe/`,
  track: (a: App) => `/does-${a.slug}-track-you/`,
  lock: (a: App) => `/how-to-lock-${a.slug}-on-iphone/`,
  category: (c: string) => `/app-privacy/${c}/`,
  topic: (c: string, t: string) => `/app-privacy/${c}/${t}/`,
  dataType: (slug: string) => `/data-types/${slug}/`,
};

/* ---------- label facts ---------- */
export const reported = (a: App) => a.status === "reported";
export const tracks = (a: App) => a.track.length > 0;
export const allTypes = (a: App) => bySensitivity([...new Set([...a.track, ...a.linked, ...a.notLinked])]);
export const linkedTypes = (a: App) => bySensitivity([...new Set([...a.track, ...a.linked])]);
export const highTypes = (a: App) => allTypes(a).filter((t) => HIGH.has(t));

/** 0 = no label, 1 = collects nothing, 2 = not linked only, 3 = linked to you, 4 = used to track you. */
export type Level = 0 | 1 | 2 | 3 | 4;
export function level(a: App): Level {
  if (!reported(a)) return 0;
  if (a.track.length) return 4;
  if (a.linked.length) return 3;
  if (a.notLinked.length) return 2;
  return 1;
}
export const LEVELS = [
  { key: "none", label: "No label details", short: "Not disclosed", tone: "caution" },
  { key: "clean", label: "Data not collected", short: "Collects nothing", tone: "yes" },
  { key: "anon", label: "Not linked to you", short: "Not linked", tone: "info" },
  { key: "linked", label: "Linked to you", short: "Linked", tone: "caution" },
  { key: "track", label: "Used to track you", short: "Tracks you", tone: "no" },
] as const;

/** Variant pages exist only where they have something to say. */
export const hasTrackPage = (a: App) => reported(a);
const LOCK_CATS = new Set(["finance", "medical", "health-fitness", "social-networking", "photo-video"]);
const LOCK_TOPICS = new Set(["photo-vault", "private-photos", "password-manager", "authenticator", "secure-messenger", "encrypted-notes", "journal-diary", "banking", "digital-wallet", "medical-records", "secure-email"]);
export const hasLockPage = (a: App) => LOCK_CATS.has(a.category) || LOCK_TOPICS.has(a.topic);
export const variantsOf = (a: App): Variant[] => ["app", ...(hasTrackPage(a) ? (["track"] as const) : []), ...(hasLockPage(a) ? (["lock"] as const) : [])];
export const variantPath = (a: App, v: Variant) => url[v](a);

/* ---------- metadata helpers ---------- */
export const monthsSince = (iso: string | null) => (iso ? Math.max(0, Math.round((SNAPSHOT.getTime() - new Date(iso).getTime()) / (30.44 * 864e5))) : null);
export const fmtDate = (iso: string | null) => (iso ? new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : "Not listed");
export const fmtMonth = (iso: string | null) => (iso ? new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : "Not listed");
export const ago = (iso: string | null) => {
  const m = monthsSince(iso);
  if (m === null) return "date not listed";
  if (m < 1) return "within the last month";
  if (m < 24) return `${m} month${m === 1 ? "" : "s"} before our snapshot`;
  return `about ${Math.floor(m / 12)} years before our snapshot`;
};
/** "Google Photos" → "Google Photos'", "Dropbox" → "Dropbox's". */
export const poss = (s: string) => (/s$/i.test(s) ? `${s}'` : `${s}'s`);
export const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const list = (xs: string[], and = "and") => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ${and} ${xs[xs.length - 1]}`);
export const lower = (xs: string[]) => xs.map((x) => x.toLowerCase().replace("health & fitness", "health and fitness"));

/** Same topic first, then same category; nearest by dataset rank. Deterministic. */
export function similarApps(a: App, n = 8): App[] {
  const near = (xs: App[]) => xs.filter((x) => x.id !== a.id).sort((x, y) => Math.abs(x.rank - a.rank) - Math.abs(y.rank - a.rank));
  const out = near(APPS.filter((x) => x.topic === a.topic));
  if (out.length < n) out.push(...near(APPS.filter((x) => x.category === a.category && x.topic !== a.topic)));
  return out.slice(0, n);
}
export const sameDeveloper = (a: App) => APPS.filter((x) => x.developer === a.developer && x.id !== a.id).slice(0, 6);

/** Share of apps in the same topic at each level — used for "how it compares" copy. */
export function topicStats(topic: string) {
  const xs = APPS.filter((a) => a.topic === topic && reported(a));
  const n = xs.length || 1;
  const pct = (f: (a: App) => boolean) => Math.round((xs.filter(f).length / n) * 100);
  return { n: xs.length, track: pct(tracks), linked: pct((a) => level(a) >= 3), clean: pct((a) => level(a) === 1), avgTypes: Math.round((xs.reduce((s, a) => s + allTypes(a).length, 0) / n) * 10) / 10 };
}
export const LETTERS = ["0-9", ..."abcdefghijklmnopqrstuvwxyz".split("")];
export const letterOf = (a: App) => (/[a-z]/i.test(a.display[0]) ? a.display[0].toLowerCase() : "0-9");
