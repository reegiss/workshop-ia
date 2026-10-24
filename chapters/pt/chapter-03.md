## Capítulo 2 — Agente = modelo + harness {#cap-2}

O [Capítulo 1](#cap-1) terminou com uma ideia: um agente não é só o modelo que escreve texto, mas também o programa em volta dele. Este capítulo separa essas duas peças e mostra como elas trabalham juntas. O objetivo é que você saiba onde o processo de desenvolvimento verificável pode morar, para que ele não dependa só da sua memória.

### O modelo sozinho não age

Comece pela peça mais conhecida. O modelo de linguagem recebe texto e gera texto. Você manda uma pergunta, ele devolve uma resposta. É só isso que ele faz.

Essa resposta pode ser muito boa. O modelo consegue ler um trecho de código, entender o que ele faz e sugerir uma correção. Consegue até decidir qual seria o próximo passo: "agora seria bom rodar os testes". Mas ele não consegue rodar os testes. Ele não abre arquivos, não executa comandos e não vê a sua tela. Ele só escreve.

Pense em como você usa um modelo numa janela de chat, no navegador. Você copia a função `calculateFee` do editor e cola na conversa. O modelo sugere uma mudança. Você copia a sugestão, cola no editor, salva e roda os testes no terminal. Um teste falha. Você copia a mensagem de erro e cola de volta no chat. O modelo sugere outra mudança. E o ciclo recomeça.

Nesse cenário, quem age é você. O modelo pensa e escreve; você lê os arquivos, executa os comandos e leva os resultados de um lado para o outro. Você decide o que mostrar ao modelo e o que ignorar. Se esquecer de colar o arquivo de bancos, o modelo nunca vai saber que ele existe.

Em outras palavras: no chat, você faz o papel do programa em volta do modelo. Você é o harness.

Esse trabalho de copiar e colar é cansativo, mas tem uma vantagem escondida: nada acontece sem passar pelas suas mãos. Quando um programa assume esse papel, o trabalho fica muito mais rápido, e você precisa decidir com cuidado o que ele pode fazer sozinho. As próximas seções tratam disso.

### Contexto: o que o modelo vê agora

Antes de falar do harness, vale entender o que o modelo recebe a cada chamada. Esse conjunto tem nome: *contexto*.

O contexto é tudo o que o modelo enxerga num dado momento. Entram nele o seu pedido, os arquivos que foram lidos, as saídas dos comandos que foram executados, as respostas anteriores da conversa e as instruções que o harness acrescenta por conta própria. O modelo decide o próximo passo olhando só para esse conjunto.

Duas propriedades do contexto importam para o seu dia a dia.

A primeira é que ele tem limite. Cabe muita coisa, mas não cabe tudo. Numa conversa longa, partes antigas podem ser resumidas ou descartadas para abrir espaço. Uma instrução que você deu no começo pode não estar mais lá uma hora depois.

A segunda é mais importante: fora o conhecimento geral que trouxe do treinamento, o que não está no contexto não existe para o modelo. Ele não sabe o que você pensou, o que foi combinado numa reunião ou o que está num documento que ninguém abriu. Ele trabalha com o que recebeu.

Volte à história do Capítulo 1. A regra de que uma transferência de exatamente R$ 1.000,00 fica na faixa baixa estava na sua cabeça. Não estava no pedido, nem no cadastro dos bancos, nem em nenhum arquivo do projeto. Para o modelo, essa regra simplesmente não existia. Ele escolheu "menor que" porque nada no contexto dizia o contrário.

Isso muda a pergunta que você faz quando o agente erra. Em vez de "por que ele não entendeu?", pergunte "isso estava no contexto?". Muitas vezes a resposta é não.

> **[Dica Prática]** Escreva as decisões em arquivos do projeto, não só na conversa. Uma regra registrada num arquivo pode ser lida de novo em qualquer sessão. Uma regra dita só no chat não chega a uma conversa nova.

### O harness roda o loop

**Harness** é o programa em volta do modelo. Ele monta o contexto, oferece ao modelo um conjunto de ações possíveis, executa as ações que o modelo pede, devolve o resultado e repete. Em vez de você copiar e colar, o harness faz esse vai e volta.

Esse vai e volta é um *loop*. O modelo nunca executa nada; ele pede. O harness executa e conta ao modelo o que aconteceu. Com o resultado no contexto, o modelo decide o próximo pedido.

Veja o loop aplicado à história da busca de bancos, supondo que o teste da faixa já existe e está correto:

1. O modelo pede para ler o arquivo com o cadastro dos bancos.
2. O harness lê o arquivo e devolve o conteúdo, que entra no contexto.
3. O modelo pede para rodar os testes.
4. O harness roda o comando e devolve a saída: um teste vermelho, porque R$ 1.000,00 no Banco Azul retornou R$ 5,00 em vez de R$ 2,00.
5. O modelo lê a falha e pede para editar `calculateFee`, trocando "menor que" por "menor ou igual a".
6. O harness aplica a edição, e o loop volta ao passo 3 até o teste ficar verde.

Compare com o chat. As mesmas etapas acontecem, mas agora sem você no meio de cada uma. É isso que dá ao agente a sensação de autonomia: o modelo continua só escrevendo texto, mas o harness transforma esse texto em ações.

Repare também no que o loop resolve e no que ele não resolve. Ele resolve a terceira falha do Capítulo 1: com um harness que roda testes, o agente pode ver a saída real em vez de prever que "os testes devem passar". Mas ele não resolve as outras duas. Se ninguém disse que a busca também vale para o código do banco, nem de que lado do limite fica R$ 1.000,00, o loop roda direitinho em cima de uma regra errada. E, se o teste foi escrito copiando o código, ele fica verde do mesmo jeito.

O GitHub Copilot CLI e o Claude Code são harness. Cada um, ligado a um modelo de linguagem, forma um agente. É por isso que o título deste capítulo é uma soma: agente é modelo mais harness. Trocar o modelo muda a qualidade das decisões; trocar o harness muda o que o agente consegue fazer e como ele faz.

Essa divisão é a chave do livro. O modelo você não muda por dentro: ele chega pronto, já treinado, e no máximo você escolhe qual usar. O harness, por outro lado, você pode configurar. Pode decidir que ações ele oferece, que instruções ele coloca no contexto e quando ele precisa pedir a sua permissão. É no harness que o processo pode morar.

> **[Nota]** Nem todo harness lê o repositório ou roda testes. Isso depende da CLI, de como ela foi configurada e das permissões que você concedeu. Antes de confiar que o agente "rodou os testes", confira se ele de fato pode rodar comandos no seu ambiente.

### Ferramentas e MCP: as mãos do agente

No loop da seção anterior, o modelo pediu três coisas: ler um arquivo, rodar um comando e editar um arquivo. Cada uma dessas ações é uma ferramenta.

Uma **ferramenta** é uma ação que o harness oferece ao modelo. O harness diz ao modelo quais ferramentas existem e o que cada uma faz. O modelo decide quando usar qual, e o harness executa. As ferramentas mais comuns num agente de código são:

- ler um arquivo;
- procurar texto em vários arquivos;
- editar ou criar um arquivo;
- rodar um comando no terminal.

Com essas quatro, o agente já consegue fazer quase tudo o que você faz no dia a dia: entender o projeto, mudar o código e rodar os testes.

Às vezes você quer que o agente alcance coisas que as ferramentas básicas não alcançam. Por exemplo: ler a descrição de uma tarefa no sistema de chamados do time, consultar um banco de dados de testes ou buscar a documentação atual de uma biblioteca. Para isso existe o *MCP*.

MCP é a sigla de *Model Context Protocol*. É um padrão aberto para ligar serviços externos a um agente como se fossem ferramentas. Um serviço que fala MCP, chamado servidor MCP, expõe suas ações de um jeito padronizado, e qualquer harness compatível consegue oferecê-las ao modelo. O mesmo serviço funciona em agentes diferentes, sem ser reescrito para cada um.

Para este livro, basta o conceito. Você não vai configurar nenhum servidor MCP; o exemplo prático usa só as ferramentas básicas de arquivo e terminal. Guarde a ideia principal: ferramentas, inclusive as que chegam via MCP, ampliam o que o agente consegue fazer. Elas não dizem como ele deve trabalhar.

### Permissões: você continua no comando

Um agente que lê arquivos e roda comandos é útil. Também pode causar estrago: apagar uma pasta, sobrescrever um arquivo de configuração, enviar código para o repositório remoto. Por isso os harness usam *permissões*.

Antes de uma ação com efeito, como rodar um comando ou editar um arquivo, o harness para e pergunta se você autoriza. A forma exata da pergunta muda de uma CLI para outra, mas a ideia é parecida com esta:

```text
O agente quer rodar o comando:

  npm test

Permitir esta vez, permitir nas
próximas ou recusar?
```

Essa pergunta é o momento em que você volta a ter as mãos no processo, como no chat. Use-o bem.

Enquanto aprende, aprove comando a comando. Leia o comando antes de permitir e pergunte a si mesmo o que ele faz. Rodar os testes de um projeto que você conhece costuma ser seguro. Apagar arquivos, instalar pacotes ou mexer no git merece uma pausa. As CLIs costumam oferecer formas de liberar uma ação para as próximas vezes ou de liberar tudo de uma vez. Evite a segunda; use a primeira só para ações que você entende bem e que não têm efeito fora do projeto.

> **[Aviso de Erro Comum]** Aprovar sem ler. Depois de dez pedidos seguros, o décimo primeiro passa no automático, e é justamente ele que apaga algo ou publica algo. Nunca deixe liberados comandos como `git push`: enviar código ao repositório remoto é uma decisão sua, depois de revisar o diff.

Cuidado também com o que entra no contexto. Ler arquivos dentro da pasta do projeto costuma não pedir permissão, e tudo o que o agente lê é enviado ao modelo. Não cole senhas, tokens ou chaves de API na conversa e não peça para o agente ler arquivos de credenciais. Se o projeto tem um arquivo desse tipo, mantenha-o fora da pasta em que o agente trabalha.

### Prompt, ferramenta e skill

Agora você tem as peças para separar três coisas que costumam ser confundidas. Para cada uma, veja o que ela é, onde fica e quanto dura:

- **Prompt:** é o que você pede agora. Fica no contexto da conversa e dura enquanto ela durar; numa conversa longa, pode ser resumido antes disso. Se amanhã você quiser o mesmo cuidado, precisa pedir de novo, com as mesmas palavras, e torcer para não esquecer nada.
- **Ferramenta:** é o que o agente consegue fazer: ler, editar, rodar um comando, consultar um serviço via MCP. Fica no harness, que a traz pronta ou a recebe de um servidor MCP, e está disponível em toda sessão. Ferramentas dão capacidade, mas não dizem em que ordem trabalhar nem quando parar para perguntar.
- **Skill:** é como o agente deve fazer: um processo escrito em arquivo, que entra no contexto quando a tarefa pede. Fica numa pasta do projeto ou da CLI e dura até alguém mudar o arquivo. Por ser um arquivo, pode ser versionada no git, revisada num pull request e melhorada com o tempo, como qualquer código.

A diferença que mais importa é a duração: o prompt some com a conversa, e a skill continua lá na próxima.

Volte às três falhas do Capítulo 1. Nenhuma delas era falta de ferramenta: o agente podia ler arquivos e rodar testes. O que faltava era processo. Esclarecer antes de implementar, escrever o teste antes do código e rodar os testes antes de dizer "pronto" são formas de trabalhar, não ações isoladas.

Um prompt até pode pedir tudo isso, mas depende de você lembrar toda vez. A skill é onde o processo do Capítulo 1 pode morar de forma permanente, dentro do harness. Falta ver como é esse arquivo por dentro, como o agente decide carregá-lo e como instalá-lo na sua CLI. É o assunto do [Capítulo 3](#cap-3).

### Resumo

- O modelo recebe texto e gera texto; ele decide o próximo passo, mas não lê arquivos nem roda comandos.
- Contexto é tudo o que o modelo vê numa chamada; tem limite, e, fora o que veio do treinamento, o que não está nele não existe para o modelo.
- O harness monta o contexto, oferece ferramentas, executa as ações pedidas e devolve o resultado, em loop. Agente é modelo mais harness.
- Ferramentas, inclusive as que chegam via MCP, dizem o que o agente consegue fazer; permissões mantêm você no comando de cada ação com efeito.
- Prompt é o pedido de agora; skill é o processo em arquivo, versionado e revisável, e é onde o método pode morar.
