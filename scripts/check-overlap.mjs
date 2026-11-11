// Playbook rule: sibling pages must not share most of their words.
// Measures 5-gram overlap between the main content of sampled app pages.
// Playbook target is under 25%; fails above OVERLAP_LIMIT (default 50%).
// Usage: node scripts/check-overlap.mjs <slug> <slug> ...
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3100';
const slugs=process.argv.slice(2);
const text=async s=>{const html=await (await fetch(`${base}/app-privacy/${s}`,{headers:{Accept:'text/html'}})).text();const main=html.match(/<main[\s\S]*?<\/main>/)?.[0]||'';return main.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').split(/\s+/).filter(Boolean);};
const grams=w=>new Set(w.slice(0,-4).map((_,i)=>w.slice(i,i+5).join(' ')));
const pages=await Promise.all(slugs.map(async s=>[s,grams(await text(s))]));
const target=0.25,limit=Number(process.env.OVERLAP_LIMIT||0.5);let worst=0;
for(let i=0;i<pages.length;i++)for(let j=i+1;j<pages.length;j++){const [a,A]=pages[i],[b,B]=pages[j];let n=0;for(const g of A)if(B.has(g))n++;const o=n/Math.min(A.size,B.size);worst=Math.max(worst,o);console.log(`${(o*100).toFixed(1)}%  ${a} vs ${b}`);}
if(worst>limit){console.error(`5-gram overlap ${(worst*100).toFixed(1)}% is above the ${limit*100}% limit`);process.exit(1);}
if(worst>target)console.warn(`Worst overlap ${(worst*100).toFixed(1)}% is above the ${target*100}% playbook target; investigate the shared text above.`);
