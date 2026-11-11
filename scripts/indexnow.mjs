// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver and others share submissions).
// Usage:
//   node scripts/indexnow.mjs                 # every URL in the live sitemap index
//   node scripts/indexnow.mjs /path /other    # only these paths
// SITE_URL defaults to https://www.statemaps.net. The key file must already be live at /<key>.txt.
import fs from 'node:fs';
const site=(process.env.SITE_URL||'https://www.statemaps.net').replace(/\/$/,'');
const keyFile=fs.readdirSync(new URL('../public/',import.meta.url)).find(f=>/^[a-f0-9]{32}\.txt$/.test(f));
if(!keyFile)throw Error('No IndexNow key file in public/');
const key=keyFile.slice(0,-4);
const keyLive=await fetch(`${site}/${keyFile}`);
if(!keyLive.ok||(await keyLive.text()).trim()!==key)throw Error(`Key file is not live at ${site}/${keyFile}; deploy first.`);
const locs=xml=>[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
async function sitemapUrls(){
 const root=await (await fetch(`${site}/sitemap.xml`)).text();
 if(!root.includes('<sitemapindex'))return locs(root);
 return (await Promise.all(locs(root).map(async u=>locs(await (await fetch(u)).text())))).flat();
}
const args=process.argv.slice(2);
const urls=[...new Set(args.length?args.map(p=>new URL(p,site).href):await sitemapUrls())];
console.log(`Submitting ${urls.length} URLs for ${new URL(site).host}`);
for(let i=0;i<urls.length;i+=10000){
 const res=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:new URL(site).host,key,keyLocation:`${site}/${keyFile}`,urlList:urls.slice(i,i+10000)})});
 console.log(`Batch ${i/10000+1}: HTTP ${res.status} ${await res.text()}`);
 if(![200,202].includes(res.status))process.exit(1);
}
