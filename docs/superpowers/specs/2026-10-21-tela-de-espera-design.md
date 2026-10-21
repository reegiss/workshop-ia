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

- 37 termos, cada letra num `span`.
- A cada quadro (`requestAnimationFrame`, ângulo pelo tempo decorrido): rotação no eixo Y
  e inclinação fixa no X; projeção ortográfica.
- Cada letra é um ponto da esfera: a palavra segue o paralelo do seu centro (latitudes até
  ±58°, longe dos polos) e se curva com o globo. Cada letra gira e achata conforme a direção
  do paralelo projetada; atrás do globo aparece espelhada, como vista por dentro.
- Sem atropelo: as palavras correm em 7 faixas de latitude (até ±57°, vão de ~0,33 rad).
  Cada palavra vai para a faixa mais vazia, em proporção ao comprimento do paralelo; dentro
  da faixa, a sobra vira folgas de tamanhos aleatórios entre as palavras.
- Posição um pouco aleatória: o início de cada faixa é sorteado a cada carga; ao girar, cada
  faixa deriva no próprio ritmo (±0,04 rad/s em relação ao globo), e cada palavra oscila na
  latitude (amplitude 0,02 a 0,05 rad, menor que o vão entre faixas).
- Profundidade d ∈ [0, 1]: escala 0,6 → 1,2; opacidade 0,12 → 1; `z-index` pela
  profundidade.
- Termos do workshop (SDD, TDD, spec, plano, evidência, skills) em `--accent`; os demais em
  `--ink`.
- `prefers-reduced-motion`: rotação bem mais lenta.
- Linhas da esfera num `canvas` atrás dos termos: contorno em `--accent` (55%), cinco
  paralelos e seis meridianos que giram junto, mais fortes na frente (35%) que atrás (5%).
- `?giro=N` adianta a rotação em N segundos (para conferir quadros diferentes; o Chrome
  headless não avança o `requestAnimationFrame`).

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
