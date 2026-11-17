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

/* ---------- FAQ: six short answers to the questions searchers ask (see privacyFaq below) ---------- */
export function profileFaq(a:AppleApp){return privacyFaq(a);}

/* ---------- Question sections built only from this app's own values ---------- */
export function profileSections(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt);
 const out:{id:string;heading:string;body:string}[]=[];
 if(c.status==='reported'&&!c.noneCollected){
  out.push({id:'tracking',heading:trackingHeading(a),body:c.tracked.length?`Yes: ${list(c.tracked)}. Refuse the request under Settings › Privacy & Security › Tracking.`:`No tracking data is listed for ${a.name}.`});
  out.push({id:'linked',heading:linkedHeading(a),body:c.linked.length?`${c.linked.length} of ${a.name}’s ${c.collected.length} data types${c.notLinked.length?` (${c.notLinked.length} also kept unlinked)`:''}.`:`None of the ${c.collected.length}.`});
 }
 return out;
}

export function profileMarkdown(a:AppleApp){return [`# ${a.name}: iPhone app privacy label`,`## Quick answer`,answerSentence(a),`Developer: ${a.developer}. App Store ID: ${a.id}. Minimum iOS in the captured listing: ${a.minimumIos}. These are listing facts, not a security assessment.`,`## ${a.name} privacy label: ${labelVerdict(a)}`,privacySummary(a),`| Disclosure group | Captured categories |\n|---|---|\n${privacyFacts(a).map(([k,v])=>`| ${k} | ${v.replaceAll('|','/')} |`).join('\n')}`,`Privacy source checked: ${sourceDate(a.privacyCheckedAt)} (America/New_York)`,...profileSections(a).map(s=>`## ${s.heading}\n\n${s.body}`),...(dataTypeRows(a).length?[`## What ${a.name}’s data types cover\n\n| Type | Label group | Covers |\n|---|---|---|\n${dataTypeRows(a).map(r=>`| ${r.cat} | ${r.where} | ${r.scope} |`).join('\n')}`]:[]),`## Listing facts\n\n| Field | Captured value |\n|---|---|\n${profileFacts(a).map(([k,v])=>`| ${k} | ${v.replaceAll('|','/')} |`).join('\n')}`,`## Before installing ${a.name}\n\n${installChecks(a).map((c,i)=>`${i+1}. ${c}`).join('\n')}`,...(thinkTwice(a).length?[`## Who should think twice about ${a.name}?\n\n${thinkTwice(a).map(c=>`- ${c}`).join('\n')}`]:[]),`## Bottom line\n\n${bottomLine(a)}`,'## Frequently asked questions',...profileFaq(a).map(f=>`### ${f.q}\n\n${f.a}`),`## Sources\n\n- [Apple App Store listing](${a.sourceUrl})\n- [Apple ID-based lookup](${a.lookupUrl})${a.developerUrl?`\n- [Publisher website reported by the listing](${a.developerUrl})`:''}\n- [How this data is collected and checked](/data-methodology)`,`## General privacy controls\n\n- [Hide or lock an eligible app](/hide-apps)\n- [Notification privacy](/hide-notifications)\n- [Screen Time restrictions](/block-apps)\n- [Photo access and copies](/privacy-settings)\n- [Browse the sourced app directory](/app-privacy)`].join('\n\n');}

/* ---------- Depth sections (protein-site lessons: answer-first headings, what the data means,
   a data-driven checklist, who should think twice, a bottom line). Every sentence is built from
   this app's own label values, so pages differ by what the developer actually declared. ---------- */

/** Apple's own scope for each label category, kept short. Source: Apple's App privacy details documentation. */
export const categoryScope:Record<string,string>={
 'Contact Info':'name, email, phone or postal address',
 'Health & Fitness':'health records, workouts or other fitness data',
 'Financial Info':'payment, credit or income details',
 'Location':'precise or coarse position',
 'Sensitive Info':'beliefs, ethnicity, sexual orientation, biometrics and similar',
 'Contacts':'your address book or social graph',
 'User Content':'messages, photos, video, audio or support requests',
 'Browsing History':'sites visited outside the app',
 'Search History':'searches made inside the app',
 'Identifiers':'account or device IDs, such as the advertising ID',
 'Purchases':'what you bought or considered buying',
 'Usage Data':'taps, launches, views and ads seen',
 'Diagnostics':'crash logs, speed and energy data',
 'Surroundings':'room and environment scans',
 'Body':'hand or head movement',
 'Other Data':'anything outside Apple’s named groups',
};
/** Where on iPhone a reader can limit a category, when iOS offers a switch for it. */
const categoryControl:Record<string,string>={
 'Location':'Settings › Privacy & Security › Location Services: choose While Using or Never, and switch off Precise Location',
 'Contacts':'Settings › Privacy & Security › Contacts: leave access off unless a feature needs it',
 'User Content':'Settings › Privacy & Security › Photos: pick Limited Access to share only chosen photos',
 'Health & Fitness':'Settings › Privacy & Security › Health: allow only the categories you need',
 'Diagnostics':'Settings › Privacy & Security › Analytics & Improvements › Share With App Developers controls the crash reports Apple forwards; the app’s own crash reporting follows its in-app settings',
};
const where=(c:LabelCounts,cat:string)=>c.tracked.includes(cat)?'tracking':c.linked.includes(cat)?'linked to you':'not linked';
const highRisk=['Location','Health & Fitness','Financial Info','Sensitive Info','Contacts','Browsing History','User Content'];

