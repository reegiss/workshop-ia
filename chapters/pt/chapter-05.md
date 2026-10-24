## Capítulo 4 — Evidência e Spec-Driven Development {#cap-4}

O [Capítulo 1](#cap-1) definiu desenvolvimento verificável como trabalhar de modo que cada etapa deixe uma evidência que não dependa da palavra do agente. Este capítulo fecha a Parte I com três coisas. Primeiro, quais são as seis evidências, que falha cada uma barra e que gate de pipeline a sustenta quando ninguém está olhando. Depois, o *Spec-Driven Development* tratado como engenharia de requisitos executável. Por fim, o fluxo mínimo que a [Parte II](#cap-5) executa e a variação que ele exige em código legado.

### Seis evidências, seis gates

Uma evidência é um artefato produzido por um mecanismo que o agente não controla: um arquivo que você aprovou, uma saída de teste que você leu, um comando que você rodou. Uma frase do agente nunca é evidência, por mais detalhada que seja. É o princípio de zero-trust do [Capítulo 2](#cap-2) aplicado ao processo: a saída do agente é não confiável até que algo independente dele a confirme.

As seis evidências se dividem em dois momentos antes do código, dois durante e dois depois. Cada uma tem duas camadas. A camada local é a evidência propriamente dita, produzida na hora e lida por você. A camada automatizada é o gate que, no pipeline, barra a mesma falha quando a camada local foi pulada, esquecida ou feita às pressas. A local pega o erro cedo e barato; o gate garante que ele não chegue à branch principal. O [Capítulo 8](#cap-8) monta o pipeline; aqui fica o mapa.

**Requisito esclarecido.** Uma spec versionada, escrita depois que as lacunas do pedido viraram perguntas e as perguntas receberam respostas de quem tem autoridade sobre elas. Barra a lacuna decidida em silêncio. O gate é um script de CI, `scripts/check-spec.mjs`, que recebe o caminho da spec e falha se faltar uma das seções obrigatórias: objetivo, requisitos, critérios de aceite e fora do escopo. Uma spec sem fora do escopo não passa, e a revisão do pull request lê a spec como lê código.

**Plano revisável.** Um arquivo com tarefas pequenas, ordenadas, cada uma com o teste que a inicia e o comando que a confere. Barra a tarefa sem teste e o critério que se perde entre a spec e o código. O gate é a outra metade do mesmo script: a rastreabilidade. Cada critério tem um ID (`AC-01`, `AC-02`…), e o script falha se algum ID não aparecer em nenhum arquivo de teste versionado. Um plano que esqueceu um critério produz um código cujo teste não cita aquele ID, e o pipeline acusa.

**Teste falhando antes do código.** A saída vermelha, lida por você, com a mensagem de falha que a regra prevê. Barra o teste tautológico, aquele que nasce verde porque espelha o código em vez da regra. Aqui o pipeline tem um limite estrutural: o CI vê o estado final do repositório, não a ordem em que as coisas aconteceram. Nenhum gate prova que o teste falhou antes. O substituto automatizado é o teste de mutação: o Stryker altera o código de produção e verifica se a suíte percebe. Um teste que espelha a implementação sobrevive às mutações dela, e o mutation score abaixo de `thresholds.break` derruba o build. Mutação não prova que o teste nasceu vermelho; prova que ele protege. O [Capítulo 7](#cap-7) desenvolve a teoria.

**Teste passando depois.** A saída verde do mesmo comando, depois da implementação. Barra a regressão e a implementação que só passa no ambiente do agente. O gate é a suíte completa no CI, com typecheck e lint, num ambiente limpo. A integridade da suíte entra no mesmo gate: com a variável `CI` definida, o Vitest falha se encontrar um `.only` esquecido (é o padrão da opção `allowOnly`), e um `.skip` novo no diff é barrado por verificação explícita.

**Diff revisado por você.** A leitura linha a linha do que mudou, antes do commit. Barra a mudança que ninguém pediu: o arquivo fora do escopo, a assinatura pública alterada, a função renomeada no caminho. O gate é a branch protegida com revisão humana obrigatória e, para os arquivos que guardam contratos, CODEOWNERS: quem é dono do contrato precisa aprovar qualquer mudança neles.

**Resultado verificado por você.** O comando rodado por você, no seu terminal, e não o relato do agente de que rodou. Barra o "pronto" sem evidência. O gate é o próprio CI, que roda fora do alcance do agente, combinado com uma regra de privilégio: o agente não tem credenciais de push nem de deploy. O que ele declara pronto só sai da sua máquina pela sua mão, e só chega à branch principal depois que o pipeline concorda.

As três falhas do Capítulo 1 caem nesse mapa sem sobra. A busca só pelo nome e as leituras repetidas da tabela são lacunas decididas em silêncio, e param no requisito esclarecido. O teste que afirma R$ 5,00 para R$ 1.000,00 no Banco Azul para no teste falhando antes do código, porque um teste escrito a partir da regra exige R$ 2,00 e fica vermelho contra a implementação errada. O "devem passar" para no resultado verificado por você. O diff revisado cobre o resto: as surpresas que nenhum teste procura.

> **[Nota]** Gate não substitui evidência. O pipeline pega o erro tarde, depois que o código foi escrito, o teste foi ajustado e o contexto se perdeu. A evidência local pega o mesmo erro no minuto em que ele nasce. O gate existe porque pessoas cansam e pulam etapas, não para que você possa pulá-las.

### SDD: engenharia de requisitos executável

*Spec-Driven Development* (SDD) não é uma ideia nova com nome novo. É engenharia de requisitos, a disciplina de elicitar, registrar, validar e rastrear o que o sistema deve fazer, adaptada a um executor que não pergunta por iniciativa própria. A novidade está em dois pontos.

O primeiro é o leitor da spec. Num time humano, uma spec incompleta é compensada por conversa de corredor, pela memória do time e pelo bom senso de quem implementa. Um agente não tem nada disso. Tudo o que não está escrito ele preenche com o mais plausível segundo o treino, e o mais plausível raramente coincide com a regra do seu negócio. A spec deixa de ser um documento de alinhamento e passa a ser a única fonte de requisitos que o executor enxerga.

O segundo é a executabilidade. Uma spec é executável quando os seus critérios estão ligados a testes por um vínculo que uma máquina confere. Não basta que os critérios "virem testes" na cabeça de alguém: cada critério tem um identificador, cada teste que o prova cita esse identificador, e um script quebra o build quando o vínculo some. A spec deixa de ser uma intenção e passa a ser um contrato com verificação automática.

As quatro seções obrigatórias têm funções distintas na cadeia:

- **Objetivo:** desempata decisões que a spec não previu. Quando o plano encontra uma lacuna nova, é contra o objetivo que se avalia a resposta.
- **Requisitos:** as regras, em linguagem declarativa. Dizem o que deve valer, não como implementar.
- **Critérios de aceite:** os casos que provam os requisitos, cada um com entrada e resultado esperado. São a interface entre a spec e a suíte de testes.
- **Fora do escopo:** o limite explícito da mudança. Com um agente, é a seção que mais rende por linha, porque tudo o que não é proibido o agente pode considerar oportunidade de melhoria.

Requisito sem critério não é verificável. Critério sem requisito é teste sem razão de existir. A revisão da spec confere as duas direções.

### Critérios com ID: a base da rastreabilidade

Rastreabilidade é poder responder, a qualquer momento, duas perguntas: que teste prova este requisito, e que requisito justifica este teste? Em projetos grandes ela costuma morar numa matriz mantida à mão, que fica desatualizada na primeira semana de pressa. Com IDs estáveis e um script, ela passa a morar no próprio código.

A convenção é simples: cada critério recebe um ID `AC-nn`, que nunca é reaproveitado, e o teste que o prova leva o ID no nome, no `it` ou no `describe`. Três consequências práticas:

- **Mudança de spec vira mudança rastreável.** Um critério alterado mantém o ID, e o diff da spec aponta exatamente que teste precisa mudar junto. Um critério removido deixa um teste órfão, visível numa busca pelo ID.
- **A revisão fica dirigida.** Ao ler o diff de uma tarefa, você sabe quais IDs ela deveria cobrir e confere se os testes citam esses IDs e afirmam o resultado que o critério diz.
- **Lacunas descobertas tarde entram no mesmo trilho.** Uma regra que só aparece no planejamento ganha o próximo ID, volta para a spec num commit e passa a ser cobrada pelo pipeline como as outras.

O script confere só a direção da spec para o teste: todo critério tem ao menos um teste que o cita. A direção inversa, teste sem critério, fica para a revisão humana, porque há testes legítimos que não correspondem a um critério de negócio. E o vínculo é nominal: o script garante que o ID aparece, não que o teste prova o que o critério diz. Essa segunda parte é trabalho do vermelho lido e da mutação.

> **[Exemplo]** Um critério da spec do ranking e o teste que o cita:
>
> ```text
> - AC-04 Banco Azul fee for 1000 is 2; for
>   1000.01 is 5.
>
> it("AC-04 lowFee at the limit", ...)
> ```
>
> Se o teste perder o ID, o `check-spec.mjs` falha com `no test for AC-04`.

### A curva de custo da correção

A intuição de que um defeito fica mais caro quanto mais tarde é descoberto vem da curva clássica de Boehm, dos anos 1980. As magnitudes daquela curva são contestadas e variam muito com o processo do time. A direção, não. E o desenvolvimento com agentes muda a forma da curva de um jeito que engana.

Gerar código ficou quase gratuito. Isso cria a impressão de que refazer também é: se a implementação saiu errada, basta pedir outra. Mas o custo de um defeito nunca esteve na digitação. Ele está em detectar, diagnosticar, desfazer as decisões que se apoiaram no erro e reverificar tudo o que dependia do comportamento antigo. Nenhuma dessas atividades ficou mais barata, e a última ficou mais cara, porque o agente produz mais código dependente por hora.

Tome o limite da faixa como exemplo de defeito e acompanhe o custo por etapa:

- **Na spec:** trocar "abaixo de" por "até, inclusive". Uma frase, nenhum código, nenhum teste congelou nada.
- **No plano:** reescrever o teste inicial de uma tarefa. Um parágrafo.
- **Numa tarefa:** refazer a tarefa. O teste errado e o código errado nasceram juntos e morrem juntos.
- **Depois do merge:** uma investigação. O teste tautológico congelou o erro, outras tarefas se apoiaram nele, e a correção exige descobrir quem mais depende do comportamento.
- **Em produção:** um incidente. A tela mostra uma tarifa e o extrato cobra outra, e o custo passa a incluir atendimento, estorno e confiança.

Há um segundo efeito, menos óbvio: revisar artefatos pequenos em sequência é mais barato do que revisar um artefato grande no fim, porque cada revisão isola uma dimensão. Na spec, você pensa só em regras. No plano, só em decomposição e ordem. No diff de uma tarefa, você sabe exatamente que IDs procurar. A revisão do Capítulo 1, centenas de linhas sem critério, é o caso oposto: a atenção se espalha por tudo e não se aprofunda em nada.

Por isso o SDD revisa um artefato por vez, nesta ordem: spec, plano, tarefas, código. Cada um é aprovado antes de o próximo começar, e cada um é insumo verificável do seguinte.

### Spec Kit e a constituição

O superpowers não é a única implementação de SDD para agentes. O *Spec Kit*, kit aberto do GitHub publicado em `github/spec-kit`, conduz as mesmas etapas por comandos: princípios do projeto, spec, plano, tarefas e implementação.

A contribuição conceitual do Spec Kit é a *constituição*: um documento com os princípios que toda spec do projeto deve respeitar. A spec muda a cada história; a constituição é a camada de invariantes acima dela. Separar as duas tem um efeito direto sobre o agente: as regras que valem sempre deixam de depender de alguém lembrar de repeti-las no pedido, e passam a ser carregadas no contexto de toda sessão a partir de um arquivo versionado.

A ideia vale fora do Spec Kit, em qualquer CLI que leia um arquivo de instruções do projeto. Mas uma constituição só é útil na medida em que é verificável. "Escreva código de qualidade" não restringe nada. "Toda regra de negócio tem critério com ID e teste que o cita" restringe, e pode ser imposta por gate. "Código de domínio não importa módulos de infraestrutura" pode virar regra de lint. O princípio que não tem gate correspondente é uma sugestão ao modelo, e sugestões perdem peso numa sessão longa, como mostrou o Capítulo 2.

> **[Nota]** Os comandos do Spec Kit mudam entre versões, por isso este livro não os lista. Consulte o README do repositório para as instruções atuais. O método deste capítulo independe da ferramenta.

### O fluxo mínimo nos padrões canônicos

O [Capítulo 3](#cap-3) apresentou as skills como processos em arquivo. Cada uma das quatro skills do fluxo mínimo é a implementação de referência de um padrão de engenharia com IA. O padrão é o conceito, portável para qualquer CLI; a skill é um veículo.

**1. Esclarecer.** Padrão: Elicitação Guiada de Requisitos, implementado pela skill `brainstorming`. O agente explora o projeto, transforma cada lacuna em pergunta, uma por vez, propõe abordagens e grava a spec com commit, sem escrever código. Barra a implementação antes do esclarecimento. Evidência: requisito esclarecido. Gate: seções obrigatórias da spec. Executado no [Capítulo 5](#cap-5).

**2. Planejar.** Padrão: Decomposição Verificável, implementado por `writing-plans`. A spec aprovada vira tarefas pequenas, cada uma com arquivos, teste inicial e comando de conferência. Barra o teste escrito depois e o critério perdido. Evidência: plano revisável. Gate: rastreabilidade entre critérios e testes. Executado no [Capítulo 6](#cap-6).

**3. Vermelho, depois verde.** Padrão: Prova por Falha, implementado por `test-driven-development`. O teste nasce de um critério, roda e falha pela razão certa; só então vem o código mínimo. Barra o teste tautológico. Evidências: teste falhando antes e teste passando depois. Gates: mutação e suíte completa no CI. Executado no Capítulo 7.

**4. Verificar.** Padrão: Portão de Verificação Independente, implementado por `verification-before-completion`. O agente não declara conclusão sem rodar os comandos e mostrar a saída, e a declaração dele ainda é só o insumo da sua verificação. Barra o "pronto" sem evidência. Evidências: diff revisado e resultado verificado por você. Gates: branch protegida, revisão obrigatória e CI fora do alcance do agente. Executado no Capítulo 7.

Cada padrão consome o artefato do anterior. Pular um deles não economiza a etapa; apenas faz com que a evidência dela não exista, e o gate correspondente passe a ser a primeira linha de defesa em vez da última. Os outros padrões, Delegação com Contexto Limpo, Isolamento de Espaço de Trabalho e Revisão Independente, entram quando a história cresce, no Capítulo 8.

> **[Dica Prática]** O fluxo completo tem custo fixo. Renomear uma variável ou corrigir uma mensagem não pede spec nem plano. Use-o onde há regra de negócio ambígua, contrato com outro consumidor ou risco de erro caro. O Capítulo 8 volta a esse critério.

### Variação para código legado: o passo zero

O fluxo mínimo supõe que o comportamento atual do código está protegido por testes. Em código legado, essa suposição falha, e mudar código sem testes é editar às cegas, como define Michael Feathers em *Working Effectively with Legacy Code*. Antes de esclarecer qualquer coisa nova, é preciso fixar o que o código já faz.

É o padrão Caracterização antes da Mudança. Ele não tem skill própria no superpowers: é um passo zero que precede o fluxo sempre que a mudança toca código sem testes do qual outro consumidor depende.

Um teste de caracterização documenta o que o sistema faz, não o que ele deveria fazer. Você chama o código com entradas escolhidas, observa a saída e afirma exatamente essa saída. Isso o torna o inverso do TDD em dois pontos:

- **Nasce verde.** Ele descreve o comportamento existente, então passa na primeira execução. Um teste de caracterização vermelho significa que você entendeu errado o código, não que o código está errado.
- **Afirmar o que o código devolve é o objetivo, não o defeito.** O mesmo gesto que torna um teste novo tautológico é o que dá valor a um teste de caracterização. A diferença está no papel: aqui o código é a especificação vigente.

Como ele nasce verde, a pergunta "este teste protege algo?" precisa de outra resposta. A resposta é quebrar o legado de propósito, com uma mutação manual no ponto sensível, como trocar um `>` por `>=`, e conferir que a suíte fica vermelha. É a mesma lógica do teste de mutação, aplicada à mão antes da mudança.

O resultado é a *linha de base caracterizada*: uma suíte que congela o contrato atual e deve continuar verde, sem alteração, ao longo de toda a mudança. Ela é pré-requisito, não uma sétima evidência. As seis evidências provam a mudança; a linha de base prova que o que já existia continua igual. No pipeline, a suíte de caracterização é um check obrigatório, e os seus arquivos ficam sob CODEOWNERS, para que nem você nem o agente possam "ajustar" o contrato para fazer a mudança passar.

Caracterizar também é uma técnica de elicitação. Ao escrever os casos, você descobre regras que ninguém documentou, e elas viram insumo da spec. A segunda falha do Capítulo 1 é o exemplo: o agente reimplementou a tarifa com `<` no limite, enquanto o legado, que o extrato usa, aplica a faixa baixa até o limite, inclusive. Um teste de caracterização do legado teria tornado a regra explícita antes de qualquer pergunta, e a divergência entre tela e extrato teria aparecido como um vermelho, não como uma reclamação de cliente.

### Antes da Parte II

A Parte II conduz a história do ranking de bancos do pedido vago ao teste verde, um padrão por capítulo, com o passo zero aplicado ao `getFee` legado. O projeto de partida e o código final estão no [Apêndice D](#apendice-d). As regras de segurança do Capítulo 2 valem do início ao fim: branch local, aprovação comando a comando, nada sensível ao alcance do agente e nenhuma credencial de push ou deploy na sessão dele.

### Resumo

- As seis evidências (requisito esclarecido, plano revisável, teste falhando antes do código, teste passando depois, diff revisado por você e resultado verificado por você) têm, cada uma, uma falha que barram e um gate de pipeline que as sustenta.
- O CI vê o estado final, não a ordem: nenhum gate prova que o teste nasceu vermelho, e a mutação é o substituto que prova que ele protege.
- SDD é engenharia de requisitos executável: critérios com ID ligados a testes por um vínculo que um script confere e que quebra o build quando some.
- Um defeito custa uma frase na spec e um incidente em produção; gerar código barato não barateia detectar, diagnosticar e reverificar.
- O fluxo mínimo implementa quatro padrões: Elicitação Guiada de Requisitos, Decomposição Verificável, Prova por Falha e Portão de Verificação Independente.
- Em código legado, Caracterização antes da Mudança vem antes de tudo: a linha de base caracterizada é pré-requisito, não sétima evidência.
