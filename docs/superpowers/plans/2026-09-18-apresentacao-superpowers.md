# Apresentação Superpowers — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma apresentação HTML de 10 slides sobre as skills do obra (repositório superpowers), com a identidade visual da Stefanini, para um público de desenvolvedores.

**Architecture:** Um único `index.html` com CSS e JS embutidos. Cada slide é uma `<section class="slide">` num palco de 1920×1080 escalado para a janela. Um script de teste em Node (`tests/check.mjs`) usa o Chrome headless para validar a navegação e detectar texto que sai da área do slide, e lê o HTML para validar o conteúdo de cada slide.

**Tech Stack:** HTML/CSS/JS puro · Google Fonts (Manrope, JetBrains Mono) · Node 22 (apenas para testes, sem dependências npm) · Google Chrome headless.

**Spec:** `docs/superpowers/specs/2026-09-18-apresentacao-superpowers-design.md`

---

## Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | A apresentação inteira: tokens de cor, layout do palco, componentes, conteúdo dos 10 slides e navegação. |
| `tests/check.mjs` | Testes automatizados: navegação (hash), detecção de transbordo e conteúdo esperado de cada slide. |
| `tests/screenshots.sh` | Gera capturas PNG de cada slide em 1920×1080 e 1366×768 para revisão visual. |
| `.gitignore` | Ignora a pasta `screenshots/`. |

### Convenções usadas em todas as tarefas

- O Chrome fica em `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Os scripts aceitam a variável `CHROME` para outro caminho.
- Os testes rodam com `node tests/check.mjs`. A saída mostra `ok` ou `FAIL` por teste e termina com código 1 se algo falhar.
- **Modo de verificação:** abrir `index.html?check` faz a página medir todos os slides e escrever no `<body>`:
  - `data-checked="true"` quando termina;
  - `data-overflow="3,7"`: lista de slides com algum texto fora da área útil (vazio = tudo certo).
- A área útil de um slide é o palco inteiro menos os 72px de baixo, onde ficam o contador e a barra de progresso. Elementos dentro de um contêiner com o atributo `data-bleed` (faixas de cor que vão até a borda) não são verificados.
- O CSS de componentes é inserido **imediatamente antes** da linha `      /* === fim dos componentes === */` dentro do `<style>`.
- Para trocar um slide, substitua **o elemento `<section>` inteiro** com o `id` indicado (`s1` … `s10`).

---

### Task 1: Motor da apresentação e testes de navegação

**Files:**
- Create: `tests/check.mjs`
- Create: `index.html`

- [ ] **Step 1: Escrever o teste que falha**

Criar `tests/check.mjs`:

```js
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `node tests/check.mjs`
Expected: `FAIL tem 10 slides` com `ENOENT` (o `index.html` ainda não existe) e código de saída 1.

- [ ] **Step 3: Criar o `index.html` com o motor e os 10 slides-esqueleto**

