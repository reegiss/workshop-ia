## Capítulo 1 — Rápido não é verificável {#cap-1}

*Parte I — Fundamentos*

Gerar código ficou barato; avaliar, não. Saber se uma implementação respeita o requisito, os contratos existentes e as invariantes do sistema custa o mesmo de antes, quem quer que a tenha escrito. Este capítulo mostra onde esse custo se esconde quando ninguém o planeja, formula o princípio que guia o resto do livro e define o que conta como evidência.

### Um pedido vago

O livro acompanha uma única história, num sistema com o tipo de restrição que torna a verificação difícil: código legado, um contrato que não pode quebrar e uma dependência de outro serviço.

O sistema é o `transfer-service`, da plataforma de transferências do Banco Azul. O módulo legado `src/legacy/fees.ts` expõe `getFee(code, amount)`, que lê uma tabela global carregada na inicialização e substituída pela sincronização noturna de preços. Não tem testes, e o serviço de extrato depende dele: a assinatura e o comportamento de `getFee` são um *contrato de interface*. Cada banco tem duas tarifas, uma para valores até R$ 1.000,00, inclusive, e outra para valores acima disso. No Banco Azul, R$ 2,00 e R$ 5,00. O legado aplica essa regra corretamente.

Há também uma fonte nova de tarifas. A porta `FeeTableProvider` busca a tabela no pricing-service, outro microsserviço, e a mantém em cache com refresh. Duas chamadas seguidas a `current()` podem devolver versões diferentes da tabela.

A história é o ranking de bancos na tela de transferência: a pessoa digita um termo e um valor, e o serviço devolve os bancos correspondentes, por nome ou por código, ordenados pela tarifa daquele valor. A exigência de arquitetura é uma só: a tarifa exibida no ranking tem de ser a mesma que o extrato cobra.

Agora o pedido, do jeito que ele costuma ser feito:

```text
Crie o ranking de bancos para a tela de
transferência. Filtre pelo termo digitado e
ordene pela tarifa do valor informado, usando
a tabela de tarifas do pricing.
```

Para quem conhece o sistema, o pedido parece suficiente. Ele não diz se o termo casa com o código, qual regra de faixa vale nem quantas leituras da tabela uma resposta pode fazer, e não menciona o extrato. O agente responde em segundos com um `BankRankingService`, um arquivo de testes e uma mensagem segura. Nada na resposta diz se o código está certo, e ele não está.

### Três falhas típicas

As três falhas não são exclusivas de agentes. O agente só as torna mais frequentes, porque nunca hesita: toma cada decisão com a mesma fluência, tenha ou não base para ela.

#### Implementar antes de esclarecer

O pedido tinha lacunas, e o agente as preencheu em silêncio. A primeira é de negócio: a busca compara o termo só com o nome, e quem digita "001" não encontra o Banco Azul. A segunda é de contrato e de concorrência, e é mais grave.

> **[Exemplo]** O núcleo do serviço gerado:
>
> ```ts
> for (const bank of matches) {
>   const table = await this.tables.current();
>   const range = table.fees[bank.code];
>   const fee = amount < table.limit
>     ? range.lowFee
>     : range.highFee;
>   ranked.push({ ...bank, fee });
> }
> ```

A chamada a `current()` dentro do laço faz uma leitura por banco. Com três bancos, são três leituras por requisição. Se o cache renovar no meio do laço, a mesma resposta mistura duas versões da tabela, e o ranking ordena tarifas que nunca coexistiram. Nenhum teste com provider fixo enxerga isso, e o defeito só aparece em produção, perto do refresh: intermitente, dependente de tempo e sem relação visível com a mudança que o introduziu.

O código não está mal escrito. Ele implementa com competência uma decisão que ninguém tomou. Havia uma pergunta a fazer, "uma resposta pode ler a tabela mais de uma vez?", e ela não foi feita.

#### Escrever o teste depois, tautológico

O mesmo trecho tem outra decisão silenciosa. Em vez de reaproveitar a política de tarifa do legado, o agente a reimplementou no serviço novo, com `amount < table.limit`. No limite exato, R$ 1.000,00, a expressão cai na faixa alta. O legado, com `amount > limit`, cai na baixa.

Depois de escrever o código, o agente escreveu o teste:

> **[Exemplo]** O teste gerado afirma o que o código faz:
>
> ```ts
> it("charges 5 for 1000", async () => {
>   const r = await service.rank("azul", 1000);
>   expect(r[0].fee).toBe(5);
> });
> ```
>
> A tela mostra R$ 5,00. O extrato cobra R$ 2,00.

