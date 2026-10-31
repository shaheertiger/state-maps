import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canIndexCombination} from '../lib/publishing.ts';
test('shared methods cannot become indexable without app-specific evidence',()=>{assert.equal(canIndexCombination(undefined),false);assert.equal(canIndexCombination({uniqueAnswer:'The same iOS steps.',appSpecificSteps:[],sourceUrls:[],reviewedAt:'2026-10-31',reviewedBy:'Editor'}),false);});
test('publishing gate requires sources, concrete steps and editorial attribution',()=>{const e={uniqueAnswer:Array(45).fill('word').join(' '),appSpecificSteps:['Open the app privacy settings panel.','Choose the documented content lock control.','Verify reopening the protected content.'],sourceUrls:['https://support.apple.com/'],reviewedAt:'2026-10-31',reviewedBy:'Editor'};assert.equal(canIndexCombination(e),true);assert.equal(canIndexCombination({...e,sourceUrls:['javascript:alert(1)']}),false);assert.equal(canIndexCombination({...e,reviewedBy:''}),false);});
