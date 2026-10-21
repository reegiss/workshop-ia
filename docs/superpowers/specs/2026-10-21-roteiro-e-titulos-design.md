# Slide 3 (roteiro) e espaçamento dos títulos — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Acabar com a colisão dos acentos nos títulos de duas linhas em todo o deck.
2. Atualizar o texto do bloco "Conceitos" do roteiro.
3. Mostrar a retrospectiva no terceiro bloco do roteiro.
4. Mostrar nos cards do roteiro o que cada bloco entrega.

## 1. Espaçamento dos títulos (deck inteiro)

**Problema:** `.title` usa `line-height: 0.95` e `text-transform: uppercase`. Em títulos de
duas linhas, os acentos maiúsculos da segunda linha (Á, É, Ó…) encostam na primeira. Há
8 títulos assim: a capa e os slides `#s-roteiro`, `#s2`, `#s-fluxo-min`, `#s-confiavel`,
`#s-proximos`, `#s-sdd-map` e `#s4`.

**Mudança:** em `.title`, `line-height: 0.95` → `line-height: 1.1`. A capa já tem
`line-height: 1.1` em `.cover-title` e não muda.

**Efeito medido:** com 1.1, os títulos de duas linhas ficam cerca de 34px mais altos, e o
`?check` passa a acusar os slides 6, 20 e 21. Ajustes locais, um por slide, no padrão
de regras por id que o `styles.css` já usa:

| Slide | Elemento que transborda | Ajuste |
|---|---|---|
| 6 (`#s3`) | `.code-caption` | Reduzir a margem acima de `.concept` e o padding vertical de `.code-card`, só em `#s3`, até não transbordar |
| 20 (`#s-sdd`) | rodapé dos cards do `.mini-flow` | `#s-sdd .mini-flow li { min-height }` de 400px para cerca de 360px |
| 21 (`#s-sdd-map`) | última linha da `.sdd-map` | Padding vertical das linhas da `.sdd-map` de 24px para cerca de 18px, só em `#s-sdd-map` |

Os valores finais são os menores ajustes que zeram o `?check`, conferidos por screenshot.

## 2–4. Conteúdo do slide 3 (`#s-roteiro`)

O título "60 minutos, *25 de prática*" e a barra de três segmentos proporcionais
(`--span: 15 / 25 / 20`) continuam. Cada segmento ganha uma linha **Entrega** no pé:

| Segmento | Título | Descrição | Entrega |
|---|---|---|---|
| 0:00–0:15 | Conceitos | o problema, a anatomia de um agente, skills e o fluxo mínimo | um vocabulário comum para o resto da hora |
| 0:15–0:40 | Laboratório | esclarecer, planejar e testar primeiro, no seu repositório | design aprovado, plano, teste vermelho → verde, commit local |
| 0:40–1:00 | Retrospectiva e limites | o que as evidências mostraram, o que vem depois e perguntas | as evidências da turma, lidas no chat |

**Visual da linha Entrega:**
- fica no pé do card, empurrada para baixo e separada da descrição por um filete
  (`--card-line`);
- o rótulo "Entrega" vai em mono, maiúsculo e pequeno, na cor do segmento: `--accent` nos
  cards azuis e `--g1` no laboratório, igual ao horário;
- o texto vai abaixo do rótulo, menor que a descrição, em `--ink`.

A estrutura atual de cada segmento usa `span:last-child` para estilizar a descrição. A
linha nova não pode quebrar esse seletor: a descrição deve ganhar uma classe própria,
ou a regra deve ser ajustada para continuar valendo só para ela.

## Guia do apresentador

Na entrada do slide 3, a fala passa de "…e o resto para escala, limites e perguntas."
para "…e o resto para a retrospectiva, limites e perguntas."

## Fora do escopo

- O PDF: adiado até o fim das edições, como combinado.
- Os demais textos e o layout de outros slides, além dos ajustes de margem acima.

## Critérios de aceite

- `?check` não acusa nenhum slide (`data-overflow=""`), e a apresentação continua com 35
  slides.
- Os screenshots dos 8 títulos com acento mostram folga visível entre o acento e a linha
  de cima.
- O slide 3 mostra os textos da tabela acima, com a linha Entrega no pé de cada card.
- A descrição de cada segmento mantém o estilo atual (28px, `--ink-2`, com as regras
  maiores que o CSS aplica depois).
- O guia do apresentador tem a fala nova do slide 3.
