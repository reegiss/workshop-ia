# Ebook — Capítulo 5 "Esclarecer": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 5 em `chapters/pt/chapter-06.md` (~2.500 palavras), abrindo a Parte II.

**Architecture:** Markdown Pandoc. `## Capítulo 5 — Esclarecer`, logo abaixo o antetítulo `*Parte II — Na prática*`, seções `###`. Revisão editorial por subagente.

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md` (em especial "Exemplo do livro" e "Projeto do exemplo"), `docs/diretrizes.md`, capítulos aprovados `chapters/pt/chapter-01.md` a `chapter-05.md`, glossário `chapters/pt/chapter-10.md`.

## Fatos a usar (não inventar outros)

- Comportamento da skill `brainstorming` (superpowers): explora o contexto do projeto; faz **uma pergunta por vez**, de preferência de múltipla escolha; propõe 2 ou 3 abordagens com uma recomendação; apresenta o design em seções e pede aprovação; grava a spec em `docs/superpowers/specs/AAAA-MM-DD-<tema>-design.md` e faz commit dela; pede que você revise o arquivo; ao final, oferece seguir para a skill `writing-plans` (Cap. 6).
- A skill é chamada com `/brainstorming`; instalada como plugin, pode aparecer como `/superpowers:brainstorming` (já dito no Cap. 3).
- Vitest: `npm install -D typescript vitest`; script `"test": "vitest run"`; testes em arquivos `*.test.ts`. Sem arquivos de teste, `vitest run` termina com erro "No test files found" — por isso não rodar `npm test` neste capítulo.

## Conteúdo fixo

Comandos de preparação (bloco `bash`, iguais no macOS, Linux e Windows):

```bash
mkdir bank-search
cd bank-search
git init
npm init -y
npm install -D typescript vitest
npm pkg set scripts.test="vitest run"
```

Depois, o leitor cria no editor um `.gitignore` com a linha `node_modules` (não usar `echo >`, que gera arquivo em outra codificação no PowerShell) e o arquivo `src/banks.ts`:

```ts
export type Bank = {
  code: string;
  name: string;
  lowFee: number;
  highFee: number;
};

export const FEE_RANGE_LIMIT = 1000;

export const banks: Bank[] = [
  { code: "001", name: "Banco Azul",
    lowFee: 2, highFee: 5 },
  { code: "012", name: "Banco Verde",
    lowFee: 3, highFee: 4 },
  { code: "123", name: "Banco Âmbar",
    lowFee: 2, highFee: 6 },
];
```

Fechar a preparação:

```bash
git add .
git commit -m "chore: initial project"
git switch -c feature/bank-search
```

Pedido (bloco `text`, pt-BR), o mesmo do Cap. 1 com a skill e uma linha a mais:

```text
/brainstorming Crie a busca de bancos para a
tela de transferência. Filtre pelo termo
digitado e ordene pela tarifa do valor
informado. Escreva a spec em inglês.
```

Respostas do leitor (decisões fixas da spec do livro): busca por nome e código; nome contém o termo, ignorando maiúsculas e acentos; código só por igualdade exata ("1" não encontra "001"); R$ 1.000,00 fica na faixa baixa (até `FEE_RANGE_LIMIT`, inclusive); empate de tarifa ordena pelo nome. Abordagem escolhida: três funções puras (`searchBanks`, `calculateFee`, `sortByFee`) num módulo `src/bankSearch.ts`.

Trecho da spec gravada (bloco `md`, inglês, ≤ 60 caracteres por linha, ≤ 24 linhas), com: título, Goal, Requirements, Acceptance criteria, Out of scope. Critérios de aceite mínimos:
- `"azul"` and `"AZUL"` find Banco Azul; `"ambar"` finds Banco Âmbar.
- `"001"` finds Banco Azul; `"1"` finds no bank by code.
- Banco Azul fee for 1000 is 2; for 1000.01 is 5.
- Order for 500: Âmbar, Azul, Verde.
Out of scope: fee exemptions or promotions; the confirmation screen.

---

### Task 1: Escrever o Capítulo 5

**Files:** Create `chapters/pt/chapter-06.md`; Modify `chapters/pt/chapter-10.md` (termos novos, se houver).

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): começa a Parte II; neste capítulo, o mesmo pedido vago do Cap. 1 vira uma spec aprovada, e a primeira evidência (requisito esclarecido) fica num arquivo.

`### Preparando o projeto` (~450 palavras): os comandos, o `.gitignore`, o `src/banks.ts` e o commit inicial (conteúdo fixo acima), explicando em uma frase cada passo. Observar que o cadastro já tem o código do banco e o limite — o que faltava no Cap. 1 não era dado, era decisão. `[Nota]`: ainda não há testes; o `npm test` entra no Cap. 7.

