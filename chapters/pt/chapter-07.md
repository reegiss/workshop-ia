## Capítulo 6 — Planejar {#cap-6}

A spec diz o quê. O plano diz como e em que ordem. Este capítulo mostra como conduzir o agente da spec aprovada até um plano curto, em que cada tarefa começa por um teste, e como revisar esse plano antes de deixar o agente escrever código. O resultado é a segunda evidência: o plano revisável.

### O que esta etapa resolve

A segunda falha do [Capítulo 1](#cap-1) foi o teste escrito depois. O código veio primeiro, e os testes repetiram o que ele já fazia, com o limite de faixa errado junto.

O plano corrige isso pela ordem. Cada tarefa começa por um teste que expressa um critério da spec e diz qual falha esperar antes de o código existir. Não sobra espaço para um teste que copia a saída.

O plano tem um segundo efeito, menos óbvio. Para escrever um teste, o agente precisa de entrada e resultado exatos. Uma spec pode dizer "busca por nome ou código do banco" e parecer completa; o passo concreto "escreva o teste para o termo X" revela que ninguém decidiu o que acontece com certos valores de X. Planejar é a última chance barata de encontrar essas lacunas: aqui, a correção custa uma frase e um commit; no código, custa uma investigação.

### Conduzindo o agente

#### O pedido

Com a spec aprovada no [Capítulo 5](#cap-5), a `brainstorming` costuma oferecer a passagem para a `writing-plans`. Se a sessão foi encerrada, chame a skill diretamente e dê um limite:

```text
/writing-plans Crie o plano a partir da spec
aprovada. No máximo 3 tarefas, cada uma
começando por um teste.
```

Numa sessão nova o agente não lembra a conversa anterior, e não precisa: tudo o que foi decidido está na spec.

O limite de tarefas é deliberado. Sem ele, o agente tende a quebrar uma história pequena em muitas tarefas ou a puxar trabalho vizinho. Dimensione pelo tamanho da história: algumas funções puras pedem poucas tarefas.

#### O que esperar da skill

A `writing-plans` grava o plano em `docs/superpowers/plans/`, num arquivo `AAAA-MM-DD-<tema>.md`, sempre com a mesma estrutura:

- **Cabeçalho:** o objetivo (*Goal*), a arquitetura em duas ou três frases e as tecnologias.
- **Mapa de arquivos:** o que será criado ou alterado, antes de qualquer tarefa. Você sabe de antemão onde o agente vai mexer.
- **Tarefas com passos de 2 a 5 minutos,** sempre na mesma ordem: escrever o teste que falha, rodar e ver a falha, escrever o código mínimo, rodar e ver passar, fazer o commit.
- **Caminhos e comandos exatos,** com o código completo e a saída esperada de cada comando. A skill proíbe "TODO", "implementar depois" e passos vagos.
- **Revisão contra a spec:** no fim, a skill confere se cada requisito tem uma tarefa.
- **Oferta de execução:** com subagentes ou na própria sessão.

O tamanho dos passos é o que torna o plano verificável. Um passo de minutos tem um comando e uma saída esperada. Se a saída obtida for outra, você sabe em que passo o trabalho saiu do plano, em vez de descobrir no fim que algo deu errado em algum lugar.

#### Onde intervir

A skill faz a maior parte do trabalho, mas três decisões são suas.

**Lacuna descoberta.** Ao transformar critérios em testes, o agente pode esbarrar numa entrada que a spec não cobre. A decisão costuma ser de negócio, não de código, e por isso é sua. Se o agente não perguntar, pergunte você: percorra os critérios procurando entradas sem resultado definido (vazio, limite, duplicado).

A regra desta etapa: **toda decisão tomada no plano volta para a spec, como critério de aceite, com commit, antes de o plano seguir.** O plano sai da spec, e não o contrário. Uma regra que existe só na conversa ou só no plano não será conferida pela verificação do [Capítulo 7](#cap-7). Peça explicitamente:

```text
Acrescente esse critério à spec e faça o
commit antes de continuar o plano.
```

Ao aprovar o commit, confira que ele toca só o arquivo da spec.

> **[Exemplo]** No plano da busca de bancos, a lacuna foi o termo vazio:
>
> **Agente:** A spec não diz o que acontece com um termo vazio. Buscar por `""` deve devolver todos os bancos ou nenhum?
>
> **Você:** Todos os bancos.
>
> A spec ganhou um critério e um commit:
>
> ```md
> - "" (empty) finds all banks.
> ```

**Plano grande demais.** Se o plano passou do limite ou traz tarefas que a história não pede, peça para cortar ou juntar antes de aprovar. Duas tarefas que mexem na mesma função provavelmente são uma só. Uma tarefa que nenhum critério da spec justifica sai do plano.

**Forma de execução.** A skill oferece executar com subagentes ou na própria sessão. Escolha a própria sessão e avise que vai pedir uma tarefa por vez, como mostra o Capítulo 7. Assim você vê cada vermelho e cada verde e pode parar o agente se ele sair do plano. Subagentes ficam para o [Capítulo 8](#cap-8).

### A evidência

O plano só vira evidência depois que você o lê. Abra o arquivo ao lado da spec e confira:

- **Cada critério de aceite vira teste.** Um por um, inclusive os que entraram nesta etapa. Critério sem teste é regra que ninguém verifica.
- **Cada tarefa começa por um teste com a falha esperada.** O passo "rodar" deve dizer por que o teste falha, por exemplo, uma função que ainda não existe. Uma falha por outro motivo, na execução, aponta problema no teste ou na preparação.
- **Tarefas pequenas.** Passos de minutos, caminhos e comandos exatos. "Tratar os casos restantes" não é passo.
- **Nada fora do escopo.** O que a spec exclui não aparece em tarefa nenhuma.
- **Commit.** O plano aprovado entra num commit, como a spec. No `git log`, devem aparecer o commit da spec, o da lacuna, se houve, e o do plano.

Se algum item falhar, peça o ajuste e leia de novo. Um erro pego aqui custa um parágrafo; no meio da implementação, custa testes e código refeitos.

> **[Exemplo]** Trecho da Task 1 do plano da busca de bancos:
>
> ```md
> ### Task 1: calculateFee
>
> - [ ] Write failing tests: Banco Azul fee
>   for 1000 is 2; for 1000.01 is 5.
> - [ ] Run `npm test`. Expected: FAIL,
>   calculateFee is not a function.
> - [ ] Implement calculateFee using
>   FEE_RANGE_LIMIT, inclusive.
> - [ ] Run `npm test`. Expected: PASS.
> - [ ] Commit.
> ```
>
> O plano real traz o teste e a função inteiros; aqui, só os passos.

### Erros comuns

> **[Aviso de Erro Comum]** Testes concentrados na última tarefa. O sintoma é uma tarefa só de testes no fim, depois de todas as funções. É a segunda falha do Capítulo 1 voltando: o teste escrito depois copia a saída do código, com os erros junto. Recuse o plano e peça que cada tarefa comece pelo seu teste.

> **[Aviso de Erro Comum]** Decisão nova só no plano. A lacuna foi resolvida na conversa e virou teste, mas a spec continua como estava. A verificação final confere o código contra uma spec incompleta. Toda decisão tomada no plano volta para a spec, com commit.

> **[Aviso de Erro Comum]** Plano com passos vagos. "Implementar a busca", "adicionar testes", "tratar casos de borda". Passo vago deixa o agente decidir na hora de codificar, que é justamente o que o plano devia evitar. Peça caminhos, código e comandos exatos.

> **[Aviso de Erro Comum]** Aprovar sem conferir critério por critério. A revisão da skill diz que cobre a spec, e você aprova. A revisão da skill é do agente; a evidência é a sua leitura. Percorra a lista de critérios e aponte o teste de cada um.

### Resumo

- O plano evita o teste escrito depois: cada tarefa começa por um teste derivado da spec, com a falha esperada declarada.
- Peça a `writing-plans` a partir da spec, com limite de tarefas; espere cabeçalho, mapa de arquivos, passos de minutos e comandos exatos.
- Passos concretos revelam lacunas. A decisão é sua e volta para a spec, com commit, antes de o plano seguir.
- Revise o plano contra a spec, critério por critério, e corte o que estiver fora do escopo.
- O plano num commit é a segunda evidência. Execute na própria sessão; subagentes ficam para o Capítulo 8.