Criar `index.html`:

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Superpowers — Skills para agentes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Identidade Stefanini (extraída de stefanini.com) */
      --navy: #0B1641;
      --blue: #0067CC;
      --blue-dark: #024589;
      --blue-light: #DCECFA;
      --text: #3C3C3E;
      --muted: #83868F;
      --line: #CED2E0;
      --white: #FFFFFF;
      --surface: #F5F5F5;
      /* Uma cor por grupo de skills */
      --g1: #FF692C;
      --g2: #C70160;
      --g3: #6800D5;
      --g4: #157F75;
      --radius: 24px;
      --font: "nexa", "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
      --mono: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
    }

    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; }
    body {
      background: var(--navy);
      overflow: hidden;
      font-family: var(--font);
      -webkit-font-smoothing: antialiased;
    }

    .stage {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 1920px;
      height: 1080px;
      transform: translate(-50%, -50%) scale(var(--scale, 1));
      overflow: hidden;
    }

    .slide {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      padding: 96px 120px 120px;
      overflow: hidden;
      color: var(--text);
    }
    .slide > * { flex-shrink: 0; }
    .slide.is-active { display: flex; animation: enter 300ms ease-out; }
    .slide--dark { background: var(--navy); color: var(--white); }
    .slide--light { background: linear-gradient(180deg, #FFFFFF 56%, #DCECFA 100%); }

    @keyframes enter {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .slide.is-active { animation: none; }
    }
    .is-checking .slide.is-active { animation: none; }

    .kicker {
      margin: 0 0 28px;
      font: 600 24px/1 var(--mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--blue);
    }
    .slide--dark .kicker { color: var(--blue-light); }

    .title {
      margin: 0;
      font-size: 112px;
      line-height: 0.95;
      font-weight: 800;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      color: var(--navy);
    }
    .title em { font-style: normal; color: var(--blue); }
    .slide--dark .title { color: var(--white); }

    .lead {
      margin: 40px 0 0;
      max-width: 1300px;
      font-size: 36px;
      line-height: 1.4;
      font-weight: 500;
      color: var(--text);
    }
    .lead strong { color: var(--navy); font-weight: 800; }
    .slide--dark .lead { color: var(--blue-light); }
    .slide--dark .lead strong { color: var(--white); }

    code, .mono { font-family: var(--mono); }

    .counter {
      position: absolute;
      right: 120px;
      bottom: 36px;
      z-index: 2;
      font: 600 22px/1 var(--mono);
      letter-spacing: 0.06em;
      color: var(--muted);
    }
    .stage[data-theme="dark"] .counter { color: var(--blue-light); }

    .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      width: 0;
      height: 8px;
      background: var(--blue);
      transition: width 300ms ease;
    }

      /* === componentes dos slides === */
      /* === fim dos componentes === */
  </style>
</head>
<body>
  <main class="stage">
    <section class="slide slide--dark" id="s1" aria-label="Capa">
      <p class="kicker">Capa</p>
      <h1 class="title">Superpowers</h1>
    </section>
    <section class="slide slide--dark" id="s2" aria-label="O problema">
      <p class="kicker">O problema</p>
      <h1 class="title">Rápido não é o mesmo que bom</h1>
    </section>
    <section class="slide slide--light" id="s3" aria-label="O que é uma skill">
      <p class="kicker">Conceito</p>
      <h1 class="title">Skill = processo empacotado</h1>
    </section>
    <section class="slide slide--light" id="s4" aria-label="obra e o skills.sh">
      <p class="kicker">Autor e catálogo</p>
      <h1 class="title">Um catálogo de métodos</h1>
    </section>
    <section class="slide slide--light" id="s5" aria-label="Mapa do superpowers">
      <p class="kicker">O mapa do superpowers</p>
      <h1 class="title">14 skills, 4 momentos</h1>
    </section>
    <section class="slide slide--light" id="s6" aria-label="Pensar antes de codar">
      <p class="kicker">Grupo 01</p>
      <h1 class="title">Pensar antes de codar</h1>
    </section>
    <section class="slide slide--light" id="s7" aria-label="Qualidade e disciplina">
      <p class="kicker">Grupo 02</p>
      <h1 class="title">Qualidade e disciplina</h1>
    </section>
    <section class="slide slide--light" id="s8" aria-label="Escala com agentes">
      <p class="kicker">Grupo 03</p>
      <h1 class="title">Escala com agentes</h1>
    </section>
    <section class="slide slide--light" id="s9" aria-label="Revisão e entrega">
      <p class="kicker">Grupo 04</p>
      <h1 class="title">Revisão e entrega</h1>
    </section>
    <section class="slide slide--dark" id="s10" aria-label="O fluxo completo">
      <p class="kicker">Juntando tudo</p>
      <h1 class="title">O fluxo completo</h1>
    </section>
    <div class="progress" aria-hidden="true"></div>
    <div class="counter" aria-hidden="true">01 / 10</div>
  </main>

  <script>
    (() => {
      const STAGE_W = 1920;
      const STAGE_H = 1080;
      const SAFE_BOTTOM = 72; // espaço do contador e da barra de progresso

      const stage = document.querySelector('.stage');
      const slides = [...document.querySelectorAll('.slide')];
      const counter = document.querySelector('.counter');
      const progress = document.querySelector('.progress');
      const total = slides.length;
      let current = 1;

      const pad = (n) => String(n).padStart(2, '0');

      function parseHash(hash) {
        const n = Number.parseInt(hash.replace('#', ''), 10);
        return Number.isInteger(n) && n >= 1 && n <= total ? n : 1;
      }

      function show(n) {
        current = Math.min(Math.max(n, 1), total);
        slides.forEach((s, i) => s.classList.toggle('is-active', i === current - 1));
        const active = slides[current - 1];
        stage.dataset.theme = active.classList.contains('slide--dark') ? 'dark' : 'light';
        counter.textContent = `${pad(current)} / ${pad(total)}`;
        progress.style.width = `${(current / total) * 100}%`;
        document.body.dataset.current = String(current);
        if (location.hash !== `#${current}`) history.replaceState(null, '', `#${current}`);
      }

      function fit() {
        const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
        stage.style.setProperty('--scale', String(scale));
      }

      function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
      }

      // Modo ?check: lista os slides com texto fora da área útil.
      function findOverflow() {
        const bad = [];
        slides.forEach((slide, i) => {
          slides.forEach((s) => s.classList.toggle('is-active', s === slide));
          const box = slide.getBoundingClientRect();
          const scale = box.width / STAGE_W;
          const bottomLimit = box.bottom - SAFE_BOTTOM * scale;
          const leaves = [...slide.querySelectorAll('*')].filter(
            (el) => el.children.length === 0 && !el.closest('[data-bleed]')
          );
          const escaped = leaves.some((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) return false;
            return r.left < box.left - 1 || r.right > box.right + 1 ||
              r.top < box.top - 1 || r.bottom > bottomLimit + 1;
          });
          if (escaped) bad.push(i + 1);
        });
        show(current);
        return bad;
      }

      document.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) show(current + 1);
        else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) show(current - 1);
        else if (e.key === 'Home') show(1);
        else if (e.key === 'End') show(total);
        else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        else return;
        e.preventDefault();
      });

      document.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        show(e.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
      });

      window.addEventListener('hashchange', () => show(parseHash(location.hash)));
      window.addEventListener('resize', fit);

      fit();
      show(parseHash(location.hash));

      if (new URLSearchParams(location.search).has('check')) {
        document.body.classList.add('is-checking');
        document.fonts.ready.then(() => {
          document.body.dataset.overflow = findOverflow().join(',');
          document.body.dataset.checked = 'true';
        });
      }
    })();
  </script>
