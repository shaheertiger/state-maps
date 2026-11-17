// Content that used to live on separate task hubs and settings cards, now part of the one guide
// that answers each task. Old URLs 301 to the guide (data/legacy-redirects.json).
import {apps,taskForGuide} from './catalog';
import {privacySettings} from './settings';

export const guideTask=(slug:string)=>taskForGuide(slug);
export const guideSettings=(slug:string)=>privacySettings.filter(s=>s.guide===slug);
/** The "Find your app" table from the old hub: only for app-level tasks (hide, lock, find, unhide). */
export function guideApps(slug:string){
 const t=taskForGuide(slug);
 if(!t||!['hide-apps','lock-apps','find-hidden-apps','unhide-apps'].includes(t.slug))return [];
 return apps.filter(a=>!t.appSlugs||t.appSlugs.includes(a.slug));
}
