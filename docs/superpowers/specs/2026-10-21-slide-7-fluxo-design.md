# Slide 7 (fluxo mínimo) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Ligar cada skill ao problema do slide 4 que ela evita (linha **Evita**).
2. Alinhar as linhas dos cards e ocupar o espaço vazio.
3. Dar a cada card um título em português, com o nome da skill menor abaixo.

## Escopo do CSS

O componente `.mini-flow` também é usado em `#s-sdd` e em outro slide (`style="--n: 3"`).
Todas as regras novas ficam presas a `#s-fluxo-min`; os outros slides não mudam.

## Cards (`#s-fluxo-min .mini-flow`)

Cada `<li>` passa a ter, nesta ordem: o número (o `::before` atual), o título, o nome da
skill, a descrição e a linha Evita.

| # | Título | Skill | Descrição (atual) | Evita |
|---|---|---|---|---|
| 01 | Esclarecer | `brainstorming` | requisito e design aprovados | implementar antes de esclarecer o requisito |
| 02 | Planejar | `writing-plans` | plano em passos pequenos | a revisão toda no fim |
| 03 | Testar primeiro | `test-driven-development` | teste vermelho, depois verde | o teste escrito depois, só para passar |
| 04 | Verificar | `verification-before-completion` | “pronto” só com evidência | o “pronto” sem evidência |

- **Título:** grande, em negrito e em `--ink`.
- **Skill:** mono, menor e em `--ink-2`, mantendo os `<wbr>` nos hífens. No máximo duas
  linhas.
- **Descrição:** como hoje, em `--ink-2`.
- **Evita:** no pé do card, separada por um filete (`--card-line`). Rótulo "Evita" em mono,
  pequeno, maiúsculo, na cor do card (`var(--g)`); texto abaixo em `--ink`, menor que a
  descrição. Mesmo padrão do "Entrega" do slide 3.

## Alinhamento

Os cards usam CSS subgrid com cinco linhas (número, título, skill, descrição, Evita), para
que cada linha e os filetes fiquem na mesma altura nos quatro cards. As setas entre os
cards continuam.

## O que não muda

Título do slide, kicker, setas, cores dos cards e a nota "O pacote tem 14 skills…".

## Guia do apresentador

Na entrada "### 7 · Quatro skills para o fluxo mínimo (2 min)", a fala passa a ser:
"O pacote tem catorze skills, mas hoje usamos quatro: esclarecer, planejar, testar
primeiro e verificar. Cada uma evita um dos problemas que vimos no começo." A mensagem não
muda.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Um novo título para o slide e rótulos de grupo para as cores.
- Scripts de teste: a conferência é por screenshot.

## Critérios de aceite

- O slide 7 mostra os quatro cards com os textos da tabela.
- No screenshot, títulos, skills, descrições e filetes ficam alinhados nos quatro cards;
  nada colide; o slide termina acima da faixa do contador.
- Os slides que também usam `.mini-flow` continuam iguais.
- O guia tem a fala nova do slide 7.
