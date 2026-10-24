## Capítulo 5 — Esclarecer {#cap-5}

*Parte II — Na prática*

A Parte II percorre o fluxo mínimo, um padrão por capítulo. Este trata do primeiro, a Elicitação Guiada de Requisitos: por que o modelo preenche lacunas por conta própria, como classificá-las, quem decide cada uma e como auditar a spec que sai da etapa. No fim, a primeira evidência, o requisito esclarecido, está num commit da sua branch.

### Por que o modelo preenche lacunas

A primeira falha do [Capítulo 1](#cap-1) não foi descuido do agente, e sim o comportamento padrão de um modelo diante de um pedido incompleto.

**Otimização para entregar.** Os modelos usados em agentes de código são ajustados para concluir tarefas. No treino, uma resposta que atende ao pedido é preferida a uma que devolve perguntas, e um pedido com lacunas ainda é um pedido que dá para atender. O resultado é um viés sistemático: diante da ambiguidade, o modelo escolhe uma interpretação e segue.

**Viés de completar.** Um modelo gera continuações plausíveis. Uma lacuna não aparece para ele como um buraco a sinalizar, e sim como um ponto a preencher com o padrão mais frequente no treino. Se a maioria dos códigos de faixa que ele viu usa `<` no limite, `<` é o que sai. Se buscas costumam filtrar por nome, a busca filtra por nome. O preenchimento é estatisticamente razoável e semanticamente arbitrário: reflete o código médio da internet, não a regra do seu negócio.

**Ausência de sinal.** O código que decide uma lacuna é indistinguível do que implementa uma regra explícita, e a resposta soa igualmente segura nos dois casos. Pelo princípio de zero-trust, toda lacuna preenchida pelo agente é uma saída não verificada, com o agravante de que você nem sabe que ela existe.

A Elicitação Guiada de Requisitos inverte o padrão: proíbe o código até que as lacunas tenham sido transformadas em perguntas, as perguntas em decisões e as decisões em texto versionado.

### O padrão e a sua implementação de referência

A skill `brainstorming` implementa o padrão com uma sequência fixa. Conhecer o motivo de cada passo é o que permite perceber quando o agente pula um.

- **Explorar antes de perguntar.** O agente lê código, configuração e documentação antes da primeira pergunta. Perguntas ancoradas no projeto ("o `getFee` legado aplica a faixa baixa até o limite; o ranking deve seguir a mesma regra?") rendem decisões; perguntas genéricas ("quais são os requisitos?") devolvem o trabalho a você. Nesta fase, só leituras.
- **Uma pergunta por vez, de preferência fechada.** Uma pergunta isolada recebe uma resposta pensada; uma lista recebe respostas apressadas e deixa itens sem resposta. Alternativas `A)`, `B)` forçam o agente a explicitar as interpretações possíveis, o que já expõe a lacuna.
- **Duas ou três abordagens, com recomendação justificada.** Fechadas as dúvidas, o agente compara caminhos e diz o que cada um troca. É o único ponto em que a recomendação dele pode ser aceita, e só para decisões técnicas.
- **Design em seções, com aprovação incremental.** Cada seção é lida como parte da spec.
- **Persistir e versionar.** A spec é gravada em `docs/superpowers/specs/`, com data e tema no nome, e entra num commit. Nenhum código de produção é escrito na etapa.

O diálogo muda entre execuções; o que você audita é a sequência.

### Uma taxonomia de lacunas

A skill não encontra todas as lacunas; a cobertura dela depende do que o projeto deixa visível. Uma taxonomia é um checklist independente do agente, e quatro categorias cobrem a maior parte do que dá errado.

**Lacunas de negócio.** Regras que só quem pediu a história conhece: limites, inclusões, ordenações, o que conta como correspondência. São as mais fáceis de reconhecer e as mais fáceis de o agente "resolver" com um palpite plausível. Na história do ranking, eram duas: de que lado do limite fica uma transferência de exatamente R$ 1.000,00, e se o termo digitado busca pelo nome, pelo código ou pelos dois.

**Lacunas de contrato.** Quando a regra já existe em outro lugar do sistema, a lacuna não é "qual é a regra", e sim "qual é a fonte da verdade". O risco é a reimplementação: uma segunda cópia da regra, escrita a partir do pedido, que diverge da primeira no primeiro caso de borda. O critério de decisão é que, se dois consumidores precisam concordar, eles compartilham a implementação, não a descrição. No ranking, o `getFee` legado é a fonte, porque é ele que o serviço de extrato usa para cobrar; a tela e o extrato só coincidem se ambos derivarem da mesma política.

**Lacunas de concorrência e consistência.** Quando o código lê estado que muda por fora, a lacuna é qual consistência a operação garante. Cache com refresh, tabela recarregada por um job, configuração remota: duas leituras podem devolver versões diferentes. O critério de decisão é a unidade de consistência, ou seja, qual conjunto de leituras precisa ver o mesmo estado. No ranking, a resposta é um snapshot da tabela por requisição, porque um ranking que mistura duas versões da tabela compara tarifas que nunca coexistiram. O agente do Capítulo 1 leu a tabela dentro do laço, uma vez por banco, sem que ninguém tivesse decidido isso.

**Lacunas de dependência e porta.** Como a dependência entra no código: importada diretamente, lida de um estado global ou recebida por injeção através de uma porta. Decide o que é testável. Uma decisão de consistência como "um snapshot por requisição" só vira critério verificável se houver uma costura onde um provider falso possa contar as leituras. No ranking, o `FeeTableProvider` injetado é essa costura: em produção busca a tabela no pricing-service, em teste devolve uma tabela fixa e registra quantas vezes foi chamado.

As quatro categorias se encadeiam. A decisão de contrato (reaproveitar a política do legado) leva a uma decisão de dependência (extrair a regra numa função pura que o legado e o serviço novo compartilham), e a decisão de consistência só é testável por causa da porta. Uma spec que trata uma categoria e ignora a seguinte costuma ter um critério impossível de provar.

### Quem decide o quê

Esclarecer é levar cada decisão a quem tem autoridade sobre ela, não transferi-la do agente para você. O agente nunca tem autoridade; no máximo, recomenda.

- **Negócio:** decide quem pediu a história, o dono do produto ou a área responsável pela regra. O seu papel é levar a pergunta, não respondê-la por inferência. Se você não sabe, essa é a descoberta mais útil da sessão: a spec registra a dúvida como pendente e o fluxo para até a resposta chegar. Uma spec com "a confirmar" é melhor que uma spec com um chute.
- **Contrato:** decide quem é dono do contrato e quem o consome. Mudar uma interface que outro serviço usa não é decisão local, mesmo quando parece correção. No ranking, preservar a assinatura e o comportamento de `getFee` não estava em discussão: o extrato depende dele.
- **Concorrência e consistência:** decide a engenharia, você ou o tech lead, mas com um insumo de negócio. Qual defasagem é aceitável entre o preço publicado e o preço exibido é pergunta de negócio; como garantir a consistência escolhida é pergunta técnica.
- **Dependência e porta:** decide a engenharia, e aqui a recomendação do agente pode ser aceita, desde que a justificativa seja conferível: por que injetar, o que fica testável, que acoplamento se evita.

A regra prática é simples: uma recomendação do agente só é aceitável quando você consegue verificar a justificativa sem confiar nele. "Injetar o provider permite contar leituras num teste" é verificável. "Valores no limite costumam ir para a faixa alta" não é, e mesmo que fosse, não é o agente quem decide.

### O mínimo de condução

A skill conduz a conversa; a sua intervenção se concentra em poucos pontos.

- **Responda com decisões.** "Tanto faz" devolve ao agente a decisão que a etapa existe para tirar dele.
- **Complete a cobertura com a taxonomia.** A lacuna que o agente não encontrou entra na sua próxima resposta, já decidida.
- **Recuse ações fora da etapa.** Instalar dependências, criar arquivos em `src/` ou commitar algo além da spec indica que o agente abandonou o processo.
- **Fixe a spec no idioma do código.** Ela é lida ao lado de nomes de funções e de testes; um idioma só elimina a tradução mental ao conferir critério contra teste.

> **[Exemplo]** Uma lacuna de contrato, levantada pelo agente depois de ler o legado:
>
> **Agente:** O `getFee` em `src/legacy/fees.ts` já calcula a tarifa, e o extrato o consome. Como o ranking deve obter a tarifa?
>
> A) Chamar `getFee` diretamente
> B) Reimplementar a regra no serviço novo
> C) Extrair a regra numa função pura usada pelos dois
>
> **Você:** C. O `getFee` mantém a assinatura e passa a delegar à função extraída.

