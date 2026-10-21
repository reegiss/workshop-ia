# Slides 26 a 29 (grupos de skills) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html` e `styles.css` na branch `feat/introducao-agentica`.

## Objetivo

1. Etiqueta de status em cada skill, com os mesmos três estados do slide 25.
2. Nas quatro skills de hoje, uma linha que liga ao laboratório.
3. executing-plans como alternativa ao subagent-driven-development (coerente com o slide 21).
4. Objetivo do slide 26 sem repetir o título.

## Etiquetas (slides 26 a 29)

Chip pequeno (~16px) dentro do `.skill-name`, depois do nome: `chip--used` "instalada
hoje", `chip--full` "fluxo completo", `chip--suggest` "outra".

| Slide | instalada hoje | fluxo completo | outra |
|---|---|---|---|
| 26 | brainstorming, writing-plans | — | executing-plans |
| 27 | test-driven-development, verification-before-completion | — | systematic-debugging |
| 28 | — | subagent-driven-development, using-git-worktrees | dispatching-parallel-agents |
| 29 | — | requesting-code-review, finishing-a-development-branch | receiving-code-review, writing-skills, using-superpowers |

## Linha do laboratório

`p.skill-lab` logo abaixo do nome, largura total da linha, mono pequeno na cor do grupo:

- brainstorming → "Etapa 1 · design aprovado"
- writing-plans → "Etapa 2 · plano com até 3 tarefas"
- test-driven-development → "Etapa 3 · vermelho, depois verde"
- verification-before-completion → "Etapa 3 · você roda o teste"

## Textos

- 26, executing-plans, coluna "com a skill": "executa o plano em lotes, com pontos de
  revisão. É a alternativa ao `subagent-driven-development` quando não há subagentes."
- 26, objetivo: "Objetivo: chegar ao código com spec e plano aprovados."

## Fora do escopo

- Guias: sem mudança. O PDF: adiado até o fim das edições.

## Critérios de aceite

- Slides 26 a 29 com etiquetas e textos acima; `?check` sem transbordo; screenshots sem
  colisão (atenção ao 29, com cinco linhas).
