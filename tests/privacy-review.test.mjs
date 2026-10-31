import test from 'node:test';
import assert from 'node:assert/strict';
import { buildReview, normalizeAnswers } from '../lib/privacy-review.ts';
test('unknown storage keeps sync review visible and moving adds recovery', () => {
  const ids = buildReview({ goal: 'moving', cloud: 'unknown', access: 'family' }).map(a => a.id);
  assert.ok(ids.includes('inventory')); assert.ok(ids.includes('sync')); assert.ok(ids.includes('family')); assert.ok(ids.includes('recovery'));
  assert.equal(new Set(ids).size, ids.length);
});
test('local browsing does not request cloud or migration actions', () => {
  assert.deepEqual(buildReview({ goal: 'browsing', cloud: 'local', access: 'device' }).map(a => a.id), ['inventory', 'hidden', 'metadata']);
});
test('untrusted shared link values are normalized to supported choices', () => {
  assert.deepEqual(normalizeAnswers({ goal: '<script>', cloud: 'local', access: 'links' }), { goal: 'browsing', cloud: 'local', access: 'links' });
  assert.ok(buildReview({ goal: 'sharing', access: 'links' }).some(a => a.id === 'links'));
});
