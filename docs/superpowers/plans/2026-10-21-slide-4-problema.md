# Slide 4 (o problema) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar ao slide 4 (`#s2`) cenas concretas da lista de bancos, uma linha de custo e o título "Rápido não quer dizer verificável", e atualizar o guia do apresentador.

**Architecture:** Deck HTML estático. O slide 4 é a `<section id="s2">` em `index.html`; o estilo fica em `styles.css`, com regras por id (`#s2 …`) no bloco "Slides 3 e 17". As linhas de título e cena dos cards ficam alinhadas com CSS subgrid, como no slide 3. A verificação é um script Node descartável que roda o Chrome headless.

**Tech Stack:** HTML, CSS (grid/subgrid), Node 20+ (`node:assert`), Google Chrome headless.

**Spec:** `docs/superpowers/specs/2026-10-21-slide-4-problema-design.md`

**Regras gerais:**
- Branch `feat/introducao-agentica`. Commits locais, sem push.
- **Não** regerar o PDF (adiado até o fim das edições).
- Commits terminam com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- `SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad`

---

### Task 1: Script de verificação (teste vermelho)

**Files:**
- Create: `$SCRATCH/check-problema.mjs` (fora do repositório, não vai para commit)

- [ ] **Step 1: Escrever o script**

```js
// Verifica o slide 4 (o problema). Uso: node check-problema.mjs
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

test('slide 4 com título, abertura e custo novos', () => {
  const s = slide(4);
  assert.match(s, /id="s2" aria-label="O problema"/);
  for (const t of [
    '<h1 class="title">Rápido não quer dizer<br><em>verificável</em></h1>',
    '<p class="lead">Sem processo, um agente pode — por exemplo, na lista de bancos do laboratório:</p>',
    '<p class="problem-cost">Resultado: a revisão fica toda no fim, e cara.</p>',
    'E se o <em>processo</em> viesse junto com o agente?',
  ]) assert.ok(s.includes(t), `falta: ${t}`);
  assert.ok(s.indexOf('problem-cost') < s.indexOf('class="punchline"'), 'o custo deve vir antes da pergunta final');
});

test('slide 4 com uma cena em cada card', () => {
  const s = slide(4);
  for (const [titulo, cena] of [
    ['Implementar antes de esclarecer o requisito', 'Fez a busca só por nome; ninguém perguntou sobre o código do banco.'],
    ['Escrever o teste depois, só para passar', 'O teste copia a saída do código, com a ordem errada junto.'],
    ['Dizer “pronto” sem evidência', '“Pronto!”, e o teste nem foi rodado.'],
  ]) assert.ok(s.includes(`<p>${titulo}</p><p class="problem-scene">${cena}</p>`), `card incompleto: ${titulo}`);
  assert.equal(count(s, 'class="problem-scene"'), 3);
});

test('CSS da cena e do custo', () => {
  assert.match(css(), /\.problem-scene \{[^}]*border-top: 1px solid var\(--card-line\)/);
  assert.match(css(), /\.problem-scene \{[^}]*color: var\(--ink-2\)/);
  assert.match(css(), /#s2 \.problem \{[^}]*grid-template-rows: subgrid/);
  assert.match(css(), /\.problem-cost \{[^}]*color: var\(--ink-2\)/);
});

test('guia com o título e a fala novos do slide 4', () => {
  const g = read('workshop/guia-do-apresentador.md');
  assert.match(g, /### 4 · Rápido não quer dizer verificável \(2 min\)/);
  assert.match(g, /O agente gera código rápido\. O problema é avaliar\. Na lista de bancos: ninguém\s+perguntou sobre o código, o teste copiou a ordem errada e o 'pronto' veio sem rodar\s+nada\. A revisão fica toda no fim\./);
  assert.match(g, /sem processo, a saída do agente é difícil de avaliar\./);
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

Run: `node $SCRATCH/check-problema.mjs`
Expected: passam "continua com 35 slides" e "nenhum slide tem texto fora da área útil"; falham os outros 4.

Sem commit (o script fica fora do repositório).

---

### Task 2: Conteúdo e visual do slide 4

**Files:**
- Modify: `index.html` (section `#s2`, linhas ~49-60)
- Modify: `styles.css` (bloco "Slide 2 — o problema", linhas ~183-209, e regras `#s2` nas linhas ~706-708)

- [ ] **Step 1: Trocar o HTML do slide**

Em `index.html`, substituir a section inteira `#s2` por:

