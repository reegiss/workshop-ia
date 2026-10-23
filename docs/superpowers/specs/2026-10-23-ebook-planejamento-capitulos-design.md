# Ebook — planejamento dos capítulos

Data: 2026-10-23
Diretrizes editoriais: `docs/diretrizes.md`
Fonte de conteúdo: apresentação em `sliders/` (somente como matéria-prima)

## Objetivo

Escrever um ebook **introdutório e independente** sobre desenvolvimento verificável com
agentes de IA, para publicação na Amazon KDP. O leitor deve conseguir entender o método e
aplicá-lo sozinho, sem ter assistido à apresentação.

## Decisões

| Tema | Decisão |
|---|---|
| Relação com o workshop | Livro independente. Não cita nem reproduz o workshop. |
| Ferramentas | Conceitos agnósticos. Exemplos práticos no **GitHub Copilot CLI** e no **Claude Code**, lado a lado só onde diferem. Sem se prender a nenhum dos dois. |
| Exemplo prático | Uma história única e neutra (regra de negócio simples) num projeto mínimo. |
| Linguagem do código | TypeScript. |
| Idioma | pt-BR primeiro (`chapters/pt`). Versão em inglês (`chapters/en`) só depois do texto estável. |
| Tamanho | ~18.500 palavras, ~60–65 páginas em 6×9 in. |
| Estrutura | Híbrida em três partes: Fundamentos → Na prática → Além do primeiro teste. |
| Fora do escopo | Skills por plataforma (iOS/Android etc.) e catálogo de autores: envelhecem rápido. |

## Sumário e mapeamento de arquivos

Os capítulos usam `##` (nível de capítulo no PDF e no EPUB, `epub-chapter-level: 2`), com o
rótulo `## Capítulo N — Título`; apêndices usam `## Apêndice X — Título`. As partes **não** são
títulos `#` (o sumário fica plano): o primeiro capítulo de cada parte abre com uma linha de
rótulo em negrito, por exemplo `**Parte I — Fundamentos**`.

| Arquivo | Conteúdo | Meta (palavras) |
|---|---|---|
| `chapter-00.md` | Folha de rosto + sumário (já existe) | — |
| `chapter-01.md` | Introdução | 1.000 |
| `chapter-02.md` | Rótulo Parte I + Cap. 1 · Rápido não é verificável | 1.500 |
| `chapter-03.md` | Cap. 2 · Agente = modelo + harness | 2.000 |
| `chapter-04.md` | Cap. 3 · Skills: um processo em arquivo | 2.000 |
| `chapter-05.md` | Cap. 4 · Evidência e Spec-Driven Development | 2.500 |
| `chapter-06.md` | Rótulo Parte II + Cap. 5 · Esclarecer | 2.500 |
| `chapter-07.md` | Cap. 6 · Planejar | 1.500 |
| `chapter-08.md` | Cap. 7 · Vermelho, depois verde | 2.500 |
| `chapter-09.md` | Rótulo Parte III + Cap. 8 · Escala, limites e próximos passos | 2.000 |
| `chapter-10.md` | Apêndice A (mapa das skills), Apêndice B (glossário), Apêndice C (equivalências entre CLIs), cada um em `##` | 1.000 |

### Escopo de cada capítulo

- **Introdução:** para quem é o livro, o que o leitor vai conseguir fazer, como ler,
  convenções (caixas didáticas) e pré-requisitos (terminal, git, Node.js, acesso a uma das CLIs).
- **Cap. 1 · Rápido não é verificável:** o problema do código gerado depressa e sem
  evidência; a definição de *desenvolvimento verificável*.
- **Cap. 2 · Agente = modelo + harness:** o que é um agente; o que é o harness; a diferença
  entre prompt, ferramenta/MCP e skill.
- **Cap. 3 · Skills:** anatomia de um `SKILL.md`; o *superpowers*; instalação no Copilot CLI e
  no Claude Code (comandos conferidos na data da escrita); cuidados com skills de terceiros.
