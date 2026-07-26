import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const source = readFileSync('components/lab/SkillAssetCard.tsx', 'utf8');

describe('skill asset card styles', () => {
  it('keeps the featured card border neutral until hover or focus', () => {
    assert.match(source, /border-gray-200/);
    assert.match(source, /dark:border-gray-800/);
    assert.match(source, /hover:border-sky-300/);
    assert.match(source, /focus-within:border-sky-300/);
    assert.doesNotMatch(source, /'border-sky-300/);
  });
});
