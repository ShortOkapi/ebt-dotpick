#!/usr/bin/env node
'use strict';
const fs = require('node:fs'), path = require('node:path'), cp = require('node:child_process');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const git = args => cp.execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const assert = (condition, message) => { if (!condition) throw new Error(message); };
function versions(html, worker) {
  return {
    page: html.match(/<span\b[^>]*\bid=["']app-version["'][^>]*>\s*v([^<]+)<\/span>/i)?.[1].trim(),
    worker: worker.match(/const APP_VERSION\s*=\s*['"]([^'"]+)['"]/)?.[1],
    cache: worker.match(/const CACHE_NAME\s*=\s*([^;]+);/)?.[1].replace(/\s/g, '')
  };
}
try {
  const html = read('index.html'), worker = read('sw.js'), current = versions(html, worker);
  assert(current.page && current.page === current.worker, 'The page and offline worker must have the same version.');
  assert(current.cache, 'The offline cache name is missing.');
  const urls = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
  for (const url of urls) {
    const tag = html.match(/<(?:script|link)\b[^>]*(?:src|href)=["'][^"']+["'][^>]*>/gi)?.find(tag => tag.includes(url));
    const integrity = tag?.match(/integrity=["']([^"']+)["']/)?.[1];
    assert(integrity && worker.includes(`url: '${url}', integrity: '${integrity}'`), 'The page and worker must pin the same Leaflet URLs and checksums.');
  }
  if (current.page.includes('-rc')) assert(html.includes(`/blob/release-${current.page.split('-')[0]}/README.md`), 'Candidate guide links must use the current release branch.');
  let base = process.argv[2] || process.env.RELEASE_BASE || 'HEAD^';
  if (/^0+$/.test(base)) base = 'HEAD^';
  assert(/^(?:[0-9a-f]{7,40}|HEAD(?:\^\d*)?)$/i.test(base), 'Use a commit SHA or HEAD^ as the release-check baseline.');
  let previous = null;
  try { previous = { html: git(['show', `${base}:index.html`]), worker: git(['show', `${base}:sw.js`]) }; }
  catch (error) { throw new Error('The release-check baseline could not be read; fetch its history first.'); }
  if (html !== previous.html || worker !== previous.worker) {
    const old = versions(previous.html, previous.worker);
    assert(worker !== previous.worker, 'index.html changed without updating sw.js.');
    assert(current.worker !== old.worker || current.cache !== old.cache, 'Changed app code needs a new app version or a new offline-cache identity.');
  }
  console.log(`Release checks passed: page/worker v${current.page}, pinned Leaflet and a distinct cache for changed app code.`);
} catch (error) { console.error('Release check failed: ' + error.message); process.exitCode = 1; }
