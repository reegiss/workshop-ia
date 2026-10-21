# Introdução agêntica nos slides 5 e 6 — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o slide 5 por "Anatomia de um agente" (modelo, contexto, harness, ferramentas e MCP), ajustar o slide 6 para falar de contexto sob demanda, atualizar o guia do apresentador e regerar o PDF.

**Architecture:** Apresentação estática: `index.html` (um `<section class="slide">` por slide), `styles.css` (palco fixo de 1920×1080, escalado por `script.js`) e `script.js` (navegação, modo `?check` que marca slides com texto fora da área útil, modo `?export`). O diagrama do slide 5 é HTML/CSS puro, com caixas aninhadas. A verificação usa um script Node descartável, fora do repositório, que lê o fonte e roda o Chrome headless.

**Tech Stack:** HTML, CSS, JavaScript puro; Google Chrome headless; Node 24 (só para o script de verificação).

**Spec:** `docs/superpowers/specs/2026-10-21-introducao-agentica-design.md`

---

## Arquivos

| Arquivo | O que muda |
|---|---|
| `index.html` | Slide 5 (`#s-agentes`) reescrito; slide 6 (`#s3`) com texto, legenda e card ajustados |
| `styles.css` | Novos estilos `.anatomy*` / `.an-*` e `.code-caption`; remoção dos estilos da tabela chat × agente (`.versus`, `.vs-*` exceto `.vs-punch`, `.loop*`) |
| `script.js` | `.anatomy-defs > div` entra na cascata `REVEAL_ITEMS` |
| `workshop/guia-do-apresentador.md` | Entradas "5" e "6" em "Slide a slide" |
| `superpowers.pdf` | Regerado |
| `$SCRATCH/check-intro.mjs` | Script de verificação (fora do repositório, não vai para o commit) |

`$SCRATCH` é o diretório temporário da sessão. Defina antes de cada comando que o usa:

```bash
export SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad
```

Todo commit termina com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

`.vs-punch` **fica**: o slide 8 (`#s-confiavel`) também usa.

---

### Task 1: Script de verificação (teste que falha)

**Files:**
- Create: `$SCRATCH/check-intro.mjs`

- [ ] **Step 1: Escrever o script**

```js
// Verifica a introdução agêntica (slides 5 e 6). Uso: node check-intro.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const ROOT = '/Users/regis/develop/stef/apresentacao';
const FILE = `${ROOT}/index.html`;
const PAGE = `file://${FILE}`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const source = () => readFileSync(FILE, 'utf8');
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

test('slide 5 é a anatomia de um agente', () => {
  const s = slide(5);
  assert.match(s, /id="s-agentes"/);
  assert.match(s, /aria-label="Anatomia de um agente"/);
  assert.match(s, /Agente = modelo \+ <em>harness<\/em>/);
  for (const t of ['Harness', 'Contexto', 'Modelo (LLM)', 'Ferramentas · MCP', 'age →', '← observa'])
    assert.ok(s.includes(t), `falta no diagrama: ${t}`);
  assert.equal(count(s, '<dt>'), 4, 'esperava 4 definições');
  assert.match(s, /No chat, o harness é você/);
  assert.match(s, /Mais capacidade pede mais <em>processo<\/em> e controle\./);
  assert.doesNotMatch(s, /class="versus"/);
});

test('slide 6 fala de contexto sob demanda', () => {
  const s = slide(6);
  assert.match(s, /id="s3"/);
  assert.match(s, /O harness põe <strong>só a descrição<\/strong> no contexto/);
  assert.match(s, /class="code-caption"/);
  assert.match(s, /<h2>Ferramenta · MCP<\/h2>/);
  assert.match(s, /acessar um serviço/);
});

test('estilos da tabela chat × agente removidos, .vs-punch mantido', () => {
  const css = readFileSync(`${ROOT}/styles.css`, 'utf8');
  assert.doesNotMatch(css, /\.versus|\.vs-aspect|\.vs-chat|\.vs-agent|\.vs-head|\.loop/);
  assert.match(css, /\.vs-punch/);
});