</body>
</html>
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `node tests/check.mjs`
Expected: 6 linhas `ok` e `todos os testes passaram`. Os títulos-esqueleto cabem nos slides, então o teste de transbordo passa.

- [ ] **Step 5: Conferir manualmente**

Run: `open index.html`
Expected: slide 1 escuro, com a navegação funcionando por setas e clique, contador `01 / 10` e barra azul no rodapé. `F` alterna a tela cheia.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check.mjs
git commit -m "feat: motor da apresentação com navegação e testes"
```

---

### Task 2: Slides 1 (capa) e 2 (o problema)

**Files:**
- Modify: `tests/check.mjs` (seção `// --- conteúdo dos slides ---`)
- Modify: `index.html` (sections `s1`, `s2` e CSS de componentes)

- [ ] **Step 1: Escrever os testes que falham**

Em `tests/check.mjs`, inserir logo abaixo da linha `// --- conteúdo dos slides ---`:

```js
test('slide 1: capa com título, subtítulo e fonte', () => {
  const s = slide(1);
  assert.match(s, /Super<em>—<\/em><br>Powers/);
  assert.match(s, /Skills que ensinam agentes de IA a desenvolver como engenheiros/);
  assert.match(s, /skills\.sh\/obra/);
  assert.equal(count(s, 'class="cover-bars"'), 1);
});

test('slide 2: quatro problemas e a pergunta final', () => {
  const s = slide(2);
  assert.equal(count(s, 'class="problem"'), 4);
  assert.match(s, /ensinar <em>processo<\/em> ao agente/);
});
```

- [ ] **Step 2: Rodar e confirmar que falham**

Run: `node tests/check.mjs`
Expected: `FAIL slide 1: …` e `FAIL slide 2: …`. Os demais continuam `ok`.

- [ ] **Step 3: Adicionar o CSS**

Inserir antes de `      /* === fim dos componentes === */`:

```css
    /* Slide 1 — capa */
    .cover { justify-content: center; padding-right: 560px; }
    .cover-title { font-size: 250px; line-height: 0.9; }
    .cover-lead { max-width: 1100px; }
    .cover-foot {
      position: absolute;
      left: 120px;
      bottom: 40px;
      margin: 0;
      font-size: 24px;
      letter-spacing: 0.06em;
      color: var(--blue-light);
    }
    .cover-bars {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 360px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .cover-bars span:nth-child(1) { background: var(--g1); }
    .cover-bars span:nth-child(2) { background: var(--g2); }
    .cover-bars span:nth-child(3) { background: var(--g3); }
    .cover-bars span:nth-child(4) { background: var(--g4); }

    /* Slide 2 — o problema */
    .problems {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 32px;
    }
    .problem {
      padding: 32px;
      border: 1px solid rgba(220, 236, 250, 0.18);
      border-radius: var(--radius);
      background: rgba(220, 236, 250, 0.08);
    }
    .problem-num {
      display: block;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
      color: var(--g1);
    }
    .problem p {
      margin: 0;
      font-size: 32px;
      line-height: 1.3;
      font-weight: 500;
      color: var(--white);
    }
    .punchline {
      margin: auto 0 0;
      font-size: 56px;
      font-weight: 700;
      color: var(--white);
    }
    .punchline em { font-style: normal; color: var(--g1); }
```

- [ ] **Step 4: Substituir as sections `s1` e `s2`**

Substituir a `<section … id="s1">` inteira por:

```html
    <section class="slide slide--dark cover" id="s1" aria-label="Capa">
      <div class="cover-bars" data-bleed aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <p class="kicker">Agentes &amp; Skills para desenvolvimento</p>
      <h1 class="title cover-title">Super<em>—</em><br>Powers</h1>
      <p class="lead cover-lead">Skills que ensinam agentes de IA a desenvolver como engenheiros</p>
      <p class="cover-foot mono" data-bleed>skills.sh/obra</p>
    </section>
```

Substituir a `<section … id="s2">` inteira por:

