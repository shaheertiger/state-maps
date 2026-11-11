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
 const base=`Across ${s.reported} ${s.category} apps with a captured label in this directory, the median app collects ${s.medianCollected} data types and ${s.trackingShare}% report data used to track you.`;
 if(!me)return base;
 const position=s.rank==='fewer'?`${a.name} discloses fewer (${me.collected}); ${s.fewerThanShare}% of these apps disclose more.`:s.rank==='more'?`${a.name} discloses more (${me.collected}) than the median.`:`${a.name} sits at the median with ${me.collected}.`;
 return `${base} ${position}`;
}
/** Up to n apps in the same category whose label is closest in size: real siblings, not an alphabetical list. */
export function nearestPeers(a:AppleApp,n=3){
 const peers=byCategory.get(a.categoryId)??[];const me=rows.get(a.id);const target=me?.collected??0;
 return peers.filter(p=>p.app.id!==a.id).sort((x,y)=>Math.abs(x.collected-target)-Math.abs(y.collected-target)||x.app.name.localeCompare(y.app.name)).slice(0,n);
}
export function sameDeveloper(a:AppleApp,n=6){return (byDeveloper.get(a.developer)??[]).filter(b=>b.id!==a.id).slice(0,n);}
export function peerRow(app:AppleApp){const r=rows.get(app.id);return r?{collected:r.collected,tracked:r.tracked,linked:r.linked}:null;}