test('nenhum slide tem texto fora da área útil', () => {
  const html = dump('?check');
  assert.equal(bodyAttr(html, 'checked'), 'true', 'o modo ?check não terminou');
  assert.equal(bodyAttr(html, 'overflow'), '', 'slides com transbordo');
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

Run: `node $SCRATCH/check-intro.mjs`
Expected: `ok` em "continua com 35 slides" e em "nenhum slide tem texto fora da área útil"; `FAIL` nos testes dos slides 5 e 6 e dos estilos. Se o teste de transbordo já falhar **antes** de qualquer mudança, anote os slides listados: eles são a linha de base e não devem piorar.

Sem commit: o script fica fora do repositório.

---

### Task 2: Slide 5 · Anatomia de um agente

**Files:**
- Modify: `index.html:60-80` (o `<section id="s-agentes">` inteiro)
- Modify: `styles.css:565-594` e `styles.css:667-669`
- Modify: `script.js:6-8` (`REVEAL_ITEMS`)

- [ ] **Step 1: Substituir o HTML do slide 5**

Trocar todo o bloco de `<section class="slide slide--dark" id="s-agentes" aria-label="Chat responde, agente age">` até o `</section>` correspondente (logo antes de `<section class="slide slide--dark" id="s3"`) por:

```html
    <section class="slide slide--dark" id="s-agentes" aria-label="Anatomia de um agente">
      <p class="kicker">Conceito</p>
      <h1 class="title">Agente = modelo + <em>harness</em></h1>
      <div class="anatomy">
        <figure class="anatomy-diagram" aria-label="O harness envolve o contexto, que envolve o modelo; ao lado, as ferramentas e o MCP">
          <div class="an-harness">
            <p class="an-label">Harness <span>o programa em volta do modelo (ex.: Copilot CLI)</span></p>
            <div class="an-row">
              <div class="an-context">
                <p class="an-label">Contexto <span>pedido, arquivos lidos, saídas, skills carregadas</span></p>
                <div class="an-model">
                  <p class="an-label">Modelo (LLM) <span>gera texto e decide o passo</span></p>
                </div>
              </div>
              <div class="an-arrows" aria-hidden="true"><span>age →</span><span>← observa</span></div>
              <div class="an-tools">
                <p class="an-label">Ferramentas · MCP <span>ler arquivo, rodar comando; MCP conecta GitHub, Jira…</span></p>
              </div>
            </div>
            <p class="an-loop">planeja → age → observa ↻ · pede sua permissão a cada ação</p>
          </div>
        </figure>
        <dl class="anatomy-defs">
          <div><dt>Modelo (LLM)</dt><dd>Gera texto e decide o próximo passo. Sozinho, não age.</dd></div>
          <div><dt>Contexto</dt><dd>O que o modelo vê agora. Tem limite.</dd></div>
          <div><dt>Harness</dt><dd>Roda o loop, pede a sua permissão e carrega as skills.</dd></div>
          <div><dt>Ferramentas · MCP</dt><dd>As mãos do agente; MCP é o padrão para conectar serviços externos.</dd></div>
        </dl>
      </div>
      <p class="an-chat">No chat, <strong>o harness é você</strong>: você copia, cola e executa.</p>
      <p class="vs-punch">Mais capacidade pede mais <em>processo</em> e controle.</p>
    </section>
```

- [ ] **Step 2: Trocar os estilos da tabela pelos do diagrama**

Em `styles.css`, substituir o bloco que vai de `/* Slide chat isolado vs agente */` até `.loop-note { … }` (inclusive), mantendo as duas linhas `.vs-punch` logo abaixo, por:

```css
/* Slide anatomia de um agente */
.anatomy { display: grid; grid-template-columns: 1.25fr 1fr; gap: 56px; align-items: start; margin-top: 40px; }
.anatomy-diagram { margin: 0; }
.an-harness { padding: 24px 28px; border: 2px dashed var(--accent); border-radius: var(--radius); }
.an-label { margin: 0 0 14px; font: 800 26px/1.2 var(--font); color: var(--ink); }
.an-label span { display: block; margin-top: 4px; font: 500 18px/1.35 var(--mono); color: var(--muted); }
.an-harness > .an-label { color: var(--accent); }
.an-row { display: grid; grid-template-columns: 1fr auto 0.8fr; gap: 16px; align-items: center; }
.an-context { padding: 20px 24px; border: 1px solid var(--card-line); border-radius: var(--radius); background: var(--card); }
.an-model { padding: 18px 22px; border-radius: calc(var(--radius) - 8px); background: var(--blue); }
.an-model .an-label { margin: 0; color: var(--white); }
.an-model .an-label span { color: var(--blue-light); }
.an-tools { padding: 20px 24px; border: 1px solid var(--g1); border-radius: var(--radius); }
.an-tools .an-label { margin: 0; }
.an-arrows { display: flex; flex-direction: column; gap: 12px; font: 700 20px/1 var(--mono); color: var(--accent); white-space: nowrap; }
.an-loop { margin: 18px 0 0; font: 600 20px/1.3 var(--mono); color: var(--ink-2); }
.anatomy-defs { display: flex; flex-direction: column; gap: 18px; margin: 0; }
.anatomy-defs > div { padding-top: 14px; border-top: 1px solid var(--card-line); }
.anatomy-defs dt { font-size: 26px; font-weight: 800; color: var(--ink); }
.anatomy-defs dd { margin: 4px 0 0; font-size: 24px; line-height: 1.35; color: var(--ink-2); }
.an-chat { margin: 32px 0 0; font-size: 28px; color: var(--ink-2); }
.an-chat strong { color: var(--ink); }
.an-chat + .vs-punch { margin-top: 16px; }
```

E, no bloco `/* Tema único: destaques */`, apagar as duas linhas:

```css
.versus .vs-agent { background: rgba(0, 103, 204, 0.16); }
.vs-agent .loop-node { border-color: var(--accent); background: rgba(0, 103, 204, 0.3); }
```

- [ ] **Step 3: Incluir as definições na cascata**

Em `script.js`, no fim da string `REVEAL_ITEMS`, trocar `'.timebar-seg, .mini-flow li, .evidence-col';` por:

```js
    '.timebar-seg, .mini-flow li, .evidence-col, .anatomy-defs > div';
```

- [ ] **Step 4: Rodar a verificação**

Run: `node $SCRATCH/check-intro.mjs`
Expected: `ok` em "slide 5 é a anatomia de um agente", "estilos … removidos" e "continua com 35 slides"; `FAIL` só no teste do slide 6. Se o transbordo acusar o slide 5, reduza nesta ordem até passar: `margin-top` de `.anatomy` para 28px, `gap` de `.anatomy-defs` para 12px, `font-size` de `dd` para 22px.

- [ ] **Step 5: Conferir visualmente**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=5000 --screenshot=$SCRATCH/slide5.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#5"
```
Abrir `$SCRATCH/slide5.png` e conferir: o harness tracejado envolve contexto e ferramentas, o modelo azul fica dentro do contexto, as setas ficam entre as caixas, as quatro definições ficam à direita e nada é cortado.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css script.js
git commit -m "content: slide 5 vira a anatomia de um agente (modelo, contexto, harness, ferramentas e MCP)"
```

---

### Task 3: Slide 6 · contexto sob demanda

**Files:**
- Modify: `index.html` (o `<section id="s3">`)
- Modify: `styles.css` (depois da regra `.code-card { … }`, perto da linha 227)

- [ ] **Step 1: Trocar o texto de abertura**

Substituir:
```html
          <p class="lead">Uma pasta com um <code>SKILL.md</code>: nome, descrição e instruções. O agente <strong>pode carregá-la pela descrição</strong> ou quando você a cita (<code>/nome</code>).</p>
```
por:
```html
          <p class="lead">Uma pasta com um <code>SKILL.md</code>: nome, descrição e instruções. O harness põe <strong>só a descrição</strong> no contexto; as instruções entram <strong>quando a skill é usada</strong>, pela descrição ou quando você a cita (<code>/nome</code>).</p>
```

- [ ] **Step 2: Adicionar a legenda abaixo do card de código**

Logo depois da linha `---</code></pre>` do slide 6, inserir:
```html
          <p class="code-caption">Isto fica sempre no contexto. O resto do arquivo, só quando precisa.</p>
```

- [ ] **Step 3: Ajustar o card da ferramenta**

Substituir:
```html
          <article class="compare"><h2>Ferramenta</h2><p>Dá ao agente uma capacidade: ler arquivo, rodar comando.</p></article>
```
por:
```html
          <article class="compare"><h2>Ferramenta · MCP</h2><p>Dá ao agente uma capacidade: ler arquivo, rodar comando, acessar um serviço.</p></article>
```

- [ ] **Step 4: Estilo da legenda**

Em `styles.css`, logo depois do bloco `.code-card { … }` (o primeiro, da seção `/* Slide 3 — o que é uma skill */`), inserir:
```css
.code-caption { margin: 14px 0 0; font: 500 20px/1.4 var(--mono); color: var(--muted); }
```

- [ ] **Step 5: Rodar a verificação**

Run: `node $SCRATCH/check-intro.mjs`
Expected: `todos os testes passaram`. Se o transbordo acusar o slide 6, reduza o `margin-top` de `.concept` só neste slide com `#s3 .concept { margin-top: 32px; }`.

- [ ] **Step 6: Conferir visualmente**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=5000 --screenshot=$SCRATCH/slide6.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#6"
```
Abrir `$SCRATCH/slide6.png` e conferir que a legenda aparece abaixo do card de código e que o card "Ferramenta · MCP" cabe em duas linhas.

- [ ] **Step 7: Commit**

```bash
git add index.html styles.css
git commit -m "content: slide 6 explica a skill carregada sob demanda no contexto"
```

---

### Task 4: Guia do apresentador

**Files:**
- Modify: `workshop/guia-do-apresentador.md:104-114`

- [ ] **Step 1: Substituir as entradas dos slides 5 e 6**

Substituir:
```markdown
### 5 · Chat responde, agente age (2 min)
- **Mensagem:** mais capacidade pede mais processo e controle.
- **Fala:** "No chat, quem executa é você. O agente pode executar, desde que você permita.
  Por isso precisamos definir como ele trabalha."
- **Cuidado:** não prometa que todo agente lê o repositório ou roda testes. Depende da
  ferramenta e das permissões.

### 6 · Skill é um processo em arquivo (2 min)
- **Mensagem:** uma skill é um método reutilizável e revisável.
- **Fala:** "Skill é um arquivo de instruções: como o agente deve conduzir um tipo de
  trabalho. Você lê, versiona e revisa, como qualquer código."
```
por:
```markdown
### 5 · Anatomia de um agente (2 min)
- **Mensagem:** agente é modelo + harness; mais capacidade pede mais processo e controle.
- **Fala:** "O modelo só gera texto. Quem age é o harness: roda o loop, chama ferramentas e
  pede a sua permissão. No chat, o harness é você. Aqui, precisamos dizer como ele
  trabalha."
- **Cuidado:** não prometa que todo harness lê o repositório ou roda testes. Depende da
  ferramenta e das permissões.

### 6 · Skill é um processo em arquivo (2 min)
- **Mensagem:** ferramenta é o que o agente consegue fazer; skill é como ele deve fazer.
- **Fala:** "Ferramenta é o que o agente consegue fazer; skill é como ele deve fazer. E custa
  pouco: até ser usada, só a descrição ocupa o contexto."
```

- [ ] **Step 2: Conferir que não sobrou referência ao título antigo**

Run: `grep -rn "Chat responde" /Users/regis/develop/stef/apresentacao --include=*.md --include=*.html | grep -v docs/superpowers`
Expected: nenhuma saída.

- [ ] **Step 3: Commit**

```bash
git add workshop/guia-do-apresentador.md
git commit -m "docs: guia do apresentador com as falas dos novos slides 5 e 6"
```

---

### Task 5: Regerar o PDF

**Files:**
- Modify: `superpowers.pdf`

- [ ] **Step 1: Gerar**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf=/Users/regis/develop/stef/apresentacao/superpowers.pdf "file:///Users/regis/develop/stef/apresentacao/index.html?export"
```

- [ ] **Step 2: Conferir o número de páginas**

Run: `mdls -name kMDItemNumberOfPages /Users/regis/develop/stef/apresentacao/superpowers.pdf`
Expected: `kMDItemNumberOfPages = 35`. Se o Spotlight ainda não tiver indexado (`(null)`), use `python3 -c "import re;print(len(re.findall(rb'/Type\s*/Page[^s]', open('/Users/regis/develop/stef/apresentacao/superpowers.pdf','rb').read())))"`.

- [ ] **Step 3: Conferir as páginas 5 e 6**

Abrir o PDF (Read com `pages: "5-6"`) e conferir que o diagrama e a legenda aparecem como nos screenshots, sem cortes nem animação pela metade.

- [ ] **Step 4: Commit**

```bash
git add superpowers.pdf
git commit -m "chore: regera o PDF com os novos slides 5 e 6"
```

---

## Verificação final

- [ ] `node $SCRATCH/check-intro.mjs` → `todos os testes passaram`.
- [ ] `git status` limpo; `git log --oneline -4` mostra os quatro commits das tasks 2 a 5.
- [ ] Abrir `index.html` no navegador, ir de `#4` a `#7` com as setas e conferir que a cascata das definições do slide 5 funciona e que os slides 4 e 7 não mudaram.
