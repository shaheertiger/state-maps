import Link from 'next/link';
import {methodologySections} from '@/lib/catalog-methodology';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('How the App Catalog Is Sourced','How statemaps.net collects distinct App Store records, preserves source evidence and separates developer-reported privacy labels from testing.','/data-methodology');
export default function Page(){return <main id="content" className="wrap article" data-page-template="methodology"><h1>How the sourced app catalog is built</h1>{methodologySections().map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}<h2>Source documentation</h2><ul><li><a href="https://performance-partners.apple.com/search-api">Apple’s documented public catalog API</a></li><li><a href="https://developer.apple.com/app-store/app-privacy-details/">Apple’s developer privacy disclosure guidance</a></li></ul><Link href="/app-privacy">Browse the sourced app directory →</Link></main>;}
