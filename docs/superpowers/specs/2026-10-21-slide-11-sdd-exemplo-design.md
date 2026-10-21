# Slide 11 novo (o exemplo, etapa a etapa) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`. Substitui a parte "Exemplo" da spec
`2026-10-21-slide-10-sdd-fluxo-design.md`.

## Objetivo

O exemplo no slide 10 ficou raso. O slide 10 volta a ser só o fluxo, e um slide novo mostra
o exemplo da lista de bancos etapa a etapa, com trechos dos artefatos.

## Slide 10 (`#s-sdd`)

- Saem os blocos `.sdd-ex` e as regras CSS deles.
- Lead: "Cada etapa gera um artefato que você revisa antes da próxima."
- Definições: spec "o quê e o porquê: requisitos e critérios de aceite"; plano "o como:
  decisões técnicas a partir da spec"; tarefas "passos pequenos e verificáveis"; código
  "implementado e verificado contra a spec".
- A legenda da fonte continua pequena (`.sdd-source`).

## Slide 11 novo (`#s-sdd-exemplo`)

Kicker "Spec-Driven Development"; título "O exemplo, <em>etapa a etapa</em>". Grade 2×2 de
cartões de arquivo (fundo `--card`, borda `--card-line`, filete superior na cor da etapa:
spec e plano `--g1`, tarefas e código `--g2`, como no slide 10). Cabeçalho: nome da etapa
em mono maiúsculo na cor da etapa e, à direita, a origem em mono `--ink-2`. Linhas: rótulo
em mono pequeno maiúsculo (`--ink-2`) numa coluna fixa, texto em `--ink` (~24px).

| Cartão | Origem | Linhas |
|---|---|---|
| Spec | `docs/superpowers/specs/` | Objetivo: escolher o banco de origem numa lista · Requisitos: ordena por nome, sem diferenciar maiúsculas nem acentos; busca no nome (contém) ou no código (prefixo) · Aceite: “credito” encontra “Crédito”; “00” encontra “001”; busca vazia devolve todas · Fora: tela e rede |
| Plano | `docs/superpowers/plans/` | Decisão: uma função pura `filterAndSort(institutions, query)` · Por quê: sem tela e sem rede, o teste roda em segundos · Acentos: comparar textos normalizados (sem acento, minúsculos) |
| Tarefas | uma por teste | 1 Ordenar por nome: três bancos fora de ordem → ordenados · 2 Filtrar por nome: “brasil” → “Banco do Brasil” · 3 Código e busca vazia: “00” → “001”; “” → todas |
| Código | tarefa 1, teste primeiro | Dado: [Itaú, Bradesco, Caixa] · Espera: [Bradesco, Caixa, Itaú] · ✗ vermelho: `filterAndSort` não existe · ✓ verde: depois da implementação |

No cartão do código, "✗ vermelho" em `--g2` e "✓ verde" em `--g4`.

Legenda abaixo, mono pequeno `--muted`: "Trechos resumidos. No laboratório, o agente escreve
esses arquivos e você revisa."

## Numeração (37 slides)

9 O que é SDD · 10 fluxo · 11 exemplo · 12 mapa · 13 Spec Kit · 14 pergunta · 15 pronto ·
16 regras · 17–19 laboratório · 20 retrospectiva · 21 escala · 22 limites · 23 próximos
passos · 24 divisória do apêndice · 25–37 apêndice.

## Guia do apresentador

- Slide 10 (0,5 min): **Mensagem:** cada etapa gera um artefato revisável. **Fala:** "SDD
  em quatro passos: spec, plano, tarefas e código. Cada um gera um artefato que você revisa
  antes do próximo, e o código é verificado contra a spec."
- Entrada nova "### 11 · O exemplo, etapa a etapa (1,5 min)": **Mensagem:** cada etapa
  vira um artefato concreto e revisável. **Fala:** "Este é o caso que vocês vão fazer: a
  spec tem critérios que dá para testar, o plano escolhe uma função pura e diz por quê, cada
  tarefa é um teste, e o código começa vermelho."
- Tempos: 12 mapa 0,5 min; 13 Spec Kit 1 min; 14 pergunta 1 min.
- Cronograma: 8:00–13:00 slides 9–13; 13:00–14:00 slide 14; 14:00–15:00 slides 15–16;
  15:00–40:00 17–19; 40:00–43:00 20; 43:00–49:00 21–22; 49:00–52:00 23. "Se atrasar":
  slides 4–14; o Spec Kit (slide 13) é o primeiro a sair.
- Referências: retrospectiva → 20; "36 slides" → 37; mapa do apêndice 24–37 (+1 em todas
  as linhas); perguntas: 34–36 → 35–37, 28 → 29, SDD 9–12 → 9–13.

## Fora do escopo

- O PDF: adiado até o fim das edições.

## Critérios de aceite

- 37 slides; `?check` sem transbordo; screenshots dos slides 10 e 11 sem colisão.
- Nenhuma referência a número de slide no guia aponta para o slide errado.
