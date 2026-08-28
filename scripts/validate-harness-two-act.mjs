import { spawnSync } from 'node:child_process';
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
const productionDemoUrl = process.argv[2];
const htmlPath = path.join(publicDirectory, 'index.html');
let html = '';

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function validateBuiltHarnessDemo(builtHtml, source) {
  const studentPath = '/vibestar/harness-two-act/index.html';
  const iframeTags = builtHtml.match(/<iframe\b[^>]*>/gi) ?? [];
  const studentIframe = iframeTags.find((tag) => getAttribute(tag, 'src') === studentPath);

  if (!studentIframe) {
    failures.push(`Built Harness demo is missing the student iframe (${source})`);
  } else {
    const iframeStyle = getAttribute(studentIframe, 'style') ?? '';
    const hasResponsiveWidth = getAttribute(studentIframe, 'width') === '100%'
      || /(?:^|;)\s*width\s*:\s*100%\s*(?:;|$)/i.test(iframeStyle);
    const heightAttribute = Number.parseFloat(getAttribute(studentIframe, 'height') ?? '');
    const heightDeclaration = iframeStyle.match(/(?:^|;)\s*(?:min-)?height\s*:\s*(\d+(?:\.\d+)?)px\s*(?:;|$)/i);
    const declaredHeight = heightDeclaration ? Number.parseFloat(heightDeclaration[1]) : Number.NaN;
    const hasUsableHeight = heightAttribute >= 1200 || declaredHeight >= 1200;

    if (!hasResponsiveWidth || !hasUsableHeight) {
      failures.push(`Built student iframe is not sized for desktop and mobile (${source})`);
    }

    const recapIndex = builtHtml.indexOf('id="复盘"');
    const recapHeadingEnd = builtHtml.indexOf('</h2>', recapIndex);
    const recapParagraphStart = builtHtml.indexOf('<p>', recapHeadingEnd);
    const recapParagraphEnd = builtHtml.indexOf('</p>', recapParagraphStart);
    const exerciseHeadingId = builtHtml.indexOf('id="学员实操-两幕式-harness"', recapParagraphEnd);
    const exerciseHeadingStart = builtHtml.lastIndexOf('<h2', exerciseHeadingId);
    const exerciseHeadingEnd = builtHtml.indexOf('</h2>', exerciseHeadingId);
    const nextSectionHeading = builtHtml.indexOf('<h2', recapHeadingEnd);
    const iframeIndex = builtHtml.indexOf(studentIframe);
    const betweenRecapAndExercise = builtHtml.slice(recapParagraphEnd + '</p>'.length, exerciseHeadingStart).trim();
    const betweenExerciseAndIframe = builtHtml.slice(exerciseHeadingEnd + '</h2>'.length, iframeIndex).trim();
    const hasRequiredSequence = recapIndex !== -1
      && recapHeadingEnd > recapIndex
      && recapParagraphStart > recapHeadingEnd
      && recapParagraphEnd > recapParagraphStart
      && exerciseHeadingStart > recapParagraphEnd
      && exerciseHeadingEnd > exerciseHeadingId
      && nextSectionHeading === exerciseHeadingStart
      && iframeIndex > exerciseHeadingEnd
      && betweenRecapAndExercise === ''
      && betweenExerciseAndIframe === '';

    if (!hasRequiredSequence) {
      failures.push(`Built student iframe must directly follow the recap paragraph and exercise heading (${source})`);
    }
  }

  const anchorElements = builtHtml.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
  const fallback = anchorElements.find((element) => {
    const openingTag = element.match(/^<a\b[^>]*>/i)?.[0] ?? '';
    const text = element.replace(/^<a\b[^>]*>/i, '').replace(/<\/a>$/i, '').trim();
    return getAttribute(openingTag, 'href') === studentPath && text === '单独打开';
  });

  if (!fallback) {
    failures.push(`Built Harness demo is missing the "单独打开" fallback (${source})`);
  } else {
    const openingTag = fallback.match(/^<a\b[^>]*>/i)?.[0] ?? '';
    const relTokens = (getAttribute(openingTag, 'rel') ?? '').toLowerCase().split(/\s+/);
    if (getAttribute(openingTag, 'target') !== '_blank' || !relTokens.includes('noopener')) {
      failures.push(`Built Harness fallback must open a noopener tab (${source})`);
    }
    if (studentIframe && builtHtml.indexOf(fallback) < builtHtml.indexOf(studentIframe)) {
      failures.push(`Built Harness fallback must follow the embedded exercise (${source})`);
    }
  }

  const hasOldSpaLink = anchorElements.some((element) => {
    const openingTag = element.match(/^<a\b[^>]*>/i)?.[0] ?? '';
    return getAttribute(openingTag, 'href') === '/vibestar/harness-two-act/';
  });
  if (hasOldSpaLink) {
    failures.push(`Built Harness demo still contains the SPA-intercepted student link (${source})`);
  }
}

async function readBuiltHarnessDemo() {
  if (productionDemoUrl) {
    try {
      const response = await fetch(productionDemoUrl);
      if (!response.ok) {
        failures.push(`Unable to load built Harness demo: ${response.status} ${response.statusText}`);
        return '';
      }
      return await response.text();
    } catch (error) {
      failures.push(`Unable to load built Harness demo: ${error.message}`);
      return '';
    }
  }

  const vitepressCli = path.join(repositoryRoot, 'node_modules', 'vitepress', 'bin', 'vitepress.js');
  const result = spawnSync(process.execPath, [vitepressCli, 'build', 'docs'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    failures.push(`VitePress test build failed:\n${result.stderr || result.stdout}`);
    return '';
  }

  const builtHtmlPath = path.join(repositoryRoot, 'docs', '.vitepress', 'dist', 'demos', 'harness.html');
  try {
    return readFileSync(builtHtmlPath, 'utf8');
  } catch (error) {
    failures.push(`Missing built Harness demo HTML: ${builtHtmlPath}`);
    return '';
  }
}

const builtHarnessDemo = await readBuiltHarnessDemo();
if (builtHarnessDemo) {
  validateBuiltHarnessDemo(builtHarnessDemo, productionDemoUrl ?? 'local VitePress build');
}

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
