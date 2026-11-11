import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const get = (path, headers = {}) => fetch(new URL(path, base), { headers, redirect: 'manual', signal: AbortSignal.timeout(20000) });
const sitemapResponse = await get('/sitemap.xml'); assert.equal(sitemapResponse.status, 200);
const rootXml = await sitemapResponse.text();
const childSitemaps=[...rootXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const xml=rootXml.includes('<sitemapindex')?(await Promise.all(childSitemaps.map(async path=>{const r=await get(path);assert.equal(r.status,200,path);return r.text();}))).join('\n'):rootXml;
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert.equal(paths.length,4583,'All indexable destinations appear in the sitemap index'); assert.equal(new Set(paths).size, paths.length);assert.equal(paths.filter(p=>p.startsWith('/app-privacy/')).length,4500,'All 4500 app records appear in sitemaps');assert.ok(!paths.some(p=>p.startsWith('/app-privacy/page/')),'Noindex pagination stays out of sitemaps');
const evidence = [];
const internalLinks = new Set();
const appRecords=new Map(JSON.parse(await fs.readFile(new URL('../data/apple-apps.json',import.meta.url),'utf8')).map(a=>[a.slug,a]));
async function checkPath(path) {
  const r = await get(path, { Accept: 'text/html' }); assert.equal(r.status, 200, `HTML ${path}`);
  const body = await r.text(); assert.match(body, /<h1[ >]/, `${path} H1`);
  assert.match(body.match(/<title>([^<]*)<\/title>/)?.[1]||'',/statemaps\.net/,`${path} uses the confirmed site identity`);
  assert.ok(!(body.match(/class="logo"[^>]*>([^<]*)/)?.[1]||'').includes('VaultForYou'),`${path} header uses the confirmed brand`);
  if (process.env.CHECK_EDGE_HEADERS === '1') {
    assert.match(r.headers.get('vary') || '', /(?:^|,\s*)Accept(?:,|$)/i, `${path} HTML cache varies by Accept`);
    assert.match(r.headers.get('vary') || '', /User-Agent/i, `${path} HTML cache varies by User-Agent`);
  }
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/); assert.ok(canonical, `${path} canonical`);
  assert.equal(new URL(canonical[1]).pathname, path, `${path} canonical path`);
  if(process.env.EXPECTED_CANONICAL_ORIGIN)assert.equal(new URL(canonical[1]).origin,process.env.EXPECTED_CANONICAL_ORIGIN,`${path} production canonical origin`);
  assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,1,`${path} has exactly one requested product backlink`);
  assert.match(body, /og:title/); assert.match(body, /twitter:card/);assert.ok(body.includes(`${new URL(canonical[1]).origin}/social-image`),`${path} shares the site social image`);
  const schemas=[];
  for (const match of body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {const data=JSON.parse(match[1]);schemas.push(...(Array.isArray(data)?data:[data]));}
  if(path.startsWith('/blog/')){
    assert.match(body,/class="quick-answer"/,'Guide quick answer is server rendered');
    const faq=schemas.find(s=>s['@type']==='FAQPage');assert.ok(faq.mainEntity.length>=6,'Guide FAQ has at least six questions');
    const normalize=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replace(/\s+/g,' ').trim();
    const visibleSource=normalize(body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]*>/g,' '));
    for(const q of faq.mainEntity){assert.ok(visibleSource.includes(normalize(q.name)),'FAQ question matches HTML');assert.ok(visibleSource.includes(normalize(q.acceptedAnswer.text)),'FAQ answer matches HTML');}
  }
  if(path.startsWith('/app-privacy/')&&!path.startsWith('/app-privacy/page/')){
    for(const anchor of ['privacy-label','listing-facts','review-checklist','questions','sources','related-records'])assert.ok(body.includes(`id="${anchor}"`),`${path} structured section ${anchor}`);
    const app=appRecords.get(path.split('/').pop());assert.ok(app,'App identity exists in source snapshot');const schema=schemas.find(s=>s['@type']==='SoftwareApplication');assert.equal(schema.identifier,String(app.id));assert.equal(schema.name,app.name);assert.equal(schema.author.name,app.developer);assert.equal(schema.softwareVersion,app.version);assert.equal(schema.sameAs,app.sourceUrl);
  }
  if(path==='/lock-notes'){
    const list=schemas.find(s=>s['@type']==='ItemList');assert.equal(list.numberOfItems,1,'Notes hub lists only its applicable app');assert.equal(new URL(list.itemListElement[0].url).pathname,'/apps/notes');
  }
  for (const match of body.matchAll(/href="(\/[^"#?]*)/g)) if (!match[1].startsWith('/_next/')) internalLinks.add(match[1]);
  const mdPath = path === '/' ? '/index.md' : path + '.md';
  assert.ok((r.headers.get('link') || '').includes(mdPath), `${path} advertised alternate`);
  const md = await get(mdPath); assert.equal(md.status, 200, `Markdown ${mdPath}`);
  assert.match(md.headers.get('content-type') || '', /^text\/markdown/);
  assert.match(md.headers.get('x-robots-tag') || '', /noindex/);
  assert.ok(Number(md.headers.get('x-markdown-tokens')) > 0);
  const markdown = await md.text();assert.equal((markdown.match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,1,`${path} Markdown has one product backlink`); assert.match(markdown, /^# /); assert.ok(markdown.length > 100);
  for (const headers of [{ Accept: 'text/markdown' }, { 'User-Agent': 'GPTBot' }]) {
    const negotiated = await get(path, headers); assert.equal(negotiated.status, 200, `Negotiated ${path}`);
    assert.match(negotiated.headers.get('content-type') || '', /^text\/markdown/);
    assert.equal(await negotiated.text(), markdown, `${path} negotiated parity`);
  }
  evidence.push({ path, htmlStatus: r.status, markdownStatus: md.status, canonical: canonical[1], markdownTokens: md.headers.get('x-markdown-tokens') });
}
let cursor=0;await Promise.all(Array.from({length:8},async()=>{while(cursor<paths.length){const path=paths[cursor++];await checkPath(path);if(cursor%500===0)console.log(`Checked ${cursor}/${paths.length} sitemap pages`);}}));
const linkPaths=[...internalLinks].filter(path=>!paths.includes(path));let linkCursor=0;await Promise.all(Array.from({length:8},async()=>{while(linkCursor<linkPaths.length){const path=linkPaths[linkCursor++];const r=await get(path);assert.ok(r.status>=200&&r.status<400,`Broken internal link ${path}: ${r.status}`);if(r.status===200&&(r.headers.get('content-type')||'').includes('text/html')){const body=await r.text();assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,1,`${path} nonindexed page backlink`);const md=await get(path+'.md');assert.equal(md.status,200);assert.equal(((await md.text()).match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,1,`${path} nonindexed Markdown backlink`);}}}));
for (const path of ['/blog/not-a-guide', '/guides/not-a-category', '/privacy-settings/not-a-setting', '/not-a-page.md', '/md/blog/not-a-guide','/lock-notes/whatsapp','/hide-notifications/instagram','/app-privacy/not-a-real-app','/app-privacy/page/9999']) {
  const r = await get(path); assert.equal(r.status, 404, `Unknown route ${path}`);
}
for (const path of ['/robots.txt', '/llms.txt', '/social-image', '/icon.svg', '/apple-icon','/app-directory-index.json']) { const r = await get(path); assert.equal(r.status, 200, path); }
const catalogIndex=await (await get('/app-directory-index.json')).json();assert.equal(catalogIndex.length,4500);assert.equal(new Set(catalogIndex.map(a=>a.slug)).size,4500);
for(const page of Array.from({length:44},(_,i)=>i+2)){const path=`/app-privacy/page/${page}`,r=await get(path,{Accept:'text/html'}),body=await r.text();assert.equal(r.status,200);assert.match(body,/name="robots" content="noindex, follow"/);const md=await get(path+'.md');assert.equal(md.status,200);assert.equal((body.match(/href="https:\/\/www\.vaultforyou\.app\/"/g)||[]).length,1);assert.equal(((await md.text()).match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,1);}
for (const path of ['/hide-apps/whatsapp','/lock-apps/instagram']){const r=await get(path,{Accept:'text/html'});assert.equal(r.status,200);const body=await r.text();assert.match(body,/name="robots" content="noindex, follow"/);assert.ok(!paths.includes(path),'Shared-method combinations must stay out of sitemaps');assert.match(body,/rel="canonical" href="[^"]+\/apps\//);}
const sharedImage=await get('/social-image');assert.equal(sharedImage.status,200);assert.match(sharedImage.headers.get('content-type')||'',/^image\//);
const llms = await (await get('/llms.txt')).text(); for (const path of paths) assert.ok(llms.includes(path === '/' ? '/index.md' : path + '.md'));
const output = process.env.ROUTE_EVIDENCE_PATH;
if (output) await fs.writeFile(output, JSON.stringify({ base, pageCount: paths.length, internalLinkCount: internalLinks.size, routes: evidence }, null, 2));
console.log(`PASS: ${paths.length} HTML pages, Markdown twins and both negotiation modes; ${internalLinks.size} internal targets; 404s and discovery/image routes.`);
