# Slide 5 (anatomia de um agente) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tirar as legendas das caixas do diagrama do slide 5 (`#s-agentes`), trocar o loop por uma volta concreta e fechar o slide com a ponte para o laboratório; atualizar o guia do apresentador.

**Architecture:** Deck HTML estático. O slide 5 é a `<section id="s-agentes">` em `index.html`; o estilo do diagrama fica no bloco "Slide anatomia de um agente" de `styles.css` (classes `.an-*`, usadas só neste slide). A verificação é um script Node descartável que roda o Chrome headless.

**Tech Stack:** HTML, CSS, Node 20+ (`node:assert`), Google Chrome headless.

**Spec:** `docs/superpowers/specs/2026-10-21-slide-5-anatomia-design.md`

**Regras gerais:**
- Branch `feat/introducao-agentica`. Commits locais, sem push.
- **Não** regerar o PDF (adiado até o fim das edições).
- Commits terminam com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- `SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad`
- Preserve os caracteres Unicode (→, ←, ↻, ·, acentos) exatamente.

---

### Task 1: Script de verificação (teste vermelho)

**Files:**
- Create: `$SCRATCH/check-anatomia.mjs` (fora do repositório, não vai para commit)
- Modify: `$SCRATCH/check-intro.mjs:43` (fora do repositório)

- [ ] **Step 1: Escrever o script**

```js
// Verifica o slide 5 (anatomia de um agente). Uso: node check-anatomia.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const ROOT = '/Users/regis/develop/stef/apresentacao';
const PAGE = `file://${ROOT}/index.html`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const read = (p) => readFileSync(`${ROOT}/${p}`, 'utf8');
const source = () => read('index.html');
const css = () => read('styles.css');
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

test('continua com 35 slides', () => {
  assert.equal(count(source(), '<section class="slide'), 35);
});

test('nenhum slide tem texto fora da área útil', () => {
  const html = dump('?check');
  assert.equal(bodyAttr(html, 'checked'), 'true', 'o modo ?check não terminou');
  const overflow = bodyAttr(html, 'overflow');
  assert.equal(overflow, '', `slides com transbordo: ${overflow}`);
});

test('caixas do diagrama só com o nome', () => {
  const s = slide(5);
  assert.match(s, /id="s-agentes"/);
  for (const nome of ['Harness', 'Contexto', 'Modelo (LLM)', 'Ferramentas · MCP'])
    assert.ok(s.includes(`<p class="an-label">${nome}</p>`), `caixa sem o nome puro: ${nome}`);
  assert.doesNotMatch(s, /class="an-label">[^<]*<span>/, 'ainda há legenda dentro de .an-label');
  assert.ok(s.includes('<span>age →</span><span>← observa</span>'), 'as setas devem continuar');
  assert.equal(count(s, '<dt>'), 4, 'a lista de definições deve continuar com 4 itens');
});

test('loop concreto', () => {
  const s = slide(5);
  assert.ok(s.includes('<p class="an-loop">lê o código da lista → roda o teste → vê falhar → corrige ↻</p>'));
  assert.doesNotMatch(s, /pede sua permissão a cada ação/);
});

test('fechamento com a ponte para o laboratório', () => {
  const s = slide(5);
  assert.match(s, /No chat, <strong>o harness é você<\/strong>: você copia, cola e executa\./);
  assert.ok(s.includes('<p class="vs-punch">No laboratório, o harness é o Copilot CLI, e as <em>skills</em> dizem como ele trabalha.</p>'));
  assert.doesNotMatch(s, /Mais capacidade pede mais/);
});

test('CSS das legendas removido', () => {
  assert.doesNotMatch(css(), /\.an-label span/);
});

test('guia com a mensagem e a fala novas do slide 5', () => {
  const g = read('workshop/guia-do-apresentador.md');
  assert.match(g, /agente é modelo \+ harness; no laboratório, o Copilot CLI segue as skills\./);
  assert.match(g, /O modelo só gera texto\. Quem age é o harness: lê o código, roda o teste, vê\s+falhar e corrige, sempre pedindo a sua permissão\. No chat, o harness é você\. No\s+laboratório, é o Copilot CLI, e as skills dizem como ele trabalha\./);
  assert.match(g, /não prometa que todo harness lê o repositório ou roda testes/);
});

let failed = 0;
for (const [name, fn] of tests) {
  try { fn(); console.log(`ok   ${name}`); }
  catch (err) { failed++; console.log(`FAIL ${name}\n     ${err.message.split('\n')[0]}`); }
}
console.log(failed ? `\n${failed} teste(s) falharam` : '\ntodos os testes passaram');
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Atualizar o script antigo do slide 5**

Em `$SCRATCH/check-intro.mjs`, linha 43, trocar:

```js
  assert.match(s, /Mais capacidade pede mais <em>processo<\/em> e controle\./);
```

por:

```js
  assert.match(s, /No laboratório, o harness é o Copilot CLI, e as <em>skills<\/em> dizem como ele trabalha\./);
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `node $SCRATCH/check-anatomia.mjs`
Expected: passam "continua com 35 slides" e "nenhum slide tem texto fora da área útil"; falham os outros 5.

Sem commit (os scripts ficam fora do repositório).

---

### Task 2: Conteúdo e visual do slide 5

**Files:**
- Modify: `index.html` (section `#s-agentes`, linhas ~62-92)
- Modify: `styles.css` (bloco "Slide anatomia de um agente", linhas ~569-593)

