## Capítulo 5 — Esclarecer {#cap-5}

*Parte II — Na prática*

A Parte I explicou as peças; a Parte II as usa no terminal, uma etapa do fluxo mínimo por capítulo. Este capítulo ensina a conduzir a primeira etapa: transformar um pedido vago numa spec que registra as suas decisões. No fim, a primeira das seis evidências, o requisito esclarecido, está num arquivo versionado do repositório.

### O que esta etapa resolve

A primeira falha do [Capítulo 1](#cap-1) foi implementar antes de esclarecer. O pedido deixava lacunas, e o agente as preencheu sem avisar. Buscar só pelo nome, tratar o limite como "menor que": cada lacuna virou uma decisão de negócio tomada por quem não tinha autoridade para tomá-la.

O agente não faz isso por descuido. Ele foi treinado para entregar, e um pedido com lacunas ainda é um pedido que dá para atender. Escolher a interpretação mais provável e seguir em frente é o comportamento padrão. Para o modelo, perguntar parece atraso; para você, é a etapa mais barata do fluxo inteiro.

Esclarecer inverte esse padrão. Antes de qualquer código, cada lacuna vira uma pergunta, cada pergunta recebe uma resposta sua e o conjunto das respostas é gravado numa spec. O que antes era suposição do agente passa a ser decisão sua, com registro.

Duas coisas tornam a spec mais valiosa que a conversa que a produziu. A primeira é a persistência: a conversa some quando a sessão termina, e a spec fica no repositório para qualquer sessão nova, qualquer subagente e qualquer revisor. A segunda é a verificabilidade: uma spec com critérios de aceite concretos é o insumo direto dos testes do [Capítulo 7](#cap-7). Sem ela, o teste não tem contra o que ser escrito, e você volta à segunda falha do Capítulo 1.

### Conduzindo o agente

Para acompanhar na prática, crie o projeto do [Apêndice D](#apendice-d) e trabalhe numa branch local. As regras do [Capítulo 2](#cap-2) valem para toda a Parte II: nada de `git push`, aprovação comando a comando e nada sensível no contexto.

#### O pedido

Abra a CLI na raiz do projeto e chame a skill `/brainstorming` seguida do pedido, do jeito que você o faria sem ela. Se o superpowers foi instalado como plugin, o nome pode aparecer com prefixo, como `/superpowers:brainstorming`. Use o que a sua CLI listar; isso vale para todas as skills da Parte II.

Não tente antecipar as respostas no pedido. Um pedido curto deixa as lacunas visíveis, e é trabalho da skill encontrá-las. O que vale incluir são as restrições que não são de negócio, como o idioma da spec.

> **[Exemplo]** O pedido do Capítulo 1, agora com a skill, e duas das perguntas do agente:
>
> ```text
> /brainstorming Crie a busca de bancos para a
> tela de transferência. Filtre pelo termo
> digitado e ordene pela tarifa do valor
> informado. Escreva a spec em inglês.
> ```
>
> **Agente:** O cadastro define `FEE_RANGE_LIMIT = 1000`. Uma transferência de exatamente R$ 1.000,00 fica na faixa baixa ou na alta?
>
> **Você:** Na faixa baixa, inclusive.
>
> **Agente:** Quando dois bancos têm a mesma tarifa, qual vem primeiro?
>
> A) A ordem do cadastro
> B) Ordem alfabética pelo nome
> C) Ordem pelo código do banco
>
> **Você:** B, pelo nome.

#### O que esperar da skill

A skill `brainstorming` impõe uma sequência. Conhecê-la permite saber quando o agente está seguindo o processo e quando está pulando etapas.

- **Explora o projeto.** Antes de perguntar, o agente lê arquivos de configuração, o código existente e a documentação. É isso que permite perguntas específicas, como a do `FEE_RANGE_LIMIT`, em vez de perguntas genéricas. Espere leituras nessa fase, e nenhuma escrita.
- **Faz uma pergunta por vez.** De preferência de múltipla escolha. Uma pergunta isolada recebe uma resposta pensada; cinco juntas recebem cinco respostas apressadas. Se o agente despejar uma lista de dúvidas, peça que ele as faça uma a uma.
- **Propõe duas ou três abordagens, com uma recomendação.** Com as dúvidas fechadas, o agente compara caminhos de implementação, diz o que cada um troca e indica o preferido. Aqui a decisão é técnica e você pode aceitar a recomendação, desde que ela esteja justificada.
- **Apresenta o design em seções.** Uma parte por vez, pedindo aprovação antes da seguinte. Leia cada seção como leria a spec, porque é isso que ela vai virar.
- **Grava a spec e faz commit.** Depois da última aprovação, o agente escreve o arquivo em `docs/superpowers/specs/`, com a data e o tema no nome, pede permissão para o commit e, em seguida, pede que você revise o arquivo. Nenhum código de produção é escrito nesta etapa.

O diálogo nunca se repete igual. O seu agente vai perguntar com outras palavras, em outra ordem, talvez juntando ou separando dúvidas. O que se repete é a sequência acima, e é ela que você confere.

#### Onde intervir

A skill conduz a conversa, mas quem decide é você. A divisão é esta: numa decisão técnica, o agente propõe e você pode aceitar a recomendação, se ela vier justificada; numa decisão de negócio, a resposta vem de quem pediu a história, e você a leva para a conversa. Há quatro pontos em que a sua intervenção muda o resultado.

