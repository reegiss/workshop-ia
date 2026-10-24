## Capítulo 2 — Agente = modelo + harness {#cap-2}

O [Capítulo 1](#cap-1) mostrou três falhas que soam como descuido humano: decidir em silêncio, testar depois e declarar pronto sem conferir. No agente, elas não são descuido. São propriedades do sistema. Este capítulo separa o agente em suas duas peças, o modelo e o *harness*, para responder a uma pergunta de engenharia: em que pontos dá para pôr um controle determinístico, e em que pontos tudo o que existe é a probabilidade de o modelo se comportar bem.

A premissa do resto do livro sai daqui. Toda saída do agente é não confiável até ser verificada por um mecanismo que não dependa dele.

### O harness é um loop de controle

O modelo é uma função sem estado. A cada chamada, ele recebe o *contexto* inteiro e devolve uma continuação. Entre uma chamada e outra, ele não guarda nada. A "memória" da sessão é o histórico que o harness reenvia a cada volta.

O harness é o programa que fecha esse circuito. Ele monta o contexto, que reúne o prompt de sistema, os arquivos de instrução do projeto, as definições das ferramentas e o histórico. Depois chama o modelo e interpreta a resposta. Se a resposta pede uma ferramenta, o harness consulta a política de permissões, executa a ação, anexa o resultado ao contexto e chama o modelo de novo. Reduzido ao essencial, o *loop* é este:

```ts
while (true) {
  const reply = await model(context);
  if (!reply.toolCall) return reply.text;
  const call = reply.toolCall;
  if (!(await policy.check(call))) {
    context.push(denied(call));
    continue;
  }
  const result = await tools.run(call);
  context.push(call, result);
}
```

Três consequências desse desenho orientam o resto do livro.

**O loop termina quando o modelo decide.** A condição de parada é a ausência de um pedido de ferramenta. Nada no loop confere se os testes passaram, se o requisito foi atendido ou se o comando prometido chegou a rodar. "Pronto" é texto gerado, não um estado verificado. A falha 3 do Capítulo 1, "Os testes devem passar", é o comportamento padrão de um loop que não tem portão de saída.

**Só o harness é determinístico.** A política de permissões, a implementação das ferramentas e os ganchos que alguns harness oferecem (comandos disparados em eventos do loop, como antes de uma edição ou ao fim de um turno) se comportam igual toda vez. O modelo não. Um controle que precisa valer sempre tem de morar na parte determinística, ou fora do agente: num teste, num hook, num gate de CI. Uma instrução ao modelo é uma sugestão com alta probabilidade de ser seguida, não um controle.

**O contexto é a única entrada.** Fora o que veio do treino, o que não está no contexto não existe para o modelo. Quando o agente erra, a pergunta útil não é "por que ele não entendeu?", e sim "isso estava no contexto, e com peso suficiente?". A segunda metade da pergunta é o assunto da seção sobre degradação.

### A superfície de ferramentas

A *ferramenta* é a API que o harness expõe ao modelo. Cada uma tem nome, descrição e esquema de parâmetros, e essas definições ocupam contexto em toda chamada. Num agente de código, o conjunto mínimo é ler, buscar, editar e executar no shell.

A última domina as outras. Um shell é execução arbitrária de código com os privilégios do usuário que iniciou a CLI: o seu. Tudo o que o seu usuário alcança, o agente alcança, inclusive variáveis de ambiente, chaves SSH carregadas no agente, tokens em `~/.npmrc`, sessões autenticadas do `gh` e credenciais de nuvem no diretório pessoal. A pergunta de segurança não é "quais ferramentas o agente tem?". É "o que o processo do agente consegue alcançar?".

O caminho de volta merece a mesma atenção. Toda saída de ferramenta entra no contexto com o mesmo status do seu pedido. Para o modelo, um comentário num arquivo lido, o corpo de uma issue, o README de uma dependência ou uma mensagem de erro são texto, e texto pode conter instruções. Isso é *injeção de prompt* (*prompt injection*) indireta: alguém que controla um dado que o agente lê passa a influenciar o que o agente faz. Não existe filtro confiável para isso dentro do modelo. A defesa está em limitar o que uma instrução injetada conseguiria executar.

### Permissões como fronteira de confiança

Se o modelo é um principal não confiável, a *permissão* é o ponto de aplicação da política: a fronteira entre o que ele propõe e o que de fato acontece. Os harness oferecem variações do mesmo modelo de controle: aprovar uma vez, liberar um padrão de comando, negar um padrão, restringir diretórios e, em alguns casos, isolar a execução num sandbox.

A fronteira é mais porosa do que parece, por três razões:

- **Composição.** Liberar `npm test` parece inofensivo. Mas `npm test` executa o que o `package.json` mandar, e o agente pode editar o `package.json`. Permissão de edição somada a um comando liberado que interpreta arquivos editáveis equivale a execução arbitrária. O mesmo vale para `make`, scripts do projeto e configurações de test runner.
- **Fadiga.** Depois de vinte aprovações legítimas, a vigésima primeira passa sem leitura. A aprovação comando a comando só funciona se cada comando for lido. Quando isso deixa de ser viável, o certo é estreitar o que o agente alcança, não liberar mais.
- **Capacidade não é intenção.** Uma regra que diz ao modelo "nunca faça push" vale tanto quanto a probabilidade de ele obedecer. Um agente sem credencial de push não consegue fazer push. Só a segunda é um controle.

Daí a regra de segurança que o livro segue em todos os capítulos:

- o agente trabalha numa branch local;
- nenhum `git push` acontece sem decisão sua, depois de revisar o diff;
- comandos com efeito são aprovados um a um, e lidos;
- nada sensível fica ao alcance do agente, seja segredo, token ou arquivo de credenciais. Isso inclui o que está no ambiente herdado pelo shell, e não só na pasta do projeto;
- o agente não recebe credenciais de push nem de deploy. Se o seu usuário tem essas credenciais, rode o agente num ambiente que não as tenha: um contêiner, outro usuário do sistema, um ambiente de desenvolvimento remoto.

> **[Aviso de Erro Comum]** Liberar um padrão amplo, como qualquer comando `git` ou qualquer script do projeto, para acabar com as interrupções. O sintoma não aparece na hora; aparece quando uma instrução injetada ou um passo mal interpretado usa exatamente essa liberação. Para evitar, libere comandos exatos e sem efeito fora da pasta do projeto, e trate cada pedido de liberação mais ampla como sinal de que o agente está alcançando coisa demais.

### Degradação de contexto

O contexto tem limite, e isso todo mundo sabe. O que importa é como ele se deteriora antes de chegar ao limite e o que isso significa para a confiabilidade de uma sessão longa.

#### Janela finita, medida em tokens

O modelo não lê caracteres nem linhas. Lê *tokens*, fragmentos de palavra cujo tamanho varia com a língua e com o tipo de texto. Código, JSON e saídas de log costumam render mais tokens por linha do que prosa. Cada chamada carrega o contexto inteiro: prompt de sistema, definições de ferramentas, instruções do projeto, metadados das skills e todo o histórico de pedidos, leituras e saídas. Uma sessão que leu meia dúzia de arquivos e rodou a suíte algumas vezes consome uma fração relevante da janela, mesmo que a conversa pareça curta.

#### Compactação descarta detalhes

Quando a janela enche, o harness precisa abrir espaço: trunca saídas antigas, descarta turnos ou resume o histórico com o próprio modelo. É a *compactação*. Um resumo preserva o que o modelo considerou importante no momento de resumir, e decisões de borda raramente parecem importantes. "Limite inclusivo" vira "regra de faixas discutida". O resumo não avisa o que perdeu, e o modelo segue trabalhando sobre ele com a mesma fluência.

#### Atenção diluída e o meio esquecido

Mesmo dentro da janela, nem toda posição vale o mesmo. Liu et al. (2023), em "Lost in the Middle", mostraram que modelos recuperam pior a informação posicionada no meio de contextos longos do que a do começo ou do fim. A curva tem forma de U. Numa sessão de agente, o meio é justamente onde ficam as decisões tomadas depois das primeiras trocas e antes do trabalho atual, ou seja, a maior parte do que foi combinado.

#### Ruído das ferramentas

Saídas de ferramenta são volumosas e de baixo sinal: stack traces, logs de instalação, a suíte inteira listada teste a teste, arquivos lidos por completo para achar três linhas. Esse texto compete por atenção com as suas instruções e empurra as decisões para o meio do contexto. Uma única saída de build verbosa pode ocupar mais espaço do que toda a especificação da tarefa.

#### Decaimento de instruções

Instruções antigas perdem peso para as recentes. Uma restrição dada no começo ("não mude a assinatura de `getFee`") compete com dezenas de pedidos e resultados posteriores, e o modelo tende a privilegiar o que está mais próximo do fim. Isso não aparece como desobediência explícita. Aparece como uma escolha "razoável" que contraria algo combinado há quarenta turnos.

#### Consequência: a sessão é estado não auditável

Some os cinco efeitos e a conclusão é desconfortável. Uma sessão longa é estado acumulado que ninguém consegue inspecionar. Você não sabe o que ainda está no contexto, o que foi resumido, o que perdeu peso nem qual saída de ferramenta está disputando atenção com a regra de negócio. Não há diff desse estado, nem revisão, nem como reproduzi-lo amanhã. Confiar numa decisão porque "eu falei isso para ele mais cedo" é confiar num estado que você não consegue auditar.

> **[Exemplo]** No `transfer-service`, a decisão "limite inclusivo, igual ao legado" pode ser tomada nas primeiras trocas de uma sessão. Depois de várias rodadas de leitura do legado e de saídas da suíte, ela está no meio do contexto ou dentro de um resumo. Se o agente reescreve a política nesse ponto, a falha 2 do Capítulo 1, `amount < table.limit`, reaparece sem que ninguém tenha mudado de ideia. Escrita na spec versionada, a mesma decisão é uma linha que qualquer sessão relê e que você revisa no PR.

#### Defesas

As defesas tratam o contexto como o que ele é: um cache volátil, e não a fonte da verdade.

- **Estado em arquivo versionado, e não na conversa.** Requisitos, decisões e planos ficam em arquivos do repositório, que o agente relê no começo de cada etapa e que você revisa por diff. A conversa vira descartável.
- **Sessões curtas por etapa.** Esclarecer, planejar e implementar cada tarefa são sessões separadas, cada uma começando dos artefatos da anterior. Quanto menor a sessão, menos meio ela tem.
- **Subagentes com contexto curado.** Um subagente começa com um contexto montado só com o que a tarefa precisa e devolve só o resultado. É isolamento do estado do modelo: a tarefa seguinte não herda o ruído da anterior.
- **Worktrees.** Um worktree dá a cada linha de trabalho o seu próprio diretório e a sua própria branch. É isolamento do estado do sistema de arquivos, análogo ao isolamento de processos: um agente não vê nem corrompe as alterações pela metade de outro.

O [Capítulo 4](#cap-4) transforma a primeira defesa em método, e o [Capítulo 8](#cap-8) retoma as outras quando o trabalho escala.

### Por que o agente inventa APIs

A *alucinação* de API é o caso mais concreto de saída plausível e falsa, e entender o mecanismo ajuda a não tratá-la como acidente raro.

O modelo gera a continuação mais provável dado o contexto. Ele não consulta um índice de símbolos antes de escrever uma chamada; produz o que costuma aparecer naquele tipo de código. Na maior parte do tempo, o provável coincide com o existente. Quando não coincide, o resultado é um método com nome convincente, uma opção de configuração com a forma certa ou uma assinatura que existiu numa versão anterior.

Três fatores tornam isso estrutural. Primeiro, o treino mistura versões: a mesma biblioteca aparece com APIs de vários anos, sem marcação confiável de qual vale para o seu lockfile. Segundo, APIs internas não estão no treino: uma porta como `FeeTableProvider` só existe no seu repositório, e, se a definição não estiver no contexto, o modelo completa por analogia com o que já viu. Terceiro, o texto não carrega incerteza: o método inventado sai escrito com a mesma fluência do método real.

Por isso a fonte da verdade nunca é o modelo. É a versão instalada, o type checker e o vermelho que você leu. As defesas concretas estão no Capítulo 8.

### MCP: capacidade e superfície de ataque

O *MCP* (*Model Context Protocol*) é um padrão aberto para expor serviços externos como ferramentas de qualquer harness compatível: sistema de chamados, banco de dados, documentação, observabilidade. Para quem desenha o ambiente do agente, ele é duas coisas ao mesmo tempo.

É capacidade. Um servidor MCP de documentação, por exemplo, pode pôr no contexto a API da versão instalada, o que ataca diretamente a alucinação descrita acima.

É também superfície de ataque, em três camadas:

- **O servidor é código de terceiros.** Um servidor local roda como processo seu, com os seus privilégios. Um servidor remoto recebe um token seu. Instalar um servidor MCP é adicionar uma dependência com acesso de execução.
- **As descrições entram no contexto.** Nome, descrição e esquema de cada ferramenta exposta são lidos pelo modelo em toda chamada. Uma descrição maliciosa, ou alterada numa atualização, é uma instrução permanente para o seu agente.
- **Os resultados são entrada não confiável.** O conteúdo de uma issue, de um registro do banco ou de uma página de documentação chega ao modelo com o mesmo peso do seu pedido.

Simon Willison (2025) resumiu a combinação perigosa como a "tríade letal": acesso a dados privados, exposição a conteúdo não confiável e capacidade de comunicação externa. Um agente com as três pode ser induzido a ler um segredo e mandá-lo para fora. Os critérios para cada servidor seguem daí: token de menor privilégio, somente leitura quando possível, versão fixada, revisão da lista de ferramentas a cada atualização e nenhum servidor que complete a tríade numa sessão que tenha acesso a dados sensíveis. O exemplo deste livro não usa nenhum servidor MCP, e o método não depende deles.

### Prompt, ferramenta e skill

Com essas peças, dá para separar três coisas que costumam ser confundidas. O critério que importa não é o que cada uma faz, e sim quanto ela dura e quem consegue auditá-la.

- **Prompt.** É o pedido de agora. Mora no contexto e está sujeito a tudo o que a seção de degradação descreveu: compactação, perda de peso, meio esquecido. Não tem versão nem revisão. Amanhã, ninguém sabe exatamente o que foi pedido, nem você.
- **Ferramenta.** É capacidade. Mora na configuração do harness ou num servidor MCP, dura entre sessões e é auditável como configuração. Mas não diz nada sobre processo: em que ordem trabalhar, quando parar para perguntar, o que conta como pronto.
- **Skill.** É processo em arquivo. Mora no repositório ou num diretório da CLI, dura até alguém mudá-la e, por ser um arquivo, tem histórico, diff e revisão em pull request. É o único dos três que transforma "como trabalhamos" em artefato auditável.

As três falhas do Capítulo 1 não eram falta de ferramenta. O agente podia ler o legado e rodar a suíte. Faltava processo, e processo dito num prompt degrada com a sessão. A skill resolve a durabilidade e a auditabilidade do processo. Ela não resolve a execução: continua sendo uma instrução ao modelo, seguida com alta probabilidade, nunca com garantia. Por isso o método combina as duas coisas: skills para conduzir o agente e verificações externas, como testes vistos falhando, comandos que você rodou e gates de CI, para não depender de ele ter sido conduzido. O [Capítulo 3](#cap-3) abre a skill por dentro.

### Resumo

- O modelo é uma função sem estado; o harness é o loop de controle que monta o contexto, aplica a política, executa ferramentas e para quando o modelo decide. Nada no loop verifica o "pronto".
- Só o harness e o que está fora do agente são determinísticos. Controles que precisam valer sempre ficam em permissões, testes, hooks e CI, não em instruções.
- O shell é execução arbitrária com os seus privilégios, e toda saída de ferramenta é entrada não confiável. A segurança vem de limitar o alcance do agente, sem credenciais de push ou deploy, e não de pedir que ele se comporte.
- O contexto degrada antes de encher: compactação, meio esquecido, ruído das ferramentas e decaimento de instruções tornam a sessão longa um estado não auditável. Estado vai para arquivo versionado, em sessões curtas e isoladas.
- Alucinação de API é estrutural, porque o modelo gera o plausível a partir de um treino com versões misturadas, e o MCP é ao mesmo tempo capacidade e superfície de ataque.
- Prompt é efêmero, ferramenta é capacidade e skill é processo durável e revisável, mas nenhum dos três é um portão de verificação.