A alternativa A acopla o ranking ao estado global do legado; a B é a reimplementação que causou a divergência do Capítulo 1. A escolhida resolve a lacuna de contrato e a de dependência de uma vez.

### A spec como estado fora do contexto

O [Capítulo 2](#cap-2) mostrou que uma sessão longa é estado acumulado e não auditável: a janela é finita, a compactação descarta detalhes, a informação do meio da conversa é recuperada pior que a das pontas e as instruções antigas perdem peso para as recentes. Uma decisão tomada na décima pergunta do brainstorming é exatamente o tipo de informação que se degrada primeiro.

A spec externaliza esse estado para um arquivo com quatro propriedades que a conversa não tem:

- **Persistente:** sobrevive ao fim da sessão, à compactação e à troca de CLI.
- **Curável:** um subagente recebe a spec como contexto de partida, limpo, sem as idas e vindas que produziram as decisões. É o insumo natural da Delegação com Contexto Limpo, no [Capítulo 8](#cap-8).
- **Diffável:** uma decisão alterada aparece como uma linha mudada, revisável no pull request como código.
- **Verificável por máquina:** o `check-spec.mjs` lê a spec, confere as seções e cobra que cada critério tenha teste. A conversa não pode ser lida por um gate.

O corolário é duro e útil: decisão que ficou só na conversa não existe. Ela não chega ao plano, não chega aos testes e não chega ao revisor.

### Auditando a spec

A spec gravada só vale como evidência depois de auditada: o agente pode ter resumido uma resposta ou trocado "até" por "abaixo de".

- **Cada decisão está na spec, na forma que você deu.** Confira resposta por resposta. Atenção a palavras de fronteira: "até", "acima de", "contém", "igual a".
- **Cada critério tem ID.** `AC-01`, `AC-02` e assim por diante, sem lacunas de numeração e sem IDs reaproveitados. É o ID que vai ligar o critério ao teste e permitir a rastreabilidade no pipeline.
- **Cada critério tem entrada e resultado.** Dado este termo, este valor, este estado, o resultado é este. Um critério que descreve uma qualidade ("a busca é tolerante a acentos") é requisito, não critério; o critério correspondente é um caso ("ambar" encontra o Banco Âmbar). Decisões de consistência também precisam de forma observável: "um snapshot por requisição" é verificável porque um provider falso conta as leituras.
- **Existe fora do escopo, e ele é específico.** Sem essa seção, o limite da mudança fica implícito, e o implícito o agente decide. "Nada além do pedido" não delimita nada; "sem alterações no serviço de extrato" delimita.
- **A spec está num commit isolado.** Só a spec, sem código e sem outras alterações pendentes. Isso permite revisá-la separada da implementação e reverter uma decisão sem desfazer código.

> **[Exemplo]** Trechos dos critérios de aceite da spec gravada:
>
> ```md
> ## Acceptance criteria
> - AC-02 "001" finds Banco Azul; "1" finds none.
> - AC-04 Banco Azul fee for 1000 is 2; for
>   1000.01 is 5.
> - AC-06 One fee table snapshot per request.
> - AC-07 Legacy getFee keeps its signature and
>   its characterization suite passes unchanged.
> ```

Os quatro trechos cobrem as quatro categorias da taxonomia: busca (negócio), limite (negócio, alinhado ao contrato), snapshot (consistência, testável pela porta) e preservação do legado (contrato). A spec sai desta etapa com sete critérios. O oitavo aparece no planejamento, como mostra o [Capítulo 6](#cap-6), e entra pelo mesmo trilho: novo ID, commit na spec.

### Erros comuns

> **[Aviso de Erro Comum]** Aprovar a spec por consequência. Depois de dez perguntas respondidas, a spec parece certa porque a conversa pareceu certa. O sintoma é seguir para o plano sem ter aberto o arquivo. A auditoria é contra as suas respostas, item por item, não contra a impressão da sessão.

> **[Aviso de Erro Comum]** Tratar só as lacunas de negócio. Elas são as mais visíveis, e a skill costuma encontrá-las. As de contrato e de consistência raramente aparecem no pedido e são as que produzem divergências em produção. Percorra a taxonomia inteira antes de aprovar.

> **[Aviso de Erro Comum]** Critério sem forma observável. "Uses a consistent fee table" descreve uma intenção que nenhum teste prova. Se um critério não tem entrada e resultado, ou não indica como o resultado é observado, peça que seja reescrito como caso.

Com a spec auditada e commitada, a skill oferece a etapa seguinte: a Decomposição Verificável, com `writing-plans`. O Capítulo 6 começa daí.

### Resumo

- O modelo preenche lacunas por otimização para entregar e por viés de completar, e o preenchimento não deixa sinal: toda lacuna decidida pelo agente é saída não verificada.
- Elicitação Guiada de Requisitos impõe explorar antes de perguntar, uma pergunta por vez, abordagens com recomendação, design incremental e spec versionada, sem código.
- Lacunas se classificam em negócio, contrato, concorrência e consistência, e dependência e porta; percorrer as quatro é o checklist que independe do agente.
- Cada tipo de decisão tem um dono: negócio a quem pediu, contrato a quem o mantém e consome, consistência e portas à engenharia; o agente só recomenda, e só quando a justificativa é conferível.
- A spec é o estado persistente fora do contexto do modelo: sobrevive à sessão, serve de contexto limpo para subagentes e é lida por gates.
- Auditar a spec é conferir decisões, critérios com ID, entrada e resultado, fora do escopo específico e commit isolado.
