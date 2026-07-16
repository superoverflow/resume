import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getProfileData() {
  const fullPath = path.join(contentDirectory, 'profile.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, summary: content };
}

export function getSkillsData() {
  const fullPath = path.join(contentDirectory, 'skills.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data.skills;
}

export function getEducationData() {
  const fullPath = path.join(contentDirectory, 'education.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}

export function getExperienceData() {
  const fullPath = path.join(contentDirectory, 'experience.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data.jobs;
}

export function getAllCVData() {
  return {
    profile: getProfileData(),
    skills: getSkillsData(),
    education: getEducationData(),
    experience: getExperienceData()
  };
}
