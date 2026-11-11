import {appleApps} from './apple-apps';
import {labelCounts,type AppleApp} from './apple-profile';

/* Statistics computed across the directory, so each page carries numbers no other page has. */
type Row={app:AppleApp;collected:number;tracked:number;linked:number};
const rows=new Map<number,Row>();
const byCategory=new Map<number,Row[]>();
const byDeveloper=new Map<string,AppleApp[]>();
for(const app of appleApps){
 const c=labelCounts(app);
 if(c.status==='reported'){const row={app,collected:c.collected.length,tracked:c.tracked.length,linked:c.linked.length};rows.set(app.id,row);byCategory.set(app.categoryId,[...(byCategory.get(app.categoryId)??[]),row]);}
 byDeveloper.set(app.developer,[...(byDeveloper.get(app.developer)??[]),app]);
}
const median=(v:number[])=>{const s=[...v].sort((a,b)=>a-b),m=s.length>>1;return s.length%2?s[m]:(s[m-1]+s[m])/2;};

export type CategoryStats={category:string;reported:number;medianCollected:number;trackingShare:number;fewerThanShare:number|null;rank:'fewer'|'typical'|'more'|null};
export function categoryStats(a:AppleApp):CategoryStats|null{
 const peers=byCategory.get(a.categoryId);if(!peers||peers.length<5)return null;
 const me=rows.get(a.id);
 const med=median(peers.map(p=>p.collected));
 const trackingShare=Math.round(100*peers.filter(p=>p.tracked>0).length/peers.length);
 const fewerThanShare=me?Math.round(100*peers.filter(p=>p.collected>me.collected).length/peers.length):null;
 const rank=me?(me.collected<med?'fewer':me.collected>med?'more':'typical'):null;
 return {category:a.category,reported:peers.length,medianCollected:med,trackingShare,fewerThanShare,rank};
}
export function categorySentence(a:AppleApp){
 const s=categoryStats(a),me=rows.get(a.id);if(!s)return null;
 if(!me)return `${s.category} median: ${s.medianCollected} data types across ${s.reported} apps here; ${s.trackingShare}% track.`;
 const word=s.rank==='fewer'?'below':s.rank==='more'?'above':'at';
 return `${a.name}: ${me.collected}, ${word} the ${s.category} median (${s.medianCollected})${s.fewerThanShare!=null?`; ${s.fewerThanShare}% collect more`:''}.`;
}
/** Up to n apps in the same category whose label is closest in size: real siblings, not an alphabetical list. */
export function nearestPeers(a:AppleApp,n=3){
 const peers=byCategory.get(a.categoryId)??[];const me=rows.get(a.id);const target=me?.collected??0;
 // Ties are broken by a per-app hash, so apps with equal label sizes get different peers.
 const mix=(id:number)=>{let h=(id^a.id)>>>0;h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;return (h^(h>>>16))>>>0;};
 return peers.filter(p=>p.app.id!==a.id).sort((x,y)=>Math.abs(x.collected-target)-Math.abs(y.collected-target)||mix(x.app.id)-mix(y.app.id)).slice(0,n);
}
const pairHash=(x:number,y:number)=>{let h=(x^Math.imul(y,0x9e3779b1))>>>0;h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;return (h^(h>>>16))>>>0;};
/** A per-page rotation of the developer's other apps, so sibling pages don't repeat one list. */
export function sameDeveloper(a:AppleApp,n=2){return (byDeveloper.get(a.developer)??[]).filter(b=>b.id!==a.id).sort((x,y)=>pairHash(a.id,x.id)-pairHash(a.id,y.id)).slice(0,n);}
export function peerRow(app:AppleApp){const r=rows.get(app.id);return r?{collected:r.collected,tracked:r.tracked,linked:r.linked}:null;}
