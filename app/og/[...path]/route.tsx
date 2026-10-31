import {ImageResponse} from 'next/og';
import {htmlPaths} from '@/lib/markdown';
import {getCatalogPage} from '@/lib/catalog';
import {articles} from '@/lib/content';
import {site} from '@/lib/site';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams(){return htmlPaths.map(p=>({path:p==='/'?['index']:p.slice(1).split('/')}));}
export async function GET(_request:Request,{params}:{params:Promise<{path:string[]}>}){const slug='/'+(await params).path.join('/');const title=getCatalogPage(slug)?.title||articles.find(a=>slug===`/blog/${a.slug}`)?.title||(slug==='/index'?'Your iPhone privacy database':slug.slice(1).replaceAll('/',' · ').replaceAll('-',' '));return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',padding:80,background:'#edf1ff',color:'#17243f',fontFamily:'sans-serif'}}><div style={{fontSize:30,marginBottom:40,color:'#3451c4'}}>{site.name.toUpperCase()}</div><div style={{display:'flex',fontSize:title.length>65?54:68,fontWeight:700,lineHeight:1.15,maxWidth:1120}}>{title}</div><div style={{fontSize:27,marginTop:48}}>Apps · Privacy tasks · Tools · Plain answers</div></div>,{width:1280,height:720});}
