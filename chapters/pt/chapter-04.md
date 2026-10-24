## Capítulo 3 — Skills: um processo em arquivo {#cap-3}

O [Capítulo 2](#cap-2) terminou com uma ideia: a skill é onde o processo pode morar, dentro do harness. Este capítulo abre uma skill por dentro, mostra como o agente a usa e onde ela fica guardada. No fim, você instala um pacote de skills na sua CLI e aprende os cuidados que ele exige.

### Anatomia de um SKILL.md

Uma skill é uma pasta. Dentro dela há pelo menos um arquivo, sempre com o mesmo nome: `SKILL.md`. O nome da pasta deve ser igual ao nome da skill.

O `SKILL.md` tem duas partes. No topo vem um cabeçalho curto, delimitado por duas linhas com três hifens. Esse cabeçalho se chama *frontmatter* e é escrito em YAML, um formato simples de chave e valor. Ele traz dois campos obrigatórios:

- `name`: o nome da skill, só com letras minúsculas, números e hifens (no lugar de espaços), igual ao nome da pasta;
- `description`: uma ou duas frases que dizem para que a skill serve e quando usá-la.

Abaixo do frontmatter vem o corpo: as instruções, em Markdown comum. É texto para o agente ler, escrito como você escreveria para uma pessoa nova no time. Passos numerados, regras curtas, exemplos. Não há linguagem especial nem sintaxe obrigatória.

A pasta também pode guardar arquivos de apoio, como scripts que o agente pode rodar ou modelos de documento que ele deve preencher. O corpo do `SKILL.md` diz quando usar cada um.

Volte à história da busca de bancos. A regra de que R$ 1.000,00 fica na faixa baixa não estava no contexto, e o agente errou o limite. O Capítulo 2 sugeriu escrever essa regra num arquivo do projeto. Uma skill vai um passo além: ela diz ao agente quando ler esse arquivo e o que fazer antes de mexer na tarifa.

> **[Exemplo]** Uma skill mínima, inventada para este livro, guardada em `fee-rules/SKILL.md`:
>
> ```md
> ---
> name: fee-rules
> description: Use when writing or changing
>   transfer fees, fee ranges or their tests.
> ---
>
> # Fee rules
>
> 1. Before changing calculateFee, read
>    docs/fee-rules.md.
> 2. Ask before assuming a range boundary.
> 3. Write the failing test before the code.
> 4. Run the tests and show the output.
> ```
>
> As linhas entre os dois `---` são o frontmatter; o resto é o corpo. A descrição diz quando usar; o corpo diz como trabalhar. O arquivo está em inglês, como todo o código do livro.

Repare no tamanho. Quatro instruções já atacam as três falhas do [Capítulo 1](#cap-1) nesse pedaço do código: ler a regra e perguntar sobre o limite combatem implementar antes de esclarecer; o teste antes do código combate o teste que copia a saída; rodar os testes combate o "pronto" sem evidência.

Uma skill não precisa ser longa para ser útil. Precisa ser clara sobre quando se aplica e sobre o que o agente deve fazer.

O formato segue um padrão aberto, chamado Agent Skills, adotado por várias CLIs. A mesma pasta funciona no Claude Code e no GitHub Copilot CLI, sem mudar uma linha.

### Como o agente usa uma skill

Um projeto pode ter dezenas de skills instaladas. Se todas entrassem inteiras no contexto a cada pedido, sobraria pouco espaço para o código, as saídas de comandos e a conversa. O harness evita isso carregando a skill em duas etapas.

Na primeira etapa, só o `name` e a `description` de cada skill entram no contexto. São poucas linhas por skill. Isso custa pouco e permite que o modelo saiba quais processos estão disponíveis.

Na segunda etapa, quando a skill é acionada, o corpo do `SKILL.md` entra no contexto. Só a partir daí o agente lê as instruções e passa a segui-las.

A diferença de tamanho é grande. Um corpo costuma ter dezenas ou centenas de linhas; a descrição, uma ou duas. Com vinte skills instaladas, a primeira etapa ocupa umas quarenta linhas do contexto, e só os corpos das skills em uso entram por inteiro. Como o contexto tem limite, isso deixa espaço para o que importa na tarefa: o código, as saídas dos comandos e a conversa.

Uma skill é acionada de duas formas:

- **Pela descrição:** o modelo compara o sentido do seu pedido com as descrições disponíveis. Se uma trata do mesmo assunto da tarefa, ele aciona a skill por conta própria.
- **Pelo nome:** você chama a skill digitando uma barra seguida do nome, como `/brainstorming`. Nesse caso, ela entra no contexto mesmo que o modelo não a tivesse escolhido.

A primeira forma explica por que a descrição é a parte mais importante do arquivo. É ela que diz ao modelo *quando* usar a skill. Uma descrição vaga, como "Regras do projeto", raramente combina com um pedido concreto. Uma descrição específica, como a do exemplo, dá ao modelo um assunto claro: tarifas de transferência e suas faixas.

Pense no pedido do Capítulo 1: "ordene pela tarifa do valor informado". Com a skill `fee-rules` instalada, o pedido trata do mesmo assunto da descrição, mesmo escrito em português. O agente carrega as instruções, lê o arquivo da regra e pergunta sobre o limite antes de escrever `calculateFee`.

Pode ser que isso não aconteça. A escolha pela descrição é uma decisão do modelo, e decisões do modelo variam. Ele pode achar que o pedido não precisa da skill, ou pode escolher outra parecida.

> **[Dica Prática]** Quando você quer ter certeza de que uma skill vai ser usada, chame-a pelo nome. Digitar `/fee-rules` antes do pedido garante que as instruções entrem no contexto. Deixe o acionamento automático para as situações em que esquecer a skill não custa caro.

### Onde as skills moram

Cada CLI procura skills em pastas conhecidas. Há dois tipos de pasta, e a escolha entre eles é uma decisão sobre quem vai usar a skill.

A **pasta do projeto** fica dentro do repositório. A skill é versionada junto com o código, entra nos pull requests e vale para todas as pessoas do time que abrirem o projeto. É o lugar certo para regras do próprio projeto, como a `fee-rules`: ela só faz sentido onde existe `calculateFee`.

A **pasta pessoal** fica no seu diretório de usuário. A skill vale para todos os seus projetos, mas só na sua máquina. É o lugar certo para processos gerais, que você quer em qualquer repositório, como esclarecer antes de implementar ou escrever o teste primeiro.

As pastas de cada CLI são estas:

*Claude Code*

- projeto: `.claude/skills/`;
- pessoal: `~/.claude/skills/`.

*Copilot CLI*

- projeto: `.github/skills/`, `.claude/skills/` ou `.agents/skills/`;
- pessoal: `~/.copilot/skills/` ou `~/.agents/skills/`.

Cada skill ocupa uma subpasta dentro dessas. A `fee-rules` do exemplo, no projeto, ficaria em `.claude/skills/fee-rules/SKILL.md`.

Repare que `.claude/skills/` aparece nas duas listas. Se o time usa as duas CLIs, guardar as skills do projeto nessa pasta faz com que ambas as encontrem.

### O superpowers

Escrever as próprias skills é útil para regras do projeto. Para práticas gerais de engenharia, você não precisa começar do zero.

O *superpowers* é um pacote aberto de skills de engenharia de software, criado por Jesse Vincent e publicado no repositório `obra/superpowers`. Cada skill do pacote codifica uma prática conhecida: esclarecer o requisito antes de implementar, escrever um plano, seguir TDD, depurar com método, verificar antes de declarar pronto e revisar o código. O pacote cresce com o tempo, por isso este livro não fixa quantas skills ele tem.

O fluxo do livro usa só quatro delas, uma para cada etapa. Compare cada uma com as três falhas do Capítulo 1:

- `brainstorming`: esclarece o requisito com perguntas antes de qualquer código e termina numa spec aprovada por você. Responde a implementar antes de esclarecer.
- `writing-plans`: transforma a spec num plano curto, com tarefas pequenas e revisáveis, cada uma começando por um teste. Liga o esclarecimento ao TDD.
- `test-driven-development`: conduz o ciclo vermelho, depois verde, com o teste escrito antes do código. Responde ao teste escrito depois, só para passar.
- `verification-before-completion`: exige que o agente rode os comandos e mostre a saída antes de dizer "pronto". Responde ao "pronto" sem evidência.

Essas quatro skills formam o fluxo mínimo. O [Capítulo 4](#cap-4) explica esse fluxo e a evidência que cada etapa produz. A [Parte II](#cap-5) usa cada skill no exemplo da busca de bancos. O [Apêndice A](#apendice-a) mostra o pacote completo, organizado pelos momentos do trabalho.

### Instalando

Há duas formas de instalar o superpowers. A primeira instala o pacote inteiro como *plugin*, um conjunto de skills e configurações que a CLI instala e atualiza de uma vez. Um plugin pode trazer também comandos que a CLI roda sozinha, por isso os cuidados do fim do capítulo valem para ele. A segunda instala só as quatro skills do fluxo mínimo.

A primeira forma é a mais simples de manter. Os comandos mudam conforme a CLI.

*Claude Code* (dentro da sessão):

```text
/plugin install superpowers@claude-plugins-official
```

*Copilot CLI* (no terminal):

```bash
copilot plugin marketplace add \
  obra/superpowers-marketplace
copilot plugin install \
  superpowers@superpowers-marketplace
```

No Copilot CLI, o primeiro comando registra o marketplace, o catálogo de onde o pacote vem; o segundo instala o pacote.

A barra invertida no fim de uma linha só quebra o comando para caber na página. Colado como está, ele funciona no bash e no zsh. No PowerShell do Windows, digite cada comando numa linha só, sem as barras.

A segunda forma usa um programa de linha de comando chamado `skills`, executado com `npx`. Ele exige Node.js 22 ou superior. O comando abaixo instala as quatro skills na pasta pessoal do Claude Code:

```bash
npx skills add obra/superpowers -g \
  -a claude-code \
  -s brainstorming writing-plans \
  test-driven-development \
  verification-before-completion
```

As barras invertidas seguem a mesma regra de antes. As opções fazem o seguinte:

- `-a` escolhe a CLI. No Copilot CLI, troque `claude-code` por `github-copilot`;
- `-s` lista as skills que você quer;
- `-g` instala na pasta pessoal. Sem `-g`, a instalação vai para a pasta do projeto em que você está.

Depois de instalar, confira se as skills aparecem. No Claude Code, digite `/` e procure `brainstorming` na lista que aparece. No Copilot CLI, digite `/skills list` dentro da sessão. Quando a skill vem de um plugin, a CLI pode mostrá-la com o nome do plugin na frente, como `superpowers:brainstorming`; é a mesma skill.

Se a skill não aparecer, feche a sessão e abra outra. A CLI costuma ler as skills disponíveis quando a sessão começa.

> **[Nota]** Os comandos desta seção foram conferidos na data de publicação. Se algum mudar de nome ou de forma, consulte o README do repositório `obra/superpowers`, que traz as instruções atuais de instalação para cada CLI.

### Skills de terceiros são instruções para o seu agente

Instalar uma skill parece instalar uma biblioteca, mas o efeito é diferente. Uma skill é um conjunto de instruções que o agente vai seguir. E o agente, como você viu no Capítulo 2, tem acesso ao seu terminal e aos seus arquivos.

Uma skill mal-intencionada pode pedir ao agente que leia arquivos que não têm relação com a tarefa, rode um script da própria pasta ou envie dados para fora da sua máquina. Mesmo uma skill bem-intencionada pode trazer um passo que não combina com o seu projeto. As permissões ajudam, porque o harness pede autorização antes de rodar comandos. Mas um pedido que vem de uma skill chega com a mesma cara de um pedido comum, e é fácil aprová-lo sem pensar.

Por isso, trate a instalação de uma skill como um pull request. Antes de instalar:

- leia o `SKILL.md` inteiro, não só a descrição;
- abra os scripts e demais arquivos da pasta e entenda o que cada um faz;
- prefira fontes que você conhece e que mostram o histórico de mudanças.

A mesma regra vale para atualizações. Uma skill que era segura na versão que você leu pode mudar depois.

> **[Aviso de Erro Comum]** Instalar uma skill de fonte desconhecida sem ler o conteúdo, porque o nome e a descrição pareciam úteis. O sintoma aparece depois: o agente roda comandos ou lê arquivos que você não pediu e que não têm relação com a tarefa. Para evitar, leia a pasta inteira antes de instalar, como faria com o código de outra pessoa antes de aprovar um pull request.

Há um último cuidado, que vale até para skills confiáveis. Uma skill orienta o agente; ela não o obriga. O modelo pode pular um passo, interpretar uma instrução do jeito errado ou não acionar a skill quando deveria. A skill aumenta muito a chance de o processo ser seguido, mas a evidência continua sendo sua responsabilidade. O [Capítulo 8](#cap-8) volta a esse limite.

### Resumo

- Uma skill é uma pasta com um arquivo `SKILL.md`: um frontmatter com `name` e `description`, seguido das instruções em Markdown, e arquivos de apoio opcionais.
- Até ser usada, só o nome e a descrição ocupam o contexto. A skill é acionada quando a descrição combina com a tarefa ou quando você a chama pelo nome, com barra.
- Skills na pasta do projeto são versionadas e valem para o time; skills na pasta pessoal valem para todos os seus projetos.
- O superpowers é um pacote aberto de skills de engenharia. O livro usa quatro delas no fluxo mínimo: `brainstorming`, `writing-plans`, `test-driven-development` e `verification-before-completion`.
- Uma skill de terceiros é uma instrução para o seu agente: leia antes de instalar e lembre que ela orienta, mas não garante.
