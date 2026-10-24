## Capítulo 6 — Planejar {#cap-6}

A spec diz o quê. O plano diz como, em que ordem e como cada passo será conferido. Este capítulo trata o plano como peça de engenharia, e não como lista de afazeres: um contrato entre você e o agente, decomposto em unidades que se verificam e se revertem sozinhas. O resultado é a segunda evidência, o plano revisável.

### Decomposição Verificável

A Decomposição Verificável, que a skill `writing-plans` implementa, responde a uma pergunta que todo plano responde mal quando ninguém a faz: qual é o tamanho certo de uma tarefa?

O critério não é tempo nem número de linhas. Uma tarefa tem o tamanho certo quando é, ao mesmo tempo, uma **unidade de verificação** e uma **unidade de rollback**.

- **Unidade de verificação:** a tarefa termina num estado observável por um comando, com uma saída esperada declarada antes. Se você não consegue dizer qual comando prova que ela terminou, ela ainda não é uma tarefa; é uma intenção.
- **Unidade de rollback:** a tarefa termina verde e num commit próprio. Reverter esse commit deixa o sistema num estado coerente, com a suíte passando. Cada fronteira de tarefa vira um ponto de retorno e um ponto de bisseção.

Tarefas grandes demais perdem a localização da falha: o vermelho pode vir de qualquer uma de vinte mudanças, e o `git bisect` não tem onde cortar. Tarefas pequenas demais quebram a segunda propriedade: o commit intermediário não compila ou deixa a suíte vermelha. O tamanho certo quase sempre coincide com um critério de aceite ou com um pequeno grupo deles.

