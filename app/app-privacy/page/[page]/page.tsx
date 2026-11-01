import {notFound} from 'next/navigation';
import AppleDirectory from '@/components/apple-directory';
import {appDirectoryPageCount} from '@/lib/apple-apps';
import {pageMetadata} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return Array.from({length:appDirectoryPageCount-1},(_,i)=>({page:String(i+2)}));}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page}=await params;return {...pageMetadata(`App Directory — Page ${page}`,'Browse the next sourced iPhone app records and their developer, compatibility and release information.',`/app-privacy/page/${page}`),robots:{index:false,follow:true}};}
export default async function Page({params}:{params:Promise<{page:string}>}){const value=(await params).page,page=Number(value);if(!Number.isInteger(page)||page<2||page>appDirectoryPageCount||String(page)!==value)notFound();return <main id="content" className="wrap article wide" data-page-template="app-directory"><h1>iPhone app directory: page {page}</h1><AppleDirectory page={page}/></main>;}
