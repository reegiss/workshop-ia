## Capítulo 1 — Rápido não é verificável

*Parte I — Fundamentos*

Gerar código ficou barato. Um agente escreve em segundos uma função inteira, com testes e comentários. Avaliar esse código, porém, continua caro: alguém ainda precisa saber se ele faz o que deveria. Este capítulo mostra onde esse custo se esconde e apresenta a ideia que guia o resto do livro.

### Um pedido simples

Ao longo do livro, você vai acompanhar uma única história. Ela é pequena de propósito, para que o foco fique no método e não na regra de negócio.

A história é esta: uma pessoa vai fazer uma transferência e precisa escolher o banco. Ela digita um termo de busca e informa o valor. O sistema mostra os bancos que correspondem ao termo, pelo nome ou pelo código do banco, ordenados pela tarifa daquela transferência.

A tarifa depende de faixas de valor. Cada banco cobra duas tarifas:

- até R$ 1.000,00, inclusive: a tarifa da faixa baixa;
- acima de R$ 1.000,00: a tarifa da faixa alta.

No Banco Azul, por exemplo, a faixa baixa custa R$ 2,00 e a alta custa R$ 5,00. Uma transferência de R$ 1.000,00 nesse banco paga R$ 2,00.

O projeto já tem o cadastro dos bancos, cada um com as duas tarifas e o limite de R$ 1.000,00 entre as faixas. O que não está escrito em lugar nenhum é de que lado do limite fica uma transferência de exatamente R$ 1.000,00. Isso só quem pediu a história sabe.

Agora imagine que você abre o terminal e faz o pedido do jeito que muita gente faz no dia a dia: curto, direto, confiando que o agente vai entender o resto.

```text
Crie a busca de bancos para a tela de
transferência. Filtre pelo termo digitado e
ordene pela tarifa do valor informado.
```

O agente responde em poucos segundos. Ele cria três funções, `searchBanks`, `calculateFee` e `sortByFee`, escreve um arquivo de testes e termina com uma mensagem animada. A resposta é clara, bem organizada e soa segura.

Nada nessa resposta diz se o código está certo. E, como você vai ver, ele não está. Não por um erro grosseiro, mas por três falhas comuns, que aparecem em quase todo trabalho feito com pressa, com ou sem agente.

### Três falhas típicas

Isoladamente, cada uma das falhas abaixo parece pequena. Juntas, elas fazem o código passar por pronto sem que ninguém saiba o que ele realmente faz.

#### Implementar antes de esclarecer

O pedido dizia "filtre pelo termo digitado". Mas filtrar o quê? O nome do banco, o código do banco ou os dois? O agente não perguntou. Ele escolheu a interpretação mais óbvia e seguiu em frente.

> **[Exemplo]** A busca gerada compara o termo só com o nome do banco:
>
> ```ts
> function searchBanks(
>   banks: Bank[], term: string
> ) {
>   const t = term.toLowerCase();
>   return banks.filter((b) =>
>     b.name.toLowerCase().includes(t)
>   );
> }
> ```
>
> Quem digita o código de banco "001" recebe uma lista vazia.

O problema aqui não é a função. Ela faz exatamente o que foi escrito. O problema é que a decisão "buscar só pelo nome" foi tomada em silêncio, sem você saber que havia uma decisão a tomar. Uma pergunta de dez segundos antes de começar teria evitado o erro.

#### Escrever o teste depois, só para passar

O agente também entregou testes, e, se você rodá-los, todos passam. Isso parece bom sinal. Mas olhe como esses testes nasceram: primeiro veio o código, depois o agente escreveu testes que repetem o que esse mesmo código faz.

> **[Exemplo]** A função de tarifa usa "menor que" no limite da faixa, quando a regra pede "até R$ 1.000,00, inclusive":
>
> ```ts
> function calculateFee(
>   bank: Bank, amount: number
> ) {
>   return amount < 1000
>     ? bank.lowFee
>     : bank.highFee;
> }
> ```
>
> Uma transferência de R$ 1.000,00 no Banco Azul cai na faixa alta e paga R$ 5,00 em vez de R$ 2,00. O teste gerado depois afirma exatamente esse valor:
>
> ```ts
> it("charges 5 for an amount of 1000", () => {
>   const fee = calculateFee(blueBank, 1000);
>   expect(fee).toBe(5);
> });
> ```
>
> Cada `it` descreve um caso de teste; `expect(...).toBe(...)` compara o valor obtido com o esperado.

Esse teste não verifica a regra; ele copia o comportamento atual. Se o código estiver errado, o teste fica errado junto e passa. Pior: ele congela o erro. Quem corrigir a função depois vai ver o teste quebrar e pode achar que a correção é que está errada.

