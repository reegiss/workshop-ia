# Ebook — Capítulo 3 "Skills: um processo em arquivo": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 3 em `chapters/pt/chapter-04.md` (~2.000 palavras).

**Architecture:** Markdown Pandoc. `## Capítulo 3 — Skills: um processo em arquivo`, seções `###`. Revisão editorial por subagente.

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md`, `docs/diretrizes.md`, capítulos aprovados `chapters/pt/chapter-01.md` a `chapter-03.md`, glossário `chapters/pt/chapter-10.md`.

## Fatos verificados (2026-10-23) — usar exatamente estes, não inventar outros

- **Formato:** uma skill é uma pasta com um arquivo `SKILL.md`. O arquivo começa com um cabeçalho YAML (*frontmatter*) com `name` e `description`, seguido das instruções em Markdown. Pode ter arquivos de apoio (scripts, modelos). Segue um padrão aberto (Agent Skills), adotado por várias CLIs.
- **Custo de contexto:** até ser usada, só o `name` e a `description` ficam no contexto; o corpo entra quando a skill é acionada.
- **Acionamento:** o agente usa a skill quando a `description` combina com a tarefa, ou quando você a chama pelo nome com barra (ex.: `/brainstorming`).
- **Onde moram (pastas):**
  - Claude Code — projeto: `.claude/skills/`; pessoal: `~/.claude/skills/`.
  - Copilot CLI — projeto: `.github/skills/`, `.claude/skills/` ou `.agents/skills/`; pessoal: `~/.copilot/skills/` ou `~/.agents/skills/`.
- **superpowers:** pacote aberto de skills de engenharia (repositório `obra/superpowers`, de Jesse Vincent). Não fixar o número de skills.
- **Instalar o pacote completo como plugin:**
  - Claude Code (dentro da sessão): `/plugin install superpowers@claude-plugins-official`
  - Copilot CLI (no terminal):
    `copilot plugin marketplace add obra/superpowers-marketplace`
    `copilot plugin install superpowers@superpowers-marketplace`
- **Instalar só algumas skills** (CLI `skills`, exige Node.js 22 ou superior), funciona para as duas:
  `npx skills add obra/superpowers -g -a claude-code -s brainstorming writing-plans test-driven-development verification-before-completion`
  — trocar `claude-code` por `github-copilot` no Copilot CLI. `-g` = global (pasta pessoal); sem `-g`, instala no projeto.
- **Conferir:** no Copilot CLI, `/skills list`; no Claude Code, digitar `/` e procurar `brainstorming` na lista.

---

### Task 1: Escrever o Capítulo 3

**Files:** Create `chapters/pt/chapter-04.md`; Modify `chapters/pt/chapter-10.md` (termos novos).

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): o Cap. 2 terminou dizendo que a skill é onde o processo pode morar; este capítulo abre uma skill por dentro, instala um pacote e mostra os cuidados.

`### Anatomia de um SKILL.md` (~450 palavras): pasta + `SKILL.md`; frontmatter com `name` e `description`; corpo com as instruções. `> **[Exemplo]**` com uma skill mínima **em inglês** (código/arquivo em inglês), inventada para o livro, ligada à história — ex.: `name: fee-rules`, descrição curta, 3–4 instruções ("Before changing calculateFee, read docs/fee-rules.md", "Ask before assuming a range boundary"). Bloco `md`, ≤ 46 caracteres por linha (está dentro de caixa), ≤ 14 linhas.

`### Como o agente usa uma skill` (~350 palavras): só nome e descrição ocupam o contexto até a skill ser usada (custa pouco); acionamento pela descrição ou pelo nome com barra. Por isso a descrição importa: é ela que diz *quando* usar. `[Dica Prática]`: chamar pelo nome quando quiser garantir.

`### Onde as skills moram` (~250 palavras): pasta do projeto (versionada com o código, vale para o time) vs. pasta pessoal (vale para todos os seus projetos). Pastas de cada CLI em **lista vertical** (sem tabela), dois rótulos *Copilot CLI* / *Claude Code*.

`### O superpowers` (~300 palavras): pacote aberto que codifica práticas de engenharia como skills (esclarecer, planejar, TDD, depurar, verificar, revisar). O livro usa quatro delas no fluxo mínimo: `brainstorming`, `writing-plans`, `test-driven-development`, `verification-before-completion` — uma por falha/etapa; o Cap. 4 explica o fluxo e o Apêndice A mostra o pacote completo.

`### Instalando` (~350 palavras): duas opções. (1) Pacote completo como plugin, com dois blocos rotulados *Claude Code* e *Copilot CLI* (comandos acima). (2) Só as quatro skills com `npx skills add` (comando acima; pode quebrar em várias linhas com `\` para caber ≤ 60 caracteres). Como conferir. `[Nota]`: comandos conferidos na data de publicação; se mudarem, consulte o README do repositório `obra/superpowers`.

`### Skills de terceiros são instruções para o seu agente` (~250 palavras): instalar uma skill é dar instruções ao agente, que tem acesso ao seu terminal. Leia o `SKILL.md` e os scripts antes de instalar, como faria num pull request. `[Aviso de Erro Comum]`: instalar skill de fonte desconhecida sem ler. A skill orienta, não garante (prévia do Cap. 8).

`### Resumo`: 4–5 itens.

Regras: sem seta →; "ferramenta" só no sentido do glossário; produto = "CLI"; R$ seguido de espaço inquebrável (U+00A0) se aparecer; termos novos em itálico na primeira menção (*frontmatter*, *plugin*); termos já grifados não voltam a ser grifados; sem tabelas; sem menção a workshop, slides, empresas (exceto o autor do pacote, como crédito) ou ferramentas de reunião. Repositórios citados: só `obra/superpowers` e o marketplace dele, como fonte de instalação.

- [ ] **Step 2:** `wc -w` — esperado 1.700–2.300.
- [ ] **Step 3: Glossário** — adicionar *Frontmatter* e *Plugin*; revisar *Skill* (pasta com `SKILL.md`, acionada pela descrição ou pelo nome).

---

### Task 2: Revisão editorial

- [ ] Subagente revisor (veredito + protocolo das diretrizes + antes e depois classificados). Conferir os comandos contra a seção "Fatos verificados".
- [ ] Aplicar ajustes.

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-04.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 3 do ebook (skills)"
```
