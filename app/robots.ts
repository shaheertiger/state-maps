import type {MetadataRoute} from "next";
import {site} from "@/lib/site";
// AI answer engines are welcome by name; backlink-audit crawlers are not.
const answerEngines=["OAI-SearchBot","ChatGPT-User","Claude-SearchBot","Claude-User","PerplexityBot","Perplexity-User","Applebot","Google-Extended","Bingbot","DuckAssistBot"];
const auditCrawlers=["AhrefsBot","DataForSeoBot","SERankingBacklinksBot","SemrushBot","MJ12bot","BLEXBot"];
export default function robots():MetadataRoute.Robots{return {rules:[
 {userAgent:"*",allow:"/",disallow:["/md/","/*?*utm_","/*?*gclid=","/*?*fbclid="]},
 {userAgent:answerEngines,allow:"/",disallow:"/md/"},
 {userAgent:auditCrawlers,disallow:"/"},
],sitemap:site.url+"/sitemap.xml",host:site.url}}
