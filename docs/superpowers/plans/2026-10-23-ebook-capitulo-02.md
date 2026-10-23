# Ebook — Capítulo 2 "Agente = modelo + harness": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever o Capítulo 2 em `chapters/pt/chapter-03.md` (~2.000 palavras).

**Architecture:** Markdown Pandoc. `## Capítulo 2 — Agente = modelo + harness`, seções `###`. Sem antetítulo de parte (só o primeiro capítulo de cada parte tem). Revisão editorial por subagente.

**Tech Stack:** Markdown (Pandoc).

**Referências obrigatórias:** spec `docs/superpowers/specs/2026-10-23-ebook-planejamento-capitulos-design.md` (Exemplo do livro, Padrões de escrita), `docs/diretrizes.md`, `chapters/pt/chapter-01.md`, `chapters/pt/chapter-02.md` (Cap. 1, para continuidade), `chapters/pt/chapter-10.md` (glossário).

---

### Task 1: Escrever o Capítulo 2

**Files:**
- Create: `chapters/pt/chapter-03.md`
- Modify (se houver termos novos): `chapters/pt/chapter-10.md`

- [ ] **Step 1: Escrever o capítulo**

Abertura (2–3 frases): retoma o gancho do Cap. 1 ("o programa em volta do modelo") e diz o objetivo: entender as peças de um agente para saber onde o processo pode morar.

`### O modelo sozinho não age` (~300 palavras): o *modelo* recebe texto e gera texto; decide o próximo passo, mas não lê arquivos nem roda comandos. Num chat, quem age é você: copia, cola, executa e cola o erro de volta. Nesse cenário, você é o harness.

`### Contexto: o que o modelo vê agora` (~300 palavras): *contexto* é tudo o que o modelo enxerga numa chamada (pedido, arquivos lidos, saídas de comandos, instruções). Tem limite; o que não está no contexto não existe para o modelo. Consequência prática: o requisito que você não escreveu (o lado do limite de R$ 1.000,00) não está no contexto. Caixa `[Dica Prática]`: escreva as decisões em arquivos, não só na conversa.

`### O harness roda o loop` (~450 palavras): o *harness* é o programa em volta do modelo: monta o contexto, oferece ferramentas, executa as ações que o modelo pede, devolve o resultado e repete. O loop em lista numerada, aplicado à história: (1) o modelo pede para ler o arquivo de bancos; (2) o harness lê e devolve o conteúdo; (3) o modelo pede para rodar o teste; (4) o harness roda e devolve a saída vermelha; (5) o modelo corrige; (6) repete até o verde. O GitHub Copilot CLI e o Claude Code são harness; ligados a um modelo, formam um agente. `[Nota]`: nem todo harness lê o repositório ou roda testes; depende da CLI e das permissões.

`### Ferramentas e MCP: as mãos do agente` (~300 palavras): *ferramenta* = ação que o harness oferece ao modelo (ler arquivo, editar, rodar comando). *MCP* (Model Context Protocol) = padrão aberto para ligar serviços externos (issue tracker, banco de dados, documentação) como ferramentas, funcionando em agentes diferentes. Sem configuração de MCP neste livro; só o conceito.

`### Permissões: você continua no comando` (~300 palavras): o harness pede permissão antes de ações com efeito (rodar comando, editar arquivo). Aprove comando a comando; leia antes de permitir; evite "permitir tudo". `[Aviso de Erro Comum]`: aprovar sem ler, ou liberar `git push`. Nada sensível: não cole segredos nem peça para ler arquivos de credenciais. Mostrar como a pergunta de permissão aparece, de forma genérica (bloco `text`, sem reproduzir a tela exata de nenhuma CLI).

`### Prompt, ferramenta e skill` (~250 palavras): lista vertical com as três definições: *prompt* = o que você pede agora, some quando a conversa acaba; *ferramenta* = o que o agente consegue fazer; *skill* = como o agente deve fazer, um processo em arquivo, versionado e revisável como código. Fecha: a skill é onde o processo do Cap. 1 pode morar; o Cap. 3 mostra como.

`### Resumo`: 4–5 itens.

Regras: sem a seta →; "ferramenta" só no sentido do glossário; produto = "CLI"; código em inglês; caixas com ≤ 46 caracteres por linha de código; sem tabelas; termo novo em itálico na primeira menção (termos já grifados na Introdução ou no Cap. 1 não voltam a ser grifados, exceto se for a definição formal deles, como harness aqui — nesse caso, use negrito na definição e não itálico); sem menção a workshop, slides, empresas ou repositórios.

- [ ] **Step 2:** `wc -w chapters/pt/chapter-03.md` — esperado entre 1.700 e 2.300.

- [ ] **Step 3: Glossário** — adicionar *Contexto* e *Permissão* (e outro termo novo, se houver) em ordem alfabética, ≤ 2 frases; conferir que Harness, Ferramenta, MCP, Modelo e Prompt continuam coerentes com o capítulo.

---

### Task 2: Revisão editorial

- [ ] Subagente revisor: veredito de spec compliance + protocolo das diretrizes; antes e depois classificados. Não edita.
- [ ] Aplicar ajustes obrigatórios e opcionais coerentes com a spec.

---

### Task 3: Aprovação do autor e commit

```bash
git add chapters/pt/chapter-03.md chapters/pt/chapter-10.md
git commit -m "content: capítulo 2 do ebook (agente = modelo + harness)"
```
