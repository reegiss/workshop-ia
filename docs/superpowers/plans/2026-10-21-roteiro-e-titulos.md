# Slide 3 (roteiro) e espaçamento dos títulos — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Acabar com a colisão dos acentos nos títulos de duas linhas (`line-height` global 1.1, com ajustes nos slides 6, 20 e 21) e reescrever o slide 3 com os textos novos e uma linha "Entrega" em cada card.

**Architecture:** Apresentação estática: `index.html` (um `<section class="slide">` por slide), `styles.css` (palco fixo de 1920×1080; o arquivo tem regras base e, mais abaixo, regras de "tema único" que aumentam tamanhos, por exemplo `styles.css:927-929` para a barra do roteiro) e `script.js` (`?check` grava em `<body data-overflow>` os slides com texto fora da área útil; `?export` mostra o estado final). A verificação usa um script Node fora do repositório.

**Tech Stack:** HTML, CSS, JavaScript puro; Google Chrome headless; Node 24.

**Spec:** `docs/superpowers/specs/2026-10-21-roteiro-e-titulos-design.md`

---

## Arquivos

| Arquivo | O que muda |
|---|---|
| `styles.css:95` | `.title` com `line-height: 1.1` |
| `styles.css` (regras por id, perto de `:939-950`) | Ajustes de `#s3`, `#s-sdd` e `#s-sdd-map` |
| `index.html` (`#s-roteiro`) | Textos dos segmentos, classe `timebar-desc` e linha `timebar-out` |
| `styles.css:856`, `:929` e regras novas | Seletores da descrição e estilo da linha Entrega |
| `workshop/guia-do-apresentador.md:96-97` | Fala do slide 3 |
| `$SCRATCH/check-roteiro.mjs` | Verificação (fora do repositório) |

```bash
export SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad
```

Branch `feat/introducao-agentica`. Todo commit termina com uma linha em branco e `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Use a ferramenta Edit (o `sed` do macOS é BSD). **Não gere o PDF**: ele fica para o fim das edições.

---

### Task 1: Script de verificação (teste que falha)

**Files:**
- Create: `$SCRATCH/check-roteiro.mjs`

- [ ] **Step 1: Escrever o script**

```js
// Verifica o slide 3 (roteiro) e o espaçamento dos títulos. Uso: node check-roteiro.mjs
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

test('títulos com line-height 1.1', () => {
  assert.match(css(), /\n\.title \{[^}]*line-height: 1\.1;/);
});

test('slide 3 com os textos novos', () => {
  const s = slide(3);
  assert.match(s, /id="s-roteiro"/);
  for (const t of [
    'o problema, a anatomia de um agente, skills e o fluxo mínimo',
    'um vocabulário comum para o resto da hora',
    'esclarecer, planejar e testar primeiro, no seu repositório',
    'design aprovado, plano, teste vermelho → verde, commit local',
    '<strong>Retrospectiva, limites e perguntas</strong>',
    'o que as evidências mostraram e o que vem depois',
    'as evidências da turma, lidas no chat',
  ]) assert.ok(s.includes(t), `falta: ${t}`);
  assert.doesNotMatch(s, /Escala, limites e perguntas/);
});

test('slide 3 com a linha Entrega em cada card', () => {
  const s = slide(3);
  assert.equal(count(s, 'class="timebar-desc"'), 3, 'esperava 3 descrições com classe');
  assert.equal(count(s, '<p class="timebar-out"><small>Entrega</small>'), 3, 'esperava 3 linhas Entrega');
});

