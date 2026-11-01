import {test} from 'node:test';
import assert from 'node:assert/strict';
import {appendProductBacklink,isRelatedProductUrl} from '../lib/related-product.ts';
test('Markdown product footer retains exactly one contextual target link even when rendered again',()=>{const first=appendProductBacklink('# Guide\n\n[Earlier source](https://vaultforyou.app/)');const twice=appendProductBacklink(first);assert.equal((twice.match(/\]\(https:\/\/www\.vaultforyou\.app\/\)/g)||[]).length,1);assert.ok(twice.includes('photos and documents'));});
test('product-host detection does not suppress unrelated sources',()=>{assert.equal(isRelatedProductUrl('https://www.vaultforyou.app/'),true);assert.equal(isRelatedProductUrl('https://vaultforyou.app/features'),true);assert.equal(isRelatedProductUrl('https://apps.apple.com/us/app/id1'),false);assert.equal(isRelatedProductUrl('https://vaultforyou.app.example.com/'),false);});
