// Free/paid editions of the same app from the same developer (e.g. "twinme" and "twinme+").
// The edition page stays live but names the main record as canonical and stays out of sitemaps,
// so each search has one owning page. Built from data/edition-canonicals.json.
import map from '../data/edition-canonicals.json';
export const editionCanonicals=map as Record<string,string>;
export const canonicalSlug=(slug:string)=>editionCanonicals[slug]??slug;
export const isEdition=(slug:string)=>slug in editionCanonicals;
