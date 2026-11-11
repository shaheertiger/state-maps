import snapshot from '../data/apple-apps.json';
import type {AppleApp} from './apple-profile';
export const appleApps=snapshot as AppleApp[];
const bySlug=new Map(appleApps.map(a=>[a.slug,a]));
export const getAppleApp=(slug:string)=>bySlug.get(slug);
export const appDirectoryPageSize=100;
export const appDirectoryPageCount=Math.ceil(appleApps.length/appDirectoryPageSize);
export function directoryEntries(page:number){return appleApps.slice((page-1)*appDirectoryPageSize,page*appDirectoryPageSize);}
