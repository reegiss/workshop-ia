## Capítulo 6 — Planejar

A spec diz o quê. O plano diz como e em que ordem. Neste capítulo, a spec aprovada no Capítulo 5 vira um plano curto, e você produz a segunda evidência: um plano revisável.

### Da spec ao plano

A skill `writing-plans` parte de uma spec e grava o plano num arquivo em `docs/superpowers/plans/`, com a data e o tema no nome, no formato `AAAA-MM-DD-<tema>.md`. O arquivo segue sempre a mesma estrutura.

Ele começa com um cabeçalho de três partes: o objetivo (*Goal*), a arquitetura em duas ou três frases e as tecnologias usadas. Antes de definir qualquer tarefa, o plano mapeia os arquivos que serão criados ou alterados. Assim, você sabe de antemão onde o agente vai mexer.

Depois vêm as tarefas. Cada uma lista os seus arquivos e uma sequência de passos de 2 a 5 minutos, sempre nesta ordem:

1. escrever o teste que falha;
2. rodar o teste e ver a falha;
3. escrever o código mínimo para passar;
4. rodar de novo e ver passar;
5. fazer o commit.

Cada passo traz caminhos exatos, o código completo e o comando a rodar, com a saída esperada. A skill proíbe "TODO", "implementar depois" e passos vagos, que deixam a decisão para mais tarde.

Por que passos tão pequenos? Porque cada um termina numa saída que você consegue conferir. "Escrever a busca" não tem saída clara: quando ela está pronta? "Rodar `npm test` e ver o teste da busca falhar" tem. Você olha o terminal e sabe se o passo foi cumprido.

Repare no primeiro passo de cada tarefa. O Capítulo 4 disse que a etapa Planejar evita a segunda falha do Capítulo 1, o teste escrito depois, porque põe um teste no início de cada tarefa. É aqui que isso acontece: o teste entra no plano antes de existir o código.

No fim, a skill revisa o próprio plano contra a spec e confere se cada requisito tem uma tarefa. Depois, oferece duas formas de executar: com subagentes ou na própria sessão. Você volta a essa escolha no fim do capítulo.

### Pedindo o plano

Há dois caminhos. O mais simples é aceitar a oferta do fim do Capítulo 5: com a spec aprovada, a `brainstorming` oferece seguir para a `writing-plans`. Responda que sim, e o agente começa o plano a partir da spec que acabou de gravar.

Se você fechou a sessão, ou prefere ser explícito, chame a skill diretamente:

```text
/writing-plans Crie o plano a partir da spec
da busca de bancos. No máximo 3 tarefas,
cada uma começando por um teste.
```

Como no Capítulo 5, use o nome que aparece na lista da sua CLI: `/writing-plans` ou, se o superpowers foi instalado como plugin, `/superpowers:writing-plans`. Numa sessão nova, o agente não se lembra da conversa anterior, e nem precisa: tudo o que foi decidido está na spec, num arquivo do repositório.

Por que "no máximo 3 tarefas"? A história é pequena: três funções puras, cada uma com poucos critérios de aceite. Uma tarefa por função basta. Um plano grande para uma história pequena é sinal de escopo inflado: o agente está planejando coisas que ninguém pediu.

### Uma lacuna aparece

Ao montar a tarefa da busca, o agente precisa transformar cada critério de aceite em teste. É aí que ele pode esbarrar numa pergunta que ninguém fez no Capítulo 5. O diálogo abaixo é ilustrativo. Se o seu agente não perguntar, pergunte você: o termo vazio precisa de uma decisão antes de virar teste.

```text
Agente: A spec não diz o que acontece com um
termo vazio. Buscar por "" deve devolver
todos os bancos ou nenhum?

Você: Todos os bancos.
```

No Capítulo 5, as dúvidas vinham do pedido. Esta vem do plano: para escrever um teste, o agente precisa de uma entrada e de um resultado exatos, e o termo vazio é uma entrada que a spec não cobre. Passos concretos revelam casos que um texto geral deixa passar.

A escolha é de negócio, não de código: ela define o que a pessoa vê antes de digitar. Por isso quem decide é você.

Agora o ponto principal: a decisão não fica só na conversa nem só no plano. Ela volta para a spec, como um critério de aceite novo:

```md
- "" (empty) finds all banks.
```

O agente pode fazer isso sozinho ou não. Não dependa disso: peça "Acrescente esse critério à spec e faça o commit antes de continuar o plano." Só então o plano segue. Como no Capítulo 5, a CLI deve pedir a sua permissão para o commit, a menos que você já tenha liberado esse comando. Leia o comando: ele deve adicionar só o arquivo da spec.

A regra vai para a spec, e não só para o plano, porque o plano sai da spec, e não o contrário. Sem ela, a verificação do Capítulo 7 conferiria o código contra uma spec incompleta. E, como no Capítulo 4, corrigir a spec agora custou uma frase e um commit. Descoberto no código, o termo vazio custaria uma investigação, com testes e código já escritos. A lacuna é a mesma; o preço depende de quando ela aparece.

### O plano

Com a spec atualizada, o agente grava o plano. O trecho abaixo mostra o começo de um plano dessa história.

