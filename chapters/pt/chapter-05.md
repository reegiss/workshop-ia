## Capítulo 4 — Evidência e Spec-Driven Development

O Capítulo 1 definiu desenvolvimento verificável em uma frase: trabalhar de modo que cada etapa deixe uma evidência que você consegue ver. Este capítulo diz exatamente quais evidências procurar e onde cada uma fica. Depois, apresenta o *Spec-Driven Development* e monta o fluxo que a Parte II vai executar, uma skill por etapa.

### Seis evidências

O Capítulo 1 dividiu o trabalho em três momentos: antes, durante e depois do código. Cada momento produz duas evidências. São seis no total, e cada uma é algo que você pode abrir, ler ou rodar.

- **Antes do código**
  - *Requisito esclarecido:* um arquivo de spec, escrito depois que você respondeu às dúvidas do agente. No superpowers, ele fica por padrão em `docs/superpowers/specs/`.
  - *Plano revisável:* um arquivo com as tarefas em ordem, cada uma pequena o bastante para ser conferida. No superpowers, ele fica por padrão em `docs/superpowers/plans/`.
- **Durante**
  - *Teste falhando antes do código:* a saída vermelha do comando de testes. Ela mostra que o teste existe e que o comportamento ainda não existe.
  - *Teste passando depois:* a saída verde do mesmo comando, depois da implementação.
- **Depois**
  - *Diff revisado por você:* a saída de `git diff`, lida antes do commit.
  - *Resultado verificado por você:* o teste rodado por você, no seu terminal, e não pelo agente.

Repare que nenhuma das seis é uma frase do agente. Duas são arquivos que ficam no repositório. Duas são saídas de comando que aparecem no terminal. As duas últimas dependem de você: são o seu olhar sobre o diff e o seu comando de testes.

Repare também no lugar de cada uma. A spec e o plano ficam guardados e podem ser lidos amanhã, por você ou por outra pessoa do time. As saídas vermelha e verde somem quando o terminal rola, a menos que alguém as guarde. O diff e o teste final acontecem na sua máquina, no último minuto antes do commit. Saber onde cada evidência fica é saber onde procurá-la.

Agora volte às três falhas do Capítulo 1 e veja qual evidência teria barrado cada uma.

A busca só por nome teria parado no requisito esclarecido. Para escrever a spec, alguém teria de responder se o termo vale também para o código do banco. A pergunta estaria registrada no arquivo, com a sua resposta ao lado.

O limite errado da faixa teria parado no teste falhando antes do código. Um teste escrito a partir da regra afirma que uma transferência de R$ 1.000,00 no Banco Azul paga R$ 2,00. Com "menor que" no limite, `calculateFee` devolve R$ 5,00, e o teste continua vermelho até a regra ser cumprida. Ele não copia a saída, porque nasceu antes dela. Duas evidências sustentam esse teste. O plano revisável é onde você confere que a tarefa da tarifa começa pelo teste do limite, e não pelo código. O teste passando, no fim do ciclo, mostra que a correção cumpre a regra, e não que o teste foi ajustado ao código.

O "devem passar" teria parado no resultado verificado por você. Uma previsão não sobrevive a um comando de testes que você mesmo rodou.

O diff revisado cobre o que sobra: a mudança que ninguém pediu, o arquivo alterado sem motivo, a função renomeada no caminho. Nenhuma das três falhas do Capítulo 1 depende dele, mas é nele que aparecem as surpresas que nenhum teste procura.

Sem essas seis evidências, o que você tem é código que parece certo. Com elas, você tem código que mostrou estar certo, etapa por etapa.

> **[Dica Prática]** Guarde as evidências junto da branch. Faça commit da spec e do plano na mesma branch do código, para que entrem no pull request. Cole a saída do teste passando na descrição do pull request. Quem revisar vai ver o que foi decidido e o que foi verificado, sem precisar perguntar.

### O que é Spec-Driven Development

A primeira evidência, o requisito esclarecido, é uma spec. Essa palavra dá nome a uma forma de trabalhar.

**SDD**, sigla de *Spec-Driven Development* (desenvolvimento guiado por especificação), é escrever o que o sistema deve fazer antes de escrever o código. A spec vira a referência para planejar, implementar e verificar. O plano sai dela, os testes saem dela, e a revisão confere o código contra ela.

A melhor forma de ver a diferença é comparar dois jeitos de trabalhar.

**Código primeiro**

- O caminho é curto: do pedido direto para o código.
- As lacunas do pedido são preenchidas pelo agente, em silêncio.
- "Pronto" quer dizer que o resultado parece certo.

**Spec primeiro**

- O caminho tem uma parada: do pedido para a spec, e só depois para o código.
- As lacunas viram perguntas, e você decide antes de qualquer linha de código.
- "Pronto" quer dizer que o resultado cumpre a spec.

O Capítulo 1 mostrou o primeiro jeito. O pedido era vago, e o agente decidiu sozinho como buscar e onde cortar a faixa. No segundo jeito, essas decisões aparecem como perguntas, e quem responde é você.

