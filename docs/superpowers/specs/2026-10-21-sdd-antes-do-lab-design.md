# SDD antes do laboratório — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `workshop/guia-do-apresentador.md` e
`workshop/guia-do-participante.md` na branch `feat/introducao-agentica`.

## Objetivo

Trazer os três slides de SDD do apêndice para a parte de conceitos, logo depois do slide 8
(evidência), sem atrasar o início do laboratório (15:00).

## Nova ordem (35 slides)

| # | Slide |
|---|---|
| 1–8 | sem mudança |
| 9 | SDD: a spec vem primeiro (`#s-sdd`) |
| 10 | O fluxo de hoje já é SDD (`#s-sdd-map`) |
| 11 | Spec Kit: SDD como ferramenta (`#s-sdd-kit`) |
| 12 | O agente pergunta antes de codar |
| 13 | Pronto para começar? |
| 14 | Regras do laboratório |
| 15–17 | Laboratório, etapas 1 a 3 |
| 18 | O que as evidências mostraram |
| 19 | Depois do primeiro teste |
| 20 | Limites e controles |
| 21 | Próximo passo |
| 22 | Divisória do apêndice |
| 23–35 | Apêndice (mapa, grupos, detalhes, fluxo completo, obra, plataformas), sem mudança |

## Conteúdo

- `#s-sdd-map`: título "O fluxo de hoje<br><em>já é SDD</em>"; a linha "Implementar" fica só
  com `test-driven-development` (sai `executing-plans`, que não está entre as quatro skills
  instaladas).
- Divisória do apêndice: sai o item "SDD: Spec-Driven Development e o Spec Kit".
- Slide 3: a descrição de Conceitos passa a "o problema, a anatomia de um agente, skills, o
  fluxo mínimo e SDD".

## Guia do participante

"Como continuar depois do workshop": o pedido passa a ser "Continue o plano a partir da
Tarefa 2, com /test-driven-development." (funciona com as quatro skills instaladas).

## Guia do apresentador

- Cronograma:

| Min | Slides | O que fazer |
|---|---|---|
| 0:00–1:30 | 1–3 | Abertura; pedir "pronto" no chat |
| 1:30–7:00 | 4–7 | Ritmo firme, sem demonstração |
| 7:00–8:00 | 8 | Definir "confiável" |
| 8:00–11:30 | 9–11 | SDD: spec primeiro, o mapa e o Spec Kit (1 min) |
| 11:30–13:30 | 12 | Exemplo da lista de bancos |
| 13:30–15:00 | 13–14 | Contar os "pronto"; duplas; colar o guia no chat |
| 15:00–40:00 | 15–17 | Laboratório |
| 40:00–43:00 | 18 | Ler os checkpoints do chat |
| 43:00–49:00 | 19–20 | Escala e limites |
| 49:00–52:00 | 21 | Próximos passos |
| 52:00–60:00 | — | Perguntas e folga |

- "Se atrasar…": corte dos slides 4–12. Sai o parágrafo do bloco opcional.
- Slide a slide: as três entradas de SDD entram depois do 8, numeradas 9, 10 e 11, com os
  tempos do cronograma; a fala do mapa vai para o futuro ("O laboratório vai seguir esse
  caminho: o brainstorming gera a spec, o writing-plans gera plano e tarefas, e o TDD
  implementa com evidência."). As entradas seguintes são renumeradas (9→12 … 18→21). Sai a
  seção "Bloco opcional: SDD".
- Referências: `#20` vira `#9` ("primeiro slide de SDD"); "slide 15" (retrospectiva) vira 18;
  mapa do apêndice passa a "slides 22–35", sem a linha de SDD, com a divisória em 22;
  perguntas prováveis: SDD aponta para os slides 9–11; "Slide 8" e os slides do apêndice
  (23–35) não mudam.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Mudanças visuais nos slides de SDD.

## Critérios de aceite

- O deck tem 35 slides na ordem acima; `?check` sem transbordo; screenshots dos slides 9 a
  11 sem colisão.
- Nenhuma referência a número de slide no guia aponta para o slide errado.
- O guia do participante não pede mais `/executing-plans`.
