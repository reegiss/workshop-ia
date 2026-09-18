# Apresentação "Superpowers" — Design

**Data:** 2026-09-18
**Status:** aprovado pelo usuário (tema visual revisado para a identidade Stefanini)

## Objetivo

Apresentar o conjunto de skills do autor **obra** (Jesse Vincent) publicado em
[skills.sh/obra](https://www.skills.sh/obra), com foco no repositório
**superpowers**, como parte de uma apresentação maior sobre agentes de IA e o uso
de skills para desenvolvimento de software.

- Até 10 slides, em português (pt-BR).
- Foco no **que cada skill resolve para quem desenvolve com agentes**, não em
  números de downloads ou instalações. Nenhum slide mostra contagem de instalações.

## Formato e arquitetura

- Arquivo único `index.html` na raiz do projeto, com CSS e JS embutidos, sem build
  e sem dependências de runtime.
- Fontes carregadas do Google Fonts (Manrope e JetBrains Mono), com fallback para fontes do sistema. Offline,
  a apresentação continua funcional e legível.
- Cada slide é um palco fixo de **1920×1080 (16:9)**, escalado via `transform:
  scale()` para caber na janela mantendo a proporção (letterbox com a cor de fundo).

### Navegação

| Ação | Teclas / gesto |
|---|---|
| Avançar | `→`, `↓`, `Espaço`, `PageDown`, clique na metade direita |
| Voltar | `←`, `↑`, `PageUp`, clique na metade esquerda |
| Primeiro / último | `Home` / `End` |
| Tela cheia | `F` |

- Barra de progresso fina no rodapé e contador `03 / 10`.
- O slide atual fica no hash da URL (`#3`). Recarregar mantém a posição e um hash
  inválido ou fora do intervalo cai no slide 1.

## Direção visual: identidade Stefanini, com composição ousada

O público são desenvolvedores da Stefanini, então a apresentação segue a
identidade de [stefanini.com/pt](https://stefanini.com/pt/). As cores foram
extraídas do CSS do tema do site (`wp-content/themes/stefanini/css/style.min.css`).
A composição continua ousada: tipografia grande, blocos de cor chapados e pouco texto.

- **Paleta base:**
  - Azul-marinho `#0B1641`: fundo dos slides escuros (capa, abertura e fecho) e cor
    dos títulos nos slides claros.
  - Azul Stefanini `#0067CC`: cor principal de destaque (links, palavras-chave,
    barra de progresso).
  - Azul escuro `#024589`: variação para hover e detalhes.
  - Azul claro `#DCECFA`: gradiente dos fundos claros (`linear-gradient(180deg,
    #FFFFFF 56%, #DCECFA 100%)`, igual ao do site).
  - Cinza texto `#3C3C3E` e cinza secundário `#83868F`.
  - Superfícies: `#FFFFFF` e `#F5F5F5`.
- **Uma cor por grupo de skills (cores de acento do site):**
  - Grupo 1, Pensar antes de codar: laranja `#FF692C`
  - Grupo 2, Qualidade e disciplina: magenta `#C70160`
  - Grupo 3, Escala com agentes: roxo `#6800D5`
  - Grupo 4, Revisão e entrega: verde-petróleo `#157F75`
- **Tipografia:** o site usa **Nexa** e **Infra**, fontes comerciais servidas por
  um kit Adobe Fonts restrito ao domínio da Stefanini, que não carrega num arquivo
  local. Substitutas:
  - Títulos e texto: **Manrope** (Google Fonts), geométrica como a Nexa. Títulos em
    peso 800, grandes (120–220px no palco); texto em peso 400/500, 32–40px.
  - Nomes de skills e comandos: **JetBrains Mono**.
  - A pilha de fontes lista `"nexa"` primeiro, então quem tiver a Nexa instalada verá
    a fonte oficial.
- **Formas:** cards com cantos arredondados (raio de cerca de 24px), chips de skill
  em formato de pílula e setas/chevrons como elemento direcional, seguindo o site.
- **Ritmo claro/escuro:** slides 1, 2 e 10 escuros (marinho); slides 3, 4 e 5 claros
  (gradiente branco → azul claro); slides 6 a 9 claros, cada um com uma faixa grande
  na cor do grupo.
- **Sem logotipo:** a apresentação não usa o logo da Stefanini. Ele pode ser incluído
  depois, se houver um arquivo oficial.
- **Composição:** grid assimétrico, muito espaço vazio e no máximo cerca de 40
  palavras de texto corrido por slide.
- **Animação:** apenas uma transição curta de entrada (fade e leve deslocamento,
  cerca de 300ms), desativada com `prefers-reduced-motion`.

## Conteúdo dos slides

### 1. Capa
- Título: **SUPER—POWERS**
- Subtítulo: "Skills que ensinam agentes de IA a desenvolver como engenheiros"
- Rodapé: "Agentes & Skills para desenvolvimento" · skills.sh/obra

### 2. O problema: agente sem método
- Título: "RÁPIDO NÃO É O MESMO QUE BOM"
- Um agente escreve código em segundos, mas:
  - começa a codar antes de entender o problema;
  - não escreve testes, ou escreve depois para "passar";
  - chuta a causa de um bug em vez de investigar;
  - diz "pronto" sem ter verificado.
- Fecho: "E se desse para ensinar **processo** ao agente?"

### 3. O que é uma skill
- Título: "SKILL = PROCESSO EMPACOTADO"
- Uma skill é uma pasta com um `SKILL.md` com instruções, checklists e exemplos que
  o agente **carrega sozinho quando a situação pede**.
- Comparação em três colunas:
  - **Prompt:** você repete a cada conversa.
  - **Ferramenta:** dá ao agente uma *capacidade* (ler arquivo, rodar comando).
  - **Skill:** dá ao agente um *método*, reutilizável, versionado e compartilhável.
- Mini exemplo visual do frontmatter:
  ```
  ---
  name: brainstorming
  description: Use antes de qualquer trabalho criativo…
  ---
  ```

### 4. obra e o skills.sh
- Título: "UM CATÁLOGO DE MÉTODOS"
- **obra** (Jesse Vincent) publica skills que codificam práticas de engenharia
  sênior para agentes.
- **skills.sh** é um diretório aberto de skills: você encontra, instala e usa no
  seu agente.
- Outros pacotes do autor, uma linha cada:
  - `episodic-memory`: o agente lembra de conversas anteriores.
  - `the-elements-of-style`: escrita clara e concisa.
  - `superpowers-lab`: experimentos (tmux, detectar funções duplicadas…).
  - `superpowers-chrome`: navegar na web pelo Chrome.
- Destaque: "O principal é o **superpowers**."

### 5. Mapa do superpowers
- Título: "14 SKILLS, 4 MOMENTOS DO TRABALHO"
- Quatro blocos coloridos lado a lado, cada um com suas skills em monoespaçada:
  1. **Pensar antes de codar:** `brainstorming`, `writing-plans`, `executing-plans`
  2. **Qualidade e disciplina:** `test-driven-development`, `systematic-debugging`,
     `verification-before-completion`
  3. **Escala com agentes:** `subagent-driven-development`,
     `dispatching-parallel-agents`, `using-git-worktrees`
  4. **Revisão e entrega:** `requesting-code-review`, `receiving-code-review`,
     `finishing-a-development-branch`, `writing-skills`, `using-superpowers`

### 6. Grupo 1: Pensar antes de codar (laranja `#FF692C`)
Cada skill é mostrada como **Problema → O que o agente passa a fazer**:
- `brainstorming`: pedido vago vira código errado → o agente faz perguntas uma a uma,
  propõe 2 ou 3 abordagens e só avança com um design aprovado.
- `writing-plans`: tarefa grande vira improviso → o agente quebra o trabalho em
  passos pequenos, com arquivos, testes e critérios de pronto.
- `executing-plans`: o plano é esquecido no meio → o agente executa em lotes, com
  pontos de revisão.
- Resultado: "Menos retrabalho: o código nasce do entendimento."

### 7. Grupo 2: Qualidade e disciplina (magenta `#C70160`)
- `test-driven-development`: teste escrito depois só confirma o código → vermelho,
  verde, refatorar. O teste falha primeiro.
- `systematic-debugging`: o bug é "consertado" no chute → reproduzir, isolar e
  encontrar a causa raiz antes de corrigir.
- `verification-before-completion`: "pronto!" sem prova → o agente só declara pronto
  com evidência (teste rodado, saída conferida).
- Resultado: "Confiança: cada afirmação tem evidência."

### 8. Grupo 3: Escala com agentes (roxo `#6800D5`)
- `subagent-driven-development`: um agente só se perde em contexto longo → cada
  tarefa do plano vai para um subagente novo, com revisão entre tarefas.
- `dispatching-parallel-agents`: problemas independentes resolvidos em fila →
  vários agentes em paralelo, um por problema.
- `using-git-worktrees`: tarefas paralelas se atropelam no mesmo diretório → cada
  frente tem sua worktree isolada.
- Resultado: "Mais trabalho em paralelo sem perder o controle."

### 9. Grupo 4: Revisão e entrega (verde-petróleo `#157F75`)
- `requesting-code-review`: o agente revisando o próprio viés → pede revisão
  independente antes de integrar.
- `receiving-code-review`: aceitar tudo sem pensar → avaliar cada sugestão com rigor
  técnico e contestar quando necessário.
- `finishing-a-development-branch`: branch pronta e esquecida → opções claras de
  merge, PR ou limpeza.
- `writing-skills`: o time aprendeu algo → transformar em uma nova skill testada.
- `using-superpowers`: a porta de entrada que ensina o agente a procurar e usar as
  outras skills.
- Resultado: "O ciclo fecha e o conhecimento vira skill."

### 10. O fluxo completo e como começar
- Diagrama horizontal com setas, cada etapa colorida pelo seu grupo:
  `brainstorming` → `writing-plans` → `using-git-worktrees` →
  `subagent-driven-development` (+ `test-driven-development`) →
  `requesting-code-review` → `verification-before-completion` →
  `finishing-a-development-branch`
- Como começar (bloco monoespaçado, comando conferido no skills.sh):
  ```
  npx skills add https://github.com/obra/superpowers
  ```
  ou, no Claude Code, instalar o plugin superpowers.
- Link: skills.sh/obra · github.com/obra/superpowers
- Fecho: "Agentes rápidos + método = software confiável."

## Fora do escopo

- Notas do apresentador
- Animações por elemento (build-ins)
- Exportação para PDF
- Números de instalações ou downloads

## Verificação

1. Abrir `index.html` no navegador e navegar pelos 10 slides com teclado e clique.
2. Conferir em 1920×1080 e em 1366×768 que nenhum texto está cortado ou sobreposto e
   que não há rolagem.
3. Testar o hash (`#5` abre o slide 5; `#99` cai no 1) e o recarregamento da página.
4. Se o Chrome headless estiver disponível, gerar capturas de cada slide e revisá-las.
