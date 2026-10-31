import { createDualmarkRouteHandler } from "@dualmark/nextjs";
import { articles, categories } from "@/lib/content";
import { articleMarkdown, guideListing, settingMarkdown, staticMarkdown } from "@/lib/markdown";
import { privacySettings } from "@/lib/settings";
import { site } from "@/lib/site";
const handler = createDualmarkRouteHandler({ siteUrl: site.url,
  collections: { blog: {
    converter: entry => articleMarkdown(articles.find(a => a.slug === entry.id)!),
    getEntries: () => articles.map(a => ({ id: a.slug, data: { title: a.title, description: a.description }, body: articleMarkdown(a) })),
    emitListing: false,
  } },
  staticPages: [ ...Object.entries(staticMarkdown).map(([pattern, render]) => ({ pattern, render })),
    ...categories.map(c => ({ pattern: `/guides/${c.slug}`, render: () => guideListing(c.slug) })),
    ...privacySettings.map(s => ({ pattern: `/privacy-settings/${s.slug}`, render: () => settingMarkdown(s) })),
  ],
});
export const dynamic = "force-static";
export const generateStaticParams = handler.generateStaticParams;
export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const response = await handler.GET(request, context);
  response.headers.set("Vary", "Accept, User-Agent");
  const { path } = await context.params;
  const htmlPath = path.join("/") === "index" ? "" : "/" + path.join("/");
  response.headers.set("Link", `<${site.url}${htmlPath}>; rel="canonical"`);
  return response;
}