`### Regras de trabalho` (~250 palavras): lista vertical: branch local (`feature/bank-search`), sem `git push`; aprove comando a comando; nada sensível. Remete ao Cap. 2.

`### O mesmo pedido, agora com a skill` (~300 palavras): o bloco `text` do pedido; por que "Escreva a spec em inglês" (artefatos do projeto seguem o código). Abrir a CLI na pasta do projeto: blocos rotulados *Claude Code* (`claude`) e *Copilot CLI* (`copilot`). Em vez de código, a primeira resposta é a exploração do projeto e uma pergunta.

`### Uma pergunta por vez` (~750 palavras): o diálogo, ilustrativo, em blocos `text` curtos (pergunta do agente, sua resposta), cobrindo na ordem: (1) nome, código ou os dois; (2) maiúsculas e acentos no nome; (3) "1" encontra "001"?; (4) de que lado do limite fica R$ 1.000,00 (o leitor já sabe a resposta desde o Cap. 1: o agente pergunta, você decide); (5) empate de tarifa. Depois o agente propõe 2–3 abordagens com recomendação e você escolhe três funções puras. Ligar cada pergunta a uma falha evitada. `[Nota]`: o diálogo é ilustrativo; seu agente vai perguntar com outras palavras e talvez em outra ordem — o que importa é que as decisões sejam suas. `[Dica Prática]`: se o agente pular uma dúvida, responda com a pergunta que faltou.

`### Do design à spec` (~400 palavras): o agente apresenta o design em seções e pede aprovação de cada uma; depois grava a spec e faz commit. O trecho da spec em inglês (conteúdo fixo acima), dentro de `> **[Exemplo]**` (então ≤ 46 caracteres por linha). Cada critério de aceite vira um teste no Cap. 7.

`### Conferindo a primeira evidência` (~300 palavras): checklist em lista vertical: cada resposta sua está na spec; os critérios de aceite são verificáveis; o "fora do escopo" está escrito; o commit existe (`git log --oneline`). `[Aviso de Erro Comum]`: aprovar a spec sem ler. No fim, a skill oferece seguir para o plano: o Cap. 6 começa daí.

`### Resumo`: 4–5 itens.

Regras: sem seta →; "ferramenta" só no sentido do glossário; produto = "CLI"; R$ + U+00A0; código e spec em inglês, conversa em pt-BR; blocos fora de caixa ≤ 60 caracteres, dentro de caixa ≤ 46; sem tabelas; sem menção a workshop, slides, laboratório, empresas ou ferramentas de reunião; não inventar telas exatas de nenhuma CLI.

- [ ] **Step 2:** `wc -w` — esperado 2.200–2.900.
- [ ] **Step 3: Glossário** — conferir *Spec*, *Critério de aceite*, *Branch*; adicionar termo novo se houver (ex.: *Commit*, se o texto depender dele).

### Task 2: Revisão editorial

- [ ] Subagente revisor (veredito + protocolo + antes e depois), conferindo o código contra "Conteúdo fixo" e o comportamento da skill contra "Fatos a usar". Aplicar ajustes.

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-06.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 5 do ebook (esclarecer)"
```
