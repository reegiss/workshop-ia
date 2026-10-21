# Novo título da apresentação — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html` (capa `#s1`), `workshop/*.md` e `superpowers.pdf`.

## Objetivo

Trocar o título "Superpowers" por um título técnico e descritivo, centrado na tese do
workshop (trabalho com agentes que deixa evidência verificável). O pacote superpowers
deixa de ser o nome da apresentação e passa a aparecer como a ferramenta da prática.

- **Título:** Desenvolvimento verificável com agentes de IA
- **Subtítulo:** Skills, processo e evidência, na prática com o superpowers

## Capa (slide 1, `#s1`)

Mantém o visual de frontmatter de `SKILL.md` e as barras coloridas. O conteúdo passa a ser:

```
desenvolvimento-verificavel/SKILL.md
---
name:
Desenvolvimento
verificável                  (em destaque, <em>)
com agentes de IA            (menor, dentro do <h1>)
description: Skills, processo e evidência, na prática com o superpowers
author: Regis Araujo Melo
---
Workshop · Agentes & Skills · skills.sh/obra
```

- `.cover-file`: `desenvolvimento-verificavel/<strong>SKILL.md</strong>`.
- `<h1 class="title cover-title">`: "Desenvolvimento" na primeira linha, "verificável" em
  `<em>` na segunda, e "com agentes de IA" num `<span>` menor numa terceira linha.
- O tamanho do `.cover-title` cai de 250px para **128px**. Medido no Chrome:
  "DESENVOLVIMENTO" ocupa cerca de 9,2em, e a área útil da capa tem 1240px
  (`.cover` tem `padding-right: 560px`), então o máximo seria cerca de 135px. 128px deixa
  folga. A faixa de 140–150px estimada antes não cabe sem mexer no layout da capa.
- `description:` e o rodapé (`.cover-foot`) com os textos acima. `author:` não muda.
- `aria-label="Capa"` continua.

**Transbordo:** antes desta mudança, o `?check` já acusava o slide 1. A causa é o
rodapé da capa (`.cover-foot`, com `data-footer`), que fica de propósito na faixa
inferior, a mesma do contador. O `findOverflow` só isenta `[data-bleed]`. A correção é
isentar também `[data-footer]` em `script.js`. Depois dela, o `?check` não deve acusar
nenhum slide.

## Outros lugares

| Onde | Passa a ser |
|---|---|
| `<title>` do `index.html` | Desenvolvimento verificável com agentes de IA |
| Título de `workshop/guia-do-participante.md` | `# Desenvolvimento verificável com agentes de IA — guia do participante` |
| Título de `workshop/guia-do-apresentador.md` | `# Desenvolvimento verificável com agentes de IA — guia do apresentador` |
| Título de `workshop/pre-requisitos.md` | `# Desenvolvimento verificável com agentes de IA — pré-requisitos` |
| Entrada do slide 1 no guia do apresentador | `### 1 · Desenvolvimento verificável (0:30)` |
| PDF | `superpowers.pdf` renomeado (`git mv`) para `desenvolvimento-verificavel.pdf` e regerado |
| Menções ao PDF no guia do apresentador (seção "Como apresentar" e checklist pós-workshop) | `desenvolvimento-verificavel.pdf` |

## O que não muda

- As menções ao superpowers como pacote ou ferramenta: a seção "3. Superpowers" dos
  pré-requisitos, os comandos com `obra/superpowers`, a contagem de skills do pacote e a
  comparação com o Spec Kit.
- A fala do slide 1, a frase de abertura e a de encerramento do guia.
- As specs e os planos em `docs/superpowers/`, que são histórico, e o nome dessa pasta,
  que é a convenção da ferramenta.
- Os demais slides.

## Execução

Na mesma branch `feat/introducao-agentica`, ainda não integrada, para regerar o PDF uma
vez só.

## Critérios de aceite

- A capa mostra o novo título, a descrição e o rodapé, e "Desenvolvimento" cabe numa linha.
- `?check` não acusa nenhum slide (`data-overflow=""`).
- A apresentação continua com 35 slides.
- `grep -rn "Workshop Superpowers\|Superpowers — Skills" index.html workshop/` não
  encontra nada.
- `superpowers.pdf` não existe mais; `desenvolvimento-verificavel.pdf` tem 35 páginas
  e a página 1 mostra a nova capa.
- O guia do apresentador só cita `desenvolvimento-verificavel.pdf`.
