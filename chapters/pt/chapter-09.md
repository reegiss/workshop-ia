## Capítulo 8 — Escala, limites e próximos passos

*Parte III — Além do primeiro teste*

A Parte II rodou o fluxo mínimo numa sessão, uma tarefa por vez, com você lendo cada vermelho. Este capítulo trata de três coisas que vêm depois: escalar o mesmo método para planos maiores, entregar o trabalho e reconhecer o que uma skill não consegue garantir.

### Escalar: subagentes e worktrees

No Capítulo 7, o agente principal executou cada tarefa do plano na mesma conversa. Isso funciona para três tarefas. Num plano de dez, o contexto acumula saídas de teste, arquivos lidos e decisões de tarefas já fechadas, e o que importa para a tarefa atual disputa espaço com o que já não importa.

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

A `finishing-a-development-branch` fecha o trabalho, e começa pelos testes. Se algum falhar, ela para e não oferece nenhuma opção de integração: primeiro se conserta. Com os testes passando, ela oferece exatamente quatro caminhos:

1. fazer merge na branch principal, localmente;
2. enviar a branch e abrir um pull request;
3. manter a branch como está, para decidir depois;
4. descartar o trabalho.

O descarte exige que você digite `discard`, para que ninguém apague uma branch por engano.

```text
/finishing-a-development-branch Feche a branch
desta história.
```

A escolha entre essas opções é sua, e a regra do Capítulo 2 continua de pé: enviar código ao repositório remoto é decisão sua, tomada depois de revisar o diff.

As skills desta seção e da anterior vêm no pacote completo do superpowers. Se você fez a instalação seletiva do Capítulo 3, só com as quatro skills do fluxo mínimo, instale o pacote completo pelo mesmo capítulo.

### Limites

O método tem custo e não tem garantia. Saber onde ficam os dois limites é o que permite usá-lo bem.

#### Custo em tempo e tokens

O fluxo completo é mais lento que pedir e aceitar. Há perguntas a responder, uma spec e um plano para ler, vermelhos para conferir. Cada etapa também consome tokens: perguntas, documentos, saídas de teste e, com subagentes, um contexto montado por tarefa e duas revisões por tarefa.

Esse custo se paga onde há dúvida ou risco: regra de negócio com casos de borda, comportamento que outros módulos usam, código que mexe com dinheiro ou permissão. Ali, o erro descoberto depois do commit custa muito mais que as perguntas do começo, como o Capítulo 1 mostrou.

Ele não se paga numa correção de uma linha, num texto de mensagem ou numa mudança cuja verificação é óbvia. Para essas, um pedido direto, um teste rodado e um diff lido bastam.

#### Skills de terceiros

Toda skill que você instala é instrução para um agente com acesso ao seu terminal e aos seus arquivos. Ao trocar a instalação seletiva pelo pacote completo, aplique a regra do Capítulo 3 a cada skill nova: leia o `SKILL.md` e os scripts antes de instalar, e de novo a cada atualização.

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

Comece com o pedido que você faria sem o método:

```text
/brainstorming <a história, como está escrita
no backlog>
```

Depois, siga as etapas na ordem dos Capítulos 5 a 7. Algumas perguntas da `brainstorming` vão parecer óbvias depois de respondidas; vale contar quantas delas você teria feito sozinho antes do código.

> **[Nota]** Se uma etapa parecer não caber na sua história, anote por quê antes de pular. Se o mesmo motivo voltar em várias histórias, ele é material para uma skill do seu projeto, na pasta do repositório, como a `fee-rules` do Capítulo 3.

O livro começou com um agente rápido que entregou três falhas escondidas atrás de "os testes devem passar". O método não deixou o agente mais lento nem mais esperto. Ele mudou o que fica para trás a cada etapa: um arquivo, uma saída de teste, um diff que você leu. Skill não torna o agente infalível; torna o trabalho dele verificável.

### Resumo

- A `subagent-driven-development` dá a cada tarefa um subagente com contexto limpo e faz duas revisões em sequência: primeiro a conformidade com a spec, depois a qualidade. A `executing-plans` roda o plano em lote, com pontos de revisão, e a `using-git-worktrees` isola o trabalho numa pasta e numa branch próprias.
- Escale só com um plano revisado. Com subagentes, o vermelho chega por relatório; o `npm test` e o `git diff main` continuam sendo seus.
- A `requesting-code-review` traz um revisor independente antes da integração. A `finishing-a-development-branch` só oferece as quatro opções de fechamento com os testes passando, e o push continua sendo decisão sua.
- O fluxo completo custa tempo e tokens: use-o onde há dúvida ou risco, não numa correção de uma linha. A skill orienta, não garante; por isso a evidência é conferida por você.
- Próximo passo: uma história do seu backlog, com casos de borda e de uma a três tarefas, conferindo as seis evidências.
