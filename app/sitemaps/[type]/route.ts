import {sitemapTypes,sitemapXml,type SitemapType} from '@/lib/sitemaps';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams(){return sitemapTypes.map(t=>({type:t+'.xml'}));}
export async function GET(_request:Request,{params}:{params:Promise<{type:string}>}){const type=(await params).type.replace(/\.xml$/,'') as SitemapType;if(!sitemapTypes.includes(type))return new Response('Not found',{status:404});return new Response(sitemapXml(type),{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