```html
    <section class="slide slide--dark" id="s2" aria-label="O problema">
      <p class="kicker">O problema</p>
      <h1 class="title">Rápido não é o<br>mesmo que <em>bom</em></h1>
      <p class="lead">Um agente escreve código em segundos, mas:</p>
      <div class="problems">
        <article class="problem"><span class="problem-num mono">01</span><p>Começa a codar antes de entender o problema</p></article>
        <article class="problem"><span class="problem-num mono">02</span><p>Não escreve testes, ou escreve depois só para “passar”</p></article>
        <article class="problem"><span class="problem-num mono">03</span><p>Chuta a causa de um bug em vez de investigar</p></article>
        <article class="problem"><span class="problem-num mono">04</span><p>Diz “pronto” sem ter verificado</p></article>
      </div>
      <p class="punchline">E se desse para ensinar <em>processo</em> ao agente?</p>
    </section>
```

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `node tests/check.mjs`
Expected: `todos os testes passaram`. Se `nenhum slide tem texto fora da área útil` falhar, a mensagem lista os slides afetados: reduza o `font-size` do elemento que transborda naquele slide e rode de novo.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check.mjs
git commit -m "feat: slides de capa e do problema"
```

---

### Task 3: Slides 3 (o que é uma skill), 4 (obra e skills.sh) e 5 (mapa)

**Files:**
- Modify: `tests/check.mjs`
- Modify: `index.html` (sections `s3`, `s4`, `s5` e CSS de componentes)

- [ ] **Step 1: Escrever os testes que falham**

Inserir em `tests/check.mjs`, depois dos testes do slide 2:

```js
test('slide 3: definição de skill, frontmatter e comparação', () => {
  const s = slide(3);
  assert.match(s, /<code>SKILL\.md<\/code>/);
  assert.match(s, /name: brainstorming/);
  assert.equal(count(s, '<article class="compare'), 3);
  assert.equal(count(s, 'compare--skill'), 1);
});

test('slide 4: obra, skills.sh e quatro outros pacotes', () => {
  const s = slide(4);
  assert.match(s, /Jesse Vincent/);
  assert.equal(count(s, 'class="pkg"'), 4);
  for (const name of ['episodic-memory', 'the-elements-of-style', 'superpowers-lab', 'superpowers-chrome']) {
    assert.match(s, new RegExp(`<code>${name}</code>`));
  }
});

test('slide 5: as 14 skills em 4 grupos', () => {
  const s = slide(5);
  assert.equal(count(s, 'class="group-card"'), 4);
  assert.equal(count(s, 'class="chip"'), 14);
});
```

- [ ] **Step 2: Rodar e confirmar que falham**

Run: `node tests/check.mjs`
Expected: `FAIL` nos três testes novos (slides 3, 4 e 5).

- [ ] **Step 3: Adicionar o CSS**

Inserir antes de `      /* === fim dos componentes === */`:

```css
    /* Slide 3 — o que é uma skill */
    .concept {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 64px;
      align-items: start;
      margin-top: 48px;
    }
    .concept .lead { margin-top: 0; }
    .lead code { font-size: 0.85em; color: var(--blue); }
    .code-card {
      margin: 32px 0 0;
      padding: 32px 40px;
      border-radius: var(--radius);
      background: var(--navy);
      color: var(--blue-light);
      font: 400 26px/1.5 var(--mono);
      white-space: pre;
    }
    .compare-list { display: flex; flex-direction: column; gap: 20px; }
    .compare {
      padding: 24px 32px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
    }
    .compare h2 { margin: 0 0 6px; font-size: 30px; font-weight: 800; color: var(--navy); }
    .compare p { margin: 0; font-size: 26px; line-height: 1.35; color: var(--text); }
    .compare--skill { border-color: var(--blue); background: var(--blue); }
    .compare--skill h2, .compare--skill p { color: var(--white); }

    /* Slide 4 — obra e skills.sh */
    .catalog {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 64px;
      margin-top: 48px;
    }
    .catalog-intro { display: flex; flex-direction: column; gap: 24px; }
    .info-card {
      padding: 32px 40px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
    }
    .info-card h2 { margin: 0 0 12px; font-size: 36px; font-weight: 600; color: var(--blue); }
    .info-card p { margin: 0; font-size: 28px; line-height: 1.4; color: var(--text); }
    .catalog-label {
      margin: 0 0 8px;
      font: 600 22px/1 var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .pkg {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 24px;
      align-items: baseline;
      padding: 18px 0;
      border-bottom: 1px solid var(--line);
    }
    .pkg code { font-size: 26px; font-weight: 600; color: var(--navy); }
    .pkg span { font-size: 26px; line-height: 1.35; color: var(--text); }
    .pill {
      display: inline-block;
      margin: 32px 0 0;
      padding: 18px 36px;
      border-radius: 999px;
      background: var(--blue);
      color: var(--white);
      font-size: 30px;
      font-weight: 500;
    }

    /* Slide 5 — mapa */
    .groups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 40px;
    }
    .group-card {
      padding: 24px 32px;
      border: 1px solid var(--line);
      border-top: 12px solid var(--g);
      border-radius: var(--radius);
      background: var(--white);
    }
    .group-card h2 { margin: 0 0 16px; font-size: 32px; font-weight: 800; color: var(--navy); }
    .group-card h2 .mono { margin-right: 12px; color: var(--g-ink, var(--g)); }
    .chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
    .chip {
      padding: 8px 18px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface);
      color: var(--navy);
      font: 600 20px/1.2 var(--mono);
    }
