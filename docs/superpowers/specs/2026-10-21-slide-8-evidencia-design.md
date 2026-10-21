# Slide 8 (confiável = evidência observável) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Fazer o slide cumprir o título: cada evidência diz onde pode ser vista.
2. Ligar cada coluna às etapas do slide 7 (esclarecer, planejar, testar primeiro, verificar).

## Escopo do CSS

As classes `.evidence*` só existem no slide 8 (`#s-confiavel`). As regras novas ficam
presas a `#s-confiavel`.

## Conteúdo

| Coluna | Etapas | Item (não muda) | Onde ver |
|---|---|---|---|
| Antes | esclarecer · planejar | Requisito esclarecido | `docs/superpowers/specs/` |
| | | Plano revisável | `docs/superpowers/plans/` |
| Durante | testar primeiro | Teste falhando antes do código | a saída vermelha do teste |
| | | Teste passando depois | a saída verde do teste |
| Depois | verificar | Diff revisado por você | `git diff` antes do commit |
| | | Resultado verificado por você | o teste rodado por você, não pelo agente |

## Visual

- **Etapas:** abaixo do cabeçalho de cada coluna (ANTES, DURANTE, DEPOIS), em mono, menor,
  minúsculo e em `--ink-2`.
- **Onde ver:** abaixo do texto de cada item, em bloco, mono pequeno (cerca de 20px), peso
  normal, em `--ink-2`. Caminhos e comandos em `<code>`; as saídas em texto comum.
- **Itens:** caem de 40px para cerca de 32px e o espaço entre eles diminui, para caber.
  O ícone de check continua alinhado à primeira linha do item.
- A frase final ("Sem essas evidências, é só código que *parece* certo.") não muda.

## Guia do apresentador

Na entrada "### 8 · Confiável = evidência observável (2 min)", a fala passa a ser:
"Quando eu disser 'confiável', é isto: seis evidências que você consegue ver, e cada uma
tem um lugar: um arquivo, uma saída de teste, um diff. Sem elas, é só código que parece
certo." A mensagem não muda.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Marcar no slide as evidências que vão para o chat (fica para a fala).
- Scripts de teste: a conferência é por screenshot e `?check`.

## Critérios de aceite

- O slide 8 mostra as etapas sob cada cabeçalho e o "onde ver" sob cada item, com os
  textos da tabela.
- No screenshot, nada colide, os caminhos cabem na coluna sem cortar, e o slide termina
  acima da faixa do contador; `?check` sem transbordo.
- O guia tem a fala nova do slide 8.
