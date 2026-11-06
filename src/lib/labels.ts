/**
 * Apple's App Store privacy-label vocabulary, paraphrased from
 * https://developer.apple.com/app-store/app-privacy-details/ — the definitions every app page uses.
 */
export type CardKey = "track" | "linked" | "notLinked";

export const CARDS: Record<CardKey, { title: string; short: string; color: string; tint: string; ink: string; means: string }> = {
  track: {
    title: "Data Used to Track You", short: "Used to track you", color: "var(--color-track)", tint: "var(--color-tint-red)", ink: "#9b2c1c",
    means: "Apple defines tracking as linking data from this app with data from other companies' apps, websites or offline sources for targeted advertising or ad measurement, or sharing it with a data broker.",
  },
  linked: {
    title: "Data Linked to You", short: "Linked to you", color: "var(--color-linked)", tint: "var(--color-tint-amber)", ink: "#865409",
    means: "Collected and tied to your identity, for example through your account, your device or other details that identify you.",
  },
  notLinked: {
    title: "Data Not Linked to You", short: "Not linked to you", color: "var(--color-notlinked)", tint: "var(--color-tint-blue)", ink: "#22508f",
    means: "Collected, but the developer says it is de-identified or anonymised and not tied back to you.",
  },
};

export type DataType = {
  slug: string;
  name: string;
  includes: string[];
  plain: string;
  why: string;
  setting: string;
  icon: string;
};

