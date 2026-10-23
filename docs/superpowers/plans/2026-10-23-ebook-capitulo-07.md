# Ebook — Capítulo 7 "Vermelho, depois verde": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 7 em `chapters/pt/chapter-08.md` (~2.500 palavras; aceitável 2.200–2.900), fechando a Parte II.

**Architecture:** Markdown Pandoc. `## Capítulo 7 — Vermelho, depois verde` (sem antetítulo de parte), seções `###`. Revisão editorial por subagente.

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md`, `docs/diretrizes.md`, capítulos aprovados `chapters/pt/chapter-01.md` a `chapter-07.md`, glossário `chapters/pt/chapter-10.md`, e o **código verificado** em `docs/ebook-exemplo/src/` (`banks.ts`, `bankSearch.ts`, `bankSearch.test.ts`) — fonte de verdade de todo código do capítulo.

## Fatos a usar (não inventar outros)

- Skill `test-driven-development` (superpowers): nenhum código de produção sem um teste falhando antes; ciclo vermelho, verde, refatorar; rodar o teste e confirmar que ele falha **pelo motivo esperado** (a funcionalidade não existe), e não por erro de digitação; escrever o código mínimo para passar; rodar de novo e ver passar; código escrito antes do teste deve ser descartado.
- Skill `verification-before-completion` (superpowers): nenhuma afirmação de "pronto" ou "passou" sem evidência nova; rodar o comando completo, ler a saída inteira e só então afirmar.
- Chamada: `/test-driven-development` e `/verification-before-completion` (ou com prefixo `superpowers:` se instaladas como plugin).
- Ambiente conferido: Node 24, Vitest 5.0.5.

## Saídas reais (Vitest 5, cortadas; usar só estas, sem inventar outras)

Vermelho 1, `src/bankSearch.ts` existe sem a função:

```text
× charges lowFee up to the limit
× charges highFee above the limit

TypeError: calculateFee is not a function

 Test Files  1 failed (1)
      Tests  2 failed (2)
```

Se `src/bankSearch.ts` não existir, a mensagem real é `Error: Cannot find module './bankSearch'` — mesma causa (a função ainda não existe).

Vermelho 2, implementação com `<` (o erro do Cap. 1):

```text
× charges lowFee up to the limit

AssertionError: expected 5 to be 2

- Expected
+ Received

- 2
+ 5

      Tests  1 failed | 1 passed (2)
```

Verde da Task 1: `      Tests  2 passed (2)`.

Vermelho 3, ordenação ingênua (`a.name < b.name ? -1 : 1`):

```text
× sorts by fee, then by name

- Expected
+ Received

  [
-   "Banco Âmbar",
    "Banco Azul",
+   "Banco Âmbar",
    "Banco Verde",
  ]

      Tests  1 failed | 7 passed (8)
```

Verde final:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
```

---

### Task 1: Escrever o Capítulo 7

**Files:** Create `chapters/pt/chapter-08.md`; Modify `chapters/pt/chapter-10.md` (termos novos).

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): spec e plano aprovados; agora o código, sempre depois de um teste que você viu falhar. Este capítulo produz as quatro evidências que faltam.

`### Executando a Task 1` (~250 palavras): pedido em bloco `text` (pt-BR): `/test-driven-development Execute a Task 1 do plano da busca de bancos.` Aprove comando a comando. O agente cria `src/bankSearch.test.ts` e um `src/bankSearch.ts` ainda sem a função (o plano lista os dois arquivos). `[Nota]`: se o arquivo não existir, a mensagem é `Cannot find module './bankSearch'`; a causa é a mesma.

`### Primeiro vermelho: a função não existe` (~350 palavras): o bloco `describe("calculateFee", ...)` copiado de `docs/ebook-exemplo/src/bankSearch.test.ts` (com o `import` e o `blueBank`); a saída "Vermelho 1". O que ler na saída: o nome do teste, a mensagem, a contagem. Falha pelo motivo certo = a funcionalidade não existe. Os testes nasceram da spec, não do código — o oposto da segunda falha do Cap. 1.

