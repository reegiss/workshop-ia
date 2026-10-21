# Slides 18 (planejar) e 19 (vermelho, depois verde) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Slide 18: mostrar como é um bom plano.
2. Slide 18: critério concreto para conferir o plano.
3. Slide 18: pedir o plano na mesma sessão.
4. Slide 19: quatro passos que separam o que o agente faz do que você faz.
5. Slide 19: mostrar a saída vermelha e a verde.

## Slide 18 (`#s-lab2`)

Passos:

1. Na mesma sessão, peça o plano com `/writing-plans` (pedido da etapa 2).
2. No máximo **3 tarefas**.
3. **Confira:** cada tarefa começa por um teste, a Tarefa 1 é ordenar por nome, e nada sai
   do recorte (tela, rede).

Cartão abaixo (estilo `.lab-story`): rótulo "Um bom plano se parece com isto" e, à
direita, `docs/superpowers/plans/` em mono `--ink-2`. Três linhas (do "plano pronto" do
guia): número em `--g1`, nome em negrito, "teste:" em mono pequeno e o teste em `--ink-2`.

| # | Tarefa | Teste |
|---|---|---|
| 1 | Ordenar por nome | três bancos fora de ordem → ordenados |
| 2 | Filtrar por nome | “brasil” → “Banco do Brasil” |
| 3 | Código e busca vazia | “00” → “001”; “” → todas |

## Slide 19 (`#s-lab3`)

Passos (texto ~30px, como no slide 17):

1. Cole o pedido da etapa 3: só a Tarefa 1, com `/test-driven-development`.
2. O agente escreve o teste e **para**. **Você** roda: vermelho.
3. O agente implementa o mínimo. **Você** roda de novo: verde.
4. Revise com `git diff` e faça commit só local.

Abaixo, dois cartões de terminal (`--panel`) com uma seta "→" em `--accent` entre eles:

- "✗ FALHOU" (filete e rótulo `--g2`): "ordena por nome" / "filterAndSort não existe".
- "✓ PASSOU" (filete e rótulo `--g4`): "ordena por nome" / "1 teste, 0 falhas".

Legenda pequena `--muted`: "Ilustrativo: a saída real depende da sua stack."

Regras novas presas a `#s-lab2` e `#s-lab3`.

## Guia do apresentador

- 18: "Na mesma sessão, peça o plano curto. Confira: cada tarefa começa por um teste e a
  primeira é ordenar por nome. Se vier grande, peça para cortar."
- 19: "O agente escreve o teste e para: você roda e vê vermelho. Ele implementa: você roda
  e vê verde. Não confie no relato do agente. Esse é o momento mais importante do
  workshop."

## Fora do escopo

- O PDF: adiado até o fim das edições.

## Critérios de aceite

- Slides 18 e 19 com os textos acima; `?check` sem transbordo; screenshots sem colisão.