```html
    <section class="slide slide--dark" id="s2" aria-label="O problema">
      <p class="kicker">O problema</p>
      <h1 class="title">Rápido não quer dizer<br><em>verificável</em></h1>
      <p class="lead">Sem processo, um agente pode — por exemplo, na lista de bancos do laboratório:</p>
      <div class="problems problems--3">
        <article class="problem"><p>Implementar antes de esclarecer o requisito</p><p class="problem-scene">Fez a busca só por nome; ninguém perguntou sobre o código do banco.</p></article>
        <article class="problem"><p>Escrever o teste depois, só para passar</p><p class="problem-scene">O teste copia a saída do código, com a ordem errada junto.</p></article>
        <article class="problem"><p>Dizer “pronto” sem evidência</p><p class="problem-scene">“Pronto!”, e o teste nem foi rodado.</p></article>
      </div>
      <p class="problem-cost">Resultado: a revisão fica toda no fim, e cara.</p>
      <p class="punchline">E se o <em>processo</em> viesse junto com o agente?</p>
    </section>
```

Manter a indentação que a section já usa no arquivo.

- [ ] **Step 2: Estilos base da cena e do custo**

Em `styles.css`, logo depois de `.punchline em { … }` (fim do bloco "Slide 2 — o problema"), acrescentar:

```css
.problem-scene { margin: 0; padding-top: 20px; border-top: 1px solid var(--card-line); font-size: 26px; line-height: 1.35; font-weight: 400; color: var(--ink-2); }
.problem-cost { margin: auto 0 0; font-size: 32px; line-height: 1.3; font-weight: 500; color: var(--ink-2); }
```

- [ ] **Step 3: Regras do `#s2` (subgrid e espaçamento)**

Substituir as três regras atuais:

```css
#s2 .problems { margin-top: 40px; gap: 28px; }
#s2 .problem { padding: 40px 36px; min-height: 280px; }
#s2 .problem p { font-size: 38px; line-height: 1.25; }
```

por:

```css
#s2 .problems { margin-top: 40px; column-gap: 28px; row-gap: 0; grid-template-rows: auto auto; }
#s2 .problem { grid-row: span 2; display: grid; grid-template-rows: subgrid; row-gap: 24px; padding: 36px; }
#s2 .problem p { font-size: 38px; line-height: 1.25; }
#s2 .problem .problem-scene { font-size: 28px; line-height: 1.35; }
#s2 .problem-cost + .punchline { margin-top: 16px; }
```

Por quê: o subgrid alinha a linha do título e a linha da cena nos três cards, então os filetes ficam na mesma altura. `.problem-cost` leva `margin-top: auto` e empurra o par custo + pergunta para o pé do slide; a pergunta passa a ter só 16px acima. A regra `#s2 .problem .problem-scene` vence `#s2 .problem p` por especificidade.

- [ ] **Step 4: Rodar a verificação**

Run: `node $SCRATCH/check-problema.mjs`
Expected: passam todos menos "guia com o título e a fala novos do slide 4".

Se "nenhum slide tem texto fora da área útil" acusar o slide 4, aplicar nesta ordem, rodando de novo após cada passo, e parar no primeiro que zerar:
1. `#s2 .problem p { font-size: 34px; … }` (de 38px).
2. `#s2 .problems { margin-top: 32px; … }` e `#s2 .problem { … padding: 28px 32px; }`.

- [ ] **Step 5: Screenshot**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=10000 --screenshot=$SCRATCH/slide4.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#4"
```
Conferir em `$SCRATCH/slide4.png`: os filetes dos três cards na mesma altura; "Ágora" sem colidir com nada; a pergunta final termina acima da faixa do contador (y < 1008); a linha do custo menor e mais apagada que a pergunta.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css
git commit -m "content: slide 4 com cenas da lista de bancos, custo e título novo

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Guia do apresentador

**Files:**
- Modify: `workshop/guia-do-apresentador.md:99-102`

- [ ] **Step 1: Trocar a entrada do slide 4**

Substituir:

```markdown
### 4 · Rápido não é verificável (2 min)
- **Mensagem:** sem processo, a saída do agente é difícil de avaliar.
- **Fala:** "O agente gera código rápido. O problema é avaliar: foi o requisito certo? O
  teste prova algo? Sem processo, a revisão fica toda no fim, e cara."
```

por:

```markdown
### 4 · Rápido não quer dizer verificável (2 min)
- **Mensagem:** sem processo, a saída do agente é difícil de avaliar.
- **Fala:** "O agente gera código rápido. O problema é avaliar. Na lista de bancos: ninguém
  perguntou sobre o código, o teste copiou a ordem errada e o 'pronto' veio sem rodar
  nada. A revisão fica toda no fim."
```

- [ ] **Step 2: Rodar a verificação**

Run: `node $SCRATCH/check-problema.mjs`
Expected: `todos os testes passaram`.

Rodar também os scripts anteriores para garantir que nada regrediu:
`node $SCRATCH/check-roteiro.mjs` (tudo ok), `node $SCRATCH/check-intro.mjs` (tudo ok), `node $SCRATCH/check-titulo.mjs` (só "PDF renomeado" falha, de propósito).

- [ ] **Step 3: Commit**

```bash
git add workshop/guia-do-apresentador.md
git commit -m "docs: título e fala novos do slide 4 no guia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Fora deste plano

- Regerar e renomear o PDF (`desenvolvimento-verificavel.pdf`): adiado até o usuário encerrar as edições.
