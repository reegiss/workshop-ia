## Introdução {#introducao}

Um *agente* de IA produz em segundos um diff que levaria uma tarde para ser escrito. Isso não é o assunto deste livro. O assunto é o que vem depois: como saber que aquele diff está certo, antes do merge e não depois do incidente. As próximas páginas apresentam um método para exigir *evidência* em cada etapa do trabalho com o agente.

### Para quem é este livro

Este livro é para engenheiros plenos e seniores, tech leads e arquitetos que já usam agentes de código ou que vão definir como o time deve usá-los. Ele supõe domínio de Git, CI/CD, TDD, testes automatizados e arquitetura modular, e não para para explicar nada disso. O exemplo é em TypeScript, mas nenhuma parte do método depende da linguagem.

Os exemplos usam duas *CLIs*, o GitHub Copilot CLI e o Claude Code. Elas são veículos, não o tema. Os comandos específicos ficam concentrados no [Capítulo 3](#cap-3) e no [Apêndice C](#apendice-c); o resto do livro vale para qualquer agente que leia arquivos e rode comandos.

Se é você quem assina o pull request ou responde pelo serviço quando ele quebra, a pergunta "como eu sei que isto está certo?" já é sua. O livro trata de respondê-la quando parte do código foi escrita por um agente.

### A tese

A tese cabe numa frase: toda saída do agente é não confiável até ser verificada por um mecanismo que não dependa do próprio agente. É a postura *zero-trust*, trazida da segurança de redes para o desenvolvimento com IA. Numa rede zero-trust, estar do lado de dentro não concede confiança. Aqui, uma resposta fluente, bem formatada e segura de si também não concede.

Isso não é pessimismo; é uma descrição da ferramenta. O agente é falho por construção: gera o texto mais plausível, não o verificado, perde instruções em sessões longas, inventa APIs e declara pronto o que não conferiu. O [Capítulo 2](#cap-2) mostra de onde vêm essas falhas. A confiança, portanto, tem de estar em mecanismos: um teste que você viu falhar, um comando que você rodou, um gate de CI que barra o merge. Velocidade não entra nessa conta; entregar rápido o que ninguém consegue verificar só desloca o custo.

A segunda ideia é a de padrões. O trabalho se organiza em *padrões de engenharia com IA*, formas recorrentes de restringir o agente para que ele produza artefatos verificáveis: esclarecer o requisito antes de codar, decompor o trabalho em passos conferíveis, provar a mudança com um teste que falha primeiro, verificar de forma independente antes de declarar pronto, isolar contexto e espaço de trabalho. No pacote aberto superpowers, quase todos os padrões têm uma *skill* que os implementa. A skill é a *implementação de referência*; o padrão é o que você leva para outra CLI, outro pacote ou um processo do próprio time. A Parte I dá nome a cada um.

O que este livro não é:

- não é sobre o funcionamento interno dos modelos; o Capítulo 2 trata só do que afeta a verificação;
- não é um catálogo de prompts prontos;
- não é um tutorial de ferramenta: CLIs e pacotes de skills mudam rápido, e o livro os usa como veículos;
- não é uma introdução à engenharia de software: TDD, revisão e CI são pressupostos; o livro mostra o que muda neles quando o autor do código é um agente;
- não é sobre agentes autônomos sem pessoa no circuito. O método supõe alguém que aprova a spec, o plano e o diff. O Capítulo 8 trata de escala e de CI de verdade, com gates obrigatórios no pipeline, e mantém a revisão humana como um deles.

### O que você vai conseguir fazer

Ao terminar o livro, você vai conseguir:

- **aplicar** o princípio zero-trust: separar afirmação de evidência e exigir, para cada saída do agente, um mecanismo de verificação que não dependa dele;
- **explicar** o agente como *modelo* + *harness* e, a partir disso, as falhas que você precisa prever: degradação de contexto e alucinação de API;
- **reconhecer** os padrões de engenharia com IA e as skills que os implementam, e avaliar uma skill de terceiros como código que roda com as suas permissões;
- **conduzir** uma história pelo fluxo mínimo, nesta ordem: esclarecer, planejar, ver o teste *vermelho*, deixá-lo *verde* e verificar;
- **proteger** código legado com *testes de caracterização* antes de deixar o agente mexer nele;
- **converter** cada evidência num gate de pipeline e decidir quando o fluxo completo vale o custo.

Cada etapa do método deixa um artefato que outra pessoa pode inspecionar sem confiar em você nem no agente. Esse artefato é a evidência. É ele que separa "o agente disse que terminou" de "está demonstrado que está pronto".

São seis evidências, duas para cada momento do trabalho:

- **Antes do código:** requisito esclarecido (a *spec*) e *plano* revisável.
- **Durante:** teste falhando antes do código e teste passando depois.
- **Depois:** *diff* revisado por você e resultado verificado por você.

Em código legado há um pré-requisito antes de todas elas: a linha de base caracterizada, que registra o comportamento atual antes de qualquer mudança. O [Capítulo 4](#cap-4) mostra onde fica cada evidência e qual gate automatizado corresponde a ela, e a Parte II produz as seis no exemplo.

### Como o livro está organizado

O livro tem três partes e quatro apêndices. No ebook, cada título abaixo é um link.

**[Parte I — Fundamentos](#cap-1).** O problema, o princípio e as peças: por que velocidade não é verificação, o que é um agente, o que é uma skill e como cada evidência vira um gate.

- [Capítulo 1 — Rápido não é verificável](#cap-1)
- [Capítulo 2 — Agente = modelo + harness](#cap-2)
- [Capítulo 3 — Skills: um processo em arquivo](#cap-3)
- [Capítulo 4 — Evidência e Spec-Driven Development](#cap-4)

**[Parte II — Na prática](#cap-5).** O método aplicado a uma história com código legado, contrato de interface e uma dependência de outro serviço, do pedido inicial até o teste passando e a mutação conferida.

- [Capítulo 5 — Esclarecer](#cap-5)
- [Capítulo 6 — Planejar](#cap-6)
- [Capítulo 7 — Vermelho, depois verde](#cap-7)

**[Parte III — Além do primeiro teste](#cap-8).** Escala com subagentes e worktrees, o pipeline de CI que torna as evidências inegociáveis e os limites do método.

- [Capítulo 8 — Escala, limites e próximos passos](#cap-8)

**[Apêndices](#apendice-a).** Consulta rápida para depois da leitura.

- [Apêndice A — Mapa das skills](#apendice-a)
- [Apêndice B — Glossário](#apendice-b)
- [Apêndice C — Equivalências entre as CLIs](#apendice-c)
- [Apêndice D — Projeto do exemplo](#apendice-d)

### Como ler

Na primeira leitura, siga a ordem dos capítulos. A Parte II é um roteiro de método e pressupõe a Parte I; lida sozinha, mostra os passos sem o critério que justifica cada um. Nela, o exemplo aparece só em caixas curtas; o código completo e verificado está no [Apêndice D](#apendice-d), e é com ele que você reproduz os vermelhos do Capítulo 7.

Quem está desenhando o pipeline do time pode ir do Capítulo 4 direto ao Capítulo 8. Depois da primeira leitura, a Parte I serve de referência para justificar o processo diante do time.

### Convenções

Ao longo do livro, quatro tipos de caixa destacam informações:

> **[Nota]** Contexto extra ou detalhe que ajuda a entender o texto, mas que você pode pular numa leitura rápida.

> **[Dica Prática]** Um hábito ou ajuste que reduz atrito no dia a dia com o agente.

> **[Aviso de Erro Comum]** Um erro recorrente, com o sintoma e a forma de evitá-lo.

> **[Exemplo]** Um caso concreto, em código ou em texto, que mostra a ideia aplicada.

Código e comandos aparecem em `fonte monoespaçada`, no meio da frase ou em blocos separados. Quando o GitHub Copilot CLI e o Claude Code fazem a mesma coisa de formas diferentes, há dois blocos, um rotulado *Copilot CLI* e outro *Claude Code*; isso acontece quase só no Capítulo 3 e no Apêndice C.

Termos técnicos aparecem em *itálico* na primeira vez em que são usados. Todos estão definidos no glossário ([Apêndice B](#apendice-b)).

### Pré-requisitos

Para reproduzir o exemplo:

- acesso a um agente de código com ferramentas de arquivo e de terminal; os exemplos usam o GitHub Copilot CLI ou o Claude Code;
- Node.js em versão LTS, para rodar o projeto de referência do Apêndice D;
- um repositório em que o agente trabalhe numa branch local, com aprovação de comandos ligada e sem segredos, tokens ou credenciais de push e de deploy ao alcance dele.

O último item é a primeira aplicação da tese: o que o agente não consegue fazer não precisa ser verificado depois.

> **[Nota]** As CLIs de IA mudam rápido. Os comandos deste livro foram conferidos na data de publicação, mas podem mudar de nome ou de forma. O método não depende deles: se um comando mudar, o padrão, a etapa e a evidência que ela produz continuam os mesmos.
