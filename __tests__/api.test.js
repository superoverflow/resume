import { getProfileData, getSkillsData, getAllCVData } from '../lib/api';

// Mock fs to avoid reading real files during unit tests
jest.mock('fs', () => ({
  readFileSync: jest.fn((path) => {
    if (path.includes('profile.md')) {
      return `---
name: "TEST NAME"
title: "Test Title"
---
Test summary`;
    }
    if (path.includes('skills.md')) {
      return `---
skills:
  - Skill 1
  - Skill 2
---`;
    }
    if (path.includes('education.md')) {
      return `---
institution: "Test Uni"
---`;
    }
    if (path.includes('experience.md')) {
      return `---
jobs: []
---`;
    }
    return '';
  })
}));

describe('API Utils', () => {
  it('parses profile markdown correctly', () => {
    const profile = getProfileData();
    expect(profile.name).toBe('TEST NAME');
    expect(profile.title).toBe('Test Title');
    expect(profile.summary.trim()).toBe('Test summary');
  });

  it('parses skills yaml correctly', () => {
    const skills = getSkillsData();
    expect(skills).toEqual(['Skill 1', 'Skill 2']);
  });

  it('aggregates all data', () => {
    const data = getAllCVData();
    expect(data.profile).toBeDefined();
    expect(data.skills).toBeDefined();
    expect(data.education).toBeDefined();
    expect(data.experience).toBeDefined();
  });
});
