## Capítulo 8 — Escala, limites e próximos passos {#cap-8}

*Parte III — Além do primeiro teste*

A [Parte II](#cap-5) rodou o fluxo mínimo numa sessão, uma tarefa por vez, com você lendo cada vermelho. Este capítulo trata de três coisas que vêm depois: escalar o mesmo método para planos maiores, entregar o trabalho e reconhecer o que uma skill não consegue garantir.

### Escalar: subagentes e worktrees

No [Capítulo 7](#cap-7), o agente principal executou cada tarefa do plano na mesma conversa. Isso funciona para três tarefas. Num plano de dez, o contexto acumula saídas de teste, arquivos lidos e decisões de tarefas já fechadas, e o que importa para a tarefa atual disputa espaço com o que já não importa.

A `subagent-driven-development` resolve isso com uma divisão de papéis. O agente principal vira coordenador: lê o plano e, para cada tarefa, inicia um subagente novo, com um contexto montado só com o que aquela tarefa precisa. O subagente implementa seguindo o TDD e devolve o resultado. Nada da tarefa anterior vaza para a seguinte.

Depois de cada tarefa, a skill pede duas revisões, nesta ordem:

- **Conformidade com a spec:** o código faz o que a tarefa pede, nem menos, nem mais. Uma função a mais, um parâmetro que ninguém pediu ou um critério de aceite esquecido reprovam aqui.
- **Qualidade do código:** só depois de passar pela primeira, a revisão olha nomes, duplicação, clareza e testes.

A ordem não é detalhe. Revisar qualidade de um código que não cumpre a spec é polir a coisa errada.

O pedido é curto, porque o plano já tem tudo:

```text
/subagent-driven-development Execute o plano
aprovado, uma tarefa por subagente.
```

Se a sua CLI não oferece subagentes, ou se você prefere manter uma sessão só, há a `executing-plans`. Ela roda o plano em lote, sem subagentes, e para em pontos de revisão definidos, onde você confere o que foi feito antes de liberar o próximo lote.

Em qualquer das duas, vale isolar o trabalho do agente da sua cópia do repositório. A `using-git-worktrees` cria um worktree: um diretório de trabalho separado, ligado a uma branch própria. O agente edita, roda testes e faz commits ali; a sua pasta principal continua como você deixou, e você pode seguir trabalhando nela enquanto o plano roda. Ao fim, o que sobra é uma branch para revisar.

#### Quando escalar

Escale quando o plano já foi revisado e você confia no formato das tarefas: cada uma começa por um teste, tem arquivos explícitos e um critério de pronto. É por isso que o livro deixou subagentes para depois da Parte II. Delegar um plano mal formado multiplica o problema, porque cada subagente executa com fidelidade uma tarefa ambígua.

#### O que muda para você

Você deixa de ver cada vermelho ao vivo. Na Parte II, a evidência "teste falhando" era a saída que você leu no terminal, com o motivo conferido. Com subagentes, ela chega de segunda mão: nos relatórios de cada subagente e nas revisões da skill.

Isso não dispensa a sua parte; muda onde ela acontece. Leia os relatórios procurando o vermelho de cada tarefa e o motivo declarado; se um relatório diz "teste escrito e passando" sem mostrar a falha, peça a saída antes de aceitar a tarefa. Quebrar o código de propósito, como no Capítulo 7, continua valendo, e agora com mais razão, porque você não viu o teste nascer. E as duas evidências finais seguem sendo suas, rodadas no seu terminal, sobre a branch do worktree:

```bash
npm test
git diff main
```

### Revisar e entregar

Com o plano executado e as evidências conferidas, falta integrar.

A `requesting-code-review` pede uma revisão independente antes da integração. Um revisor com contexto novo compara a branch com a spec e o plano, sem a história da conversa que produziu o código. A revisão não substitui a sua leitura do diff; ela chega antes, para que você leia o diff já com os apontamentos na mão.

A `finishing-a-development-branch` fecha o trabalho:

```text
/finishing-a-development-branch Feche a branch
desta história.
```

Ela começa pelos testes. Se algum falhar, ela para e não oferece nenhuma opção de integração: primeiro se conserta. Com os testes passando, ela oferece exatamente quatro caminhos:

1. fazer merge na branch principal, localmente;
2. enviar a branch e abrir um pull request;
3. manter a branch como está, para decidir depois;
4. descartar o trabalho.

O descarte exige que você digite `discard`, para que ninguém apague uma branch por engano.

A escolha entre essas opções é sua, e a regra do [Capítulo 2](#cap-2) continua de pé: enviar código ao repositório remoto é decisão sua, tomada depois de revisar o diff.

No pull request, a integração contínua do time roda os testes de novo, num ambiente que não é a sua máquina nem a do agente. Ela não substitui as seis evidências, porque o vermelho visto antes do código não aparece no pipeline. Mas fecha a última brecha do resultado verificado: o que passou na sua máquina também passa num ambiente limpo. Lint, checagem de tipos e análise estática no pipeline medem o código do agente com a mesma régua que medem o seu.

As skills desta seção e da anterior vêm no pacote completo do superpowers. Se você fez a instalação seletiva do [Capítulo 3](#cap-3), só com as quatro skills do fluxo mínimo, instale o pacote completo pelo mesmo capítulo. O [Apêndice A](#apendice-a) mostra todas as skills do pacote, organizadas pelos momentos do trabalho.

### Limites

O método tem custo e não tem garantia. Saber onde ficam os dois limites é o que permite usá-lo bem.

#### Custo em tempo e tokens

O fluxo completo é mais lento que pedir e aceitar. Há perguntas a responder, uma spec e um plano para ler, vermelhos para conferir. Cada etapa também consome tokens: perguntas, documentos, saídas de teste e, com subagentes, um contexto montado por tarefa e duas revisões por tarefa.

A decisão é sobre onde esse custo se paga:

- **Use o fluxo completo** onde há dúvida ou risco: regra de negócio com casos de borda, comportamento que outros módulos usam, código que mexe com dinheiro ou permissão. Ali, o erro descoberto depois do commit custa muito mais que as perguntas do começo, como o [Capítulo 1](#cap-1) mostrou.
- **Dispense o fluxo** numa correção de uma linha, num texto de mensagem ou numa mudança cuja verificação é óbvia. Para essas, um pedido direto, um teste rodado e um diff lido bastam.

Na dúvida entre os dois, a pergunta é: se esta mudança estiver errada, quanto custa descobrir depois?

#### Skills de terceiros

Toda skill que você instala é instrução para um agente com acesso ao seu terminal e aos seus arquivos. Ao trocar a instalação seletiva pelo pacote completo, aplique a regra do Capítulo 3 a cada skill nova: leia o `SKILL.md` e os scripts antes de instalar, e de novo a cada atualização.

#### Duas falhas do modelo

Duas falhas do modelo aparecem com frequência e merecem nome.

A primeira é a degradação em sessões longas. Conforme o contexto enche, partes antigas são resumidas ou descartadas, e uma regra combinada no começo some sem aviso, como o Capítulo 2 explicou. A defesa já está no método: decisões em arquivo, e não na conversa; sessões curtas, com uma nova quando a etapa muda, que começa lendo a spec e o plano; e, em planos grandes, subagentes com contexto limpo.

A segunda é a API inventada. O agente chama uma função, uma opção de linha de comando ou um parâmetro que parece plausível e não existe, ou que existia em outra versão da biblioteca. A checagem de tipos e um vermelho lido com atenção pegam parte disso. O resto aparece no diff, se você conferir cada chamada a uma biblioteca que não conhece contra a documentação da versão instalada.

#### A skill orienta, não garante

Uma skill aumenta muito a chance de o processo ser seguido. Não a torna certa. O modelo pode pular uma etapa, ler uma instrução de um jeito que você não previu, não acionar a skill quando deveria ou declarar cumprido um passo que não cumpriu. Nada disso some com subagentes; com mais agentes, há mais lugares onde acontecer.

Por isso o método põe a evidência nas suas mãos, e não na palavra do agente. A spec você aprovou; o plano você revisou; o vermelho você leu; o `npm test` você rodou; o diff você conferiu. O pull request sai com a sua assinatura, e a responsabilidade pelo que está nele continua sendo sua.

#### Os controles da Parte II valem no dia a dia

Os controles que a Parte II usou não eram só para o exemplo. Numa história real, eles continuam valendo: trabalhar numa branch local, nada de push sem decisão sua, aprovar comando a comando, nada sensível ao alcance do agente e rodar o teste você mesmo antes de aceitar "pronto".

### Numa história real

O próximo passo é sair do exemplo. Escolha uma história pequena do seu backlog e rode o fluxo mínimo do começo ao fim, conferindo as seis evidências: requisito esclarecido, plano revisável, teste falhando antes do código, teste passando depois, diff revisado por você e resultado verificado por você.

Dois critérios ajudam a escolher a primeira história:

- **Lógica com casos de borda.** Faixas, limites, arredondamento, ordenação, regras com exceções. É onde as perguntas da `brainstorming` mostram valor e onde um vermelho pega erro de verdade. Uma tela sem regra ou uma integração difícil de testar escondem o método atrás de outros problemas.
- **Escopo de uma a três tarefas.** Pequeno o bastante para caber numa sessão e você ler cada vermelho, como na Parte II. Subagentes e worktrees ficam para quando o fluxo já for familiar e o plano crescer.

Depois das primeiras histórias, o método vai encontrar código que não é função pura. Ele muda de forma, não de princípio. Em código legado sem testes, a primeira tarefa do plano é um teste de caracterização: ele registra o que o código faz hoje, antes de qualquer mudança, para que o vermelho seguinte signifique uma mudança de comportamento, e não um acidente. Numa integração com serviço externo, a spec descreve o contrato (o que é enviado, o que volta e o que acontece no erro), e os testes usam um dublê do serviço; o teste contra o serviço real fica para um ambiente separado.

Comece com o pedido que você faria sem o método:

```text
/brainstorming <a história, como está escrita
no backlog>
```

Depois, siga as etapas na ordem dos [Capítulos 5 a 7](#cap-5). Algumas perguntas da `brainstorming` vão parecer óbvias depois de respondidas; vale contar quantas delas você teria feito sozinho antes do código.

> **[Nota]** Se uma etapa parecer não caber na sua história, anote por quê antes de pular. Se o mesmo motivo voltar em várias histórias, ele é material para uma skill do seu projeto, na pasta do repositório, como a `fee-rules` do Capítulo 3.

Os comandos deste livro vão mudar; os padrões por trás deles, não. Cada skill do fluxo é uma instância de um padrão que você pode reproduzir em qualquer agente: extrair os requisitos antes de implementar, decompor o trabalho em passos verificáveis, provar com um teste que falha primeiro e verificar antes de declarar pronto. Na escala, somam-se dois: delegar com contexto isolado e isolar o trabalho numa cópia separada. Se a sua CLI não tiver o superpowers, ou se ele mudar, procure ou escreva uma skill para cada padrão. A evidência que cada um deixa continua a mesma.

O livro começou com um agente rápido que entregou três falhas escondidas atrás de "os testes devem passar". O método não deixou o agente mais lento nem mais esperto. Ele mudou o que fica para trás a cada etapa: um arquivo, uma saída de teste, um diff que você leu. Skill não torna o agente infalível; torna o trabalho dele verificável.

### Resumo

- A `subagent-driven-development` dá a cada tarefa um subagente com contexto limpo e faz duas revisões em sequência: primeiro a conformidade com a spec, depois a qualidade. A `executing-plans` roda o plano em lote, com pontos de revisão, e a `using-git-worktrees` isola o trabalho numa pasta e numa branch próprias.
- Escale só com um plano revisado. Com subagentes, o vermelho chega por relatório; o `npm test` e o `git diff main` continuam sendo seus.
- A `requesting-code-review` traz um revisor independente antes da integração. A `finishing-a-development-branch` só oferece as quatro opções de fechamento com os testes passando, e o push continua sendo decisão sua.
- Sessões longas perdem regras, e o modelo pode inventar APIs. Decisões em arquivo e sessões curtas evitam a primeira; checagem de tipos, vermelho lido e diff conferido pegam a segunda.
- O fluxo completo custa tempo e tokens: use-o onde há dúvida ou risco, não numa correção de uma linha. A skill orienta, não garante; por isso a evidência é conferida por você.
- Próximo passo: uma história do seu backlog, com casos de borda e de uma a três tarefas, conferindo as seis evidências.
