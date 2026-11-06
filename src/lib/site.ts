export const SITE = {
  name: "StateMaps",
  domain: "statemaps.net",
  url: "https://statemaps.net",
  tagline: "iPhone app privacy, decoded",
  /** Corrections go to the public issue tracker; no private inbox is implied. */
  issues: "https://github.com/shaheertiger/state-maps/issues/new",
  /** Date the App Store snapshot was last checked. Change only when you re-collect data/apple-apps.json. */
  verifiedISO: "2026-11-01",
  verifiedLabel: "November 2026",
  verifiedShort: "Nov 2026",
  ogImage: "/og.png",
  /** One contextual partner link per page (kept from the previous site). */
  partner: { name: "VaultForYou", url: "https://www.vaultforyou.app/" },
};

export const abs = (path: string) => new URL(path, SITE.url).toString();

export const reportHref = (pagePath: string) =>
  `${SITE.issues}?title=${encodeURIComponent("Correction: " + pagePath)}&body=${encodeURIComponent(
    `Page: ${abs(pagePath)}\nWhat looks wrong:\nWhat it should say (and your source):\n`,
  )}`;
