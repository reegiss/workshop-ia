# Simulação do laboratório (plano B da demo) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** branch `feat/simulacao-lab`, a partir da `main`.

## Objetivo

Uma página que imita o Copilot CLI e reproduz, batida a batida, o uso das skills no exemplo
dos slides (lista de bancos), para exibir no lugar da demo ao vivo se ela falhar.

## Arquivos

- `simulacao.html`, `simulacao.css`, `simulacao.js`, na raiz. Mesmo modelo da tela de
  espera: palco 1920×1080 escalado, tokens do `styles.css`, mesmas fontes, funciona offline.
- O roteiro fica como dados (lista de batidas) no `simulacao.js`; o motor só desenha.

## Layout

- Topo: as três etapas (Esclarecer · Planejar · Vermelho → verde), a atual em destaque, e o
  chip da skill ativa.
- Centro: janela de terminal com título `copilot — portability`.
- Lateral "Evidências": requisito esclarecido → plano revisável → teste falhando → teste
  passando → "pronto" com evidência, marcadas conforme a simulação chega a cada uma.
- O terminal cresce de baixo para cima; o que sai pelo topo esmaece.
- Rodapé: selo fixo "Simulação · roteiro ilustrativo".

## Roteiro (iOS, Swift + XCTest)

1. **Esclarecer** (`brainstorming`): você cola o pedido do guia; o agente faz 3 perguntas
   (ordem sem acentos e maiúsculas? código começa com o texto ou contém? busca só com espaços
   conta como vazia?); você responde; o agente resume o design; você aprova.
2. **Planejar** (`writing-plans`): pedido da etapa 2; o agente salva
   `docs/superpowers/plans/2026-10-21-lista-de-bancos.md` com as 3 tarefas do slide 18.
3. **Vermelho → verde** (`test-driven-development`, `verification-before-completion`): o
   agente escreve `Tests/portabilityTests/FilterAndSortTests.swift` e para; `swift test`
   falha (`cannot find 'filterAndSort' in scope`); o agente implementa o mínimo em
   `Sources/Domain/InstitutionSearch.swift`; `swift test` passa
   (`Executed 1 test, with 0 failures`); o agente só diz "pronto" citando essa saída;
   `git diff --stat` e `git add -A && git commit` local, sem push.

## Controles

- → ou espaço: próxima batida (texto seu digitado; resposta do agente linha a linha).
  Clique também avança.
- ←: batida anterior, sem animação.
- 1, 2, 3: início de cada etapa. `?etapa=N` abre nela.
- Esc: volta ao deck no slide da etapa atual (17, 18 ou 19).

## Deck

- `script.js`: tecla S nos slides 17, 18 e 19 abre `simulacao.html?etapa=1|2|3`. Nada visível
  muda nos slides nem no PDF.
- Guia do apresentador: nota de plano B (quando usar, teclas).

## Fora do escopo

- Android e backend; autoplay; o PDF.

## Critérios de aceite

- Screenshot do fim de cada etapa (`?etapa=N&fim`) sem transbordo do palco.
- S abre a etapa certa; Esc volta ao slide certo.
- `?check` do deck: 37 slides, sem transbordo.