- **Cap. 4 · Evidência e SDD:** confiável = evidência observável (antes, durante, depois); o
  que é SDD (código primeiro vs. spec primeiro); menção ao Spec Kit; o **fluxo mínimo de 4
  skills** (`brainstorming`, `writing-plans`, `test-driven-development`,
  `verification-before-completion`), que é a ponte para a Parte II.
- **Cap. 5 · Esclarecer:** preparação (projeto exemplo, branch local, aprovar comando a
  comando, nada sensível); `brainstorming` até a spec aprovada. Evidência: requisito esclarecido.
- **Cap. 6 · Planejar:** `writing-plans`; plano curto em que cada tarefa começa por um teste.
  Evidência: plano revisável.
- **Cap. 7 · Vermelho, depois verde:** `test-driven-development`;
  `verification-before-completion`; revisão do diff antes do commit. Evidência: teste
  falhando, depois passando, rodado pelo leitor.
- **Cap. 8 · Escala, limites e próximos passos:** subagentes e worktrees; revisão e entrega;
  custo em tempo e tokens; "a skill orienta, não garante"; como aplicar a uma história real.
- **Apêndices:** A) as 14 skills do *superpowers* em 4 momentos, em lista vertical; B) glossário;
  C) equivalências entre Copilot CLI e Claude Code. O apêndice A só aponta onde procurar outras
  skills, sem listá-las.

## Padrões de escrita (todos os capítulos)

- **Estrutura de capítulo:** abertura com o objetivo do capítulo em 1–2 frases → seções com
  `###` → **Resumo** ao final (3–5 itens) para capítulos com mais de 1.500 palavras.
- **Caixas didáticas** em blockquote com rótulo em negrito, compatíveis com PDF e EPUB:
  `> **[Nota]**`, `> **[Dica Prática]**`, `> **[Aviso de Erro Comum]**`, `> **[Exemplo]**`.
- **Tabelas:** no máximo 3 colunas curtas. Quando passar disso, viram listas verticais.
- **Código e comandos:** blocos cercados com linguagem (`ts`, `bash`, `md`), linhas curtas
  (≤ 60 caracteres sempre que possível) para telas estreitas. Quando as CLIs diferem, dois
  blocos rotulados *Copilot CLI* e *Claude Code*.
- **Imagens:** só quando um diagrama ensina mais que o texto. sRGB, alto contraste para
  e-ink, ≥ 300 DPI, em `images/`.
- **Terminologia:** o glossário (Apêndice B) é mantido desde o primeiro capítulo. Termos
  iniciais: agente, CLI, harness, modelo, prompt, ferramenta, MCP, skill, spec, plano, evidência,
  SDD, TDD, vermelho/verde, diff, branch, worktree, subagente.
- **Seta → proibida no texto:** a fonte do PDF não tem o glyph; usar palavras.
- **"Ferramenta"** só no sentido do glossário (ação do harness); o produto é "CLI".
- **Sem referências** a empresas, ferramentas de reunião ou repositórios específicos do
  workshop.

## Fluxo de trabalho: um capítulo por vez

Para cada capítulo, em ordem:

1. Confirmar com o autor o escopo do capítulo (com base neste documento).
2. Escrever o texto no arquivo do capítulo e atualizar o glossário se surgirem termos novos.
3. Revisão editorial seguindo o protocolo de `docs/diretrizes.md` (diagnóstico didático,
   riscos de renderização KDP, ajustes antes e depois). A revisão pode ser feita por
   subagente.
4. Aprovação do autor antes de passar ao próximo capítulo.

Edições de texto não usam scripts de teste. O PDF é gerado **só no final**, depois de todas
as edições pedidas.

## Pendências fora deste documento

- Título, subtítulo e metadados KDP (`{{BOOK_TITLE}}` etc., categorias BISAC, palavras-chave,
  descrição): definidos depois que a Parte I estiver escrita.
- Capa (`cover/`): depois do título.
- Exemplo prático concreto (qual regra de negócio, estrutura do projeto mínimo): definido
  **antes de escrever o Cap. 4**, que o antecipa de forma leve. O Cap. 5 o apresenta por completo.
