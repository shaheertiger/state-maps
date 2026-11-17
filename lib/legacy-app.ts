// URLs from the short-lived Nov 6-11 site build used name-only slugs:
// /is-{name}-safe, /does-{name}-track-you and /how-to-lock-{name}-on-iphone.
// data/astro-app-ids.json maps each of those names to its App Store ID, so every old URL
// can point at the app record that replaced it. Data is passed in so this file has no imports
// and runs under the plain Node test runner.
export const legacyAppPattern = /^\/(?:is-([a-z0-9-]+)-safe|does-([a-z0-9-]+)-track-you|how-to-lock-([a-z0-9-]+)-on-iphone)$/;

export function createLegacyAppResolver(oldSlugIds: Record<string, number>, slugs: string[], editionCanonicals: Record<string, string>) {
  const slugById = new Map(slugs.map(slug => [Number(slug.slice(slug.lastIndexOf('-') + 1)), slug]));
  return (oldSlug: string) => {
    const id = Object.hasOwn(oldSlugIds, oldSlug) ? oldSlugIds[oldSlug] : undefined;
    const slug = id === undefined ? undefined : slugById.get(id);
    if (!slug) return undefined;
    return `/app-privacy/${Object.hasOwn(editionCanonicals, slug) ? editionCanonicals[slug] : slug}`;
  };
}
