# Novo título da apresentação — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o título "Superpowers" por "Desenvolvimento verificável com agentes de IA" na capa, na aba do navegador, nos guias e no nome do PDF, e acabar com o falso transbordo da capa no `?check`.

**Architecture:** Apresentação estática: `index.html` (um `<section class="slide">` por slide; a capa é `#s1`), `styles.css` (palco fixo de 1920×1080) e `script.js` (navegação; `?check` grava em `<body data-overflow>` os slides com texto fora da área útil; `?export` mostra o estado final, sem animação). A verificação usa um script Node descartável, fora do repositório, que lê os arquivos e roda o Chrome headless.

**Tech Stack:** HTML, CSS, JavaScript puro; Google Chrome headless; Node 24 (só para a verificação).

**Spec:** `docs/superpowers/specs/2026-10-21-novo-titulo-design.md`

---

## Arquivos

| Arquivo | O que muda |
|---|---|
| `script.js:66` | `findOverflow` isenta também `[data-footer]` |
| `index.html:6` e `index.html:14-24` | `<title>` e conteúdo da capa |
| `styles.css:143` e regra nova logo abaixo | Tamanho do `.cover-title` e `.cover-sub` |
| `workshop/guia-do-participante.md:1`, `workshop/pre-requisitos.md:1`, `workshop/guia-do-apresentador.md:1,55,84,263` | Títulos, entrada do slide 1 e nome do PDF |
| `superpowers.pdf` → `desenvolvimento-verificavel.pdf` | Renomeado e regerado |
| `$SCRATCH/check-titulo.mjs` | Verificação (fora do repositório) |

Defina antes de cada comando que usa `$SCRATCH`:

```bash
export SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad
```

Trabalhe na branch `feat/introducao-agentica`. Todo commit termina com uma linha em branco e `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Use a ferramenta Edit para mudanças de texto (o `sed` do macOS é BSD).

---

### Task 1: Script de verificação (teste que falha)

**Files:**
- Create: `$SCRATCH/check-titulo.mjs`

- [ ] **Step 1: Escrever o script**

```js
// Verifica o novo título da apresentação. Uso: node check-titulo.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const ROOT = '/Users/regis/develop/stef/apresentacao';
const FILE = `${ROOT}/index.html`;
const PAGE = `file://${FILE}`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const read = (p) => readFileSync(`${ROOT}/${p}`, 'utf8');
const source = () => read('index.html');
const slide = (n) => source().split('<section class="slide').slice(1)[n - 1] ?? '';
const count = (s, needle) => s.split(needle).length - 1;

function dump(suffix) {
  return execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--window-size=1920,1080', '--virtual-time-budget=10000',
    '--dump-dom', PAGE + suffix,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}
function bodyAttr(html, name) {
  const body = html.match(/<body[^>]*>/)?.[0] ?? '';
  return body.match(new RegExp(`\\sdata-${name}="([^"]*)"`))?.[1] ?? null;
}

const tests = [];
const test = (name, fn) => tests.push([name, fn]);
const TITULO = 'Desenvolvimento verificável com agentes de IA';

test('continua com 35 slides', () => {
  assert.equal(count(source(), '<section class="slide'), 35);
});

test('nenhum slide tem texto fora da área útil', () => {
  const html = dump('?check');
  assert.equal(bodyAttr(html, 'checked'), 'true', 'o modo ?check não terminou');
  const overflow = bodyAttr(html, 'overflow');
  assert.equal(overflow, '', `slides com transbordo: ${overflow}`);
});

test('aba do navegador com o novo título', () => {
  assert.match(source(), new RegExp(`<title>${TITULO}</title>`));
});

test('capa com o novo título', () => {
  const s = slide(1);
  assert.match(s, /desenvolvimento-verificavel\/<strong>SKILL\.md<\/strong>/);
  assert.match(s, /<h1 class="title cover-title">Desenvolvimento<br><em>verificável<\/em><span class="cover-sub">com agentes de IA<\/span><\/h1>/);
  assert.match(s, /Skills, processo e evidência, na prática com o superpowers/);
  assert.match(s, /Workshop · Agentes &amp; Skills · skills\.sh\/obra/);
  assert.match(s, /Regis Araujo Melo/);
  assert.doesNotMatch(s, /Super<em>/);
});

