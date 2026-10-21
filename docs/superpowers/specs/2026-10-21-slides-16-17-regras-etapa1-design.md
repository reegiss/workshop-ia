# Slides 16 (regras) e 17 (etapa 1) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css`, `workshop/guia-do-apresentador.md` e
`workshop/guia-do-participante.md` na branch `feat/introducao-agentica`.

## Objetivo

1. Slide 16: prévia do laboratório (três etapas e tempos) ao lado do terminal.
2. Slide 16: dizer no terminal onde rodar os comandos.
3. Slide 17: tirar o passo que repete a etapa 0 e dar um critério para aprovar o design.
4. Slide 17: alinhar o recorte com o pedido do guia.

## Slide 16 (`#s-regras`)

- Abaixo dos cards (que não mudam), duas colunas alinhadas ao topo:
  - Esquerda: rótulo "Etapa 0 · 1 min · juntos" e o terminal:
    `# na pasta do repositório` (`.cmd-note`), `$ git switch -c workshop/seu-nome`,
    `$ copilot`.
  - Direita: rótulo "A seguir · 25 min" e três linhas: número em círculo `--g1`, nome em
    negrito, tempo em mono à direita — Esclarecer 8 min · Planejar 4 min · Vermelho → verde
    11 min. Abaixo, em `--ink-2`: "Um checkpoint no chat em cada etapa."
- Sai `<p class="rules-next">A seguir: 25 minutos…</p>`.

## Slide 17 (`#s-lab1`)

Passos:

1. No `copilot`, cole o pedido **da sua stack** (iOS, Android ou backend), do guia.
2. Responda às perguntas: no máximo 3, respostas curtas.
3. **Confira e aprove** o design: ordem, busca e acentos estão lá?

Recorte: "uma função pura (sem tela nem rede) que ordena por nome e filtra por nome ou
código; busca vazia devolve todas."

## Guias

- Participante, etapa 1: "Responda às perguntas do agente. Antes de aprovar, confira se o
  design cobre a ordem, a busca e os acentos."
- Apresentador, 16: a fala termina com "Agora, juntos: na pasta do repositório, criem a
  branch e abram o copilot."
- Apresentador, 17: "Oito minutos. Cole o pedido da sua stack e responda curto. Antes de
  aprovar, confira ordem, busca e acentos. Passou do tempo? Use o design pronto do guia."

## Fora do escopo

- O PDF: adiado até o fim das edições.

## Critérios de aceite

- Slides 16 e 17 com os textos acima; `?check` sem transbordo; screenshots sem colisão.
