import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const publicDirectory = path.join(repositoryRoot, 'docs', 'public');
const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

async function findBrowser() {
  for (const candidate of chromeCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next installed Chromium browser.
    }
  }
  throw new Error('Chrome or Edge is required for the responsive Harness test.');
}

const runnerHtml = `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><title>Harness responsive test</title></head>
<body>
  <div id="result">__RESPONSIVE_PENDING__</div>
  <script>
    async function inspectAtWidth(width) {
      const frame = document.createElement('iframe');
      frame.style.cssText = 'display:block;width:' + width + 'px;height:900px;border:0';
      frame.src = '/harness-two-act/index.html?responsive-test=' + width;
      document.body.append(frame);
      await new Promise((resolve, reject) => {
        frame.addEventListener('load', resolve, { once: true });
        frame.addEventListener('error', reject, { once: true });
      });

      const doc = frame.contentDocument;
      const root = doc.documentElement;
      const tableCells = [...doc.querySelectorAll('#act-1 table td')];
      const callout = doc.querySelector('#act-1 .callout');
      const cards = [...doc.querySelectorAll('#act-1 .definition-grid .mini-card')];
      const rightEdge = root.clientWidth + 1;
      const tableContentFits = tableCells.every((cell) => {
        const rect = cell.getBoundingClientRect();
        return rect.left >= -1 && rect.right <= rightEdge;
      });
      const cardRows = new Set(cards.map((card) => Math.round(card.getBoundingClientRect().top)));

      return {
        width,
        documentClientWidth: root.clientWidth,
        documentScrollWidth: root.scrollWidth,
        noPageOverflow: root.scrollWidth <= root.clientWidth + 1,
        tableContentFits,
        ruleTextFits: callout.scrollWidth <= callout.clientWidth + 1,
        definitionCardsStack: cardRows.size === cards.length,
      };
    }

    Promise.all([inspectAtWidth(688), inspectAtWidth(390)])
      .then((results) => {
        const passed = results.every((result) =>
          result.noPageOverflow
          && result.tableContentFits
          && result.ruleTextFits
          && result.definitionCardsStack
        );
        document.getElementById('result').textContent =
          (passed ? '__RESPONSIVE_PASS__' : '__RESPONSIVE_FAIL__') + JSON.stringify(results);
      })
      .catch((error) => {
        document.getElementById('result').textContent = '__RESPONSIVE_ERROR__' + error.message;
      });
  </script>
</body>
</html>`;

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.csv', 'text/csv; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
]);

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1');
    if (requestUrl.pathname === '/__responsive_test__') {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.end(runnerHtml);
      return;
    }

    const relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
    const resolvedPath = path.resolve(publicDirectory, relativePath);
    if (!resolvedPath.startsWith(`${publicDirectory}${path.sep}`)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const content = await readFile(resolvedPath);
    response.writeHead(200, {
      'content-type': mimeTypes.get(path.extname(resolvedPath)) ?? 'application/octet-stream',
    });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

const browserPath = await findBrowser();
const profileDirectory = await mkdtemp(path.join(tmpdir(), 'harness-responsive-'));

try {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const testUrl = `http://127.0.0.1:${address.port}/__responsive_test__`;

  const output = await new Promise((resolve, reject) => {
    const child = spawn(browserPath, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--virtual-time-budget=4000',
      `--user-data-dir=${profileDirectory}`,
      '--dump-dom',
      testUrl,
    ], { windowsHide: true });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });

  const markerMatch = output.stdout.match(/__RESPONSIVE_(?:PASS|FAIL|ERROR)__[^<]*/);
  const marker = markerMatch?.[0] ?? '__RESPONSIVE_ERROR__No result marker returned by browser';
  if (output.code !== 0 || !marker.startsWith('__RESPONSIVE_PASS__')) {
    console.error('Harness responsive validation failed:');
    console.error(marker);
    if (output.code !== 0 && output.stderr) console.error(output.stderr);
    process.exitCode = 1;
  } else {
    console.log(marker);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(profileDirectory, { recursive: true, force: true });
}
