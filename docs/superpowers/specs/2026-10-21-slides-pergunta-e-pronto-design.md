# Bloco de SDD reordenado, slide da pergunta e slide 15 — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Mostrar no slide da pergunta que cada resposta vira um requisito (numeração ①②③).
2. Ligar a abertura desse slide ao bloco de SDD.
3. Reordenar o bloco: conceito → ferramenta → exemplo → como a spec nasce → mapa → lab.
4. Slide 15: conferir as quatro skills.
5. Slide 15: uma linha de ajuda só.

## Nova ordem

| # | Slide (id) | Tempo |
|---|---|---|
| 9 | O que é SDD (`#s-sdd-intro`) | 1,5 min |
| 10 | SDD: a spec vem primeiro (`#s-sdd`) | 0,5 min |
| 11 | Spec Kit (`#s-sdd-kit`) | 1 min |
| 12 | O exemplo, etapa a etapa (`#s-sdd-exemplo`) | 1,5 min |
| 13 | O agente pergunta (`#s-pergunta`) | 1 min |
| 14 | O fluxo de hoje já é SDD (`#s-sdd-map`) | 0,5 min |

Do slide 15 em diante, nada muda de número.

## Slide 13 (`#s-pergunta`)

- Lead: "É assim que a spec nasce: o `brainstorming` pergunta, você responde, e cada
  resposta vira requisito. A saída é um design curto, **aprovado por você**."
- Terminal: as três linhas "você" ganham, no fim, os marcadores ①, ② e ③.
- Design aprovado (lista sem marcadores de bolinha):
  - ① Ordena por nome, sem diferenciar maiúsculas
  - ② Busca: nome contém o texto, ou código começa com ele
  - ③ Ordem e busca ignoram acentos
  - \+ Busca vazia devolve todas — nota "proposto pelo agente"
- Marcadores: círculo com número, em `--accent`. O "+" em `--ink-2`; a nota em mono
  pequeno, `--muted`. Regras presas a `#s-pergunta`.

## Slide 15 (`#s-copilot`)

- Passo 3: "De volta ao `copilot`: `/skills list` mostra as **quatro** skills."
- Ajuda (uma linha): "Faltou algo? Os pré-requisitos e o guia estão no chat: copie de lá,
  não da tela."

## Guia do apresentador

- Entradas reordenadas e renumeradas: 11 Spec Kit, 12 o exemplo, 13 o agente pergunta,
  14 o mapa, com os tempos acima.
- Fala do 13: "Em vez de sair codando, o agente pergunta. Cada resposta vira um requisito:
  repare nos números. E o agente também propõe; você aprova. É a primeira evidência."
- Fala do 15: incluir "confira que aparecem as quatro skills".
- Cronograma: 8:00–14:00 slides 9–14; 14:00–15:00 slides 15–16. "Se o ensaio estourar, o
  Spec Kit (slide 11) é o primeiro a sair." Perguntas prováveis: SDD nos slides 9–14.

## Fora do escopo

- O PDF: adiado até o fim das edições.

## Critérios de aceite

- Ordem acima; `?check` sem transbordo; screenshots dos slides 11–15 sem colisão.
- Números das respostas e dos requisitos batem.
- Nenhuma referência do guia aponta para o slide errado.
