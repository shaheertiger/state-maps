export type PrivacyCard={type:string;categories:string[]};
export function sourceDate(value:string|undefined){if(!value||Number.isNaN(Date.parse(value)))return 'Not captured';return new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));}
export function monthYear(value:string|undefined){if(!value||Number.isNaN(Date.parse(value)))return 'date not captured';return new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'long'}).format(new Date(value));}
export type AppleApp={privacyStatus?:string;privacyCards?:PrivacyCard[];privacyCheckedAt?:string;privacySourceUrl?:string;privacyResponseSha256?:string;id:number;slug:string;name:string;developer:string;bundleId:string;category:string;categoryId:number;genres:string[];minimumIos:string;version:string;updatedAt:string;releasedAt?:string;fileSizeBytes?:string;ageRating?:string;languages:string[];developerUrl:string|null;sourceUrl:string;lookupUrl:string;retrievedAt:string;importQuery:string;responseSha256:string};

/* ---------- Counts computed from the developer-reported label ---------- */
export type LabelCounts={status:'reported'|'not-provided'|'unknown';tracked:string[];linked:string[];notLinked:string[];collected:string[];noneCollected:boolean};
const card=(a:AppleApp,type:string)=>a.privacyCards?.find(c=>c.type===type)?.categories??[];
export function labelCounts(a:AppleApp):LabelCounts{
 const status=a.privacyStatus==='reported'?'reported':a.privacyStatus==='not-provided'?'not-provided':'unknown';
 const tracked=card(a,'Data Used to Track You'),linked=card(a,'Data Linked to You'),notLinked=card(a,'Data Not Linked to You');
 const collected=[...new Set([...tracked,...linked,...notLinked])];
 const noneCollected=status==='reported'&&collected.length===0&&!!a.privacyCards?.some(c=>c.type==='Data Not Collected');
 return {status,tracked,linked,notLinked,collected,noneCollected};
}
const plural=(n:number,word:string)=>`${n} ${word}${n===1?'':'s'}`;
const list=(items:string[])=>items.length<=1?items.join(''):items.slice(0,-1).join(', ')+' and '+items[items.length-1];
/** One short, numeric verdict used in the title, meta and quick answer. */
export function labelVerdict(a:AppleApp){
 const c=labelCounts(a);
 if(c.status==='not-provided')return 'No Privacy Details Provided';
 if(c.status==='unknown')return 'Privacy Label Not Captured';
 if(c.noneCollected)return 'Label Says No Data Collected';
 if(c.tracked.length)return `${plural(c.tracked.length,'Data Type')} Used to Track You`;
 if(c.linked.length)return `${plural(c.linked.length,'Data Type')} Linked to You`;
 return `${plural(c.collected.length,'Data Type')}, None Linked to You`;
}
/** The one-sentence answer with the numbers first, quotable on its own. */
export function answerSentence(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt);
 if(c.status==='not-provided')return `${a.name}: “No Details Provided” on its App Store label (${when}), so ${a.developer} has disclosed nothing.`;
 if(c.status==='unknown')return `${a.name}: no App Store label was captured, so its data collection is unknown here.`;
 if(c.noneCollected)return `${a.name} collects no data, ${a.developer} declares.`;
 return `${a.name} collects ${plural(c.collected.length,'data type')}: ${c.tracked.length} for tracking, ${c.linked.length} linked to you.`;
}

export function profileTitle(a:AppleApp){
 const verdict=labelVerdict(a),max=65;
 const full=`Is ${a.name} Safe? ${verdict}`;if(Array.from(full).length<=max)return full;
 const room=max-verdict.length-2;const name=Array.from(a.name);
 return (name.length>room?name.slice(0,Math.max(room-1,8)).join('').trimEnd()+'…':a.name)+': '+verdict;
}
export function profileDescription(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt),name=Array.from(a.name).slice(0,40).join('');
 const body=c.status==='reported'&&!c.noneCollected?`${name} privacy label (${when}): ${plural(c.tracked.length,'data type')} used to track you, ${c.linked.length} linked to you, ${c.notLinked.length} not linked.`:`${name} privacy label (${when}): ${labelVerdict(a).toLowerCase()}.`;
 const tail=` By ${a.developer}, iOS ${a.minimumIos}+.`;
 return Array.from(body+tail).length<=160?body+tail:Array.from(body).slice(0,160).join('');
}
export function privacySummary(a:AppleApp){if(a.privacyStatus==='not-provided')return 'The captured App Store privacy card says No Details Provided. This does not mean the app collects no data; the disclosure does not establish its collection behavior.';if(a.privacyStatus!=='reported')return 'A complete privacy card was not extracted from this source. Missing information must not be interpreted as no data collection.';return `The developer-reported App Store label contains ${a.privacyCards!.map(c=>c.type).join('; ')}. This is a captured disclosure, not independent testing or a guarantee of runtime behavior.`;}
export function privacyFacts(a:AppleApp):[string,string][]{return a.privacyStatus==='not-provided'?[['No Details Provided','The developer has not supplied details in the captured card; collection behavior remains unknown']]:a.privacyStatus==='reported'?a.privacyCards!.map(c=>[c.type,c.categories.length?c.categories.join(', '):'—']):[['Privacy disclosure capture','Unavailable or not extracted; collection behavior remains unknown']];}
export function profileFacts(a:AppleApp):[string,string][]{return [['ID',String(a.id)],['Developer / seller',a.developer],['Bundle',a.bundleId],['Category',a.category],['Version',a.version],['Requires iOS',a.minimumIos],['Updated',sourceDate(a.updatedAt)],...(a.releasedAt?[['Released',sourceDate(a.releasedAt)] as [string,string]]:[]),...(a.fileSizeBytes?[['Size',`${(Number(a.fileSizeBytes)/1048576).toFixed(1)} MB`] as [string,string]]:[]),...(a.ageRating?[['Age rating',a.ageRating] as [string,string]]:[]),['Languages',a.languages.join(', ')||'Not supplied']];}

