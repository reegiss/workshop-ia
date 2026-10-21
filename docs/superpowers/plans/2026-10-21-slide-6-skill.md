# Slide 6 (skill é um processo em arquivo) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mostrar no slide 6 (`#s3`) o `SKILL.md` em duas partes (sempre no contexto / só quando é usada), encurtar o texto de abertura e dar aos cards o contraste "consegue fazer / deve fazer".

**Architecture:** Deck HTML estático. O slide 6 é a `<section id="s3">` em `index.html`; o estilo fica no bloco "Slide 3 — o que é uma skill" de `styles.css` (linhas ~212-242) e nas regras `#s3` (linhas ~952-953). O cartão de código vira um `div.code-card.skill-file` com dois `<pre>` (um por parte), para o filete e os rótulos ficarem em CSS.

**Tech Stack:** HTML, CSS, Google Chrome headless (só screenshot).

**Spec:** `docs/superpowers/specs/2026-10-21-slide-6-skill-design.md`

**Regras gerais:**
- Branch `feat/introducao-agentica`. Commits locais, sem push.
- **Sem scripts de teste** (pedido do usuário): a conferência é por screenshot.
- **Não** regerar o PDF (adiado até o fim das edições).
- Commits terminam com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Preserve os caracteres Unicode (…, –, ·, acentos) exatamente.
- `SCRATCH=/private/tmp/claude-501/-Users-regis-develop-stef-apresentacao/5eff213f-5604-4cb5-9614-b1c0cf4a5029/scratchpad`

---

### Task 1: Conteúdo e visual do slide 6

**Files:**
- Modify: `index.html` (section `#s3`, linhas ~93-113)
- Modify: `styles.css` (linhas ~222-242 e ~952-953)

- [ ] **Step 1: Texto de abertura**

Em `#s3`, trocar o `<p class="lead">…</p>` atual por:

```html
<p class="lead">Uma pasta com um <code>SKILL.md</code>: nome, descrição e instruções. O agente a usa quando a descrição combina com o pedido, ou quando você a cita (<code>/nome</code>).</p>
```

- [ ] **Step 2: Cartão de código em duas partes**

Trocar o bloco atual:

```html
          <pre class="code-card"><code>---
name: brainstorming
description: Use antes de qualquer
  trabalho criativo…
---</code></pre>
          <p class="code-caption">Isto fica sempre no contexto. O resto do arquivo, só quando precisa.</p>
```

por (o conteúdo dos `<pre>` começa colado à tag e não tem indentação, porque o espaço dentro de `<pre>` aparece na tela):

```html
          <div class="code-card skill-file">
            <pre class="skill-part"><span class="skill-tag" aria-hidden="true">Sempre no contexto</span><code>---
name: brainstorming
description: Use antes de qualquer
  trabalho criativo…
---</code></pre>
            <pre class="skill-part skill-part--body"><span class="skill-tag" aria-hidden="true">Só quando é usada</span><code># Brainstorming
1. Explore o contexto do projeto
2. Faça uma pergunta por vez
3. Proponha 2–3 abordagens…</code></pre>
          </div>
```

- [ ] **Step 3: Cards da comparação**

Trocar os três `<article class="compare…">` por:

```html
          <article class="compare"><h2>Prompt</h2><p><strong>O que você pede agora.</strong> Some quando a conversa acaba.</p></article>
          <article class="compare"><h2>Ferramenta · MCP</h2><p><strong>O que o agente consegue fazer:</strong> ler arquivo, rodar comando, acessar um serviço.</p></article>
          <article class="compare compare--skill"><h2>Skill</h2><p><strong>Como o agente deve fazer:</strong> um método versionado e revisável como código.</p></article>
```

- [ ] **Step 4: CSS**

Em `styles.css`, apagar a regra da legenda (a classe só existia no slide 6):

```css
.code-caption { margin: 14px 0 0; font: 500 20px/1.4 var(--mono); color: var(--ink-2); opacity: 0.75; }
```

e, no mesmo lugar, acrescentar:

```css
.skill-file { white-space: normal; }
.skill-part { position: relative; margin: 0; font: inherit; color: inherit; white-space: pre; }
.skill-part--body { margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--card-line); }
.skill-part--body code { opacity: 0.5; }
.skill-tag { position: absolute; top: 0; right: 0; font: 600 16px/1.2 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
.skill-part--body .skill-tag { top: 20px; color: var(--ink-2); opacity: 0.75; }
```

Logo depois de `.compare--skill h2, .compare--skill p { color: var(--white); }`, acrescentar:

```css
.compare p strong { font-weight: 700; color: var(--ink); }
.compare--skill p strong { color: var(--white); }
```

As regras `#s3 .concept` e `#s3 .code-card` continuam.

- [ ] **Step 5: Screenshot**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=10000 --screenshot=$SCRATCH/slide6.png "file:///Users/regis/develop/stef/apresentacao/index.html?export#6"
```

Abrir `$SCRATCH/slide6.png` (Read) e conferir:
- o cartão sem linhas em branco extras no topo, entre as partes ou no fim;
- o filete tracejado entre as duas partes;
- os rótulos no canto direito, sem encostar no código;
- a parte de baixo apagada, mas legível;
- os destaques no começo dos cards;
- o slide termina acima da faixa do contador (y < 1008).

Se o cartão passar de y≈1000, reduzir em `#s3 .code-card` o padding para `20px 40px` e, se ainda faltar, `.skill-part--body` para `margin-top: 14px; padding-top: 14px` (com `.skill-part--body .skill-tag { top: 14px; }`).

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css
git commit -m "content: slide 6 com o SKILL.md em duas partes, abertura curta e cards paralelos

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Fora deste plano

- Guia do apresentador: não muda (spec).
- Regerar e renomear o PDF (`desenvolvimento-verificavel.pdf`): adiado até o usuário encerrar as edições.
