# Ebook — Capítulo 4 "Evidência e Spec-Driven Development": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 4 em `chapters/pt/chapter-05.md` (~2.500 palavras), fechando a Parte I e fazendo a ponte para a Parte II.

**Architecture:** Markdown Pandoc. `## Capítulo 4 — Evidência e Spec-Driven Development`, seções `###`. Revisão editorial por subagente.

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md`, `docs/diretrizes.md`, capítulos aprovados `chapters/pt/chapter-01.md` a `chapter-04.md`, glossário `chapters/pt/chapter-10.md`.

## Fatos a usar (não inventar outros)

- O superpowers, por padrão, grava a spec (design) em `docs/superpowers/specs/` e o plano em `docs/superpowers/plans/`.
- Spec Kit: kit aberto do GitHub (repositório `github/spec-kit`) que conduz o SDD por comandos na CLI: princípios do projeto ("constituição"), spec, plano, tarefas e implementação. **Não listar comandos** (mudam entre versões); remeter ao README. Não comparar desempenho com o superpowers.
- As quatro skills do fluxo mínimo: `brainstorming`, `writing-plans`, `test-driven-development`, `verification-before-completion`.

---

### Task 1: Escrever o Capítulo 4

**Files:** Create `chapters/pt/chapter-05.md`; Modify `chapters/pt/chapter-10.md`.

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): o Cap. 1 definiu desenvolvimento verificável em uma frase; este capítulo diz exatamente quais evidências procurar, apresenta o SDD e monta o fluxo mínimo que a Parte II vai executar.

`### Seis evidências` (~550 palavras): as três fases do Cap. 1 (antes, durante, depois), agora com duas evidências cada e **onde cada uma fica**. Lista vertical com subitens, sem tabela:
- Antes — *requisito esclarecido* (arquivo de spec; no superpowers, `docs/superpowers/specs/`); *plano revisável* (`docs/superpowers/plans/`).
- Durante — *teste falhando antes do código* (a saída vermelha); *teste passando depois* (a saída verde).
- Depois — *diff revisado por você* (`git diff` antes do commit); *resultado verificado por você* (o teste rodado por você, não pelo agente).
Fechar: sem essas evidências, é só código que parece certo. Ligar cada evidência a uma falha do Cap. 1. `[Dica Prática]`: guarde as evidências junto da branch (spec e plano versionados; a saída do teste colada na descrição do pull request).

`### O que é Spec-Driven Development` (~500 palavras): *SDD*: antes do código, você escreve o que o sistema deve fazer; a spec vira a referência para planejar, implementar e verificar. Contraste em duas listas curtas (não tabela): **Código primeiro** — pedido, código; lacunas preenchidas pelo agente em silêncio; "pronto" = parece certo. **Spec primeiro** — pedido, spec, código; lacunas viram perguntas e você decide antes; "pronto" = cumpre a spec. As quatro partes de uma spec: objetivo, requisitos, *critérios de aceite*, fora do escopo — cada uma ilustrada **em prosa pt-BR** com a história do Banco Azul (ex.: critério de aceite "uma transferência de R$ 1.000,00 no Banco Azul paga R$ 2,00"). Sem bloco de código nesta seção (a spec real aparece no Cap. 5, em inglês).

`### Quatro artefatos, uma revisão de cada vez` (~350 palavras): spec (o quê e o porquê), plano (o como), tarefas (passos pequenos e verificáveis), código (implementado e verificado contra a spec). Cada artefato é revisado antes do próximo; corrigir uma spec custa uma frase, corrigir código custa uma investigação (retoma "O custo aparece no fim").

`### Spec Kit: o mesmo método em outro formato` (~250 palavras): o Spec Kit conduz o SDD por comandos; novidade conceitual: a constituição (princípios do projeto que toda spec respeita). O livro usa o superpowers; o método é o mesmo. `[Nota]`: comandos mudam entre versões; consulte o README do `github/spec-kit`.

`### O fluxo mínimo: quatro skills` (~600 palavras): uma subseção `####` por etapa, cada uma com: a etapa do SDD que cobre, a skill, a falha do Cap. 1 que evita, a evidência que produz e o capítulo da Parte II que a executa.
1. Esclarecer — `brainstorming` — spec — evita implementar antes de esclarecer — requisito esclarecido — Cap. 5.
2. Planejar — `writing-plans` — plano e tarefas — cada tarefa começa por um teste — plano revisável — Cap. 6.
3. Testar primeiro — `test-driven-development` — código — evita o teste que copia a saída — vermelho, depois verde — Cap. 7.
4. Verificar — `verification-before-completion` — verificação — evita o "pronto" sem evidência — diff revisado e teste rodado por você — Cap. 7.
`[Dica Prática]` ou `[Nota]`: correção de uma linha não precisa do fluxo completo; use onde há dúvida ou risco (o Cap. 8 volta a isso).

`### Antes de começar a Parte II` (~150 palavras): o que o leitor deve ter: uma das CLIs funcionando, as quatro skills instaladas (Cap. 3), Node.js, git. A Parte II segue a história do Banco Azul do pedido vago até o teste verde.

`### Resumo`: 5 itens.

Regras: sem seta → (inclusive "pedido → código": escrever por extenso); "ferramenta" só no sentido do glossário; produto = "CLI"; R$ + U+00A0; termos novos em itálico na 1ª menção (*SDD* pode aparecer como *Spec-Driven Development*, *critérios de aceite*, *fluxo mínimo*); sem tabelas; sem menção a workshop, slides, laboratório, empresas (GitHub como dono do Spec Kit é crédito, ok) ou ferramentas de reunião.

- [ ] **Step 2:** `wc -w` — esperado 2.200–2.800.
- [ ] **Step 3: Glossário** — adicionar *Critério de aceite* e *Fluxo mínimo*; conferir *SDD*, *Spec*, *Plano*, *Evidência* contra o capítulo.

### Task 2: Revisão editorial

- [ ] Subagente revisor (veredito + protocolo + antes e depois). Aplicar ajustes.

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-05.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 4 do ebook (evidência e SDD)"
```