```

- [ ] **Step 4: Substituir as sections `s3`, `s4` e `s5`**

Substituir a `<section … id="s3">` inteira por:

```html
    <section class="slide slide--light" id="s3" aria-label="O que é uma skill">
      <p class="kicker">Conceito</p>
      <h1 class="title">Skill = processo<br><em>empacotado</em></h1>
      <div class="concept">
        <div>
          <p class="lead">Uma pasta com um <code>SKILL.md</code>: instruções, checklists e exemplos que o agente <strong>carrega sozinho quando a situação pede</strong>.</p>
          <pre class="code-card"><code>---
name: brainstorming
description: Use antes de qualquer
  trabalho criativo…
---</code></pre>
        </div>
        <div class="compare-list">
          <article class="compare"><h2>Prompt</h2><p>Você repete a cada conversa.</p></article>
          <article class="compare"><h2>Ferramenta</h2><p>Dá ao agente uma capacidade: ler arquivo, rodar comando.</p></article>
          <article class="compare compare--skill"><h2>Skill</h2><p>Dá ao agente um método: reutilizável, versionado e compartilhável.</p></article>
        </div>
      </div>
    </section>
```

Substituir a `<section … id="s4">` inteira por:

```html
    <section class="slide slide--light" id="s4" aria-label="obra e o skills.sh">
      <p class="kicker">Autor e catálogo</p>
      <h1 class="title">Um catálogo<br>de <em>métodos</em></h1>
      <div class="catalog">
        <div class="catalog-intro">
          <article class="info-card"><h2 class="mono">obra</h2><p>Jesse Vincent publica skills que codificam práticas de engenharia sênior para agentes.</p></article>
          <article class="info-card"><h2 class="mono">skills.sh</h2><p>Diretório aberto de skills: você encontra, instala e usa no seu agente.</p></article>
        </div>
        <div>
          <p class="catalog-label">Outros pacotes do autor</p>
          <div class="pkg"><code>episodic-memory</code><span>o agente lembra de conversas anteriores</span></div>
          <div class="pkg"><code>the-elements-of-style</code><span>escrita clara e concisa</span></div>
          <div class="pkg"><code>superpowers-lab</code><span>experimentos: tmux, funções duplicadas…</span></div>
          <div class="pkg"><code>superpowers-chrome</code><span>navegar na web pelo Chrome</span></div>
          <p class="pill">O principal é o <strong>superpowers</strong> →</p>
        </div>
      </div>
    </section>
```

Substituir a `<section … id="s5">` inteira por:

```html
    <section class="slide slide--light" id="s5" aria-label="Mapa do superpowers">
      <p class="kicker">O mapa do superpowers</p>
      <h1 class="title">14 skills,<br>4 <em>momentos</em> do trabalho</h1>
      <div class="groups">
        <article class="group-card" style="--g: var(--g1); --g-ink: #E85D04">
          <h2><span class="mono">01</span>Pensar antes de codar</h2>
          <ul class="chips">
            <li class="chip">brainstorming</li>
            <li class="chip">writing-plans</li>
            <li class="chip">executing-plans</li>
          </ul>
        </article>
        <article class="group-card" style="--g: var(--g2)">
          <h2><span class="mono">02</span>Qualidade e disciplina</h2>
          <ul class="chips">
            <li class="chip">test-driven-development</li>
            <li class="chip">systematic-debugging</li>
            <li class="chip">verification-before-completion</li>
          </ul>
        </article>
        <article class="group-card" style="--g: var(--g3)">
          <h2><span class="mono">03</span>Escala com agentes</h2>
          <ul class="chips">
            <li class="chip">subagent-driven-development</li>
            <li class="chip">dispatching-parallel-agents</li>
            <li class="chip">using-git-worktrees</li>
          </ul>
        </article>
        <article class="group-card" style="--g: var(--g4)">
          <h2><span class="mono">04</span>Revisão e entrega</h2>
          <ul class="chips">
            <li class="chip">requesting-code-review</li>
            <li class="chip">receiving-code-review</li>
            <li class="chip">finishing-a-development-branch</li>
            <li class="chip">writing-skills</li>
            <li class="chip">using-superpowers</li>
          </ul>
        </article>
      </div>
    </section>
```

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `node tests/check.mjs`
Expected: `todos os testes passaram`. Se o slide 5 transbordar, o título pode ter quebrado em 3 linhas: troque o título por `14 skills,<br>4 <em>momentos</em>` e rode de novo.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check.mjs
git commit -m "feat: slides de conceito, catálogo e mapa das skills"
```

---

### Task 4: Slides 6 a 9 (os quatro grupos)

**Files:**
- Modify: `tests/check.mjs`
- Modify: `index.html` (sections `s6` a `s9` e CSS de componentes)

- [ ] **Step 1: Escrever os testes que falham**

Inserir em `tests/check.mjs`, depois do teste do slide 5:

