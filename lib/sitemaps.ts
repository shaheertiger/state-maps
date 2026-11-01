import {liveTasks} from './catalog';
import {indexablePaths} from './markdown';
import {site} from './site';
import {reviewedDate} from './content';
export const sitemapTypes=['guides','apps','hubs','compare','tools','glossary','settings','general'] as const;
export type SitemapType=typeof sitemapTypes[number];
export const escapeXml=(text:string)=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function sitemapType(path:string):SitemapType{if(path.startsWith('/blog/')||path.startsWith('/guides/'))return 'guides';if(path.startsWith('/apps/'))return 'apps';if(path.startsWith('/compare/')||path.startsWith('/best/'))return 'compare';if(path.startsWith('/tools/'))return 'tools';if(path.startsWith('/glossary/'))return 'glossary';if(path.startsWith('/privacy-settings/'))return 'settings';if(liveTasks.some(task=>path===`/${task.slug}`))return 'hubs';return 'general';}
export function sitemapXml(type:SitemapType){const paths=indexablePaths.filter(p=>sitemapType(p)===type);if(paths.length>=10000)throw Error('Split this template sitemap before publishing 10,000 URLs');return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${escapeXml(site.url+(p==='/'?'':p))}</loc><lastmod>${reviewedDate}</lastmod></url>`).join('')}</urlset>`;}
