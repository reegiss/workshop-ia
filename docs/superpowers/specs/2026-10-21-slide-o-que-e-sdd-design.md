# Slide "O que é SDD" — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

Explicar o que é SDD antes do fluxo (spec → plano → tarefas → código): a diferença para o
código primeiro, o que uma spec contém e por que ela importa com agentes.

## Posição

Slide novo `#s-sdd-intro`, logo depois de `#s-confiavel` (slide 8) e antes de `#s-sdd`. O
deck passa a 36 slides: SDD em 9–12, pergunta 13, pronto 14, regras 15, laboratório 16–18,
retrospectiva 19, escala 20, limites 21, próximos passos 22, divisória do apêndice 23,
apêndice 24–36.

## Conteúdo

- Kicker: "Spec-Driven Development". Título: "O que é <em>SDD</em>".
- Lead: "Desenvolvimento guiado por especificação: antes do código, você escreve o que o
  sistema deve fazer. A spec vira a referência para planejar, implementar e verificar."
- Dois cards lado a lado, com três linhas alinhadas por subgrid:

| Linha | Código primeiro | Spec primeiro |
|---|---|---|
| Fluxo | pedido → código | pedido → spec → código |
| Lacunas | o agente preenche sozinho | viram perguntas, e você decide antes |
| Pronto | parece certo | cumpre a spec |

- Rodapé: rótulo "Uma spec tem" e quatro pílulas: objetivo · requisitos · critérios de
  aceite · fora do escopo.

## Visual

- Cards no estilo de cartão do deck (`--card`, `--card-line`, `--radius`), com filete no
  topo: `--muted` no "Código primeiro" e `--accent` no "Spec primeiro".
- Cabeçalho do card em negrito, grande. Rótulos das linhas (FLUXO, LACUNAS, PRONTO) em mono
  pequeno e maiúsculo, em `--ink-2`; texto em `--ink`. As setas "→" do fluxo em `--accent`
  no card da spec.
- Pílulas como as do slide de "pronto para começar" (`--panel`, cantos arredondados).
- Todas as regras novas ficam presas a `#s-sdd-intro`.

## Guia do apresentador

- Entrada nova "### 9 · O que é SDD (1,5 min)": **Mensagem:** a spec é a referência do
  trabalho, não um documento a mais. **Fala:** "SDD é desenvolvimento guiado por
  especificação. Sem spec, o agente preenche as lacunas sozinho, como a ordem da lista no
  slide 4. Com spec, as lacunas viram perguntas, e 'pronto' passa a ser cumprir a spec."
- Renumeração: entradas 9–21 viram 10–22. Tempos: 10 (1 min), 11 (0,5 min), 12 (1 min),
  13 (1,5 min).
- Cronograma:

| Min | Slides | O que fazer |
|---|---|---|
| 0:00–1:30 | 1–3 | sem mudança |
| 1:30–7:00 | 4–7 | sem mudança |
| 7:00–8:00 | 8 | Definir "confiável" |
| 8:00–12:00 | 9–12 | SDD: o que é, o fluxo, o mapa e o Spec Kit (1 min) |
| 12:00–13:30 | 13 | Exemplo da lista de bancos |
| 13:30–15:00 | 14–15 | Contar os "pronto"; duplas; colar o guia no chat |
| 15:00–40:00 | 16–18 | Laboratório |
| 40:00–43:00 | 19 | Ler os checkpoints do chat |
| 43:00–49:00 | 20–21 | Escala e limites |
| 49:00–52:00 | 22 | Próximos passos |

- Abaixo do cronograma: "Se atrasar…" corta dos slides 4–13; e "Se o ensaio estourar, o
  Spec Kit (slide 12) é o primeiro a sair."
- Referências: retrospectiva "slide 18" → 19; "os mesmos 35 slides" → 36; mapa do apêndice
  "slides 23–36" com todas as linhas +1; perguntas prováveis: 33–35 → 34–36, 27 → 28,
  SDD 9–11 → 9–12; o atalho `#9` continua (primeiro slide de SDD).

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Mudanças nos slides 10–12.

## Critérios de aceite

- 36 slides na ordem acima; `?check` sem transbordo; screenshot do slide 9 sem colisão,
  com as linhas alinhadas nos dois cards.
- Nenhuma referência a número de slide no guia aponta para o slide errado.