```js
const GROUPS = {
  6: ['brainstorming', 'writing-plans', 'executing-plans'],
  7: ['test-driven-development', 'systematic-debugging', 'verification-before-completion'],
  8: ['subagent-driven-development', 'dispatching-parallel-agents', 'using-git-worktrees'],
  9: ['requesting-code-review', 'receiving-code-review', 'finishing-a-development-branch',
      'writing-skills', 'using-superpowers'],
};

for (const [n, skills] of Object.entries(GROUPS)) {
  test(`slide ${n}: grupo com ${skills.length} skills, antes/depois e resultado`, () => {
    const s = slide(Number(n));
    assert.equal(count(s, 'class="group-band"'), 1);
    assert.equal(count(s, 'class="group-result"'), 1);
    assert.equal(count(s, 'class="skill-row"'), skills.length);
    assert.equal(count(s, 'class="skill-before"'), skills.length);
    assert.equal(count(s, 'class="skill-after"'), skills.length);
    for (const name of skills) {
      assert.match(s, new RegExp(`<h2 class="skill-name">${name}</h2>`));
    }
  });
}
```

- [ ] **Step 2: Rodar e confirmar que falham**

Run: `node tests/check.mjs`
Expected: `FAIL` nos quatro testes `slide 6` a `slide 9`.

- [ ] **Step 3: Adicionar o CSS**

Inserir antes de `      /* === fim dos componentes === */`:

```css
    /* Slides 6 a 9 — grupos */
    .slide--group { flex-direction: row; padding: 0; }
    .group-band {
      display: flex;
      flex-direction: column;
      width: 600px;
      padding: 96px 64px 120px;
      background: var(--g);
      color: var(--on-g, var(--white));
    }
    .group-num { font: 800 180px/1 var(--font); letter-spacing: -0.04em; }
    .group-title {
      margin: 24px 0 0;
      font-size: 64px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    }
    .group-result { margin: auto 0 0; font-size: 34px; line-height: 1.3; font-weight: 700; }
    .group-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 28px;
      padding: 96px 120px 120px 80px;
    }
    .skill-head,
    .skill-row {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      column-gap: 40px;
    }
    .skill-head {
      font: 600 20px/1 var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .skill-row { row-gap: 8px; padding-top: 24px; border-top: 1px solid var(--line); }
    .skill-name {
      grid-column: 1 / -1;
      margin: 0;
      font: 600 30px/1.2 var(--mono);
      color: var(--g-ink, var(--g));
    }
    .skill-before { margin: 0; font-size: 26px; line-height: 1.35; color: var(--muted); }
    .skill-after { margin: 0; font-size: 28px; line-height: 1.35; font-weight: 500; color: var(--navy); }
    .slide--compact .group-body { gap: 18px; }
    .slide--compact .skill-row { padding-top: 16px; }
    .slide--compact .skill-name { font-size: 26px; }
    .slide--compact .skill-before { font-size: 23px; }
    .slide--compact .skill-after { font-size: 25px; }
```

- [ ] **Step 4: Substituir as sections `s6` a `s9`**

Substituir a `<section … id="s6">` inteira por:

```html
    <section class="slide slide--light slide--group" id="s6" aria-label="Pensar antes de codar" style="--g: var(--g1); --g-ink: #E85D04; --on-g: var(--navy)">
      <aside class="group-band" data-bleed>
        <span class="group-num">01</span>
        <h1 class="group-title">Pensar antes de codar</h1>
        <p class="group-result">Menos retrabalho: o código nasce do entendimento.</p>
      </aside>
      <div class="group-body">
        <div class="skill-head"><span>Sem a skill</span><span>Com a skill, o agente…</span></div>
        <article class="skill-row">
          <h2 class="skill-name">brainstorming</h2>
          <p class="skill-before">Pedido vago vira código errado.</p>
          <p class="skill-after">faz perguntas uma a uma, propõe 2 ou 3 abordagens e só avança com um design aprovado.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">writing-plans</h2>
          <p class="skill-before">Tarefa grande vira improviso.</p>
          <p class="skill-after">quebra o trabalho em passos pequenos, com arquivos, testes e critério de pronto.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">executing-plans</h2>
          <p class="skill-before">O plano é esquecido no meio do caminho.</p>
          <p class="skill-after">executa o plano em lotes, com pontos de revisão.</p>
        </article>
      </div>
    </section>
```

Substituir a `<section … id="s7">` inteira por:

```html
    <section class="slide slide--light slide--group" id="s7" aria-label="Qualidade e disciplina" style="--g: var(--g2)">
      <aside class="group-band" data-bleed>
        <span class="group-num">02</span>
        <h1 class="group-title">Qualidade e disciplina</h1>
        <p class="group-result">Confiança: cada afirmação tem evidência.</p>
      </aside>
      <div class="group-body">
        <div class="skill-head"><span>Sem a skill</span><span>Com a skill, o agente…</span></div>
        <article class="skill-row">
          <h2 class="skill-name">test-driven-development</h2>
          <p class="skill-before">Teste escrito depois só confirma o código.</p>
          <p class="skill-after">segue vermelho, verde, refatorar: o teste falha primeiro.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">systematic-debugging</h2>
          <p class="skill-before">O bug é “consertado” no chute.</p>
          <p class="skill-after">reproduz, isola e encontra a causa raiz antes de corrigir.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">verification-before-completion</h2>
          <p class="skill-before">“Pronto!” sem prova.</p>
          <p class="skill-after">só declara pronto com evidência: teste rodado, saída conferida.</p>
        </article>
      </div>
    </section>
```