/* ---------- FAQ: six short, data-filled answers (under 50 words each) ---------- */
export function profileFaq(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt);
 const size=a.fileSizeBytes?`${(Number(a.fileSizeBytes)/1048576).toFixed(1)} MB`:null;
 return [
  {q:`Is ${a.name} safe?`,a:`${labelVerdict(a)}: a claim by ${a.developer}, not an audit.`},
  {q:`How many languages does ${a.name} support?`,a:a.languages.length?`${a.languages.length}: ${a.languages.slice(0,6).join(', ')}${a.languages.length>6?'…':''}.`:'None listed.'},
  {q:`When was ${a.name} last updated?`,a:`${sourceDate(a.updatedAt)}, to ${a.version}.`},
  {q:`What iOS does ${a.name} need?`,a:`iOS ${a.minimumIos}+.`},
  {q:`How big is ${a.name}?`,a:size?`${size}.`:'No size listed.'},
  {q:`When did ${a.name} launch?`,a:a.releasedAt?`${sourceDate(a.releasedAt)}; ${a.ageRating?`rated ${a.ageRating}`:'no age rating listed'}.`:`No launch date listed; ${a.ageRating?`rated ${a.ageRating}`:'no age rating listed'}.`},
 ];
}

/* ---------- Question sections built only from this app's own values ---------- */
export function profileSections(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt);
 const out:{id:string;heading:string;body:string}[]=[];
 if(c.status==='reported'&&!c.noneCollected){
  out.push({id:'tracking',heading:`Does ${a.name} track you?`,body:c.tracked.length?`Yes: ${list(c.tracked)}. Refuse the request under Settings › Privacy › Tracking.`:`No tracking data is listed for ${a.name}.`});
  out.push({id:'linked',heading:`What data does ${a.name} link to your identity?`,body:c.linked.length?`${c.linked.length} of ${a.name}’s ${c.collected.length} data types${c.notLinked.length?` (${c.notLinked.length} also kept unlinked)`:''}.`:`None of the ${c.collected.length}.`});
 }
 return out;
}

export function profileMarkdown(a:AppleApp){return [`# ${a.name}: iPhone app privacy label`,`## Quick answer`,answerSentence(a),`Developer: ${a.developer}. App Store ID: ${a.id}. Minimum iOS in the captured listing: ${a.minimumIos}. These are listing facts, not a security assessment.`,'## Developer-reported privacy label',privacySummary(a),`| Disclosure group | Captured categories |\n|---|---|\n${privacyFacts(a).map(([k,v])=>`| ${k} | ${v.replaceAll('|','/')} |`).join('\n')}`,`Privacy source checked: ${sourceDate(a.privacyCheckedAt)} (America/New_York)`,...profileSections(a).map(s=>`## ${s.heading}\n\n${s.body}`),`## Listing facts\n\n| Field | Captured value |\n|---|---|\n${profileFacts(a).map(([k,v])=>`| ${k} | ${v.replaceAll('|','/')} |`).join('\n')}`,`## Before you install or change settings\n\n1. Match seller ${a.developer} and App Store ID ${a.id}.\n2. Compare your iOS version with the listed minimum ${a.minimumIos}.\n3. Read the disclosure groups and check installed permissions.\n4. Review recovery, exports and existing shared copies before deleting files.`,'## Frequently asked questions',...profileFaq(a).map(f=>`### ${f.q}\n\n${f.a}`),`## Sources\n\n- [Apple App Store listing](${a.sourceUrl})\n- [Apple ID-based lookup](${a.lookupUrl})${a.developerUrl?`\n- [Publisher website reported by the listing](${a.developerUrl})`:''}\n- [How this data is collected and checked](/data-methodology)`,`## General privacy controls\n\n- [Hide or lock an eligible app](/hide-apps)\n- [Notification privacy](/hide-notifications)\n- [Screen Time restrictions](/block-apps)\n- [Photo access and copies](/privacy-settings)\n- [Browse the sourced app directory](/app-privacy)`].join('\n\n');}