Uma spec não precisa ser longa. Para uma história pequena, uma página basta. O que importa é que ela tenha quatro partes.

O **objetivo** diz por que a história existe. Na história do Banco Azul, seria algo como: ajudar a pessoa a escolher o banco mais barato para a transferência que ela vai fazer.

Os **requisitos** dizem o que o sistema deve fazer. Por exemplo: a busca encontra bancos pelo nome ou pelo código do banco; a tarifa usa a faixa baixa para valores até R$ 1.000,00, inclusive, e a faixa alta acima disso; a lista sai ordenada da menor para a maior tarifa.

Os **critérios de aceite** dizem como saber que o requisito foi cumprido. Cada um é um caso concreto, com entrada e resultado esperado. Por exemplo: uma transferência de R$ 1.000,00 no Banco Azul paga R$ 2,00; uma de R$ 1.000,01 paga R$ 5,00; buscar por "001" encontra o banco com esse código. Um bom critério de aceite vira um teste quase sem tradução.

O **fora do escopo** diz o que a história não vai fazer. Por exemplo: não trata isenções nem promoções de tarifa e não altera a tela de confirmação da transferência. Essa parte parece um detalhe, mas evita que o agente "aproveite" para mexer onde ninguém pediu.

Repare que os critérios de aceite são a ponte entre a spec e o teste. É por isso que, no SDD, o teste escrito antes do código não sai do nada: ele sai de um critério que você já aprovou.

O Capítulo 5 mostra uma spec real dessa história, escrita pelo agente a partir das suas respostas. Como todo arquivo do projeto, ela vai estar em inglês.

### Quatro artefatos, uma revisão de cada vez

O SDD organiza o trabalho em quatro artefatos, nesta ordem:

1. **Spec:** o quê e o porquê. O que a história deve fazer e por que ela existe.
2. **Plano:** o como. Que arquivos mudam, em que ordem e com que abordagem.
3. **Tarefas:** passos pequenos e verificáveis. Cada um cabe numa sessão curta e termina com algo que você pode conferir.
4. **Código:** implementado tarefa por tarefa e verificado contra a spec.

A regra que dá força a essa sequência é simples: cada artefato é revisado antes do próximo começar. Você aprova a spec antes do plano, o plano e as tarefas antes do código, e cada tarefa antes da seguinte.

Pode parecer burocracia. Não é, por causa do custo de corrigir.

Volte à seção "O custo aparece no fim", do Capítulo 1. Um erro descoberto depois do commit custava uma investigação: achar a causa, ajustar o código, corrigir o teste que congelou o erro e conferir se nada mais dependia do comportamento antigo.

O mesmo erro, pego na spec, custa uma frase. Se você lê "valores abaixo de R$ 1.000,00 usam a faixa baixa", troca "abaixo de" por "até, inclusive" e segue em frente. Nenhum código foi escrito, nenhum teste congelou nada.

Pego no plano, o erro custa um parágrafo. Pego numa tarefa, custa uma tarefa. Quanto mais cedo a revisão, menor o conserto.

Há outra vantagem. Revisar quatro artefatos pequenos é mais fácil do que revisar um grande. Ao ler a spec, você só pensa em regras. Ao ler o plano, só em abordagem. Ao ler o diff de uma tarefa, você sabe exatamente o que procurar, porque a spec e o plano já disseram. É o oposto da revisão do Capítulo 1, em que você lia muito código sem saber o que procurar.

### Spec Kit: o mesmo método em outro formato

O superpowers não é o único jeito de praticar SDD com um agente. Outro conhecido é o *Spec Kit*, um kit aberto do GitHub, publicado no repositório `github/spec-kit`.

O Spec Kit conduz o SDD por comandos digitados na CLI. Cada etapa tem o seu comando: definir os princípios do projeto, escrever a spec, fazer o plano, quebrar em tarefas e implementar. Da spec em diante, as etapas são as que você viu na seção anterior.

A novidade conceitual está na primeira etapa. O Spec Kit chama os princípios do projeto de *constituição*: um documento com as regras que toda spec do projeto deve respeitar. Por exemplo, "código, comentários e testes são escritos em inglês" ou "toda regra de negócio tem teste antes do código". A spec de cada história muda; a constituição vale para todas.

A ideia vale mesmo fora do Spec Kit. Se o seu projeto tem regras que se repetem em toda história, escrevê-las uma vez, num arquivo que o agente lê, evita repeti-las em cada pedido. A skill `fee-rules` do Capítulo 3 é uma versão pequena dessa ideia.

Este livro usa o superpowers, cujas skills você conheceu no Capítulo 3. O método é o mesmo: spec antes do código, uma revisão de cada vez, evidência em cada etapa. Se o seu time já usa o Spec Kit, tudo o que você ler sobre evidência continua valendo.