Substituir a `<section … id="s8">` inteira por:

```html
    <section class="slide slide--light slide--group" id="s8" aria-label="Escala com agentes" style="--g: var(--g3)">
      <aside class="group-band" data-bleed>
        <span class="group-num">03</span>
        <h1 class="group-title">Escala com agentes</h1>
        <p class="group-result">Mais trabalho em paralelo sem perder o controle.</p>
      </aside>
      <div class="group-body">
        <div class="skill-head"><span>Sem a skill</span><span>Com a skill, o agente…</span></div>
        <article class="skill-row">
          <h2 class="skill-name">subagent-driven-development</h2>
          <p class="skill-before">Um agente só se perde num contexto longo.</p>
          <p class="skill-after">entrega cada tarefa do plano a um subagente novo, com revisão entre tarefas.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">dispatching-parallel-agents</h2>
          <p class="skill-before">Problemas independentes resolvidos em fila.</p>
          <p class="skill-after">dispara vários agentes em paralelo, um por problema.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">using-git-worktrees</h2>
          <p class="skill-before">Tarefas paralelas se atropelam no mesmo diretório.</p>
          <p class="skill-after">isola cada frente de trabalho na sua própria worktree.</p>
        </article>
      </div>
    </section>
```

Substituir a `<section … id="s9">` inteira por:

```html
    <section class="slide slide--light slide--group slide--compact" id="s9" aria-label="Revisão e entrega" style="--g: var(--g4)">
      <aside class="group-band" data-bleed>
        <span class="group-num">04</span>
        <h1 class="group-title">Revisão e entrega</h1>
        <p class="group-result">O ciclo fecha e o conhecimento vira skill.</p>
      </aside>
      <div class="group-body">
        <div class="skill-head"><span>Sem a skill</span><span>Com a skill, o agente…</span></div>
        <article class="skill-row">
          <h2 class="skill-name">requesting-code-review</h2>
          <p class="skill-before">O agente revisa o próprio trabalho, com o próprio viés.</p>
          <p class="skill-after">pede uma revisão independente antes de integrar.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">receiving-code-review</h2>
          <p class="skill-before">Aceita toda sugestão sem pensar.</p>
          <p class="skill-after">avalia cada sugestão com rigor técnico e contesta quando necessário.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">finishing-a-development-branch</h2>
          <p class="skill-before">Branch pronta e esquecida.</p>
          <p class="skill-after">apresenta opções claras: merge, PR ou limpeza.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">writing-skills</h2>
          <p class="skill-before">O time aprende algo e o conhecimento se perde.</p>
          <p class="skill-after">transforma o aprendizado numa nova skill, testada.</p>
        </article>
        <article class="skill-row">
          <h2 class="skill-name">using-superpowers</h2>
          <p class="skill-before">O agente não sabe que as skills existem.</p>
          <p class="skill-after">procura e usa a skill certa antes de agir. É a porta de entrada.</p>
        </article>
      </div>
    </section>
```

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `node tests/check.mjs`
Expected: `todos os testes passaram`. Se o slide 9 transbordar, reduza `.slide--compact .group-body { gap }` para `12px` e `.slide--compact .skill-row { padding-top }` para `12px` e rode de novo.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check.mjs
git commit -m "feat: slides dos quatro grupos de skills"
```

---

### Task 5: Slide 10 (fluxo completo e como começar)

**Files:**
- Modify: `tests/check.mjs`
- Modify: `index.html` (section `s10` e CSS de componentes)

- [ ] **Step 1: Escrever o teste que falha**

Inserir em `tests/check.mjs`, depois dos testes dos grupos:

```js
test('slide 10: fluxo de 7 etapas e comando de instalação', () => {
  const s = slide(10);
  assert.equal(count(s, 'class="flow-step"'), 7);
  assert.match(s, /npx skills add https:\/\/github\.com\/obra\/superpowers/);
  assert.match(s, /github\.com\/obra\/superpowers/);
  assert.match(s, /software confiável/);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node tests/check.mjs`
Expected: `FAIL slide 10: …`.

- [ ] **Step 3: Adicionar o CSS**

Inserir antes de `      /* === fim dos componentes === */`:

```css
    /* Slide 10 — fluxo completo */
    .flow {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 16px;
      margin: 56px 0 0;
      padding: 0;
      list-style: none;
    }
    .flow-step {
      position: relative;
      min-height: 190px;
      padding: 20px 20px 24px;
      border-top: 8px solid var(--g);
      border-radius: 16px;
      background: rgba(220, 236, 250, 0.08);
    }
    .flow-step > span {
      display: block;
      margin-bottom: 12px;
      font: 600 20px/1 var(--mono);
      color: var(--blue-light);
    }
    .flow-step code {
      display: block;
      font-size: 21px;
      line-height: 1.3;
      font-weight: 600;
      color: var(--white);
    }
    .flow-step small {
      display: block;
      margin-top: 10px;
      font: 400 17px/1.3 var(--mono);
      color: var(--blue-light);
    }
    .flow-step:not(:last-child)::after {
      content: "›";
      position: absolute;
      top: 50%;
      right: -14px;
      transform: translateY(-50%);
      font: 800 32px/1 var(--font);
      color: var(--blue-light);
    }
    .start {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 64px;
      align-items: end;
      margin-top: auto;
    }
    .code-card--dark {
      margin-top: 16px;
      padding: 24px 32px;
      border: 1px solid rgba(220, 236, 250, 0.2);
      background: rgba(220, 236, 250, 0.08);
      color: var(--white);
      font-size: 24px;
    }
    .code-card--dark .prompt { color: var(--g1); }
    .start-alt { margin: 16px 0 0; font-size: 26px; color: var(--blue-light); }
    .start-alt strong { color: var(--white); }
    .start-links { margin: 12px 0 0; font-size: 22px; color: var(--blue-light); }
    .closing { margin: 0; font-size: 52px; line-height: 1.1; font-weight: 800; color: var(--white); }
    .closing em { font-style: normal; color: var(--g1); }
```

- [ ] **Step 4: Substituir a section `s10`**

Substituir a `<section … id="s10">` inteira por:

```html
    <section class="slide slide--dark" id="s10" aria-label="O fluxo completo">
      <p class="kicker">Juntando tudo</p>
      <h1 class="title">O fluxo <em>completo</em></h1>
      <ol class="flow">
        <li class="flow-step" style="--g: var(--g1)"><span>01</span><code>brainstorming</code></li>
        <li class="flow-step" style="--g: var(--g1)"><span>02</span><code>writing-<wbr>plans</code></li>
        <li class="flow-step" style="--g: var(--g3)"><span>03</span><code>using-<wbr>git-<wbr>worktrees</code></li>
        <li class="flow-step" style="--g: var(--g3)"><span>04</span><code>subagent-<wbr>driven-<wbr>development</code><small>+ test-<wbr>driven-<wbr>development</small></li>
        <li class="flow-step" style="--g: var(--g4)"><span>05</span><code>requesting-<wbr>code-<wbr>review</code></li>
        <li class="flow-step" style="--g: var(--g2)"><span>06</span><code>verification-<wbr>before-<wbr>completion</code></li>
        <li class="flow-step" style="--g: var(--g4)"><span>07</span><code>finishing-<wbr>a-<wbr>development-<wbr>branch</code></li>
      </ol>
      <div class="start">
        <div>
          <p class="catalog-label">Como começar</p>
          <pre class="code-card code-card--dark"><code><span class="prompt">$</span> npx skills add https://github.com/obra/superpowers</code></pre>
          <p class="start-alt">ou, no Claude Code, instale o plugin <strong>superpowers</strong></p>
          <p class="start-links mono">skills.sh/obra · github.com/obra/superpowers</p>
        </div>
        <p class="closing">Agentes rápidos + método = <em>software confiável</em>.</p>
      </div>
    </section>
```

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `node tests/check.mjs`
Expected: `todos os testes passaram`.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check.mjs
git commit -m "feat: slide do fluxo completo e como começar"
```

---

### Task 6: Revisão visual com capturas de tela

**Files:**
- Create: `tests/screenshots.sh`
- Create: `.gitignore`

- [ ] **Step 1: Criar o script de capturas**

Criar `tests/screenshots.sh`:

```bash
#!/usr/bin/env bash
# Gera uma captura PNG de cada slide em 1920x1080 e 1366x768.
# Uso: tests/screenshots.sh [pasta-de-saída]
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/screenshots}"
mkdir -p "$OUT"

for size in 1920,1080 1366,768; do
  for n in $(seq 1 10); do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --window-size="$size" --virtual-time-budget=8000 \
      --screenshot="$OUT/${size/,/x}-$(printf %02d "$n").png" \
      "file://$ROOT/index.html#$n" >/dev/null 2>&1
  done
done

echo "Capturas salvas em $OUT"
```

Criar `.gitignore`:

```
screenshots/
```

- [ ] **Step 2: Gerar as capturas**

Run: `chmod +x tests/screenshots.sh && tests/screenshots.sh`
Expected: `Capturas salvas em …/screenshots` e 20 arquivos PNG (`1920x1080-01.png` … `1366x768-10.png`).

- [ ] **Step 3: Revisar cada captura**

Abrir cada PNG e conferir, slide a slide:
- nenhum texto cortado, sobreposto ou encostado no contador;
- títulos quebram nas linhas previstas no HTML (com `<br>`);
- as cores dos grupos batem entre o mapa (slide 5), as faixas (slides 6 a 9) e o fluxo (slide 10);
- em 1366×768 o palco aparece inteiro, com faixas azul-marinho nas bordas e sem rolagem.

Para cada problema encontrado: ajustar o CSS do componente no `index.html`, rodar `node tests/check.mjs` (deve continuar `todos os testes passaram`) e gerar as capturas de novo.

- [ ] **Step 4: Rodar a suíte completa**

Run: `node tests/check.mjs`
Expected: 16 linhas `ok` e `todos os testes passaram`.

- [ ] **Step 5: Commit**

```bash
git add tests/screenshots.sh .gitignore index.html
git commit -m "test: capturas de tela para revisão visual"
```
