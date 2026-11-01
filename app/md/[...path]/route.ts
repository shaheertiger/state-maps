import { createDualmarkRouteHandler } from "@dualmark/nextjs";
import { articles, categories } from "@/lib/content";
import { articleMarkdown, guideListing, settingMarkdown, staticMarkdown,catalogMarkdownPages } from "@/lib/markdown";
import { privacySettings } from "@/lib/settings";
import { site } from "@/lib/site";
import {appleApps,getAppleApp,appDirectoryPageCount,directoryEntries} from '@/lib/apple-apps';
import {profileMarkdown} from '@/lib/apple-profile';
import {appendProductBacklink} from '@/lib/related-product';
import {methodologyMarkdown} from '@/lib/catalog-methodology';
const appEntries=appleApps.map(a=>({id:a.slug,data:{title:a.name,description:`${a.developer}; iOS ${a.minimumIos}+; App Store ID ${a.id}`},body:''}));
const directoryMarkdown=(page:number)=>[`# Sourced iPhone app directory — page ${page}`,`${appleApps.length} distinct iPhone app records. Listing facts are not a security audit.`,...directoryEntries(page).map(a=>`- [${a.name}](${site.url}/app-privacy/${a.slug}): ${a.developer}; ${a.category}; minimum iOS ${a.minimumIos}.`),'## How to choose a record','Match the developer and App Store ID, read the privacy disclosure and capture date, compare compatibility and version, then verify changes in the official listing.','## Directory questions','### Are these the safest apps?','This is a sourced directory, not a safety ranking. Developer disclosures do not establish an independent security assessment.','### Why are some details missing?','A developer may not supply details or a complete card may not be captured. Missing information is never interpreted as no collection.','## Directory pages',...Array.from({length:appDirectoryPageCount},(_,i)=>`- [Page ${i+1}](${site.url}${i===0?'/app-privacy':`/app-privacy/page/${i+1}`})`)].join('\n\n');
const handler = createDualmarkRouteHandler({ siteUrl: site.url,
  collections: { blog: {
    converter: entry => appendProductBacklink(articleMarkdown(articles.find(a => a.slug === entry.id)!)),
    getEntries: () => articles.map(a => ({ id: a.slug, data: { title: a.title, description: a.description }, body: articleMarkdown(a) })),
    emitListing: false,
  },'app-privacy':{converter:entry=>appendProductBacklink(profileMarkdown(getAppleApp(entry.id)!)),getEntries:()=>appEntries,emitListing:false} },
  staticPages: [ ...catalogMarkdownPages,...Object.entries(staticMarkdown).map(([pattern, render]) => ({ pattern, render })),
    {pattern:'/data-methodology',render:methodologyMarkdown},
    ...Array.from({length:appDirectoryPageCount},(_,i)=>({pattern:i===0?'/app-privacy':`/app-privacy/page/${i+1}`,render:()=>directoryMarkdown(i+1)})),
    ...categories.map(c => ({ pattern: `/guides/${c.slug}`, render: () => guideListing(c.slug) })),
    ...privacySettings.map(s => ({ pattern: `/privacy-settings/${s.slug}`, render: () => settingMarkdown(s) })),
  ].map(page=>({...page,render:async()=>appendProductBacklink(await page.render())})),
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
