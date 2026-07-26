import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import skillsData from '../data/skillsData';

describe('lab skills data', () => {
  it('includes the highlighted crafting-resumes skill', () => {
    const skill = skillsData.find((item) => item.slug === 'crafting-resumes');

    assert.ok(skill);
    assert.equal(skill.title, 'Crafting Resumes');
    assert.equal(skill.featured, true);
    assert.equal(skill.badge, '重点展示');
    assert.equal(skill.href, 'https://github.com/juanlou1217/crafting-resumes');
    assert.match(skill.description, /表达系统/);
    assert.deepEqual(skill.tags, ['求职', '简历', 'Career']);
  });
});