**Responda com decisões de negócio.** "Tanto faz" e "o que você achar melhor" devolvem a decisão ao agente, e é exatamente isso que esta etapa existe para evitar. Se você não sabe a resposta, essa é a descoberta mais útil da sessão: pare e pergunte a quem sabe antes de seguir. Uma spec com "a confirmar" é melhor que uma spec com um chute.

**Pergunte o que o agente não perguntou.** A skill encontra muitas lacunas, mas não todas. Antes de aprovar o design, repasse mentalmente os casos de borda que você conhece: limites de faixa, valores vazios, empates, acentos, registros duplicados. Se algum ficou de fora, acrescente-o na sua próxima resposta, já com a decisão.

**Recuse comandos fora da etapa.** Nesta etapa, o esperado é leitura de arquivos, criação da spec e um commit que adiciona só a spec. Um `npm install`, a criação de um arquivo em `src/` ou um commit com outros arquivos indicam que o agente saiu do processo. Recuse e diga em uma frase que a etapa ainda é de esclarecimento.

**Peça a spec no idioma do código.** A conversa pode ser em português; a spec é artefato do projeto e vai ser lida ao lado de nomes de funções e descrições de testes. Se o código é em inglês, a spec também deve ser. Um idioma só evita traduzir de cabeça na hora de conferir critério contra teste.

> **[Exemplo]** As decisões tomadas na história: busca pelo nome ou pelo código do banco; nome por "contém", ignorando maiúsculas e acentos; código só por igualdade exata; R$ 1.000,00 na faixa baixa, inclusive; empate de tarifa desfeito pelo nome; três funções puras como abordagem.

### A evidência

A spec gravada é a primeira das seis evidências: o requisito esclarecido. Mas ela só vale como evidência depois que você a confere. O agente pode ter resumido uma resposta, trocado "até" por "abaixo de" ou omitido uma seção. Abra o arquivo e verifique quatro pontos.

- **Cada decisão sua está na spec.** Compare a spec com as respostas que você deu, uma a uma. Uma decisão que ficou só na conversa não existe para o plano nem para os testes.
- **Os critérios de aceite são casos com entrada e resultado.** Cada critério deve poder virar um teste sem nenhuma interpretação adicional: dado este termo, este valor ou este cadastro, o resultado é este. Um critério que descreve uma qualidade em vez de um caso não é verificável.
- **Existe "fora do escopo".** É a seção que impede o agente de "aproveitar" e mexer no que ninguém pediu. Uma spec sem ela deixa os limites da mudança implícitos, e o que é implícito o agente decide.
- **O commit existe.** A spec está versionada na sua branch, sozinha no commit e sem alterações pendentes. Se você pediu ajustes depois do commit, confira que eles também foram commitados.

Se algum ponto falhar, peça o ajuste e confira de novo.

> **[Exemplo]** A seção de critérios de aceite da spec gravada:
>
> ```md
> ## Acceptance criteria
> - "azul" and "AZUL" find Banco Azul;
>   "ambar" finds Banco Âmbar.
> - "001" finds Banco Azul; "1" finds no
>   bank.
> - Banco Azul fee for 1000 is 2; for
>   1000.01 is 5.
> - Order for 500: Âmbar, Azul, Verde.
> ```

Cada linha é um teste pronto para ser escrito.

### Erros comuns

> **[Aviso de Erro Comum]** Aprovar a spec sem ler. Depois de várias perguntas respondidas, a spec parece certa por consequência. O sintoma é seguir para o plano sem ter aberto o arquivo. Para evitar, confira a spec contra as suas respostas, item por item, antes de aprová-la.

> **[Aviso de Erro Comum]** Aceitar critérios vagos. Um requisito como "ties by name" descreve a regra, mas não diz com que dados ela é provada. O critério correspondente precisa ser um caso: "Order for 500: Âmbar, Azul, Verde". Se um critério não tem entrada e resultado, peça ao agente que o reescreva como caso.

> **[Aviso de Erro Comum]** Deixar o agente decidir regra de negócio. Aceitar a recomendação do agente sobre uma regra, como o lado do limite, só porque ela parece razoável. Recomendação técnica você pode aceitar; regra de negócio vem de quem pediu a história. Se você não sabe, a spec registra a dúvida, não o palpite.

> **[Aviso de Erro Comum]** Spec só na conversa. O design foi aprovado, mas o arquivo não foi gravado, ou foi gravado e não commitado. Na próxima sessão, as decisões somem. Só conta como evidência o que está no repositório.

Com a spec aprovada, a skill oferece o próximo passo: `writing-plans`, que transforma a spec num plano. O [Capítulo 6](#cap-6) começa daí.

### Resumo

- Esclarecer evita a primeira falha do Capítulo 1: as lacunas que o agente preencheria em silêncio viram decisões suas, registradas numa spec.
- `/brainstorming` explora o projeto, faz uma pergunta por vez, propõe abordagens com recomendação, apresenta o design em seções e grava a spec com commit.
- Você intervém respondendo com decisões de negócio, acrescentando o que o agente não perguntou, recusando comandos fora da etapa e pedindo a spec no idioma do código.
- A spec só é evidência depois de conferida: suas decisões estão nela, os critérios são casos com entrada e resultado, há fora do escopo e há commit.
- Decisão que ficou só na conversa não existe para o plano nem para os testes.
