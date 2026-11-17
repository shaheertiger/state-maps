import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const redirects=JSON.parse(fs.readFileSync(new URL('../data/legacy-redirects.json',import.meta.url),'utf8'));
const removed=[/^\/(hide-apps|lock-apps|find-hidden-apps|unhide-apps|hide-photos|hide-messages|hide-notifications|lock-notes|block-apps)(\/|$)/,/^\/privacy-settings/,/^\/privacy-checklist/,/^\/best\//,/^\/compare(\/|$)/];
test('every redirect lands in one hop on a page that still exists',()=>{
 const sources=new Set(redirects.map(r=>r.source));
 for(const r of redirects){
  assert.ok(r.permanent,r.source);
  assert.ok(!sources.has(r.destination),`${r.source} chains through ${r.destination}`);
  assert.ok(!removed.some(re=>re.test(r.destination)),`${r.source} points at merged page ${r.destination}`);
 }
});
test('each merged duplicate and its Markdown twin has exactly one redirect',()=>{
 for(const path of ['/unhide-apps.md','/privacy-settings.md','/privacy-checklist.md','/compare/photo-storage-options.md']){const r=redirects.filter(x=>x.source===path);assert.equal(r.length,1,path);assert.ok(r[0].destination.endsWith('.md'),path);}
 for(const path of ['/unhide-apps','/hide-apps','/lock-notes','/privacy-settings/show-hidden-album','/privacy-checklist','/best/vault-apps','/compare/photo-storage-options'])
  assert.equal(redirects.filter(r=>r.source===path).length,1,path);
});
