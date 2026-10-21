# Slide 6 (skill é um processo em arquivo) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html` e `styles.css` na branch `feat/introducao-agentica`.

## Objetivo

1. Mostrar no próprio arquivo o que fica sempre no contexto e o que só entra quando a skill
   é usada.
2. Encurtar o texto de abertura, que hoje é o mais denso do deck.
3. Pôr no slide a frase central: ferramenta é o que o agente consegue fazer; skill é como
   ele deve fazer.

## Cartão de código (`#s3 .code-card`)

Um cartão só, em duas partes separadas por um filete tracejado (`--card-line`):

**Parte de cima** (brilho atual), com o rótulo **SEMPRE NO CONTEXTO**:

```
---
name: brainstorming
description: Use antes de qualquer
  trabalho criativo…
---
```

**Parte de baixo** (texto com cerca de 50% de opacidade), com o rótulo **SÓ QUANDO É
USADA**:

```
# Brainstorming
1. Explore o contexto do projeto
2. Faça uma pergunta por vez
3. Proponha 2–3 abordagens…
```

- Os rótulos ficam no canto superior direito de cada parte, em mono, pequenos e
  maiúsculos, como o rótulo "Entrega" do slide 3. O de cima em `--accent`; o de baixo em
  `--ink-2`, apagado.
- Os rótulos são decorativos para quem lê o código: não fazem parte do texto do arquivo.

## Texto de abertura

Novo `.lead`:

> Uma pasta com um `SKILL.md`: nome, descrição e instruções. Entra em uso pela
> descrição ou quando você a cita (`/nome`).

A legenda `.code-caption` ("Isto fica sempre no contexto. O resto do arquivo, só quando
precisa.") sai do slide. Se a classe não for usada em outro slide, a regra sai do
`styles.css`.

## Cards da comparação

O começo de cada texto fica em destaque (`<strong>`, em `--ink`; no card da skill, em
branco):

| Card | Destaque | Resto |
|---|---|---|
| Prompt | O que você pede agora. | Some quando a conversa acaba. |
| Ferramenta · MCP | O que o agente consegue fazer: | ler arquivo, rodar comando, acessar um serviço. |
| Skill | Como o agente deve fazer: | um método versionado e revisável como código. |

Os títulos dos cards e o card azul da skill não mudam.

## Guia do apresentador

Não muda: a mensagem e a fala já dizem o que o slide passa a mostrar.

## Fora do escopo

- O PDF: adiado até o fim das edições, como combinado.
- O título, o kicker e o layout em duas colunas.
- Scripts de teste: a conferência é por screenshot.

## Critérios de aceite

- O slide 6 mostra o cartão de código em duas partes, com os dois rótulos; o texto de
  abertura novo; e os três cards com os destaques da tabela.
- A legenda `.code-caption` não aparece mais no slide 6.
- No screenshot, nada colide, o texto apagado continua legível e o slide termina acima da
  faixa do contador.