`### O "menor que" volta, e agora é pego` (~450 palavras): se a implementação usar `<` (como no Cap. 1), o teste do limite fica vermelho: saída "Vermelho 2". Ler o diff Expected/Received. Correção para `<=` e a função final `calculateFee` de `docs/ebook-exemplo/src/bankSearch.ts`; verde da Task 1. Fechar o arco: o mesmo erro do Cap. 1, agora barrado antes do commit. `[Dica Prática]`: seu agente pode acertar de primeira; para ver o teste proteger, troque `<=` por `<` você mesmo, rode `npm test`, veja vermelho e desfaça. Um teste que nunca falhou não provou nada.

`### Tasks 2 e 3` (~550 palavras): Task 2 — os 5 testes de busca resumidos em lista (sem copiar todos) e o código de `normalize` e `searchBanks` do arquivo verificado; explicar NFD + remoção de diacríticos e a igualdade exata do código. Task 3 — o teste de ordenação (copiar do arquivo verificado); a primeira versão com comparação ingênua dá "Vermelho 3"; explicar por que ("Â" vem depois de "Z" na comparação por código de caractere); correção com `localeCompare(b.name, "pt-BR")` e o `sortByFee` final. O critério concreto da spec ("Order for 500") é que pegou o erro: "ties by name" sozinho deixaria passar.

`### Verificar antes de dizer pronto` (~450 palavras): a `verification-before-completion`: sem "pronto" sem evidência nova. Você roda `npm test` e lê a saída "Verde final" — o resultado verificado por você. Depois, o diff: `git diff main` (ou `git log -p main..`) mostra tudo o que a branch mudou. Checklist em lista vertical: só os arquivos esperados; nenhum teste enfraquecido ou apagado; nenhum `expect` trocado para bater com o código; nada fora do escopo. `[Aviso de Erro Comum]`: o agente "conserta" o vermelho mudando o valor esperado do teste (ex.: `toBe(2)` para `toBe(5)`) — é a segunda falha do Cap. 1 de volta; o diff dos arquivos de teste é onde isso aparece. Só então o commit final (se o agente não tiver feito por tarefa) e nada de `git push` sem decisão sua.

`### As seis evidências, reunidas` (~250 palavras): lista vertical com onde está cada uma agora: spec (`docs/superpowers/specs/`), plano (`docs/superpowers/plans/`), saídas vermelhas (vistas por você), saída verde (8 passed), diff revisado, teste rodado por você. Comparar com o fim do Cap. 1: "devem passar" virou "8 passed" na sua tela. Gancho para o Cap. 8.

`### Resumo`: 5 itens.

Regras: código copiado **literalmente** de `docs/ebook-exemplo/src/` (pode omitir trechos, nunca alterar); saídas só as da seção "Saídas reais"; blocos fora de caixa ≤ 60 caracteres, dentro de caixa ≤ 46 (por isso, código longo fica fora de caixa); sem seta →; "ferramenta" só no sentido do glossário; produto = "CLI"; R$ + U+00A0; código em inglês, conversa em pt-BR; sem tabelas; sem menção a workshop, slides, laboratório, empresas ou ferramentas de reunião; sem telas de CLI inventadas.

- [ ] **Step 2:** `wc -w` — esperado 2.200–2.900.
- [ ] **Step 3: Glossário** — conferir *TDD*, *Vermelho/verde*, *Diff*; adicionar *Refatorar* se o texto usar o termo.

### Task 2: Revisão editorial

- [ ] Subagente revisor (veredito + protocolo + antes e depois), conferindo cada bloco de código contra `docs/ebook-exemplo/src/` e cada saída contra "Saídas reais". Aplicar ajustes.

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-08.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 7 do ebook (vermelho, depois verde)"
```
