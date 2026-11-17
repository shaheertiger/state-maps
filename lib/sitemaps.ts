import {articles} from './content';
import {appleApps} from './apple-apps';
import {indexablePaths} from './route-index';
import {site} from './site';
import {reviewedDate} from './content';
export const sitemapTypes=['guides','apps','tools','glossary','general'] as const;
export type SitemapType=typeof sitemapTypes[number];
export const escapeXml=(text:string)=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function sitemapType(path:string):SitemapType{if(path.startsWith('/blog/')||path.startsWith('/guides/'))return 'guides';if(path.startsWith('/apps/')||path.startsWith('/app-privacy/'))return 'apps';if(path.startsWith('/tools/'))return 'tools';if(path.startsWith('/glossary/'))return 'glossary';return 'general';}
// lastmod reflects each page's real last change, so Google can keep trusting it.
const articleUpdated=new Map(articles.map(a=>[`/blog/${a.slug}`,a.updated]));
const appChecked=new Map(appleApps.map(a=>[`/app-privacy/${a.slug}`,(a.privacyCheckedAt||a.retrievedAt).slice(0,10)]));
const lastModified=(p:string)=>articleUpdated.get(p)??appChecked.get(p)??reviewedDate;
export function sitemapXml(type:SitemapType){const paths=indexablePaths.filter(p=>sitemapType(p)===type);if(paths.length>=10000)throw Error('Split this template sitemap before publishing 10,000 URLs');return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${escapeXml(site.url+(p==='/'?'':p))}</loc><lastmod>${lastModified(p)}</lastmod></url>`).join('')}</urlset>`;}