É um *teste tautológico*: passa por construção, porque o valor esperado veio da implementação, não do requisito. Um teste de caracterização do legado, afirmando que `getFee("001", 1000)` devolve `2`, teria exposto a divergência no primeiro vermelho. O [Capítulo 4](#cap-4) volta a esse passo zero.

#### Dizer "pronto" sem evidência

A resposta termina assim: "Pronto! Implementei o ranking com busca e ordenação por tarifa. Os testes devem passar."

"Devem passar" não é "passaram". O agente não rodou nada: previu o resultado e o apresentou no tom de quem conferiu. O modelo não marca a diferença entre o que observou e o que inferiu.

E, mesmo que tivesse rodado a suíte, o verde não provaria nada sobre a tarifa, porque o teste era tautológico. Rodar o teste é necessário e não é suficiente. Evidência exige as duas coisas: um teste que mede o requisito e uma execução que você observou.

> **[Aviso de Erro Comum]** Tratar a fluência da resposta como sinal de correção. A confiança do texto não mede a qualidade do código. O sintoma é aprovar porque "a explicação fazia sentido". Troque a pergunta "isto parece certo?" por "que mecanismo, fora do agente, mostrou que isto está certo?".

### Testes tautológicos

Um teste tautológico é aquele cujo valor esperado deriva da implementação, e não do requisito. A forma mais comum é a do exemplo: o mesmo autor escreve o código e, em seguida, o teste, com a mesma compreensão do problema. Se ela estiver errada, os dois erram juntos, e o verde só confirma que concordam entre si.

Há variações, como afirmar que um mock foi chamado em vez de afirmar o efeito, ou copiar para o `expect` o valor que a primeira execução imprimiu. Todas têm a mesma estrutura: o oráculo do teste não é independente do código testado.

Três propriedades o tornam perigoso, e não apenas inútil:

- **Ele é invisível às métricas usuais.** Cobertura mede o que foi executado, não o que foi verificado. O teste do exemplo cobre o ramo e afirma o valor errado.
- **Ele congela o erro.** Quem corrigir a regra depois verá esse teste ficar vermelho e terá motivo para achar que a correção é que quebrou algo.
- **Ele fica mais provável com agentes.** Código e teste saem da mesma sessão, com o mesmo contexto. Sem restrição de processo, os erros dos dois ficam correlacionados.

Um teste só protege algo se for escrito a partir do requisito e se você o vir falhar pelo motivo certo antes de existir o código. Como medir se uma suíte protege o código, e não apenas o executa, é assunto do [Capítulo 7](#cap-7).

### O custo deslocado para o fim

Nenhuma das três falhas atrasou a entrega. O custo não desapareceu; mudou de lugar. Sem processo, toda a verificação se concentra no fim, sobre um diff já escrito, e lá enfrenta três problemas de engenharia que nenhuma atenção extra resolve.

**Acoplamento entre consumidores.** A regra de tarifa tinha um dono, o legado, e um consumidor, o extrato. O agente criou um segundo dono. Agora há duas fontes de verdade para a mesma regra, e cada uma passa nos próprios testes. A divergência não existe dentro de nenhum dos módulos; existe na fronteira entre eles. Quem a vê é o cliente, quando a tela promete R$ 5,00 e o extrato cobra R$ 2,00, ou a conciliação, semanas depois. Regra duplicada é acoplamento implícito: os dois lados precisam mudar juntos, e nada no código registra isso.

**Contrato quebrado sem que nada falhe.** O comportamento de `getFee` no limite é parte do contrato, mas não está escrito em lugar nenhum além do próprio código. O mesmo vale para a semântica de `current()`: duas chamadas podem divergir, e quem consome a porta precisa decidir quantas leituras uma operação faz. Contratos implícitos não quebram com erro de compilação nem com teste vermelho; quebram em silêncio, longe da causa.

**A revisão no fim não reconstrói decisões.** Um diff mostra o que foi feito, não o que foi decidido nem o que foi deixado de fora. O revisor confere o que está presente; a pergunta que ninguém fez não aparece em linha nenhuma. Diante de um diff grande, coerente e com testes verdes, a revisão tende a virar conferência de estilo, e escapam justamente os erros que parecem corretos. Quanto mais código o agente produz, mais esse gargalo pesa.

O custo de corrigir também cresce com a distância. Uma pergunta antes do código custa segundos. O mesmo erro depois do merge exige achar a causa, corrigir a regra, desfazer o teste que congelou o erro e auditar quem passou a depender do comportamento errado. O agente acelerou a parte barata, que é escrever, e empurrou a cara, que é verificar, para o momento em que ela é mais difícil.

### O princípio zero-trust

As três falhas têm uma causa comum: alguém aceitou uma saída do agente pela palavra do agente. Uma decisão silenciosa passou por requisito, um teste do mesmo autor passou por verificação e uma previsão passou por resultado. O princípio do livro é a negação direta disso:

**Toda saída do agente é não confiável até ser verificada por um mecanismo que não dependa do próprio agente.**

"Saída" inclui código, testes, planos, explicações e, sobretudo, afirmações de estado como "pronto" e "não quebra nada". "Mecanismo que não dependa do agente" é algo que daria o veredito certo mesmo com o agente errado: um teste que você viu falhar antes da mudança, um comando cuja saída você leu, um gate de CI que barra o merge, uma spec aprovada antes do código.

Na segurança de redes, zero-trust significa que nenhuma origem, nem a rede interna, concede confiança implícita. Aqui, nem a fluência da resposta, nem os acertos anteriores da sessão, nem a autoria do teste concedem confiança.

Daí saem quatro consequências práticas, que o resto do livro transforma em processo:

- **Separação entre quem produz e quem verifica.** O mesmo princípio que impede alguém de aprovar o próprio pull request vale para o agente que escreve código e teste. O oráculo precisa vir de fora: do requisito aprovado, de um teste visto falhando, de uma revisão em contexto limpo.
- **Evidência observável e reexecutável.** Vale o que outra pessoa pode inspecionar ou rodar de novo. "O agente disse" não é reexecutável; a saída de um comando é.
- **A confiança não se acumula.** Dez acertos seguidos não tornam o décimo primeiro mais confiável. O modelo não melhora ao longo da sessão; como mostra o [Capítulo 2](#cap-2), ele tende a piorar.
- **Barreiras automáticas em vez de vigilância.** Atenção humana falha em dia corrido; um gate de pipeline não. O que puder ser verificado por máquina deve ser, de forma inegociável. O mesmo vale para permissões: o agente trabalha numa branch local, sem credenciais de push nem de deploy, porque o que ele não pode fazer não precisa ser auditado.

Zero-trust não é recusa da ferramenta. É uma decisão sobre onde a confiança mora: nos mecanismos de verificação, e não no gerador.

### Desenvolvimento verificável

O princípio diz o que não aceitar. O método diz como trabalhar para que sempre haja algo verificável: em vez de revisar com mais esforço no fim, distribuir a verificação ao longo do trabalho, em pedaços pequenos.

***Desenvolvimento verificável*** é trabalhar de modo que cada etapa deixe uma evidência que você consegue ver, e que não depende da palavra do agente.

Evidência, aqui, é sempre um artefato concreto: um documento que você leu e aprovou, um teste que você viu falhar, a saída de um comando que você rodou. São seis, duas em cada momento do trabalho:

- **Antes:** requisito esclarecido e plano revisável. As lacunas do pedido viram perguntas respondidas por você, e o trabalho vira passos conferíveis.
- **Durante:** teste falhando antes do código e teste passando depois. O vermelho prova que o teste mede algo que ainda não existe; o verde, que o código passou a fazê-lo.
- **Depois:** diff revisado por você e resultado verificado por você, com os comandos rodados na sua máquina.

Volte às três falhas e veja em que momento cada uma teria sido barrada:

- **As decisões silenciosas** teriam aparecido **antes**, como perguntas e critérios de aceite: o código também conta? Quantas leituras da tabela por resposta? A regra do ranking é a do extrato?
- **O teste tautológico** não teria sobrevivido ao **durante**. Escrito a partir do critério "tarifa 2 para 1000" e visto falhar contra a implementação errada, ele teria exposto o `<` no primeiro vermelho.
- **"Os testes devem passar"** não sobreviveria ao **depois**, porque o resultado verificado é a saída de um comando que você rodou, e não a previsão do agente.

Nenhuma dessas práticas é nova. O que muda é que deixam de depender da disciplina de alguém e passam a ser etapas do fluxo, cada uma com um artefato e, como mostra o Capítulo 4, com um gate automatizado.

### Do princípio ao processo

Até aqui, o método depende da sua memória, que é o tipo de controle que o próprio princípio desaconselha. Há duas formas de tirá-lo dela. Uma é colocá-lo dentro do agente, como instruções que o fazem perguntar, testar primeiro e rodar os comandos antes de afirmar algo: as skills, implementações de referência dos padrões que o livro descreve. A outra é colocá-lo fora do agente, em gates que nenhuma instrução contorna. As duas são necessárias, porque a skill orienta e não garante: ela também é texto de entrada para um sistema que pode ignorá-la. Por que isso acontece é o assunto do Capítulo 2.

### Resumo

- Gerar código ficou barato; verificar continua caro, e o agente não reduz esse custo, só o desloca para o fim, onde ele é maior e a revisão é menos confiável.
- As três falhas típicas são implementar antes de esclarecer, escrever o teste depois, de forma tautológica, e dizer "pronto" sem evidência.
- O custo deslocado é um problema de engenharia: regra duplicada entre consumidores, contratos implícitos que quebram em silêncio e diffs que não registram as decisões tomadas.
- Teste tautológico é aquele cujo esperado vem da implementação; ele passa por construção, escapa da cobertura e congela o erro.
- Princípio zero-trust: toda saída do agente é não confiável até ser verificada por um mecanismo que não dependa do próprio agente.
- Desenvolvimento verificável distribui seis evidências em três momentos: requisito esclarecido e plano revisável antes; teste falhando antes do código e teste passando depois durante; diff revisado por você e resultado verificado por você depois.
