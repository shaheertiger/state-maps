import type { App } from "../data/types";

const PHRASE: Record<keyof App["features"], string> = {
  encryption: "real on-device encryption",
  endToEnd: "end-to-end encrypted backup",
  biometric: "Face ID or fingerprint unlock",
  decoy: "a decoy PIN",
  intruderAlert: "intruder alerts",
  disguise: "a hidden or disguised icon",
  cloudBackup: "cloud backup",
  noAccount: "no-account setup",
  adFree: "an ad-free free version",
};

const has = (a: App, k: keyof App["features"]) => a.features[k] === "yes";
const lacks = (a: App, k: keyof App["features"]) => a.features[k] === "no";

/** What `alt` offers that `base` doesn't, and what you'd give up. */
export function diff(base: App, alt: App) {
  const keys = Object.keys(PHRASE) as (keyof App["features"])[];
  const gains = keys.filter((k) => has(alt, k) && !has(base, k)).map((k) => PHRASE[k]);
  const losses = keys.filter((k) => has(base, k) && lacks(alt, k)).map((k) => PHRASE[k]);
  const extraPlatforms = alt.platforms.filter((p) => !base.platforms.includes(p));
  if (extraPlatforms.length) gains.push(`support for ${extraPlatforms.join(", ")}`);
  if (alt.openSource && !base.openSource) gains.push("open-source code");
  if (alt.builtIn && !base.builtIn) gains.push("nothing extra to install");
  return { gains, losses };
}

export const listJoin = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : xs.length === 2 ? `${xs[0]} and ${xs[1]}` : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

export function diffSentence(base: App, alt: App) {
  const { gains, losses } = diff(base, alt);
  const parts: string[] = [];
  if (gains.length) parts.push(`Compared with ${base.name}, ${alt.name} adds ${listJoin(gains.slice(0, 4))}.`);
  if (losses.length) parts.push(`You give up ${listJoin(losses.slice(0, 3))}.`);
  if (!parts.length) parts.push(`${alt.name} covers similar ground to ${base.name}; the difference is mostly in approach and price.`);
  return parts.join(" ");
}
