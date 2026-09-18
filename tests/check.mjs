// Testes da apresentação. Uso: node tests/check.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'index.html');
const PAGE = pathToFileURL(FILE).href;

const dumps = new Map();
function dump(suffix) {
  if (!dumps.has(suffix)) {
    const html = execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--window-size=1920,1080', '--virtual-time-budget=10000',
      '--dump-dom', PAGE + suffix,
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    dumps.set(suffix, html);
  }
  return dumps.get(suffix);
}

function bodyAttr(html, name) {
  const body = html.match(/<body[^>]*>/);
  if (!body) return null;
  const m = body[0].match(new RegExp(`\\sdata-${name}="([^"]*)"`));
  return m ? m[1] : null;
}

function source() {
  return readFileSync(FILE, 'utf8');
}

// Devolve o HTML-fonte do slide n (1 a 10).
function slide(n) {
  return source().split('<section class="slide').slice(1)[n - 1] ?? '';
}

function count(html, needle) {
  return html.split(needle).length - 1;
}

const tests = [];
function test(name, fn) { tests.push([name, fn]); }

// --- navegação ---
test('tem 10 slides', () => {
  assert.equal(count(source(), '<section class="slide'), 10);
});

test('abre no slide indicado no hash', () => {
  assert.equal(bodyAttr(dump('#5'), 'current'), '5');
});

test('hash fora do intervalo cai no slide 1', () => {
  assert.equal(bodyAttr(dump('#99'), 'current'), '1');
});

test('hash inválido cai no slide 1', () => {
  assert.equal(bodyAttr(dump('#abc'), 'current'), '1');
});

test('nenhum slide tem texto fora da área útil', () => {
  const html = dump('?check');
  assert.equal(bodyAttr(html, 'checked'), 'true', 'o modo ?check não terminou');
  assert.equal(bodyAttr(html, 'overflow'), '', 'slides com transbordo');
});

test('não mostra números de instalação ou download', () => {
  const text = source();
  assert.doesNotMatch(text, /\b\d+([.,]\d+)?\s?(K|M|mil)\b/);
  assert.doesNotMatch(text, /instalações|downloads/i);
});

// --- conteúdo dos slides ---

// --- runner ---
let failed = 0;
for (const [name, fn] of tests) {
  try {
    fn();
    console.log(`ok   ${name}`);
  } catch (err) {
    failed++;
    console.log(`FAIL ${name}\n     ${err.message.split('\n')[0]}`);
  }
}
console.log(failed ? `\n${failed} teste(s) falharam` : '\ntodos os testes passaram');
process.exit(failed ? 1 : 0);
