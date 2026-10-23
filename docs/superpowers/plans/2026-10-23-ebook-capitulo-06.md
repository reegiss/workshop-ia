# Ebook — Capítulo 6 "Planejar": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 6 em `chapters/pt/chapter-07.md` (~1.500 palavras; aceitável até 1.900).

**Architecture:** Markdown Pandoc. `## Capítulo 6 — Planejar` (sem antetítulo de parte), seções `###`. Revisão editorial por subagente.

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md` (seções "Exemplo do livro" e "Projeto do exemplo", incluindo "Plano do exemplo"), `docs/diretrizes.md`, capítulos aprovados `chapters/pt/chapter-01.md` a `chapter-06.md`, glossário `chapters/pt/chapter-10.md`.

## Fatos a usar (não inventar outros)

Comportamento da skill `writing-plans` (superpowers):
- parte de uma spec e grava o plano em `docs/superpowers/plans/AAAA-MM-DD-<tema>.md`;
- o plano começa com um cabeçalho: objetivo (Goal), arquitetura em 2–3 frases e tecnologias;
- mapeia os arquivos que serão criados ou alterados antes de definir as tarefas;
- divide o trabalho em tarefas pequenas; cada tarefa lista os arquivos e passos de 2 a 5 minutos: escrever o teste que falha, rodar e ver falhar, escrever o código mínimo, rodar e ver passar, fazer commit;
- cada passo traz caminhos exatos, o código completo e o comando com a saída esperada; proíbe "TODO", "implementar depois" e passos vagos;
- no fim, a skill revisa o plano contra a spec (cada requisito tem uma tarefa?) e oferece duas formas de executar: com subagentes ou na própria sessão.
- Chamada: `/writing-plans` (ou `/superpowers:writing-plans`, se instalada como plugin). O `brainstorming` oferece seguir para ela ao terminar a spec.

## Conteúdo fixo

Pedido (bloco `text`, pt-BR), se o leitor chamar a skill diretamente:

```text
/writing-plans Crie o plano a partir da spec
da busca de bancos. No máximo 3 tarefas,
cada uma começando por um teste.
```

A lacuna: ao montar a tarefa da busca, o agente pergunta o que acontece com um termo vazio; a spec não diz. Decisão do leitor: devolve todos os bancos. Critério novo na spec (inglês): `- "" (empty) finds all banks.` A spec é atualizada e vai para um commit; só então o plano segue.

Trecho do plano (dentro de `> **[Exemplo]**`, bloco `md`, inglês, ≤ 46 caracteres por linha, ≤ 22 linhas). Usar este conteúdo:

```md
# Bank search implementation plan

Goal: search banks by name or code and
sort them by the fee for an amount.

Files: src/bankSearch.ts,
  src/bankSearch.test.ts

### Task 1: calculateFee

- [ ] Write failing tests: Banco Azul fee
  for 1000 is 2; for 1000.01 is 5.
- [ ] Run `npm test`. Expected: FAIL,
  calculateFee is not exported.
- [ ] Implement calculateFee using
  FEE_RANGE_LIMIT, inclusive.
- [ ] Run `npm test`. Expected: PASS.
- [ ] Commit.
```

Depois do trecho, em prosa: o plano real traz o código completo de cada passo; aqui aparece resumido. Tarefas 2 e 3 em lista vertical: Task 2 `searchBanks` (critérios "azul", "AZUL", "ambar", "001", "1", ""); Task 3 `sortByFee` (critério "Order for 500: Âmbar, Azul, Verde", verificado com `sortByFee(searchBanks(banks, ""), 500)`).

---

### Task 1: Escrever o Capítulo 6

**Files:** Create `chapters/pt/chapter-07.md`; Modify `chapters/pt/chapter-10.md` (se houver termo novo).

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): a spec diz o quê; o plano diz como e em que ordem. Este capítulo produz a segunda evidência: um plano revisável.

`### Da spec ao plano` (~300 palavras): o que a `writing-plans` faz (Fatos). Por que passos tão pequenos: cada um tem uma saída que você consegue conferir. Ligação com o Cap. 4 (a etapa Planejar põe um teste no início de cada tarefa).

`### Pedindo o plano` (~200 palavras): aceitar a oferta do `brainstorming` ou chamar a skill com o pedido do "Conteúdo fixo". Por que "no máximo 3 tarefas": a história é pequena; um plano grande para uma história pequena é sinal de escopo inflado.

`### Uma lacuna aparece` (~350 palavras): a pergunta do termo vazio, em bloco `text` curto e ilustrativo ("Agente: ... / Você: ..."). A spec é corrigida antes do plano seguir. Retomar o Cap. 4: corrigir a spec custa uma frase; descobrir isso no código custaria uma investigação. Mostrar o critério novo (bloco `md` de uma linha ou código inline).

`### O plano` (~350 palavras): o trecho do "Conteúdo fixo" dentro de `> **[Exemplo]**`; explicar a ordem dos cinco passos e a saída esperada de cada `npm test`; as tarefas 2 e 3 em lista vertical.

`### Revisando o plano` (~400 palavras): checklist em lista vertical:
- cada critério de aceite da spec aparece como teste em alguma tarefa (conferir um por um);
- cada tarefa começa por um teste e diz qual falha esperar;
- as tarefas são pequenas e estão em ordem que faz sentido;
- caminhos e comandos são exatos; não há "TODO" nem "implementar depois";
- nada fora do escopo entrou (isenções, tela de confirmação).
`[Dica Prática]`: plano grande demais? Peça para cortar ou juntar tarefas antes de aprovar. `[Aviso de Erro Comum]`: aprovar um plano em que os testes ficam para a última tarefa — é a segunda falha do Cap. 1 voltando pela porta dos fundos.

`### A segunda evidência` (~200 palavras): o plano está em `docs/superpowers/plans/`, num commit; conferir com `git log --oneline` (sem número fixo de commits). A skill oferece executar com subagentes ou na sessão: escolha a própria sessão, para acompanhar cada vermelho e verde; subagentes ficam para o Cap. 8. O Cap. 7 executa a Task 1.

`### Resumo`: 4–5 itens.

Regras: sem seta →; "ferramenta" só no sentido do glossário; produto = "CLI"; R$ + U+00A0; código, spec e plano em inglês, conversa em pt-BR; blocos fora de caixa ≤ 60 caracteres, dentro ≤ 46; sem tabelas; sem menção a workshop, slides, laboratório, empresas ou ferramentas de reunião; não inventar telas de CLI.

- [ ] **Step 2:** `wc -w` — esperado 1.400–1.900.
- [ ] **Step 3: Glossário** — conferir *Plano*; adicionar termo novo se houver.

### Task 2: Revisão editorial

- [ ] Subagente revisor (veredito + protocolo + antes e depois), conferindo comportamento da skill contra "Fatos a usar" e o trecho contra "Conteúdo fixo". Aplicar ajustes.

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-07.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 6 do ebook (planejar)"
```
