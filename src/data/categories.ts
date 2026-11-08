import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "photo-vault",
    name: "Photo & Video Vaults",
    short: "Photo vaults",
    description:
      "Apps and built-in features that hide private photos and videos behind a PIN, Face ID or encryption.",
    pillar: "best-photo-vault-apps",
  },
  {
    slug: "app-lock",
    name: "App Lockers",
    short: "App lock",
    description:
      "Ways to put a PIN, pattern, fingerprint or Face ID lock on individual apps like WhatsApp, Photos or banking apps.",
    pillar: "best-app-lock-apps",
  },
  {
    slug: "hide-apps",
    name: "Hide Apps",
    short: "Hide apps",
    description:
      "Tools that remove apps from your home screen and app drawer, disguise app icons, or tuck them into a hidden space.",
    pillar: "best-apps-to-hide-apps",
  },
  {
    slug: "file-encryption",
    name: "File & Cloud Encryption",
    short: "Encryption",
    description:
      "Apps that encrypt files and folders on your devices and before they reach the cloud, so only you hold the key.",
    pillar: "best-file-encryption-apps",
  },
  {
    slug: "private-notes",
    name: "Private Notes & Password Vaults",
    short: "Private notes",
    description:
      "End-to-end encrypted notes apps and password managers for journals, IDs, recovery codes and anything else you'd rather nobody read.",
    pillar: "best-private-notes-apps",
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
