// Middleware rewrites old /is-{name}-safe style paths here (see lib/legacy-app.ts).
// Each gets one permanent redirect to its app record, or a plain 404 if no record replaced it.
import oldSlugIds from '@/data/astro-app-ids.json';
import slugs from '@/data/apple-app-slugs.json';
import {editionCanonicals} from '@/lib/editions';
import {createLegacyAppResolver} from '@/lib/legacy-app';
import {site} from '@/lib/site';

const resolve = createLegacyAppResolver(oldSlugIds, slugs, editionCanonicals);

export async function GET(_request: Request, {params}: {params: Promise<{slug: string}>}) {
  const target = resolve((await params).slug);
  if (!target) return new Response('Not found', {status: 404, headers: {'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex'}});
  return new Response(null, {status: 308, headers: {Location: new URL(target, site.url).toString(), 'Cache-Control': 'public, max-age=86400'}});
}
