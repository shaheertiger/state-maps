import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {legacyAppPattern,createLegacyAppResolver} from '../lib/legacy-app.ts';
const slugs=new Set(JSON.parse(fs.readFileSync(new URL('../data/apple-app-slugs.json',import.meta.url),'utf8')));
const read=f=>JSON.parse(fs.readFileSync(new URL('../data/'+f,import.meta.url),'utf8'));
const old=read('astro-app-ids.json'),editions=read('edition-canonicals.json');
const legacyAppTarget=createLegacyAppResolver(old,[...slugs],editions);
test('every name-only slug from the Nov 6-11 build resolves to a live app record',()=>{
 assert.equal(Object.keys(old).length,4500);
 for(const name of Object.keys(old)){const target=legacyAppTarget(name);assert.ok(target,name);const slug=target.slice('/app-privacy/'.length);assert.ok(slugs.has(slug),target);assert.ok(!(slug in editions),`${target} is an edition page`);}
});
test('old URLs that Search Console still reports land on the matching app',()=>{
 for(const [path,slug] of [['/is-melo-safe','melo-ai-family-organizer-6752846683'],['/does-privatevpn-track-you','privatevpn-1168424870'],['/how-to-lock-delta-chat-on-iphone','delta-chat-1459523234'],['/is-fin-safe','fin-budget-planner-app-1489698531']]){
  const m=legacyAppPattern.exec(path);assert.ok(m,path);assert.equal(legacyAppTarget(m[1]||m[2]||m[3]),'/app-privacy/'+slug);
 }
});
test('unknown names and prototype keys do not resolve',()=>{
 for(const name of ['not-a-real-app','constructor','__proto__','toString'])assert.equal(legacyAppTarget(name),undefined);
});
