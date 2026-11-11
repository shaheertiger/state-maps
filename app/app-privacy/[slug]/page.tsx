import Link from 'next/link';
import {notFound} from 'next/navigation';
import {appleApps,getAppleApp} from '@/lib/apple-apps';
import {profileTitle,profileDescription,profileFacts,profileFaq,profileSections,privacySummary,privacyFacts,sourceDate,monthYear,answerSentence,labelCounts} from '@/lib/apple-profile';
import {categorySentence,nearestPeers,sameDeveloper,peerRow} from '@/lib/app-stats';
import {pageMetadata,jsonLd} from '@/lib/seo';
import {site} from '@/lib/site';
import FAQ from '@/components/faq';
import {isRelatedProductUrl} from '@/lib/related-product';
import {canonicalSlug,isEdition} from '@/lib/editions';
export const dynamicParams=false;
export function generateStaticParams(){return appleApps.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const a=getAppleApp((await params).slug);return a?pageMetadata(profileTitle(a),profileDescription(a),`/app-privacy/${canonicalSlug(a.slug)}`):{title:'App record not found',robots:{index:false}};}
export default async function AppProfile({params}:{params:Promise<{slug:string}>}){
 const a=getAppleApp((await params).slug);if(!a)notFound();const url=site.url+'/app-privacy/'+a.slug;
 const peers=nearestPeers(a,3),mine=peerRow(a),siblings=sameDeveloper(a),counts=labelCounts(a),catLine=categorySentence(a),sections=profileSections(a);
 const related=[...siblings,...nearestPeers(a,3+4).slice(3).map(p=>p.app).filter(b=>!siblings.some(s=>s.id===b.id))].slice(0,4);
 const schema=[{'@context':'https://schema.org','@type':'SoftwareApplication','@id':url+'#app',name:a.name,identifier:String(a.id),operatingSystem:`iOS ${a.minimumIos} or later`,softwareVersion:a.version,dateModified:a.updatedAt,applicationCategory:a.category,author:{'@type':'Organization',name:a.developer},sameAs:a.sourceUrl}, {'@context':'https://schema.org','@type':'WebPage',url,name:profileTitle(a),description:answerSentence(a),about:{'@id':url+'#app'},publisher:{'@id':site.url+'/#organization'},dateModified:a.privacyCheckedAt||a.retrievedAt,citation:[a.sourceUrl,a.lookupUrl]},{'@context':'https://schema.org','@type':'Dataset',name:`${a.name} App Store privacy label`,description:answerSentence(a),url:url+'#privacy-label',creator:{'@id':site.url+'/#organization'},isBasedOn:a.sourceUrl,dateModified:a.privacyCheckedAt||a.retrievedAt,isAccessibleForFree:true,variableMeasured:[{'@type':'PropertyValue',name:'Data types used to track you',value:counts.tracked.length},{'@type':'PropertyValue',name:'Data types linked to you',value:counts.linked.length},{'@type':'PropertyValue',name:'Data types not linked to you',value:counts.notLinked.length},{'@type':'PropertyValue',name:'Distinct data types collected',value:counts.collected.length}]}, {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:site.url},{name:'Sourced app directory',item:site.url+'/app-privacy'},{name:a.name,item:url}].map((v,i)=>({'@type':'ListItem',position:i+1,...v}))},{'@context':'https://schema.org','@type':'FAQPage',mainEntity:profileFaq(a).map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}];
 const initial=Array.from(a.name.trim())[0]?.toUpperCase()||'A';
 return <main id="content" className="wrap article wide" data-page-template="app-record"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}}/><nav aria-label="Breadcrumb"><Link href="/">Home</Link> › <Link href="/app-privacy">App directory</Link> › <span>{a.category}</span> › <span aria-current="page">{a.name}</span></nav>
 <header className="page-hero"><div className="app-hero"><div className="app-avatar" aria-hidden="true">{initial}</div><div><p className="kicker">{a.category} · App Store ID {a.id}</p><h1>Is {a.name} safe?</h1>{isEdition(a.slug)&&<p className="byline">Another edition of <Link href={`/app-privacy/${canonicalSlug(a.slug)}`}>{getAppleApp(canonicalSlug(a.slug))!.name}</Link> by the same developer; that page is the main record.</p>}</div></div>
</header>
 <aside className="quick-answer"><h2>Quick answer</h2><p>{answerSentence(a)}</p>{catLine&&<p>{catLine}</p>}</aside>
 <div className="page-body">
 <section id="privacy-label"><h2>{a.name} privacy label</h2><div className="table-scroll"><table><tbody>{privacyFacts(a).map(([k,v])=><tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table></div><p className="source-line"><a href={a.sourceUrl}>App Store ID {a.id}</a> · {sourceDate(a.privacyCheckedAt)}</p></section>
 {sections.map(x=><section id={x.id} key={x.id}><h2>{x.heading}</h2><p>{x.body}</p></section>)}
 {catLine&&<section id="compare"><h2>Which apps are most like {a.name}?</h2>{peers.length>0&&<div className="table-scroll"><table><thead><tr><th>App</th><th>Types</th><th>Tracking</th><th>Linked</th></tr></thead><tbody>{mine&&<tr><th scope="row">{a.name} (this app)</th><td>{mine.collected}</td><td>{mine.tracked}</td><td>{mine.linked}</td></tr>}{peers.map(p=><tr key={p.app.id}><th scope="row"><Link href={`/app-privacy/${p.app.slug}`}>{p.app.name}</Link></th><td>{p.collected}</td><td>{p.tracked}</td><td>{p.linked}</td></tr>)}</tbody></table></div>}</section>}
 <section id="listing-facts"><h2>{a.name} listing facts</h2><div className="table-scroll"><table><tbody>{profileFacts(a).map(([k,v])=><tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table></div></section>
 <section id="review-checklist"><h2>Before installing {a.name}</h2><p>Confirm ID {a.id}.</p></section>
 
 <section id="questions"><h2>{a.name} questions</h2><FAQ items={profileFaq(a)}/></section>
 <section id="sources"><h2>{a.name} sources</h2><ul className="source-list"><li><a href={a.lookupUrl}>Lookup {a.id}</a></li><li><a href={a.sourceUrl}>{a.name} App Store page</a></li>{a.developerUrl&&!isRelatedProductUrl(a.developerUrl)&&<li><a href={a.developerUrl}>{a.developer} website</a></li>}<li><Link href="/data-methodology">Methodology</Link></li></ul></section>
 <h2 id="related-records">{siblings.length?`${a.developer}: more apps`:`Similar ${a.category} apps`}</h2><div className="grid">{related.map(r=>{const n=peerRow(r);return <Link className="card" href={`/app-privacy/${r.slug}`} key={r.id}><h3>{r.name}</h3><p>{r.developer} · {n?`${n.collected} collected, ${n.tracked} tracking`:'no label'}</p></Link>})}</div><Link className="button button-secondary" href="/app-privacy">All app records</Link>
 </div></main>;
}