Um teste só prova algo se for escrito a partir da regra, antes do código, e se você o vir falhar primeiro.

#### Dizer "pronto" sem evidência

No fim, o agente encerra com uma mensagem assim:

> **[Exemplo]** "Pronto! Implementei a busca, a tarifa e a ordenação. Os testes devem passar."

Leia de novo a última frase. "Devem passar" não é "passaram". O agente não rodou os testes. Ele previu o resultado e apresentou a previsão no mesmo tom de quem conferiu.

Essa diferença de uma palavra é a diferença entre uma afirmação e uma evidência. Uma afirmação diz que algo é verdade. Uma evidência mostra: a saída do comando de testes, com o número de testes que passaram, na sua tela.

> **[Aviso de Erro Comum]** Confiar no tom seguro da resposta do agente. Um modelo de linguagem escreve com a mesma fluência quando acerta e quando erra; a confiança do texto não mede a correção do código. O sintoma é aceitar a mudança porque "a explicação fazia sentido". Para evitar, troque a pergunta "a resposta parece certa?" por "o que eu vi que prova isso?".

### O custo aparece no fim

Nenhuma das três falhas atrasou a entrega. Pelo contrário: o agente terminou rápido, e tudo parecia pronto. O custo não sumiu; ele só mudou de lugar.

Sem um processo, toda a verificação fica para o final. Você recebe de uma vez dezenas de linhas de código, testes que o agente diz que passam e uma explicação convincente. A partir daí, cabe a você descobrir o que foi decidido e por quê. Qual era a regra da busca? Por que o limite da faixa usa "menor que"? O teste foi escrito a partir de quê? Nada disso ficou registrado.

Revisar assim é lento e pouco confiável. Você lê muito código sem saber o que procurar, e os erros que escapam são justamente os que parecem corretos.

Corrigir no fim também custa mais. Uma pergunta antes de começar custa segundos. Um erro descoberto depois do commit custa uma investigação: achar a causa, ajustar o código, corrigir o teste que congelou o erro e conferir se nada mais dependia do comportamento antigo. Se o erro chegar à produção, custa ainda mais.

O agente acelerou a escrita. A avaliação, que era a parte cara, ficou do mesmo tamanho e foi empurrada para o pior momento.

### Desenvolvimento verificável

A saída não é desistir do agente nem revisar tudo com mais esforço no final. É mudar a forma de trabalhar para que a verificação aconteça ao longo do caminho, em pedaços pequenos.

**Desenvolvimento verificável** é trabalhar de modo que cada etapa deixe uma evidência que você consegue ver.

Evidência, aqui, é sempre um artefato concreto: um documento que você leu e aprovou, um teste que você viu falhar, a saída de um comando que você rodou. Não é a palavra do agente de que algo foi feito.

O método organiza essas evidências em três momentos:

- **Antes:** o requisito esclarecido, com as dúvidas respondidas por você, e um plano curto que você consegue revisar antes de qualquer código.
- **Durante:** um teste escrito a partir da regra, que você vê falhar primeiro e passar depois.
- **Depois:** o diff revisado linha a linha e o teste rodado por você, na sua máquina.

Volte às três falhas da história. A busca só por nome teria aparecido no "antes", quando alguém perguntasse se o código do banco também conta. O limite errado da faixa teria aparecido no "durante", num teste escrito a partir da regra de R$ 1.000,00. E o "devem passar" não sobreviveria ao "depois", porque você mesmo rodaria os testes.

Nenhum desses passos é novo. O que muda é que eles deixam de depender da memória ou da boa vontade de alguém e passam a fazer parte do fluxo. O Capítulo 4 detalha cada momento e a evidência que ele produz.

### E se o processo viesse junto com o agente?

Até aqui, o método parece depender de você: lembrar de esclarecer, exigir o teste antes, conferir a saída. Isso funciona, mas cansa, e é fácil pular uma etapa num dia corrido.

Existe outro caminho. Um agente não é só o modelo que escreve texto; é também o programa em volta dele, que pode carregar instruções e processos prontos. Se o processo estiver ali, o próprio agente pode parar para perguntar, escrever o teste primeiro e rodar os comandos antes de dizer "pronto". O Capítulo 2 explica como esse programa funciona.

### Resumo

- Gerar código ficou barato; avaliar continua caro, e o agente não reduz esse custo sozinho.
- Três falhas típicas: implementar antes de esclarecer, escrever o teste depois só para passar e dizer "pronto" sem evidência.
- Sem processo, toda a verificação se acumula no final, quando corrigir é mais caro e ninguém sabe o que foi decidido.
- Desenvolvimento verificável é trabalhar de modo que cada etapa deixe uma evidência que você consegue ver: antes, durante e depois.
- O tom seguro do agente não é evidência; a saída de um teste que você rodou é.