test('guias com o novo título', () => {
  assert.match(read('workshop/guia-do-participante.md'), new RegExp(`^# ${TITULO} — guia do participante`));
  assert.match(read('workshop/guia-do-apresentador.md'), new RegExp(`^# ${TITULO} — guia do apresentador`));
  assert.match(read('workshop/pre-requisitos.md'), new RegExp(`^# ${TITULO} — pré-requisitos`));
  const guia = read('workshop/guia-do-apresentador.md');
  assert.match(guia, /^### 1 · Desenvolvimento verificável \(0:30\)$/m);
  assert.doesNotMatch(guia, /superpowers\.pdf/);
  assert.equal(count(guia, '`desenvolvimento-verificavel.pdf`'), 2);
});

test('nenhum resto do título antigo', () => {
  for (const f of ['index.html', 'workshop/guia-do-participante.md', 'workshop/guia-do-apresentador.md', 'workshop/pre-requisitos.md'])
    assert.doesNotMatch(read(f), /Workshop Superpowers|Superpowers — Skills/, f);
});

test('PDF renomeado', () => {
  assert.ok(!existsSync(`${ROOT}/superpowers.pdf`), 'superpowers.pdf ainda existe');
  assert.ok(existsSync(`${ROOT}/desenvolvimento-verificavel.pdf`), 'falta desenvolvimento-verificavel.pdf');
});

let failed = 0;
for (const [name, fn] of tests) {
  try { fn(); console.log(`ok   ${name}`); }
  catch (err) { failed++; console.log(`FAIL ${name}\n     ${err.message.split('\n')[0]}`); }
}
console.log(failed ? `\n${failed} teste(s) falharam` : '\ntodos os testes passaram');
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `node $SCRATCH/check-titulo.mjs`
Expected: `ok` só em "continua com 35 slides"; `FAIL` em todos os outros, e o de transbordo mostra `slides com transbordo: 1`.

Sem commit: o script fica fora do repositório.

---

### Task 2: Rodapé da capa deixa de contar como transbordo

**Causa:** `.cover-foot` (com `data-footer`) fica de propósito na faixa inferior, a mesma do contador, e `findOverflow` só isenta `[data-bleed]`.

**Files:**
- Modify: `script.js:66`

- [ ] **Step 1: Isentar `[data-footer]`**

Em `script.js`, trocar:
```js
        (el) => el.children.length === 0 && !el.closest('[data-bleed]')
```
por:
```js
        (el) => el.children.length === 0 && !el.closest('[data-bleed], [data-footer]')
```

- [ ] **Step 2: Rodar a verificação**

Run: `node $SCRATCH/check-titulo.mjs`
Expected: `ok` em "continua com 35 slides" e em "nenhum slide tem texto fora da área útil"; os demais continuam `FAIL`.

- [ ] **Step 3: Atualizar a expectativa do script anterior**

Em `$SCRATCH/check-intro.mjs`, no teste "transbordo não piora", trocar `assert.equal(overflow, '1', ...)` por `assert.equal(overflow, '', ...)`. Rodar `node $SCRATCH/check-intro.mjs` → `todos os testes passaram`.

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "fix: o modo ?check não acusa o rodapé da capa como transbordo"
```

---

### Task 3: Capa e aba do navegador

**Files:**
- Modify: `index.html:6`, `index.html:16`, `index.html:19-20`, `index.html:23`
- Modify: `styles.css:143`

- [ ] **Step 1: `<title>`**

Trocar `<title>Superpowers — Skills para agentes</title>` por:
```html
  <title>Desenvolvimento verificável com agentes de IA</title>
```

- [ ] **Step 2: Caminho do arquivo na capa**

Trocar:
```html
      <p class="cover-file mono">obra/superpowers/<strong>SKILL.md</strong></p>
```
por:
```html
      <p class="cover-file mono">desenvolvimento-verificavel/<strong>SKILL.md</strong></p>
```

- [ ] **Step 3: Título e descrição**

Trocar:
```html
      <h1 class="title cover-title">Super<em>—</em><br>Powers</h1>
      <p class="fm-line"><span class="fm-key mono">description:</span> Skills para trabalhar com agentes de IA de forma verificável</p>
```
por:
```html
      <h1 class="title cover-title">Desenvolvimento<br><em>verificável</em><span class="cover-sub">com agentes de IA</span></h1>
      <p class="fm-line"><span class="fm-key mono">description:</span> Skills, processo e evidência, na prática com o superpowers</p>
```

- [ ] **Step 4: Rodapé**

Trocar:
```html
      <p class="cover-foot mono" data-footer>Agentes &amp; Skills para desenvolvimento · skills.sh/obra</p>
```
por:
```html
      <p class="cover-foot mono" data-footer>Workshop · Agentes &amp; Skills · skills.sh/obra</p>
```

- [ ] **Step 5: Estilos**

Em `styles.css`, trocar:
```css
.cover-title { font-size: 250px; line-height: 0.9; }
```
por:
```css
.cover-title { font-size: 128px; line-height: 0.95; }
.cover-sub { display: block; margin-top: 20px; font-size: 0.42em; letter-spacing: -0.01em; color: var(--ink-2); }
```

128px vem de uma medição: "DESENVOLVIMENTO" ocupa cerca de 9,2em, e a área útil da capa tem 1240px.

- [ ] **Step 6: Rodar a verificação**

Run: `node $SCRATCH/check-titulo.mjs`
Expected: `ok` em "continua com 35 slides", "transbordo", "aba do navegador" e "capa"; `FAIL` em "guias", "nenhum resto" (pelos guias) e "PDF renomeado".

- [ ] **Step 7: Conferir visualmente**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=5000 --screenshot=$SCRATCH/cover-novo.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#1"
```
Abrir `$SCRATCH/cover-novo.png` com Read e conferir:
- "DESENVOLVIMENTO" numa linha só, sem encostar nas barras coloridas;
- "VERIFICÁVEL" em azul;
- "COM AGENTES DE IA" menor, em azul-claro;
- descrição, autor e rodapé legíveis;
- nada sobreposto.

Se "DESENVOLVIMENTO" quebrar, reduza o `font-size` para 120px.

- [ ] **Step 8: Commit**

```bash
git add index.html styles.css
git commit -m "content: capa com o novo título, Desenvolvimento verificável com agentes de IA"
```

---

### Task 4: Guias

**Files:**
- Modify: `workshop/guia-do-participante.md:1`
- Modify: `workshop/pre-requisitos.md:1`
- Modify: `workshop/guia-do-apresentador.md:1`, `:55`, `:84`, `:263`

- [ ] **Step 1: Títulos**

- `workshop/guia-do-participante.md`: `# Workshop Superpowers — guia do participante` → `# Desenvolvimento verificável com agentes de IA — guia do participante`
- `workshop/pre-requisitos.md`: `# Workshop Superpowers — pré-requisitos` → `# Desenvolvimento verificável com agentes de IA — pré-requisitos`
- `workshop/guia-do-apresentador.md`: `# Workshop Superpowers — guia do apresentador` → `# Desenvolvimento verificável com agentes de IA — guia do apresentador`

- [ ] **Step 2: Entrada do slide 1 no guia do apresentador**

`### 1 · Superpowers (0:30)` → `### 1 · Desenvolvimento verificável (0:30)`

- [ ] **Step 3: Nome do PDF no guia do apresentador**

- Linha 55: `` deixe o `superpowers.pdf` aberto `` → `` deixe o `desenvolvimento-verificavel.pdf` aberto ``
- Linha 263: `` Compartilhar no chat o `superpowers.pdf` e os dois guias. `` → `` Compartilhar no chat o `desenvolvimento-verificavel.pdf` e os dois guias. ``

Não mexa nas outras menções a "superpowers": elas se referem ao pacote.

- [ ] **Step 4: Rodar a verificação**

Run: `node $SCRATCH/check-titulo.mjs`
Expected: só "PDF renomeado" falha.

- [ ] **Step 5: Commit**

```bash
git add workshop/guia-do-participante.md workshop/pre-requisitos.md workshop/guia-do-apresentador.md
git commit -m "docs: guias com o novo título e o novo nome do PDF"
```

---

### Task 5 (adiada): Renomear e regerar o PDF

> **Não executar agora.** O usuário pediu para gerar o PDF só depois de todas as edições da apresentação. Até lá, o teste "PDF renomeado" fica falhando de propósito, e os guias já citam `desenvolvimento-verificavel.pdf`.

**Files:**
- Rename: `superpowers.pdf` → `desenvolvimento-verificavel.pdf`

- [ ] **Step 1: Renomear**

```bash
git mv superpowers.pdf desenvolvimento-verificavel.pdf
```

- [ ] **Step 2: Regerar**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf=/Users/regis/develop/stef/apresentacao/desenvolvimento-verificavel.pdf "file:///Users/regis/develop/stef/apresentacao/index.html?export"
```

- [ ] **Step 3: Conferir**

- Páginas: `python3 -c "import re;print(len(re.findall(rb'/Type\s*/Page[^s]', open('/Users/regis/develop/stef/apresentacao/desenvolvimento-verificavel.pdf','rb').read())))"` → `35`.
- Abrir a página 1 com Read (`pages: "1"`): nova capa, sem cortes.
- `node $SCRATCH/check-titulo.mjs` → `todos os testes passaram`.

- [ ] **Step 4: Commit**

```bash
git add desenvolvimento-verificavel.pdf
git commit -m "chore: PDF renomeado para desenvolvimento-verificavel.pdf e regerado com a nova capa"
```

---

## Verificação final

- [ ] `node $SCRATCH/check-titulo.mjs` → só "PDF renomeado" falha (Task 5 adiada); `node $SCRATCH/check-intro.mjs` → `todos os testes passaram`.
- [ ] `git status` limpo; `git log --oneline -3` mostra os commits das tasks 2 a 4.
