export const SITE = {
  name: "StateMaps",
  url: "https://statemaps.net",
  tagline: "Independent reviews of privacy, vault and app lock apps",
  description:
    "Plain-English reviews and rankings of photo vaults, app lockers, app hiders and encryption apps for iPhone and Android.",
  locale: "en_US",
  year: 2026,
  email: "hello@statemaps.net",
  // Byline used on every article. Swap in a real named author (with a real bio and photo)
  // as soon as you have one: named, credentialed authors are a big part of why the
  // top-ranking review sites rank.
  author: {
    name: "StateMaps Editorial Team",
    url: "/about/",
    role: "Privacy app researchers",
    bio: "We research privacy, vault and app lock apps for iPhone and Android: what each one actually protects, where your files end up, and what happens when something goes wrong. Every claim is checked against the developer's own documentation, store listings and privacy policy, and pages are updated when apps change.",
  },
};

export const abs = (path: string) => new URL(path, SITE.url).href;
