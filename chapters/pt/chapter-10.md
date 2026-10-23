## Apêndice B — Glossário

**Agente** — Programa que usa um modelo de linguagem para decidir e executar ações, como ler arquivos e rodar comandos. Neste livro, um agente é sempre a soma de um modelo com um harness.

**Branch** — Linha de desenvolvimento separada dentro de um repositório git. Permite trabalhar numa mudança sem afetar o código principal até a integração.

**CLI** — Sigla de *Command-Line Interface*: programa usado digitando comandos no terminal. Neste livro, as CLIs são o GitHub Copilot CLI e o Claude Code.

**Diff** — Lista das diferenças entre duas versões de um código, linha a linha. Revisar o diff é a forma de conferir exatamente o que o agente mudou.

**Evidência** — Artefato concreto que mostra que uma etapa foi cumprida, como uma spec aprovada, um teste falhando ou um diff revisado. É o oposto de "o agente disse que terminou".

**Ferramenta** — Ação que o harness oferece ao modelo, como ler um arquivo, editar código ou rodar um comando no terminal. O modelo decide quando usar cada ferramenta; o harness a executa.

**Harness** — Programa que envolve o modelo e lhe dá contexto, ferramentas e permissões. O GitHub Copilot CLI e o Claude Code são exemplos de harness; ligados a um modelo, cada um forma um agente.

**MCP** — Sigla de *Model Context Protocol*, um padrão aberto para conectar agentes a ferramentas e fontes de dados externas. Com ele, um mesmo servidor de ferramentas funciona em agentes diferentes.

**Modelo** — Modelo de linguagem que recebe texto e gera texto como resposta. Sozinho, ele não lê arquivos nem roda comandos; quem faz isso é o harness.

**Plano** — Documento que divide uma spec em passos pequenos e ordenados, cada um com o que fazer e como verificar. Um bom plano pode ser revisado por uma pessoa antes de qualquer linha de código.

**Prompt** — Texto que você envia ao agente para pedir algo. Vale só para aquela conversa e não fica guardado como processo.

**SDD (Spec-Driven Development)** — Abordagem em que a especificação é escrita e aprovada antes do código e guia todo o trabalho. A spec vira a referência para o plano, os testes e a revisão.

**Skill** — Arquivo com instruções que ensina ao agente um processo, como fazer brainstorming ou seguir TDD. Diferente de um prompt, a skill fica salva e pode ser reutilizada e compartilhada.

**Spec** — Especificação: descrição do que deve ser construído, com regras, exemplos e critérios de aceite. É escrita antes do plano e aprovada por uma pessoa.

**Subagente** — Agente iniciado por outro agente para cuidar de uma tarefa específica, com contexto próprio. Ao terminar, devolve só o resultado ao agente principal.

**TDD (Test-Driven Development)** — Prática de escrever o teste antes do código de produção. O ciclo é: teste falhando (vermelho), código mínimo para passar (verde) e, se preciso, refatoração.

**Vermelho/verde** — Os dois estados de um teste no ciclo do TDD: vermelho quando falha e verde quando passa. Ver o vermelho antes do verde é a evidência de que o teste realmente verifica algo.

**Worktree** — Cópia de trabalho adicional de um repositório git, ligada a outra branch, numa pasta separada. Permite que um agente trabalhe isolado sem mexer na pasta principal.
