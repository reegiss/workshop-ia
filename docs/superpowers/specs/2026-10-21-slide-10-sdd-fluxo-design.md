# Slide 10 (SDD: a spec vem primeiro) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Mostrar cada etapa do SDD com o exemplo do laboratório (lista de bancos).
2. Trocar a citação, que repete o slide 9, por uma linha que apresenta o exemplo.
3. Reduzir a nota da fonte a uma legenda.

## Escopo do CSS

`.mini-flow` também é usado em outros slides. As regras novas ficam presas a `#s-sdd`.

## Linha de abertura

Sai `<p class="lead sdd-quote">“Definir o quê e o porquê…”</p>`. Entra um `.lead`:
"Exemplo: a história do laboratório, **escolher o banco de origem numa lista**." (trecho em
negrito em `--ink`).

## Cards (`#s-sdd .mini-flow`)

Títulos em mono como hoje. Cada `<li>`: número (`::before`), título, definição e o bloco
Exemplo.

| Card | Título | Definição | Exemplo |
|---|---|---|---|
| 01 | spec | o quê e o porquê | ordena por nome; busca por nome ou código; busca vazia devolve todas |
| 02 | plano | o como | uma função `filterAndSort`, sem dependências |
| 03 | tarefas | passos pequenos e verificáveis | 1. ordenar / 2. filtrar por nome / 3. código e busca vazia (uma por linha) |
| 04 | código | verificado contra a spec | “brasil” encontra “Banco do Brasil”: vermelho, depois verde |

Os exemplos vêm do "design pronto" e do "plano pronto" do guia do participante.

- Bloco Exemplo: no pé do card, filete `--card-line` acima; rótulo "Exemplo" em mono pequeno,
  maiúsculo, na cor do card (`var(--g)`); texto em `--ink`, menor que a definição. Mesmo
  padrão do "Evita" do slide 7.
- Subgrid de quatro linhas (número, título, definição, exemplo) para alinhar os filetes nos
  quatro cards.

## Legenda

"Definição: README do `github/spec-kit`, consultado em 19/09/2026." em mono ~20px, em
`--muted`, logo abaixo dos cards.

## Guia do apresentador

Entrada "### 10 · SDD: a spec vem primeiro (1 min)": **Mensagem:** spec, plano, tarefas e
código, no caso do laboratório. **Fala:** "No caso de hoje: a spec diz como ordenar e
buscar, o plano escolhe uma função, as tarefas viram três testes, e o código só está pronto
quando o teste passa contra a spec."

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Seta de retorno do código à spec; títulos em sans.

## Critérios de aceite

- O slide 10 mostra a linha de abertura, os quatro cards com os textos da tabela e a legenda.
- No screenshot, os filetes dos exemplos ficam alinhados; nada colide; `?check` sem
  transbordo.
- Os outros slides com `.mini-flow` não mudam.
