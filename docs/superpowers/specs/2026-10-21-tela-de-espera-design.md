# Tela de espera com timer e globo de termos de IA — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** branch `feat/introducao-agentica`. Página nova; o deck não muda.

## Objetivo

Uma página separada do `index.html` para projetar antes do workshop: contagem regressiva
até o início e, ao lado, um globo de termos de IA girando sem parar, com cada palavra
crescendo ao vir para a frente e encolhendo ao ir para trás.

## Arquivos

- `espera.html`, `espera.css`, `espera.js`, na raiz.
- `espera.html` carrega `styles.css` só pelos tokens (`:root`) e pelo `body` base, e
  `espera.css` para o layout próprio. Mesmas fontes do deck (Google Fonts).

## Layout (palco 1920×1080, escalado para a janela)

- Topo: "Desenvolvimento verificável com agentes de IA" (kicker mono).
- Esquerda: rótulo "Começamos em", timer em mono (~220px), instrução "Enquanto isso: abra o
  guia no chat e confira os pré-requisitos."
- Direita: globo com ~800px de diâmetro.

## Timer

- `?min=N`: N minutos a partir da abertura (padrão 10). `?ate=HH:MM`: até esse horário de
  hoje (se já passou, mostra zero).
- O alvo é um instante absoluto; a contagem lê o relógio a cada atualização (correta mesmo
  com a aba em segundo plano).
- Formato `MM:SS`; com 1 hora ou mais, `H:MM:SS`.
- Último minuto: dígitos em `--g1`. Em zero: rótulo "Vamos começar", timer `00:00` com pulso
  lento.

## Globo

- ~36 termos (`span`), distribuídos numa esfera de Fibonacci.
- A cada quadro (`requestAnimationFrame`, ângulo pelo tempo decorrido): rotação no eixo Y
  e inclinação fixa no X; projeção ortográfica.
- Profundidade d ∈ [0, 1]: escala 0,45 → 1,4; opacidade 0,25 → 1; `z-index` pela
  profundidade.
- Termos do workshop (SDD, TDD, spec, plano, evidência, skills) em `--accent`; os demais em
  `--ink`.
- `prefers-reduced-motion`: rotação bem mais lenta.

Termos: agentes, LLM, RAG, MCP, skills, context engineering, prompt engineering,
embeddings, fine-tuning, evals, guardrails, alucinação, tokens, multimodal, reasoning,
chain-of-thought, vibe coding, Copilot, subagentes, tool use, function calling, vector DB,
transformers, open weights, AI safety, janela de contexto, inferência, LoRA, agentic
workflows, Claude, GPT, Gemini, SDD, TDD, spec, plano, evidência.

## Navegação

- Seta → , espaço ou clique: abre `index.html`.

## Fora do escopo

- O PDF e os guias: sem mudança.

## Critérios de aceite

- Screenshots em dois instantes diferentes mostram as palavras em posições e tamanhos
  diferentes; `?min=0` mostra "Vamos começar"; nada transborda do palco.
