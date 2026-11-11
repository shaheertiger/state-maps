// Keep the routing index separate from record bodies so middleware does not bundle the full dataset.
import slugs from '../data/apple-app-slugs.json';
import {articles,categories} from './content';
import {catalogPages} from './catalog';
import {infoPages} from './pages';
import {privacySettings} from './settings';
export const baseHtmlPaths=['/data-methodology','/','/guides','/blog','/privacy-settings','/privacy-checklist',...Object.keys(infoPages),...categories.map(c=>`/guides/${c.slug}`),...articles.map(a=>`/blog/${a.slug}`),...privacySettings.map(s=>`/privacy-settings/${s.slug}`),...catalogPages.map(p=>p.path)];
export const appleProfilePaths=slugs.map(slug=>`/app-privacy/${slug}`);
export const directoryPagePaths=Array.from({length:Math.ceil(slugs.length/100)},(_,i)=>i===0?'/app-privacy':`/app-privacy/page/${i+1}`);
export const htmlPaths=[...baseHtmlPaths,...appleProfilePaths,...directoryPagePaths];
export const indexablePaths=[...baseHtmlPaths.filter(path=>catalogPages.find(p=>p.path===path)?.index!==false),...appleProfilePaths,'/app-privacy'];
