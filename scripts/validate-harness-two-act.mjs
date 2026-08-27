import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const publicDirectory = path.join(repositoryRoot, 'docs', 'public', 'harness-two-act');
const approvedDirectory = path.resolve(
  repositoryRoot,
  '..',
  '..',
  'ai_handbook',
  '3HourCourse',
  'PPT_Game',
  'course_case',
  'harness_two_act',
  'student_workspace',
);

const failures = [];
const htmlPath = path.join(publicDirectory, 'index.html');
let html = '';

try {
  html = readFileSync(htmlPath, 'utf8');
} catch (error) {
  failures.push(`Missing public student HTML: ${htmlPath}`);
}

if (html) {
  const forbiddenTokens = [
    '?mode=teacher',
    '教师模式',
    '教师预期',
    '教师版 diff',
    'teacher-only',
    'teacher-answer',
    'AGENTS.md v1.0 与 AGENTS.md v1.1',
  ];

  for (const token of forbiddenTokens) {
    if (html.includes(token)) {
      failures.push(`Forbidden teacher token found: ${token}`);
    }
  }

  const promptBlocks = html.match(/<pre\b[^>]*>/gi) ?? [];
  if (promptBlocks.length !== 2) {
    failures.push(`Expected exactly two prompt <pre> blocks, found ${promptBlocks.length}`);
  }

  for (const promptId of ['prompt-1', 'prompt-2']) {
    if (!new RegExp(`<pre\\b[^>]*\\bid=["']${promptId}["']`, 'i').test(html)) {
      failures.push(`Missing prompt block: ${promptId}`);
    }
    if (!new RegExp(`copyPrompt\\(['"]${promptId}['"]`, 'i').test(html)) {
      failures.push(`Missing copy button for ${promptId}`);
    }
  }

  for (const filename of ['week1.csv', 'week2.csv']) {
    if (!new RegExp(`<a\\b[^>]*\\bhref=["']${filename}["']`, 'i').test(html)) {
      failures.push(`Missing visible CSV link for ${filename}`);
    }
    if (!new RegExp(`<a\\b[^>]*\\bhref=["']${filename}["'][^>]*\\bdownload`, 'i').test(html)) {
      failures.push(`Missing CSV download link for ${filename}`);
    }
  }

  const gateChecks = [
    ['Act 2 starts locked', /<section\b[^>]*\bid=["']act-2["'][^>]*\blocked\b/i],
    ['manual completion button', /<button\b[^>]*\bid=["']complete-act-1["'][^>]*\bonclick=["']completeActOne\(\)["']/i],
    ['manual unlock handler', /function\s+completeActOne\s*\(\)\s*\{[\s\S]*?classList\.remove\(["']locked["']\)/i],
  ];

  for (const [description, pattern] of gateChecks) {
    if (!pattern.test(html)) {
      failures.push(`Manual Act 2 gate missing: ${description}`);
    }
  }
}

for (const filename of ['week1.csv', 'week2.csv']) {
  const publicPath = path.join(publicDirectory, filename);
  const approvedPath = path.join(approvedDirectory, filename);
  try {
    if (!readFileSync(publicPath).equals(readFileSync(approvedPath))) {
      failures.push(`CSV drift detected: ${filename}`);
    }
  } catch (error) {
    failures.push(`Missing or unreadable CSV: ${filename}`);
  }
}

if (failures.length > 0) {
  console.error('Harness two-act validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Harness two-act validation passed.');
