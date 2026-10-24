## Introdução {#introducao}

Um *agente* de IA escreve em segundos um código que você levaria uma tarde para escrever. A pergunta deste livro não é "como ir mais rápido", e sim "como saber que o que foi gerado está certo". Nas próximas páginas, você vai aprender um método para obter *evidência* em cada etapa do trabalho com o agente.

### Para quem é este livro

Este livro é para pessoas desenvolvedoras de qualquer linguagem ou plataforma que já usam, ou estão começando a usar, um agente de código no terminal. Nos exemplos, usamos duas *CLIs* (programas de linha de comando): o GitHub Copilot CLI e o Claude Code. Se você usa outra parecida, as ideias continuam valendo.

O livro supõe que você já usa git (commit, branch), npm e testes automatizados no dia a dia, e não para para explicá-los. Ele é introdutório quanto ao trabalho com agentes, não quanto à engenharia de software. O exemplo prático é em TypeScript, mas você só precisa ler o código, não dominar a linguagem.

O livro foi escrito para quem quer confiança para colocar o próprio nome num pull request feito com ajuda do agente. Se você já aceitou uma sugestão que "parecia certa" e descobriu o erro dias depois, este livro é para você.

O que este livro não é:

- não é um livro sobre como os modelos de linguagem funcionam por dentro;
- não é um catálogo de prompts prontos para copiar;
- não é um livro de arquitetura de sistemas com agentes nem de automação em CI. O Capítulo 8 mostra onde o método encontra esses temas.

O foco é o processo: o que pedir ao agente, em que ordem, e como conferir o resultado.

### O que você vai conseguir fazer

Ao terminar o livro, você vai conseguir:

- **explicar** o que é um agente (*modelo* + *harness*) e a diferença entre *prompt*, *ferramenta* e *skill*;
- **instalar** e usar skills no seu agente;
- **conduzir** uma história pequena pelo fluxo mínimo, nesta ordem: esclarecer, planejar, ver o teste *vermelho*, deixá-lo *verde* e verificar;
- **apontar**, em cada etapa, a evidência que ela deixa;
- **reconhecer** quando o fluxo completo vale o custo e quando não vale.

Cada item é algo que você faz, não só algo que você entende. No fim de cada etapa do exemplo, você vai ter um artefato concreto na mão, que pode mostrar para outra pessoa.

Esse artefato é a evidência. É ele que separa "o agente disse que terminou" de "eu sei que está pronto".

São seis evidências, duas para cada momento do trabalho:

- **Antes do código:** requisito esclarecido (a *spec*) e *plano* revisável.
- **Durante:** teste falhando antes do código e teste passando depois.
- **Depois:** *diff* revisado por você e resultado verificado por você.

O Capítulo 4 mostra onde fica cada uma, e a Parte II produz as seis no exemplo.

### Como o livro está organizado

O livro tem três partes e quatro apêndices. No ebook, cada título abaixo é um link.

**[Parte I — Fundamentos](#cap-1).** As peças: o que é um agente, o que é uma skill e por que a evidência importa.

- [Capítulo 1 — Rápido não é verificável](#cap-1)
- [Capítulo 2 — Agente = modelo + harness](#cap-2)
- [Capítulo 3 — Skills: um processo em arquivo](#cap-3)
- [Capítulo 4 — Evidência e Spec-Driven Development](#cap-4)

**[Parte II — Na prática](#cap-5).** As peças em uso num único exemplo, do pedido inicial até o teste passando.

- [Capítulo 5 — Esclarecer](#cap-5)
- [Capítulo 6 — Planejar](#cap-6)
- [Capítulo 7 — Vermelho, depois verde](#cap-7)

**[Parte III — Além do primeiro teste](#cap-8).** Como levar o método para histórias maiores e onde ele para de compensar.

- [Capítulo 8 — Escala, limites e próximos passos](#cap-8)

**[Apêndices](#apendice-a).** Consulta rápida para depois da leitura.

- [Apêndice A — Mapa das skills](#apendice-a)
- [Apêndice B — Glossário](#apendice-b)
- [Apêndice C — Equivalências entre as CLIs](#apendice-c)
- [Apêndice D — Projeto do exemplo](#apendice-d)

### Como ler

Na primeira leitura, siga a ordem dos capítulos. A Parte II depende dos conceitos da Parte I. Pular direto para a prática funciona mal: você vai ver os comandos, mas não vai entender por que eles estão ali.

Leia a Parte II com o terminal aberto e faça o exemplo junto. O projeto completo, da preparação ao código final, está no Apêndice D. Ler sobre um teste falhando ensina pouco; ver o teste falhar na sua máquina ensina muito mais. Reserve de 1 a 2 horas para essa parte, de preferência num bloco só.

Depois da primeira leitura, a Parte I serve de consulta rápida. Use o sumário para voltar a um conceito quando precisar explicá-lo para alguém do time.

### Convenções

Ao longo do livro, quatro tipos de caixa destacam informações:

> **[Nota]** Contexto extra ou detalhe que ajuda a entender o texto, mas que você pode pular numa leitura rápida.

> **[Dica Prática]** Um atalho ou hábito que economiza tempo no dia a dia com o agente.

> **[Aviso de Erro Comum]** Um erro que muita gente comete, com o sintoma e a forma de evitar.

> **[Exemplo]** Um caso concreto, em código ou em texto, que mostra a ideia aplicada.

Código e comandos aparecem em `fonte monoespaçada`, no meio da frase, como `git status`, ou em blocos separados do texto. Quando o GitHub Copilot CLI e o Claude Code fazem a mesma coisa de formas diferentes, você vai ver dois blocos, um rotulado *Copilot CLI* e outro *Claude Code*. Escolha o da CLI que você usa.

Termos técnicos aparecem em *itálico* na primeira vez em que são usados. Todos estão definidos no glossário (Apêndice B), para quando você quiser conferir o significado sem procurar no capítulo.

### O que você precisa

Para acompanhar o exemplo prático, tenha à mão:

- um terminal (macOS, Linux ou Windows) e git;
- Node.js em versão LTS, para rodar o exemplo em TypeScript;
- acesso a uma das CLIs: GitHub Copilot CLI (com um plano do Copilot que inclua a CLI) ou Claude Code (com plano pago do Claude ou chave de API);
- um editor de código de sua preferência.

> **[Nota]** As CLIs de IA mudam rápido. Os comandos deste livro foram conferidos na data de publicação, mas podem mudar de nome ou de forma. O método não depende deles: se um comando mudar, a etapa e a evidência que ela produz continuam as mesmas.
