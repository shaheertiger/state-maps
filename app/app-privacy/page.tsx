import AppleDirectory from '@/components/apple-directory';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('Sourced iPhone App Directory','Browse distinct iPhone app records with developer identity, compatibility, release information and direct Apple catalog sources.','/app-privacy');
export default function Page(){return <main id="content" className="wrap article wide" data-page-template="app-directory"><header className="page-hero reveal"><span className="eyebrow">🗂️ App directory</span><h1>Sourced iPhone app directory</h1></header><AppleDirectory/></main>;}
