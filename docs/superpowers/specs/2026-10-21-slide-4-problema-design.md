# Slide 4 (o problema) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Mostrar cada problema com uma cena concreta do exemplo do laboratório (a lista de bancos).
2. Dizer o custo do problema: a revisão fica toda no fim, e cara.
3. Trocar o título para "Rápido não quer dizer verificável".

## Conteúdo do slide 4 (`#s2`)

- **Kicker:** "O problema" (não muda). O `aria-label` continua "O problema".
- **Título:** `Rápido não quer dizer<br><em>verificável</em>`.
- **Texto de abertura:** "Sem processo, um agente pode — por exemplo, na lista de bancos do
  laboratório:". A lista de bancos é citada só aqui, não em cada card.
- **Cards:** o texto atual de cada card vira o título do card, e uma cena entra no pé:

| Card | Título (atual) | Cena |
|---|---|---|
| 1 | Implementar antes de esclarecer o requisito | Fez a busca só por nome; ninguém perguntou sobre o código do banco. |
| 2 | Escrever o teste depois, só para passar | O teste copia a saída do código, com a ordem errada junto. |
| 3 | Dizer “pronto” sem evidência | Respondeu “pronto!”, mas não rodou o teste. |

- **Linha do custo:** "Resultado: a revisão fica toda no fim, e cara.", entre os cards e a
  pergunta final.
- **Pergunta final:** "E se o *processo* viesse junto com o agente?" (não muda, nem a cor).

## Visual

- **Cena no card:** fica no pé do card, separada do título por um filete (`--card-line`),
  menor que o título e na cor `--ink-2`. É o mesmo padrão da linha "Entrega" do slide 3.
  Os filetes dos três cards ficam alinhados entre si.
- **Linha do custo:** menor que a pergunta final e mais discreta que ela (`--ink-2`).
- **Espaço:** se o `?check` acusar transbordo, o título dos cards cai de 38px para cerca de
  34px, só em `#s2`. Os valores finais são os menores ajustes que zeram o `?check`,
  conferidos por screenshot.

## Guia do apresentador

Na entrada do slide 4:

- Título: "### 4 · Rápido não é verificável (2 min)" → "### 4 · Rápido não quer dizer
  verificável (2 min)".
- Fala nova: "O agente gera código rápido. O problema é avaliar. Na lista de bancos: ninguém
  perguntou sobre o código, o teste copiou a ordem errada e o 'pronto' veio sem rodar
  nada. A revisão fica toda no fim."
- A mensagem ("sem processo, a saída do agente é difícil de avaliar.") não muda.

## Fora do escopo

- O PDF: adiado até o fim das edições, como combinado.
- A cor de "processo" na pergunta final.
- Outros slides.

## Critérios de aceite

- `?check` não acusa nenhum slide (`data-overflow=""`), e a apresentação continua com 35
  slides.
- O slide 4 mostra o título, o texto de abertura, as três cenas e a linha do custo acima.
- No screenshot, os filetes dos três cards ficam alinhados e o slide termina acima da faixa
  do contador.
- O guia do apresentador tem o título e a fala novos do slide 4.