> **[Nota]** Os comandos do Spec Kit mudam entre versões, por isso este livro não os lista. Para usá-lo, consulte o README do repositório `github/spec-kit`, que traz as instruções atuais.

### O fluxo mínimo: quatro skills

Agora as peças se juntam. O Capítulo 3 apresentou quatro skills do superpowers. Este capítulo mostrou seis evidências e as etapas do SDD. O *fluxo mínimo* é a sequência das quatro skills, cada uma cobrindo uma etapa e produzindo uma evidência.

Para cada etapa, veja a etapa do SDD que ela cobre, a skill que a conduz, a falha que ela evita, a evidência que ela deixa e o capítulo em que você vai executá-la.

#### 1. Esclarecer

- **Etapa do SDD:** spec.
- **Skill:** `brainstorming`.
- **Falha que evita:** implementar antes de esclarecer.
- **Evidência:** requisito esclarecido.
- **Onde você executa:** Capítulo 5.

A skill faz o agente perguntar antes de propor. Uma pergunta por vez, até que as lacunas do pedido estejam fechadas. O termo vale para o código do banco? E uma transferência de R$ 1.000,00 cai em qual faixa? Com as respostas, o agente escreve a spec e pede a sua aprovação. Nenhum código é escrito nessa etapa.

#### 2. Planejar

- **Etapa do SDD:** plano e tarefas.
- **Skill:** `writing-plans`.
- **Falha que evita:** o teste escrito depois, porque o plano põe um teste no início de cada tarefa.
- **Evidência:** plano revisável.
- **Onde você executa:** Capítulo 6.

A skill transforma a spec aprovada num plano curto, dividido em tarefas pequenas. Cada tarefa diz que arquivo muda, que teste escrever primeiro e que comando roda para conferir. Você lê o plano antes de qualquer código e pode cortar, reordenar ou pedir ajustes.

#### 3. Testar primeiro

- **Etapa do SDD:** código.
- **Skill:** `test-driven-development`.
- **Falha que evita:** o teste escrito depois, que copia a saída do código.
- **Evidência:** teste vermelho, depois verde.
- **Onde você executa:** Capítulo 7.

A skill conduz o ciclo do TDD. O agente escreve o teste a partir de um critério de aceite, roda e mostra a falha. Só então escreve o código mínimo para o teste passar, e roda de novo. Se o teste não falhou primeiro, ele não prova nada.

#### 4. Verificar

- **Etapa do SDD:** verificação contra a spec.
- **Skill:** `verification-before-completion`.
- **Falha que evita:** o "pronto" sem evidência.
- **Evidência:** diff revisado e teste rodado por você.
- **Onde você executa:** Capítulo 7.

A skill proíbe o agente de dizer "pronto" sem rodar os comandos e mostrar a saída. Ela fecha a parte do agente. A sua parte vem logo depois: ler o diff e rodar os testes você mesmo antes do commit.

Repare na ordem. Cada skill recebe o artefato da anterior: o plano sai da spec, cada teste segue uma tarefa do plano, a verificação confere o código. Pular uma etapa quebra a corrente, e a evidência daquela etapa simplesmente não existe.

> **[Dica Prática]** Nem toda mudança precisa do fluxo completo. Corrigir um erro de digitação numa mensagem ou trocar o nome de uma variável não pede spec nem plano. Use o fluxo onde há dúvida sobre a regra ou risco de erro caro, como numa tarifa. O Capítulo 8 volta a essa decisão.

### Antes de começar a Parte II

A Parte II segue a história do Banco Azul do pedido vago até o teste verde, uma etapa do fluxo mínimo por vez. Para acompanhar, confira se você tem:

- uma das CLIs funcionando, o GitHub Copilot CLI ou o Claude Code;
- as quatro skills do fluxo mínimo instaladas, como no Capítulo 3, aparecendo na lista de skills da CLI;
- Node.js em versão LTS;
- git, com um repositório local onde você possa criar uma branch.

O Capítulo 5 começa pela preparação do projeto exemplo. Depois, você faz o mesmo pedido curto do Capítulo 1, mas desta vez com a skill `brainstorming` no caminho. A diferença aparece logo na primeira resposta do agente: em vez de código, uma pergunta.

### Resumo

- Desenvolvimento verificável produz seis evidências: requisito esclarecido e plano revisável antes; teste falhando e teste passando durante; diff revisado e resultado verificado por você depois.
- Cada evidência tem um lugar: spec e plano em arquivos do repositório, saídas vermelha e verde no terminal, diff e teste final na sua máquina antes do commit.
- SDD é escrever a spec antes do código. A spec tem objetivo, requisitos, critérios de aceite e fora do escopo, e os critérios de aceite viram testes.
- Spec, plano, tarefas e código são revisados um de cada vez. Corrigir a spec custa uma frase; corrigir o código custa uma investigação.
- O fluxo mínimo usa quatro skills: `brainstorming`, `writing-plans`, `test-driven-development` e `verification-before-completion`. A Parte II executa cada uma.
