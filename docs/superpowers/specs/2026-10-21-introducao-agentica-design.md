# Introdução agêntica nos slides 5 e 6 — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html` (35 slides: 18 do roteiro + 17 do apêndice) e
`workshop/guia-do-apresentador.md`.

## Objetivo

Logo depois do slide 4 (o problema), apresentar o vocabulário da visão agêntica que a
plateia precisa para o laboratório: **modelo (LLM), contexto, harness, ferramentas e MCP**,
além de chat, agente e skill, que já estão nos slides 5 e 6.

## Restrições

- **Mesmo tempo e mesmo número de slides.** Os slides 5 e 6 continuam com 2 min cada; o
  cronograma do guia não muda e o laboratório não encolhe.
- **Posição:** depois do problema. O slide 4 continua como gancho ("E se o processo viesse
  junto com o agente?") e os conceitos mostram onde o processo entra.
- Manter o visual atual (`slide--dark`, `kicker`, `title` com `<em>`) e reaproveitar as
  classes existentes onde der.

## Slide 5 · Anatomia de um agente

Substitui "Chat responde, agente age". Mantém o id `s-agentes` e a posição; o
`aria-label` passa a ser "Anatomia de um agente".

- **Kicker:** Conceito
- **Título:** Agente = modelo + *harness*
- **Diagrama em HTML/CSS** (sem imagem), em camadas:
  - caixa externa **Harness**: "o programa em volta do modelo (ex.: Copilot CLI)";
  - dentro dela, a caixa **Contexto**: "pedido, arquivos lidos, saídas, skills carregadas";
  - dentro do contexto, a caixa **Modelo (LLM)**: "gera texto e decide o passo";
  - ao lado do contexto, a caixa **Ferramentas · MCP**: "ler arquivo, rodar comando; MCP
    conecta GitHub, Jira…";
  - setas entre contexto e ferramentas: **age →** e **← observa**;
  - legenda do loop dentro do harness: "planeja → age → observa ↻ · pede sua permissão a
    cada ação".
- **Definições, uma linha cada:**
  - **Modelo (LLM):** gera texto e decide o próximo passo. Sozinho, não age.
  - **Contexto:** o que o modelo vê agora. Tem limite.
  - **Harness:** roda o loop, pede a sua permissão e carrega as skills.
  - **Ferramentas · MCP:** as mãos do agente; MCP é o padrão para conectar serviços
    externos.
- **Contraste com o chat:** "No chat, o harness é você: você copia, cola e executa."
- **Frase de efeito (mantida):** "Mais capacidade pede mais *processo* e controle."

A tabela chat × agente (contexto / ações / controle) sai; a ideia fica na linha "o harness
é você". As classes CSS que só ela usa (`versus`, `vs-*`, `loop*`) podem ser removidas se
nenhum outro slide as usar.

**Layout:** precisa caber na área do slide em 16:9 sem rolagem e também na impressão
(PDF). Em telas estreitas, as definições ficam abaixo do diagrama.

## Slide 6 · Skill é um processo em arquivo

Mantém o título, o id `s3` e a estrutura (texto e card de código à esquerda, três cards
de comparação à direita). Três mudanças:

1. **Texto de abertura:**
   > Uma pasta com um `SKILL.md`: nome, descrição e instruções. O harness põe **só a
   > descrição** no contexto; as instruções entram **quando a skill é usada**, pela
   > descrição ou quando você a cita (`/nome`).
2. **Legenda abaixo do card de código:** "Isto fica sempre no contexto. O resto do
   arquivo, só quando precisa."
3. **Cards de comparação:**
   - Prompt: "Você repete a cada conversa." (sem mudança)
   - **Ferramenta · MCP:** "Dá ao agente uma capacidade: ler arquivo, rodar comando,
     acessar um serviço."
   - Skill: "Dá ao agente um método: versionado e revisável como código." (sem mudança)

## Guia do apresentador

Reescrever as entradas dos slides 5 e 6 em "Slide a slide", no formato atual (mensagem,
fala de até 40 palavras, cuidado quando houver). O cronograma não muda.

- **5 · Anatomia de um agente (2 min)**
  - Mensagem: agente é modelo + harness; mais capacidade pede mais processo e controle.
  - Fala: "O modelo só gera texto. Quem age é o harness: roda o loop, chama ferramentas e
    pede a sua permissão. No chat, o harness é você. Aqui, precisamos dizer como ele
    trabalha."
  - Cuidado: não prometa que todo harness lê o repositório ou roda testes. Depende da
    ferramenta e das permissões.
- **6 · Skill é um processo em arquivo (2 min)**
  - Mensagem: ferramenta é o que o agente consegue fazer; skill é como ele deve fazer.
  - Fala: "Ferramenta é o que o agente consegue fazer; skill é como ele deve fazer. E custa
    pouco: até ser usada, só a descrição ocupa o contexto."

## PDF

Regerar `superpowers.pdf` a partir de `index.html` com os estilos de impressão já
existentes. Continua com 35 slides, então as referências do guia ("os mesmos 35 slides",
"`#20`" para o SDD) continuam válidas.

## Fora do escopo

Guia do participante, pré-requisitos, slides do laboratório e apêndice.

## Critérios de aceite

- Os slides 5 e 6 mostram o conteúdo acima; os demais slides não mudam.
- A apresentação continua com 35 slides, e a navegação (setas, `#n`, tela cheia) funciona.
- Os slides 5 e 6 cabem sem rolagem em 16:9 e no PDF.
- O guia do apresentador tem as novas entradas dos slides 5 e 6.
- O PDF regerado reflete as mudanças.
