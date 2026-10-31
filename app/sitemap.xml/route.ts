import {sitemapTypes} from '@/lib/sitemaps';
import {site} from '@/lib/site';
export const dynamic='force-static';
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapTypes.map(t=>`<sitemap><loc>${site.url}/sitemaps/${t}.xml</loc></sitemap>`).join('')}</sitemapindex>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