test('descrição estilizada pela classe, não por :last-child', () => {
  assert.doesNotMatch(css(), /\.timebar-seg span:last-child/);
  assert.match(css(), /\.timebar-desc \{/);
  assert.match(css(), /\.timebar-out \{/);
});

test('guia com a fala nova do slide 3', () => {
  assert.match(read('workshop/guia-do-apresentador.md'), /e o resto para a retrospectiva, limites e perguntas\./);
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

Run: `node $SCRATCH/check-roteiro.mjs`
Expected: `ok` em "35 slides" e "nenhum slide tem texto fora da área útil"; `FAIL` em todos os outros.

Sem commit.

---

### Task 2: Títulos com line-height 1.1 e ajustes nos slides 6, 20 e 21

**Files:**
- Modify: `styles.css:95`
- Modify: `styles.css` (regras novas logo depois de `#s-sdd .mini-flow li { min-height: 400px; }`)

- [ ] **Step 1: Mudar o line-height global**

No bloco `.title { … }` (perto da linha 92), trocar `  line-height: 0.95;` por:
```css
  line-height: 1.1;
```

- [ ] **Step 2: Ver o transbordo**

Run: `node $SCRATCH/check-roteiro.mjs`
Expected: o teste de transbordo falha com `slides com transbordo: 6,20,21`, e "títulos com line-height 1.1" passa.

- [ ] **Step 3: Ajustes locais**

Em `styles.css`, trocar a linha
```css
#s-sdd .mini-flow li { min-height: 400px; }
```
por
```css
#s-sdd .mini-flow li { min-height: 360px; }
```
e, logo abaixo dela, acrescentar:
```css
#s3 .concept { margin-top: 24px; }
#s3 .code-card { padding: 24px 40px; }
#s-sdd-map .sdd-map > div { padding: 18px 32px; }
```

O `.concept` base tem `margin-top: 48px`, e o `.code-card` base tem `padding: 32px 40px`. A `.sdd-map > div` base tem `padding: 24px 32px`.

- [ ] **Step 4: Rodar a verificação**

Run: `node $SCRATCH/check-roteiro.mjs`
Expected: o transbordo passa (`ok`). Se ainda acusar algum slide, ajuste só a regra daquele slide, em passos de 4px:
- slide 6: `#s3 .concept` até `12px`;
- slide 20: `min-height` até `340px`;
- slide 21: padding até `14px 32px`.

Rode de novo até passar.

- [ ] **Step 5: Conferir os títulos com acento**

Tire screenshots dos 8 títulos com acento na segunda linha e dos 3 slides ajustados:
```bash
for n in 1 3 4 6 7 8 18 20 21 32; do "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=5000 --screenshot=$SCRATCH/t-$n.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#$n" 2>/dev/null; done
```
O slide 32 é o do catálogo (`#s4`). Abra cada PNG com Read e confira:
- há folga visível entre o acento e a linha de cima;
- nos slides 6, 20 e 21, nada está cortado nem colado ao rodapé.

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "style: títulos com line-height 1.1 para os acentos não encostarem na linha de cima"
```

---

### Task 3: Slide 3 com textos novos e linha Entrega

**Files:**
- Modify: `index.html` (os três `<div class="timebar-seg…">` de `#s-roteiro`)
- Modify: `styles.css:856`, `styles.css:929` e regras novas depois de `styles.css:856`

- [ ] **Step 1: HTML dos segmentos**

Dentro de `<div class="timebar">` em `#s-roteiro`, trocar as três linhas `<div class="timebar-seg…">…</div>` por:
```html
        <div class="timebar-seg" style="--span: 15"><span class="mono">0:00–0:15</span><strong>Conceitos</strong><span class="timebar-desc">o problema, a anatomia de um agente, skills e o fluxo mínimo</span><p class="timebar-out"><small>Entrega</small>um vocabulário comum para o resto da hora</p></div>
        <div class="timebar-seg timebar-seg--lab" style="--span: 25"><span class="mono">0:15–0:40</span><strong>Laboratório</strong><span class="timebar-desc">esclarecer, planejar e testar primeiro, no seu repositório</span><p class="timebar-out"><small>Entrega</small>design aprovado, plano, teste vermelho → verde, commit local</p></div>
        <div class="timebar-seg" style="--span: 20"><span class="mono">0:40–1:00</span><strong>Retrospectiva, limites e perguntas</strong><span class="timebar-desc">o que as evidências mostraram e o que vem depois</span><p class="timebar-out"><small>Entrega</small>as evidências da turma, lidas no chat</p></div>
```

- [ ] **Step 2: Seletores da descrição**

Em `styles.css`, trocar:
```css
.timebar-seg span:last-child { font-size: 28px; line-height: 1.35; color: var(--ink-2); }
```
por:
```css
.timebar-desc { font-size: 28px; line-height: 1.35; color: var(--ink-2); }
.timebar-out { margin: auto 0 0; padding-top: 20px; border-top: 1px solid var(--card-line); font-size: 26px; line-height: 1.35; color: var(--ink); }
.timebar-out small { display: block; margin-bottom: 6px; font: 600 18px/1.2 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
.timebar-seg--lab .timebar-out small { color: var(--g1); }
```
E trocar:
```css
.timebar-seg span:last-child { font-size: 32px; }
```
por:
```css
.timebar-desc { font-size: 32px; }
```

- [ ] **Step 3: Rodar a verificação**

Run: `node $SCRATCH/check-roteiro.mjs`
Expected: só "guia com a fala nova do slide 3" falha. Se o transbordo acusar o slide 3, reduza `min-height` e `padding` só no roteiro, com `#s-roteiro .timebar-seg { min-height: 420px; padding: 40px; }`, e rode de novo.

- [ ] **Step 4: Conferir visualmente**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=5000 --screenshot=$SCRATCH/slide3.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#3" 2>/dev/null
```
Abra `$SCRATCH/slide3.png` com Read e confira:
- a linha Entrega fica no pé dos três cards, alinhada entre eles, com o filete acima;
- o rótulo é azul nos cards 1 e 3 e laranja no laboratório;
- a descrição mantém o tamanho e a cor de antes;
- o título "60 minutos, 25 de prática" tem folga entre o "Á" e a linha de cima;
- nada está cortado.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "content: roteiro com a retrospectiva e o que cada bloco entrega"
```

---

### Task 4: Guia do apresentador

**Files:**
- Modify: `workshop/guia-do-apresentador.md:96-97`

- [ ] **Step 1: Fala do slide 3**

Trocar:
```markdown
- **Fala:** "Quinze minutos de conceito, vinte e cinco de prática no seu repositório e o
  resto para escala, limites e perguntas."
```
por:
```markdown
- **Fala:** "Quinze minutos de conceito, vinte e cinco de prática no seu repositório e o
  resto para a retrospectiva, limites e perguntas."
```

- [ ] **Step 2: Rodar a verificação**

Run: `node $SCRATCH/check-roteiro.mjs`
Expected: `todos os testes passaram`.

- [ ] **Step 3: Commit**

```bash
git add workshop/guia-do-apresentador.md
git commit -m "docs: fala do slide 3 cita a retrospectiva"
```

---

## Verificação final

- [ ] `node $SCRATCH/check-roteiro.mjs` → `todos os testes passaram`.
- [ ] `node $SCRATCH/check-intro.mjs` → `todos os testes passaram`.
- [ ] `node $SCRATCH/check-titulo.mjs` → só "PDF renomeado" falha, porque o PDF está adiado.
- [ ] `git status` limpo.
