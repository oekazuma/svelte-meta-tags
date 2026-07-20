#!/usr/bin/env node
// Validates that every skills/<name>/SKILL.md has the frontmatter npx skills
// (https://github.com/vercel-labs/skills) requires: a `name` field matching
// its directory name, and a non-empty `description`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const skillsDir = 'skills';

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^(\w+):\s*(.*)$/);
    if (fieldMatch) fields[fieldMatch[1]] = fieldMatch[2].trim();
  }
  return fields;
}

if (!existsSync(skillsDir)) {
  console.error(`${skillsDir}/ directory not found`);
  process.exit(1);
}

const entries = readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory());

if (entries.length === 0) {
  console.error(`No skill directories found under ${skillsDir}/`);
  process.exit(1);
}

let hasError = false;

for (const name of entries) {
  const skillPath = join(skillsDir, name, 'SKILL.md');
  let fileHasError = false;
  let content;
  try {
    content = readFileSync(skillPath, 'utf-8');
  } catch {
    console.error(`✗ ${skillPath}: file not found`);
    hasError = true;
    continue;
  }

  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    console.error(`✗ ${skillPath}: missing frontmatter (expected --- name/description --- block)`);
    hasError = true;
    continue;
  }

  if (!frontmatter.name) {
    console.error(`✗ ${skillPath}: frontmatter missing "name"`);
    fileHasError = true;
  } else if (frontmatter.name !== name) {
    console.error(`✗ ${skillPath}: frontmatter name "${frontmatter.name}" does not match directory name "${name}"`);
    fileHasError = true;
  }

  if (!frontmatter.description) {
    console.error(`✗ ${skillPath}: frontmatter missing "description"`);
    fileHasError = true;
  }

  if (fileHasError) {
    hasError = true;
  } else {
    console.log(`✓ ${skillPath}`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`All skills in ${skillsDir}/ have valid frontmatter.`);
