# Ebook — Introdução: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever a Introdução do ebook em `chapters/pt/chapter-01.md` (~1.000 palavras) e iniciar o glossário (Apêndice B).

**Architecture:** Texto em Markdown no formato Pandoc do template. Capítulo em `##`, seções em `###`. Caixas didáticas como blockquote com rótulo em negrito. Revisão editorial por subagente seguindo `docs/diretrizes.md`.

**Tech Stack:** Markdown (Pandoc), build KDP existente (não rodar agora: o PDF é gerado só no final).

**Referências obrigatórias para quem executa:**
- Spec: `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md` (sumário, padrões de escrita, decisões)
- Diretrizes editoriais: `docs/diretrizes.md`
- Sem scripts de teste. Sem gerar PDF. Sem citar o workshop, empresas, ferramentas de reunião ou repositórios.

---

### Task 1: Escrever a Introdução

**Files:**
- Modify: `chapters/pt/chapter-01.md` (substituir o conteúdo atual, que é só um placeholder)

- [ ] **Step 1: Escrever o capítulo com esta estrutura e estes pontos**

Título do arquivo: `## Introdução`. Abertura sem título (2–3 frases): agentes de IA escrevem código em
segundos; a pergunta deste livro não é "como ir mais rápido", e sim "como saber que o que foi
gerado está certo". O livro mostra um método para obter **evidência** em cada etapa.

`### Para quem é este livro` (~200 palavras)
- Pessoas desenvolvedoras de qualquer stack que já usam, ou estão começando a usar, um agente de
  código no terminal (o livro usa o GitHub Copilot CLI e o Claude Code nos exemplos).
- Já conhecem git e linha de comando; não precisam saber TypeScript além da leitura básica.
- Querem confiança para colocar o próprio nome num pull request feito com ajuda do agente.
- Não é um livro sobre como funcionam os modelos por dentro, nem um catálogo de prompts.

`### O que você vai conseguir fazer` (~200 palavras), em lista vertical. Ao final do livro, o leitor consegue:
- explicar o que é um agente (*modelo + harness*) e a diferença entre prompt, ferramenta e skill;
- instalar e usar skills no seu agente;
- conduzir uma história pequena pelo fluxo mínimo (esclarecer → planejar → vermelho → verde → verificar);
- apontar a evidência de cada etapa: spec aprovada, plano revisável, teste falhando, teste passando, diff revisado;
- reconhecer quando o fluxo completo vale o custo e quando não vale.

`### Como o livro está organizado` (~200 palavras), lista vertical por parte, uma linha por capítulo:
- Parte I — Fundamentos: Cap. 1 Rápido não é verificável; Cap. 2 Agente = modelo + harness; Cap. 3 Skills: um processo em arquivo; Cap. 4 Evidência e Spec-Driven Development.
- Parte II — Na prática: Cap. 5 Esclarecer; Cap. 6 Planejar; Cap. 7 Vermelho, depois verde.
- Parte III — Além do primeiro teste: Cap. 8 Escala, limites e próximos passos.
- Apêndices: mapa das skills, glossário, equivalências entre as CLIs.

`### Como ler` (~150 palavras)
- Na primeira leitura, siga a ordem: a Parte II depende dos conceitos da Parte I.
- Leia a Parte II com o terminal aberto e faça o exemplo junto; reserve de 1 a 2 horas.
- Depois, a Parte I serve de consulta rápida pelo sumário.

`### Convenções` (~200 palavras)
- As quatro caixas, cada uma com uma frase sobre quando aparece, e um exemplo real de uma delas:

```md
> **[Nota]** Contexto adicional que não interrompe o raciocínio.

> **[Dica Prática]** Um atalho ou hábito que economiza tempo.

> **[Aviso de Erro Comum]** Um engano frequente e como evitá-lo.

> **[Exemplo]** Um caso concreto, comando ou trecho de código.
```

- Código e comandos em fonte monoespaçada. Quando as duas CLIs diferem, aparecem dois blocos
  rotulados *Copilot CLI* e *Claude Code*.
- Termos técnicos em *itálico* na primeira vez em que aparecem; todos estão no glossário (Apêndice B).

`### O que você precisa` (~100 palavras), lista vertical:
- terminal (macOS, Linux ou Windows com WSL ou PowerShell) e git;
- Node.js em versão LTS, para rodar o exemplo em TypeScript;
- acesso a uma das CLIs: GitHub Copilot CLI (assinatura do Copilot) ou Claude Code (conta Claude ou chave de API);
- um editor de código de sua preferência.
- Fechar com `> **[Nota]**`: ferramentas mudam rápido; os comandos foram conferidos na data de
  publicação, e o método não depende deles.

Sem seção de Resumo (o capítulo tem menos de 1.500 palavras). Tom: direto, segunda pessoa
("você"), frases curtas, sem jargão não explicado.

- [ ] **Step 2: Conferir o tamanho**

Run: `wc -w chapters/pt/chapter-01.md`
Expected: entre 850 e 1.200 palavras.

---

### Task 2: Iniciar o glossário (Apêndice B)

**Files:**
- Create: `chapters/pt/chapter-10.md`

- [ ] **Step 1: Criar o arquivo com o título dos apêndices e o glossário**

Os apêndices A e C serão escritos depois, com o Cap. 8. Agora só entra o B:

```md
## Apêndices

### B. Glossário
```

Logo abaixo, uma lista de definições em ordem alfabética, cada uma com no máximo 2 frases, no formato:

```md
**Agente** — Programa que usa um modelo de linguagem para
decidir e executar ações, como ler arquivos e rodar comandos.
```

Termos: agente, branch, diff, evidência, ferramenta, harness, MCP, modelo, plano, prompt, SDD
(Spec-Driven Development), skill, spec, subagente, TDD (Test-Driven Development),
vermelho/verde, worktree. As definições devem ser coerentes com o que a Introdução escreveu.

---

### Task 3: Revisão editorial

**Files:**
- Modify: `chapters/pt/chapter-01.md`, `chapters/pt/chapter-10.md`

- [ ] **Step 1: Despachar subagente revisor**

O subagente lê `docs/diretrizes.md`, a spec e os dois arquivos, e responde no protocolo das
diretrizes: 1) diagnóstico didático; 2) riscos de renderização KDP (tabelas, linhas longas de
código, caixas); 3) antes e depois dos trechos que precisam mudar. Ele também confere se há
menções ao workshop, a empresas ou a repositórios (proibido) e se os termos batem com o glossário.

- [ ] **Step 2: Aplicar os ajustes aceitos**

Aplicar só os ajustes que respeitam a spec. Se um ajuste contradizer a spec, registrar o
motivo da recusa no resumo para o autor.

---

### Task 4: Aprovação do autor e commit

- [ ] **Step 1: Apresentar ao autor**

Mostrar o capítulo, a contagem de palavras e o resumo da revisão editorial. Aguardar aprovação.

- [ ] **Step 2: Commit após aprovação**

```bash
git add chapters/pt/chapter-01.md chapters/pt/chapter-10.md
git commit -m "content: introdução do ebook e glossário inicial"
```
