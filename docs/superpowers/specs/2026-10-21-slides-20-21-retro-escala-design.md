# Slides 20 (retrospectiva) e 21 (depois do primeiro teste) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Slide 20: um card por checkpoint do laboratório, com a evidência do slide 8.
2. Slide 20: pergunta de retrospectiva que volta aos problemas do slide 4.
3. Slide 21: avisar que as três skills não foram instaladas e onde está o comando.
4. Slide 21: ligar ao laboratório e simplificar o card 1.

## Slide 20 (`#s-retro`)

Três cards (estrutura `.rules`), cada um com rótulo da etapa (mono pequeno, `--g1`), título,
pergunta e, no pé, após um filete, o rótulo "Evidência" e o texto:

| Rótulo | Título | Pergunta | Evidência |
|---|---|---|---|
| Etapa 1 · Esclarecer | A pergunta mais útil | Que requisito ela esclareceu antes do código? | requisito esclarecido |
| Etapa 2 · Planejar | Quantas tarefas? | Alguém precisou cortar? | plano revisável |
| Etapa 3 · Vermelho → verde | Quantos chegaram ao verde? | Pela saída colada no chat. | teste falhando, depois passando |

- Abaixo, em `--ink-2`: "Onde travou? Travar também é dado: mostra onde o processo protege."
- No pé: rótulo "Para a turma"; pergunta (~36px, negrito) "Dos três problemas do começo,
  qual o processo evitou hoje?"; três pílulas `--panel`: implementar antes de esclarecer ·
  teste escrito só para passar · “pronto” sem evidência.

## Slide 21 (`#s-escala`)

- Lead: "Você fez a Tarefa 1. As tarefas 2 e 3 seguem o mesmo método, e a entrega ganha
  revisão."
- Card 1: "seguir o plano tarefa a tarefa" + `<small>` "com subagentes, onde houver
  suporte" (`--muted`). Cards 2 e 3 sem mudança. Cards mais baixos.
- Pé, em `--ink-2`: "Essas três não vieram na instalação de hoje. O comando com o fluxo
  completo está no apêndice (**slide 33**)."
- Regras presas a `#s-retro` e `#s-escala`.

## Guia do apresentador

- 20: "Vamos ler o chat na ordem das etapas: a pergunta mais útil, quantas tarefas e
  quantos chegaram ao verde. Onde travou também é dado. E dos três problemas do começo,
  qual o processo evitou hoje?"
- 21: "Vocês fizeram a Tarefa 1. O resto é repetição com controle: tarefa a tarefa,
  revisão e fechamento. Essas skills não vieram na instalação de hoje: o comando está no
  slide 33. Subagentes só onde a sua ferramenta suportar."

## Fora do escopo

- O PDF: adiado até o fim das edições.

## Critérios de aceite

- Slides 20 e 21 com os textos acima; `?check` sem transbordo; screenshots sem colisão.