> **[Exemplo]** Trecho do plano gravado pelo agente:
>
> ```md
> # Bank search implementation plan
>
> Goal: search banks by name or code and
> sort them by the fee for an amount.
>
> Files: src/bankSearch.ts,
>   src/bankSearch.test.ts
>
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

A Task 1 segue os cinco passos. Os testes saem dos critérios da tarifa: no Banco Azul, R$ 1.000,00 paga R$ 2,00 e R$ 1.000,01 paga R$ 5,00. O primeiro `npm test` deve dar FAIL pelo motivo previsto: o arquivo ainda não exporta `calculateFee`. Uma falha por outro motivo aponta um problema no teste ou na preparação. Só então vem o código, com `FEE_RANGE_LIMIT` inclusivo, e o segundo `npm test` dá PASS. O commit guarda teste e código juntos.

O plano real traz o código completo de cada passo: o teste inteiro, a função inteira e o comando exato. Aqui ele aparece resumido, para caber na página. As outras duas tarefas seguem o mesmo molde:

- **Task 2, `searchBanks`:** testes para os critérios da busca: "azul" e "AZUL", "ambar", "001", "1" e o termo vazio.
- **Task 3, `sortByFee`:** teste para o critério "Order for 500: Âmbar, Azul, Verde", verificado com `sortByFee(searchBanks(banks, ""), 500)`.

### Revisando o plano

O plano só vira evidência depois que você o lê. Abra o arquivo em `docs/superpowers/plans/` no editor, ao lado da spec, e percorra esta lista:

- **Cada critério de aceite aparece como teste em alguma tarefa.** Confira um por um: "azul" e "AZUL", "ambar", "001", "1", o termo vazio, as tarifas para 1000 e 1000.01 e a ordem para 500. Um critério sem teste é uma regra que ninguém vai verificar.
- **Cada tarefa começa por um teste e diz qual falha esperar.** O primeiro passo escreve o teste; o segundo roda e mostra a falha prevista. Uma tarefa que começa pelo código repete o Capítulo 1.
- **As tarefas são pequenas e estão numa ordem que faz sentido.** A ordenação vem por último porque depende das outras duas: ordena pela tarifa e, no teste, usa a busca.
- **Caminhos e comandos são exatos.** Cada passo diz qual arquivo, qual comando e qual saída. Procure "TODO", "implementar depois" ou frases soltas como "tratar os casos restantes". Nenhuma delas deveria estar ali.
- **Nada fora do escopo entrou.** A spec exclui isenções e promoções de tarifa e a tela de confirmação. Se aparecer uma tarefa sobre qualquer uma delas, corte.

Se algum item falhar, peça o ajuste ao agente e leia o plano de novo. Como disse o Capítulo 4, um erro pego no plano custa um parágrafo. A mesma correção no meio da implementação custaria testes e código refeitos.

> **[Dica Prática]** Plano grande demais? Peça para cortar ou juntar tarefas antes de aprovar. Se duas tarefas mexem na mesma função, provavelmente são uma só. Se uma tarefa trata de algo que a spec não pede, ela sai.

> **[Aviso de Erro Comum]** Aprovar um plano em que os testes ficam para a última tarefa. O sintoma é uma tarefa só de testes no fim, depois de todas as funções. É a segunda falha do Capítulo 1 voltando pela porta dos fundos: o teste escrito depois copia a saída do código, com os erros junto. Para evitar, recuse o plano e peça que cada tarefa comece pelo seu teste.

### A segunda evidência

O plano aprovado é a segunda das seis evidências: o plano revisável. Como a spec, ele é um arquivo do repositório, em `docs/superpowers/plans/`, que pode ser lido amanhã, por você ou por outra pessoa do time.

Confira o commit. Rode `git status`: se o arquivo do plano aparecer pendente, peça ao agente que faça o commit dele, como fez com a spec, e leia o comando antes de aprovar. Depois, rode `git log --oneline`. Acima do commit inicial, você deve ver o commit da spec, o da spec com o termo vazio e o do plano. Se você pediu correções, pode haver outros.

Agora a skill oferece as duas formas de executar: com subagentes ou na própria sessão. Escolha a própria sessão. Nela, você acompanha cada passo no terminal, vê cada vermelho e cada verde acontecer e pode parar o agente se ele sair do plano. Os subagentes ficam para o Capítulo 8, quando você já souber o que esperar de cada tarefa.

O Capítulo 7 executa a Task 1: o teste da tarifa, escrito antes do código e visto falhando primeiro.

### Resumo

- A `writing-plans` transforma a spec num plano em `docs/superpowers/plans/`: cabeçalho, mapa de arquivos e tarefas pequenas, com caminhos, código e comandos exatos.
- Cada tarefa segue cinco passos: escrever o teste, ver falhar, escrever o código mínimo, ver passar e fazer o commit. Cada passo tem uma saída que você confere.
- Uma lacuna descoberta no plano volta para a spec, com commit, antes de o plano seguir. O termo vazio virou o critério `"" (empty) finds all banks.`
- Revise o plano contra a spec: cada critério vira teste, cada tarefa começa pelo teste e nada fora do escopo entra.
- O plano num commit é a segunda evidência. Execute na própria sessão para acompanhar cada vermelho e cada verde.