export const DATA_TYPES: DataType[] = [
  { slug: "identifiers", name: "Identifiers", includes: ["User ID", "Device ID"], icon: "id",
    plain: "an account ID, screen name, customer number or a device-level ID such as the advertising identifier",
    why: "Identifiers let a service recognise the same person or phone across sessions. Combined with other data, they are what makes cross-app tracking possible.",
    setting: "Settings › Privacy & Security › Tracking: turn off Allow Apps to Request to Track, or tap Ask App Not to Track when prompted." },
  { slug: "usage-data", name: "Usage Data", includes: ["Product interaction", "Advertising data", "Other usage data"], icon: "tap",
    plain: "what you tap, open and view inside the app, plus which ads you have seen",
    why: "Product analytics show developers which features are used. The same records can also feed advertising when an app declares tracking.",
    setting: "There is no single iOS switch. Look for an analytics or personalised-ads toggle in the app's own settings." },
  { slug: "diagnostics", name: "Diagnostics", includes: ["Crash data", "Performance data", "Other diagnostic data"], icon: "pulse",
    plain: "crash logs, launch times, hang rates and energy use",
    why: "Diagnostics help fix bugs. They are usually low-risk on their own, but can be linked to an account if the label says so.",
    setting: "Settings › Privacy & Security › Analytics & Improvements › Share With App Developers controls what Apple passes on; the app's own crash reporting is separate." },
  { slug: "contact-info", name: "Contact Info", includes: ["Name", "Email address", "Phone number", "Physical address", "Other contact info"], icon: "mail",
    plain: "your name, email address, phone number or postal address",
    why: "Contact details identify you directly and are what marketing lists and account recovery rely on.",
    setting: "Use Sign in with Apple with Hide My Email where offered, and check the app's account and marketing preferences." },
  { slug: "user-content", name: "User Content", includes: ["Emails or texts", "Photos or videos", "Audio", "Gameplay content", "Customer support", "Other user content"], icon: "image",
    plain: "messages, photos, videos, audio recordings, documents and support chats you create or upload",
    why: "This is the content you actually care about. Where it is stored, who can read it and how it is backed up matters more than any other line on the label.",
    setting: "Settings › Privacy & Security › Photos: choose Limited Access or None; review Microphone and Files access too." },
  { slug: "location", name: "Location", includes: ["Precise location", "Coarse location"], icon: "pin",
    plain: "where your phone is, either precisely (street level) or approximately (city or area)",
    why: "Location history reveals home, work and routines. Precise location deserves the most scrutiny.",
    setting: "Settings › Privacy & Security › Location Services: choose Never or While Using, and turn off Precise Location if the app does not need it." },
  { slug: "purchases", name: "Purchases", includes: ["Purchase history"], icon: "bag",
    plain: "what you have bought or tend to buy",
    why: "Purchase records are valuable for advertising profiles and can reveal habits.",
    setting: "Review in-app marketing settings; subscriptions are listed in Settings › [your name] › Subscriptions." },
  { slug: "financial-info", name: "Financial Info", includes: ["Payment info", "Credit info", "Other financial info"], icon: "card",
    plain: "card numbers, bank details, credit scores, salary, income, assets or debts",
    why: "Financial data is high-value to criminals and is often regulated. Expect it in banking and budgeting apps; question it elsewhere.",
    setting: "Pay with Apple Pay where offered so the app never sees your card number, and turn on the app's own login lock." },
  { slug: "contacts", name: "Contacts", includes: ["Address book or social graph"], icon: "people",
    plain: "the people in your address book or social graph",
    why: "Uploading contacts shares other people's details, not just yours.",
    setting: "Settings › Privacy & Security › Contacts: choose Limited Access to share only selected people, or None." },
  { slug: "other-data", name: "Other Data", includes: ["Any type not listed elsewhere"], icon: "dots",
    plain: "any data the developer did not fit into Apple's named categories",
    why: "The label does not say what this is. The privacy policy is the only place to find out.",
    setting: "Read the app's privacy policy, linked from its App Store page." },
  { slug: "health-and-fitness", name: "Health & Fitness", includes: ["Health", "Fitness"], icon: "heart",
    plain: "health and medical records, HealthKit data, and fitness or exercise data",
    why: "Health data is among the most sensitive data an app can hold, and US health-privacy law (HIPAA) does not cover most consumer apps.",
    setting: "Health app › your profile › Apps: switch off each category the app should not read or write; check Settings › Privacy & Security › Motion & Fitness." },
  { slug: "search-history", name: "Search History", includes: ["Searches made in the app"], icon: "search",
    plain: "searches you run inside the app",
    why: "Searches reveal intent and interests, sometimes more than what you finally open.",
    setting: "Look for a clear-history or private-search option in the app." },
  { slug: "sensitive-info", name: "Sensitive Info", includes: ["Racial or ethnic data", "Sexual orientation", "Pregnancy", "Disability", "Religious or political beliefs", "Trade union membership", "Genetic data", "Biometric data"], icon: "shield",
    plain: "racial or ethnic data, sexual orientation, pregnancy, disability, beliefs, union membership, genetic or biometric data",
    why: "These are the categories data-protection laws treat as special. Few apps need them.",
    setting: "Share only what the app needs and check whether the label lists this data as linked to you." },
  { slug: "browsing-history", name: "Browsing History", includes: ["Websites and content viewed outside the app"], icon: "globe",
    plain: "websites and other content you viewed that is not part of the app",
    why: "Browsing history is a detailed record of interests. It is expected from browsers and content blockers and unusual elsewhere.",
    setting: "In browsers, use private tabs and clear history; Settings › Apps › Safari has Safari's own controls." },
  { slug: "surroundings", name: "Surroundings", includes: ["Environment scanning"], icon: "scan",
    plain: "scans of the room around you, such as surfaces and objects detected by the camera",
    why: "Environment scans can capture the inside of your home.",
    setting: "Settings › Privacy & Security › Camera controls which apps can use the camera at all." },
  { slug: "body", name: "Body", includes: ["Hands", "Head"], icon: "hand",
    plain: "hand structure and movement or head movement",
    why: "Body tracking is new on the label and mostly relevant to AR and spatial apps.",
    setting: "Settings › Privacy & Security › Camera and Motion & Fitness." },
];

const BY_NAME = new Map(DATA_TYPES.map((d) => [d.name, d]));
export const dataType = (name: string): DataType =>
  BY_NAME.get(name) ?? { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, includes: [], plain: name.toLowerCase(), why: "", setting: "Read the app's privacy policy.", icon: "dots" };
/** Most sensitive first (used to order lists and pick the headline worry). */
export const SENSITIVITY = ["Health & Fitness", "Sensitive Info", "Financial Info", "Location", "Contacts", "User Content", "Browsing History", "Search History", "Contact Info", "Purchases", "Surroundings", "Body", "Identifiers", "Usage Data", "Other Data", "Diagnostics"];
export const bySensitivity = (names: string[]) => [...names].sort((a, b) => SENSITIVITY.indexOf(a) - SENSITIVITY.indexOf(b));
export const HIGH = new Set(["Health & Fitness", "Sensitive Info", "Financial Info", "Location", "Contacts", "User Content", "Browsing History"]);