/** Answer-first headings: the heading itself states the label's answer. */
export function trackingHeading(a:AppleApp){const c=labelCounts(a);return c.tracked.length?`Does ${a.name} track you? Yes, with ${plural(c.tracked.length,'data type')}`:`Does ${a.name} track you? No tracking declared`;}
export function linkedHeading(a:AppleApp){const c=labelCounts(a);return `What does ${a.name} tie to your identity? ${c.linked.length} of ${c.collected.length}`;}

/** Rows for the "what each data type covers" table. */
export function dataTypeRows(a:AppleApp){const c=labelCounts(a);return c.collected.map(cat=>({cat,where:where(c,cat),scope:categoryScope[cat]??'not defined by Apple'}));}

/** A checklist built from what this app declared; nothing is listed that the label does not support. */
export function installChecks(a:AppleApp){
 const c=labelCounts(a),out:string[]=[];
 out.push(`Match the seller, ${a.developer}, and ID ${a.id}.`);
 if(c.status==='not-provided')out.push(`No label from ${a.developer}: allow ${a.name} only the permissions a feature needs.`);
 if(c.tracked.length)out.push(`When ${a.name} asks to track, tap Ask App Not to Track. It covers the ${list(c.tracked.map(t=>t.toLowerCase()))} listed for tracking; you can change it later under Settings › Privacy & Security › Tracking.`);
 for(const cat of c.collected)if(categoryControl[cat])out.push(`${a.name} lists ${cat} (${where(c,cat)}). ${categoryControl[cat]}.`);
 const months=a.updatedAt&&a.privacyCheckedAt?Math.floor((Date.parse(a.privacyCheckedAt)-Date.parse(a.updatedAt))/2629800000):0;
 if(months>=12)out.push(`Last updated ${sourceDate(a.updatedAt)} (${months} months earlier): confirm ${a.name} is still maintained.`);
 return out;
}

/** Who should hesitate, based only on sensitive categories the developer declared. Empty when nothing qualifies. */
export function thinkTwice(a:AppleApp){
 const c=labelCounts(a),out:string[]=[];
 if(c.status==='not-provided')out.push(`Anyone who wants a written disclosure from ${a.developer}.`);
 const trackedRisk=c.tracked.filter(t=>highRisk.includes(t));
 if(trackedRisk.length)out.push(`People who refuse cross-app ad profiles: ${list(trackedRisk.map(t=>t.toLowerCase()))} feed tracking here.`);
 else if(c.tracked.length)out.push(`People who block all ad tracking: ${a.name} declares ${plural(c.tracked.length,'tracking data type')}, even if none is in a sensitive group.`);
 const linkedRisk=c.linked.filter(t=>highRisk.includes(t)&&!c.tracked.includes(t));
 if(linkedRisk.length)out.push(`Anyone who does not want ${list(linkedRisk.map(t=>t.toLowerCase()))} attached to an account: ${a.developer} says it links ${linkedRisk.length===1?'it':'them'} to you.`);
 return out;
}

/** Two or three closing sentences, assembled from the numbers above. */
export function bottomLine(a:AppleApp,peerNote?:string|null){
 const c=labelCounts(a);
 if(c.status==='not-provided')return `${a.name} has no privacy details, a gap rather than a clean record. Pick a labeled ${a.category.toLowerCase()} app, or keep ${a.name}’s permissions minimal.`;
 if(c.status==='unknown')return `No label was captured for ${a.name}; check the App Store listing directly before installing.`;
 if(c.noneCollected)return `${a.developer} declares that ${a.name} collects nothing. That is the strongest answer a label can give, but it is a self-report: still review any permission ${a.name} requests.`;
 const lead=c.tracked.length?`${a.name} lists ${plural(c.tracked.length,'data type')} for tracking, so expect an ad-tracking prompt and decline it if you prefer.`:c.linked.length?`${a.name} does not track you across apps, but it ties ${plural(c.linked.length,'data type')} to your identity.`:`${a.name} keeps all ${plural(c.collected.length,'declared data type')} unlinked from you and declares no tracking.`;
 return [lead,peerNote].filter(Boolean).join(' ');
}

/** Privacy-focused FAQ: questions searchers ask about an app, answered from its own label. */
export function privacyFaq(a:AppleApp){
 const c=labelCounts(a),when=monthYear(a.privacyCheckedAt);
 const loc=c.collected.includes('Location')?`Yes: Location is ${where(c,'Location')} on the ${when} label.`:c.status==='reported'?'None declared.':`${a.developer} has not said.`;
 return [
  {q:`Is ${a.name} safe?`,a:`${labelVerdict(a)}: a claim by ${a.developer}, not an audit.`},
  {q:`Does ${a.name} track you?`,a:c.tracked.length?`Yes, using ${list(c.tracked)}. Tap Ask App Not to Track to refuse.`:c.status==='reported'?`No; ${a.developer} lists none.`:`Not stated by ${a.developer}.`},
  {q:`Does ${a.name} collect your location?`,a:loc},
  {q:`Who makes ${a.name}?`,a:`${a.developer}${a.releasedAt?`, first released ${sourceDate(a.releasedAt)}`:''}.`},
  {q:`When was ${a.name} last updated?`,a:`${sourceDate(a.updatedAt)}, to version ${a.version}.`},
  {q:`What does ${a.name} need to run?`,a:`iOS ${a.minimumIos}+${a.fileSizeBytes?`, ${(Number(a.fileSizeBytes)/1048576).toFixed(1)} MB`:''}${a.languages.length?`, ${a.languages.length} language${a.languages.length===1?'':'s'}`:''}.`},
 ];
}
