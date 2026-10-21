# Slide 13 (Spec Kit: SDD como ferramenta) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Deixar claro que hoje usamos o superpowers e que o Spec Kit é uma alternativa.
2. Ligar cada comando ao vocabulário do SDD (slides 10 e 12), destacando a constituição.
3. Reduzir a nota da fonte a uma legenda.

## Abertura

Novo `.lead` entre o título e a lista: "Mesmo método, outra ferramenta. Hoje usamos o
**superpowers**; o Spec Kit é uma alternativa."

## Lista (`#s-sdd-kit .sdd-kit`)

Cada `.pkg` passa a ter três colunas: comando, etiqueta e descrição.

| Comando | Etiqueta | Descrição |
|---|---|---|
| `/speckit-constitution` | PRINCÍPIOS (só contorno `--accent`) | regras do projeto que toda spec respeita |
| `/speckit-specify` | SPEC (`--g1`) | a spec: o quê e o porquê |
| `/speckit-plan` | PLANO (`--g1`) | o plano técnico: o como |
| `/speckit-tasks` | TAREFAS (`--g2`) | tarefas a partir do plano |
| `/speckit-implement` | CÓDIGO (`--g2`) | implementa as tarefas; repete com `/speckit-converge` até convergir |

Etiqueta: pílula em mono pequeno maiúsculo, fundo na cor da etapa, texto `--navy`. Regras
presas a `#s-sdd-kit`.

## Legenda

A nota vira `.sdd-source` (mono ~20px, `--muted`): "GitHub Spec Kit (github/spec-kit),
integração padrão com o GitHub Copilot. Comandos conforme o README em 19/09/2026: confira a
versão."

## Guia do apresentador

Entrada "### 13 · Spec Kit: SDD como ferramenta (1 min)": **Mensagem:** o mesmo método em
outra ferramenta; hoje usamos o superpowers. **Fala:** "O Spec Kit, do GitHub, faz o mesmo
caminho por comandos: spec, plano, tarefas e código. A novidade é a constituição: os
princípios do projeto. Hoje não vamos usá-lo; confira o README antes de adotar." O cuidado
não muda.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Reconferir os nomes dos comandos no README atual (fica para antes do PDF).

## Critérios de aceite

- O slide 13 mostra a abertura, as cinco linhas com etiquetas e a legenda; `?check` sem
  transbordo; screenshot sem colisão.
- O guia tem a fala nova do slide 13.
