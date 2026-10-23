# Ebook — Capítulo 1 "Rápido não é verificável": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 1 em `chapters/pt/chapter-02.md` (~1.500 palavras), abrindo a Parte I.

**Architecture:** Markdown Pandoc. `## Capítulo 1 — Rápido não é verificável`, seções em `###`. Caixas didáticas em blockquote rotulado. Revisão editorial por subagente segundo `docs/diretrizes.md`.

**Tech Stack:** Markdown (Pandoc). Trechos de código em TypeScript, sempre em inglês.

**Referências obrigatórias para quem executa:**
- Spec: `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md` (seções "Exemplo do livro" e "Padrões de escrita")
- Diretrizes: `docs/diretrizes.md`
- Já escritos (manter tom e termos): `chapters/pt/chapter-01.md` (Introdução), `chapters/pt/chapter-10.md` (glossário)
- Sem scripts de teste, sem PDF, sem menção a workshop, apresentação, empresas ou repositórios. Sem a seta →.

---

### Task 1: Escrever o Capítulo 1

**Files:**
- Modify: `chapters/pt/chapter-02.md` (substituir o placeholder)

- [ ] **Step 1: Escrever o capítulo**

Primeira linha: `**Parte I — Fundamentos**`, depois linha em branco e `## Capítulo 1 — Rápido não é verificável`.

Abertura (2–3 frases): o objetivo do capítulo. Gerar código ficou barato; avaliar continua caro.

`### Um pedido simples` (~250 palavras): apresenta a história do livro ("escolher o banco para uma transferência": buscar bancos por nome ou código, ordenar pela tarifa calculada por faixa de valor) e um pedido curto e vago feito ao agente, num bloco `text`. O agente responde rápido e com confiança.

`### Três falhas típicas` (~600 palavras), uma subseção curta por falha, cada uma com um `> **[Exemplo]**` concreto:
1. **Implementar antes de esclarecer:** `searchBanks` só compara o nome; ninguém perguntou se o código ("001") também deveria ser buscado. Mostrar um trecho TypeScript curto (≤ 8 linhas, ≤ 60 caracteres por linha).
2. **Escrever o teste depois, só para passar:** o teste foi gerado a partir da saída do código e congela o erro. Exemplo: `calculateFee` coloca R$ 1.000,00 na faixa errada, e o teste afirma exatamente esse valor. Mostrar o teste (≤ 8 linhas) com descrição em inglês.
3. **Dizer "pronto" sem evidência:** o agente responde "Pronto! Os testes devem passar." sem ter rodado nada. Destacar o "devem".

`### O custo aparece no fim` (~200 palavras): sem processo, toda a revisão se acumula no final, quando corrigir é mais caro; você revisa um volume grande de código sem saber o que foi decidido nem por quê.

`### Desenvolvimento verificável` (~250 palavras): definição em uma frase destacada: cada etapa deixa uma *evidência* que você consegue ver. Prévia em lista vertical (sem tabela) de três momentos: antes (requisito esclarecido, plano), durante (teste falhando, depois passando), depois (diff revisado, teste rodado por você). Informar que o Capítulo 4 detalha.

`### E se o processo viesse junto com o agente?` (~100 palavras): gancho para o Capítulo 2.

`### Resumo`: 3–5 itens.

Incluir um `> **[Aviso de Erro Comum]**`: confiar no tom seguro da resposta do agente.

Valores monetários no texto em formato brasileiro (R$ 1.000,00); no código, números simples (`1000`).

- [ ] **Step 2: Conferir tamanho**

Run: `wc -w chapters/pt/chapter-02.md`
Expected: entre 1.300 e 1.800.

- [ ] **Step 3: Glossário**

Se o capítulo usar termo técnico novo que não está em `chapters/pt/chapter-10.md`, adicioná-lo em ordem alfabética (≤ 2 frases).

---

### Task 2: Revisão editorial

- [ ] **Step 1:** Subagente revisor lê diretrizes, spec, Introdução, glossário e o capítulo; responde com veredito de spec compliance + protocolo das diretrizes (diagnóstico, riscos KDP, antes e depois classificados Obrigatório/Opcional). Não edita.
- [ ] **Step 2:** Aplicar os ajustes obrigatórios e os opcionais coerentes com a spec.

---

### Task 3: Aprovação do autor e commit

- [ ] **Step 1:** Apresentar resumo ao autor e aguardar aprovação.
- [ ] **Step 2:**

```bash
git add chapters/pt/chapter-02.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 1 do ebook"
```