Com um agente, esse critério pesa mais do que com uma pessoa. O [Capítulo 2](#cap-2) mostrou que o contexto se degrada em sessões longas: detalhes somem na compactação, instruções antigas perdem peso. Uma tarefa curta, com início e fim definidos no arquivo, limita quanto estado a sessão precisa carregar. E, no regime de zero-trust, a declaração "terminei a tarefa" só tem valor se o fim da tarefa for definido por algo que você observa sem depender do agente.

### O plano como contrato

O plano é o único documento que o agente, você e qualquer subagente leem com o mesmo significado. Por isso ele precisa ser legível por máquina: cada passo traz a ação, o comando que a confere e a saída esperada, inclusive quando a saída esperada é uma falha.



```md
- [ ] Step 2: run the new test
  Run: npx vitest run src/x/y.test.ts
  Expect: FAIL, "parse is not a function"
- [ ] Step 3: minimal implementation
- [ ] Step 4: run the suite
  Run: npm test
  Expect: PASS, no other test changed
```

Um passo assim tem uma propriedade que a prosa não tem: a divergência é detectável. Se a saída obtida não bate com a declarada, o trabalho saiu do contrato naquele passo, e o executor para. Não importa quem executa; o contrato é o mesmo para o agente na sessão principal, para um subagente com contexto limpo no [Capítulo 8](#cap-8) e para você.

A `writing-plans` grava o plano em `docs/superpowers/plans/` com essa disciplina: cabeçalho com objetivo e arquitetura, um mapa de arquivos antes de qualquer tarefa, passos de poucos minutos com caminhos e comandos exatos, proibição de "TODO" e de passos vagos, e uma revisão final contra a spec. Peça o plano a partir da spec aprovada no [Capítulo 5](#cap-5), com um teto de tarefas:

```text
/writing-plans Plano a partir da spec aprovada.
No máximo 4 tarefas. Cada passo de teste com
comando e saída esperada. Cite os IDs dos
critérios em cada tarefa.
```

O teto evita que o agente fatie demais ou puxe trabalho vizinho. O mapa de arquivos é a declaração prévia do raio de impacto da mudança. No fim do [Capítulo 7](#cap-7), o diff será conferido contra ele: todo arquivo alterado fora do mapa precisa de uma justificativa, ou sai.

### Em código legado: caracterizar antes, extrair depois

Quando a história toca código legado sem testes, a ordem das tarefas deixa de ser questão de gosto. Há uma ordem correta, e ela começa antes do primeiro teste da história.

#### Task 0: a linha de base caracterizada

A primeira tarefa aplica a Caracterização antes da Mudança, apresentada no [Capítulo 4](#cap-4) a partir de Michael Feathers. Os testes de caracterização registram o que o código faz hoje, e não o que a spec deseja. Eles fixam o contrato de que os consumidores atuais dependem, certo ou errado.

Daí sai uma consequência que contraria o reflexo de quem pratica TDD: **o teste de caracterização nasce verde, por definição.** Ele descreve o comportamento existente. É o inverso do ciclo vermelho-verde, e por isso o verde inicial não prova nada. Um teste de caracterização que afirma `true === true` também nasce verde.

A prova vem de outro jeito: quebrando o legado de propósito. O plano da Task 0 deve declarar, depois do verde, um passo de sabotagem, por exemplo trocar `>` por `>=` na comparação com o limite. O esperado é vermelho no teste do limite. Em seguida, o passo de desfazer a sabotagem e ver o verde voltar. Só então a suíte de caracterização vale como linha de base.

O que caracterizar? O contrato que os consumidores observam e que a mudança pode alterar: as fronteiras de faixa, dos dois lados do limite; o comportamento de erro, inclusive a mensagem, se alguém a lê; os efeitos sobre estado compartilhado. Não o módulo inteiro.

#### Task 1: extrair com a suíte intocada

A segunda tarefa extrai a regra para uma unidade nova e faz o legado delegar a ela, com a assinatura intacta. É o padrão *strangler* em escala de função: o código novo cresce por dentro do antigo, e o contrato externo não muda.

A regra da Task 1 é rígida: **os arquivos de caracterização não podem aparecer no diff.** Se a suíte ficar vermelha, a extração mudou comportamento, e quem se ajusta é a extração. Um teste de caracterização editado na mesma branch que mexe no código que ele protege deixa de ser evidência de qualquer coisa.

Por que extrair, e não chamar o legado direto ou reescrever a regra? Chamar o legado acopla o código novo ao estado global que ele lê. Reescrever a regra é a segunda falha do [Capítulo 1](#cap-1): duas implementações da mesma política, que divergem no primeiro caso de borda. Extrair deixa uma política só, consumida pelos dois lados.

> **[Exemplo]** As quatro tarefas do plano do ranking, depois da lacuna resolvida:
>
> ```md
> - Task 0: characterize legacy getFee (AC-07)
> - Task 1: extract feeFor; getFee delegates
> - Task 2: searchBanks (AC-01..03)
> - Task 3: BankRankingService (AC-04..06, 08)
> ```
>
> Se `feeFor` divergir do legado, o vermelho aparece na Task 1, e não na tela do cliente.

### Portas e injeção como pré-condição de testabilidade

Alguns critérios de aceite não são testáveis contra o design que existe. Um caso típico: "uma leitura da tabela de tarifas por requisição". Se o serviço importa um cliente singleton do serviço de preços, o teste não tem como contar leituras nem como simular um refresh do cache no meio da requisição. O critério está escrito, mas não há onde verificá-lo.

A saída é uma *costura* (*seam*, no vocabulário de Feathers): um ponto onde o comportamento pode ser trocado sem editar o código sob teste. Em código orientado a objetos, a costura mais limpa é uma porta, uma interface pequena que o serviço recebe por injeção de dependência. Em produção, a implementação da porta fala com o outro serviço. No teste, um provider falso devolve uma versão nova da tabela a cada chamada e conta quantas vezes foi chamado. Com ele, o critério do snapshot vira uma asserção determinística: uma chamada, uma versão.

O critério de planejamento que sai daí: para cada critério de aceite, pergunte o que você precisa controlar para que o teste seja determinístico. Rede, relógio, aleatoriedade, concorrência e estado global são as respostas comuns, e cada uma pede uma porta. Se a porta não existe, criá-la é uma tarefa do plano, anterior à tarefa que a usa. Um plano que adia essa decisão para a implementação deixa o agente decidir sozinho, e o caminho mais curto para ele costuma ser um mock de módulo que acopla o teste à estrutura interna.

### A lacuna que o plano descobre

Planejar tem um efeito colateral valioso. Para escrever um passo de teste com entrada e saída exatas, alguém precisa saber a saída. Uma spec que parecia completa revela, no passo concreto, uma entrada sem resultado definido. É a última chance barata de fechar a lacuna: aqui ela custa uma frase e um commit; no código, custa uma investigação.

Quando a lacuna aparece, a decisão costuma ser de negócio ou de operação, e por isso é sua. A regra desta etapa:

**Toda decisão tomada no plano volta para a spec, como critério de aceite com ID, num commit próprio, antes de o plano seguir.**

O fluxo é da spec para o plano, nunca o contrário. Uma regra que existe só no plano, ou só na conversa, não é conferida pela rastreabilidade nem pelo gate de CI do Capítulo 8. Ao aprovar o commit, confira que ele toca só o arquivo da spec.

> **[Exemplo]** A lacuna surgiu ao escrever o teste da Task 3:
>
> **Agente:** O snapshot pode não ter tarifa para um banco do cadastro. O ranking deve omitir o banco, falhar a requisição ou exibi-lo sem tarifa?
>
> **Você:** Omitir. O pricing-service pode estar no meio do rollout de um banco novo; o ranking não pode cair por isso, nem mostrar sem tarifa um banco como se fosse o mais barato.
>
> A spec ganhou o AC-08. O `getFee` legado continua lançando erro, porque o contrato dele é o AC-07.

Repare no efeito sobre o design: a política extraída passa a devolver "sem tarifa" como valor, e cada consumidor decide o que fazer com ele. O ranking omite; o legado preserva o comportamento que o extrato conhece.

### Auditar o plano contra os IDs

A revisão final da skill diz que o plano cobre a spec. Essa revisão é do agente; a evidência é a sua auditoria. Com critérios identificados, ela é mecânica na primeira passada:

```bash
spec=docs/superpowers/specs/<file>.md
plan=docs/superpowers/plans/<file>.md
ids() { grep -ohE 'AC-[0-9]+' "$1" | sort -u; }
comm -3 <(ids "$spec") <(ids "$plan")
```

Saída vazia quer dizer que todo ID da spec aparece no plano, e vice-versa. Qualquer linha é um problema: um critério sem tarefa é regra que ninguém vai verificar; um ID no plano que não existe na spec é decisão que não voltou para ela. O Capítulo 8 leva a mesma ideia para o CI, cruzando a spec com os arquivos de teste.

A segunda passada é sua, tarefa por tarefa:

- **Toda tarefa cita pelo menos um ID.** Uma tarefa sem critério é escopo que ninguém pediu, com uma exceção: tarefas habilitadoras, como a Task 0 e a Task 1, que precisam dizer qual critério protegem.
- **Todo passo de teste declara a falha esperada e o motivo.** "Expect: FAIL" sozinho não basta.
- **A Task 0 declara verde, sabotagem, vermelho e retorno.** Sem a sabotagem, a linha de base não foi validada.
- **A tarefa de extração declara a suíte de caracterização intocada.**
- **O mapa de arquivos não inclui nada que a spec põe fora do escopo.**
- **Um critério verificado pela caracterização carrega o ID no próprio teste.** Do contrário, a rastreabilidade o dá como órfão, mesmo coberto.

Depois de aprovado, o plano entra num commit, como a spec. No histórico da branch aparecem, nesta ordem, a spec, a lacuna e o plano. Execute na própria sessão, uma tarefa por vez, como mostra o Capítulo 7; a execução com subagentes fica para o Capítulo 8. O código completo das tarefas está no [Apêndice D](#apendice-d).

### Erros comuns

> **[Aviso de Erro Comum]** Caracterização tratada como TDD. O agente escreve a Task 0, vê tudo verde e segue, ou pior, ajusta o legado até um teste "ficar vermelho primeiro". Caracterização nasce verde; a prova é a sabotagem deliberada, desfeita em seguida.

> **[Aviso de Erro Comum]** Critério sem costura. O plano promete testar algo que depende de rede, relógio ou estado global, sem dizer como controlar isso. O agente resolve na hora com o mock mais conveniente. Exija a porta no plano.

### Resumo

- Decomposição Verificável: a tarefa certa é unidade de verificação (um comando, uma saída esperada) e unidade de rollback (verde, num commit que se reverte sozinho).
- O plano é um contrato legível por máquina; cada passo declara comando e saída esperada, e a divergência é o sinal de parada.
- Em código legado, a Task 0 caracteriza o comportamento atual, nasce verde e é validada pela sabotagem; a extração segue com a suíte de caracterização intocada.
- Critérios que dependem de rede, cache ou estado global exigem uma porta injetada; o provider falso torna o snapshot testável.
- Lacunas descobertas no plano voltam para a spec, com ID e commit; a auditoria cruza os IDs da spec com os do plano antes da aprovação.