- [ ] **Step 1: Tirar as legendas das caixas**

Em `index.html`, dentro de `#s-agentes`, trocar as quatro linhas `.an-label`:

```html
<p class="an-label">Harness <span>o programa em volta do modelo (ex.: Copilot CLI)</span></p>
<p class="an-label">Contexto <span>pedido, arquivos lidos, saídas, skills carregadas</span></p>
<p class="an-label">Modelo (LLM) <span>gera texto e decide o passo</span></p>
<p class="an-label">Ferramentas · MCP <span>ler arquivo, rodar comando; MCP conecta GitHub, Jira…</span></p>
```

por (mantendo a indentação de cada linha):

```html
<p class="an-label">Harness</p>
<p class="an-label">Contexto</p>
<p class="an-label">Modelo (LLM)</p>
<p class="an-label">Ferramentas · MCP</p>
```

- [ ] **Step 2: Loop concreto**

Trocar:

```html
<p class="an-loop">planeja → age → observa ↻ · pede sua permissão a cada ação</p>
```

por:

```html
<p class="an-loop">lê o código da lista → roda o teste → vê falhar → corrige ↻</p>
```

- [ ] **Step 3: Fechamento**

Trocar (só no slide 5; a outra `.vs-punch`, "Sem essas evidências…", não muda):

```html
<p class="vs-punch">Mais capacidade pede mais <em>processo</em> e controle.</p>
```

por:

```html
<p class="vs-punch">No laboratório, o harness é o Copilot CLI, e as <em>skills</em> dizem como ele trabalha.</p>
```

- [ ] **Step 4: CSS**

Em `styles.css`, apagar as duas regras de legenda:

```css
.an-label span { display: block; margin-top: 4px; font: 500 18px/1.35 var(--mono); color: var(--ink-2); opacity: 0.75; }
```

```css
.an-model .an-label span { color: var(--blue-light); }
```

E aumentar o nome das caixas (as classes `.an-*` só existem no slide 5), trocando:

```css
.an-label { margin: 0 0 14px; font: 800 26px/1.2 var(--font); color: var(--ink); }
```

por:

```css
.an-label { margin: 0 0 18px; font: 800 30px/1.2 var(--font); color: var(--ink); }
```

- [ ] **Step 5: Rodar a verificação**

Run: `node $SCRATCH/check-anatomia.mjs`
Expected: passam todos menos "guia com a mensagem e a fala novas do slide 5".

Run: `node $SCRATCH/check-intro.mjs`
Expected: `todos os testes passaram`.

- [ ] **Step 6: Screenshot**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=10000 --screenshot=$SCRATCH/slide5.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#5"
```
Abrir `$SCRATCH/slide5.png` e conferir: as quatro caixas só com o nome e legíveis; as setas entre Contexto e Ferramentas; a linha do loop inteira numa linha só dentro do quadro tracejado; a última frase numa linha só ou quebrando bem, acima da faixa do contador (y < 1008); nada colidindo. Se o loop quebrar em duas linhas, reduzir `.an-loop` de 20px para 19px.

- [ ] **Step 7: Commit**

```bash
git add index.html styles.css
git commit -m "content: slide 5 sem legendas no diagrama, loop concreto e ponte para o laboratório

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Guia do apresentador

**Files:**
- Modify: `workshop/guia-do-apresentador.md:105-111`

- [ ] **Step 1: Trocar mensagem e fala do slide 5**

Substituir:

```markdown
- **Mensagem:** agente é modelo + harness; mais capacidade pede mais processo e controle.
- **Fala:** "O modelo só gera texto. Quem age é o harness: roda o loop, chama ferramentas e
  pede a sua permissão. No chat, o harness é você. Aqui, precisamos dizer como ele
  trabalha."
```

por:

```markdown
- **Mensagem:** agente é modelo + harness; no laboratório, o Copilot CLI segue as skills.
- **Fala:** "O modelo só gera texto. Quem age é o harness: lê o código, roda o teste, vê
  falhar e corrige, sempre pedindo a sua permissão. No chat, o harness é você. No
  laboratório, é o Copilot CLI, e as skills dizem como ele trabalha."
```

O título "### 5 · Anatomia de um agente (2 min)" e a linha **Cuidado** não mudam.

- [ ] **Step 2: Rodar a verificação**

Run: `node $SCRATCH/check-anatomia.mjs`
Expected: `todos os testes passaram`.

Regressão: `node $SCRATCH/check-problema.mjs`, `node $SCRATCH/check-roteiro.mjs` e `node $SCRATCH/check-intro.mjs` (tudo ok); `node $SCRATCH/check-titulo.mjs` (só "PDF renomeado" falha, de propósito).

- [ ] **Step 3: Commit**

```bash
git add workshop/guia-do-apresentador.md
git commit -m "docs: mensagem e fala novas do slide 5 no guia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Fora deste plano

- Regerar e renomear o PDF (`desenvolvimento-verificavel.pdf`): adiado até o usuário encerrar as edições.
