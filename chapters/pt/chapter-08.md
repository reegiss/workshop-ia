## Capítulo 7 — Vermelho, depois verde {#cap-7}

Com a spec e o plano aprovados, entra o código, e ele só chega depois de um teste que você viu falhar. Este capítulo trata da etapa em que o agente mais produz e em que a sua desconfiança mais rende: o ciclo vermelho-verde, a teoria que explica quando um teste protege alguma coisa e o portão que separa "o agente disse que terminou" de "está verificado". No fim, as quatro evidências que faltam estão reunidas.

### Prova por Falha

Um teste é uma afirmação condicional: se o comportamento X quebrar, eu fico vermelho. Enquanto você não viu o vermelho, essa afirmação não foi testada. Um teste que sempre passou é indistinguível, na saída da suíte, de `expect(true).toBe(true)`.

A Prova por Falha, que a skill `test-driven-development` implementa, existe por causa de um problema estrutural do trabalho com agentes: **o mesmo autor escreve o teste e o código.** Não há verificação independente entre os dois. Se o agente entendeu a regra errado, o teste e a implementação erram juntos, e o verde só prova que concordam entre si. O único momento em que o teste é confrontado com algo além do código que ele testa é o vermelho, quando ele roda contra a ausência do comportamento.

A skill impõe a ordem sem negociação:

- nenhum código de produção antes de um teste falhando;
- a falha é lida e o motivo é confirmado antes da implementação;
- código mínimo para aquele teste, sem antecipar a próxima tarefa;
- verde da suíte inteira, não só do teste novo;
- código escrito antes do teste é apagado, e não "aproveitado" com um teste escrito em volta.

A última regra é a mais dura e a mais importante. Um teste escrito em volta de código existente é a segunda falha do [Capítulo 1](#cap-1) com outro nome.

Peça uma tarefa do plano por vez e continue aprovando comando a comando. Instalar pacote, mexer em configuração ou tocar arquivo fora do mapa foge do contrato do [Capítulo 6](#cap-6).

### Falhou ou quebrou: o vermelho pelo motivo certo

Nem todo vermelho é prova. Há duas categorias, e confundi-las anula a evidência.

- **O teste falhou:** a asserção rodou e o valor observado diverge do esperado. A mensagem fala do comportamento, como `expected 5 to be 2`.
- **O teste quebrou:** a asserção nem chegou a rodar. `SyntaxError`, import com caminho errado, fixture que lança na preparação, nome digitado errado. A mensagem fala do arquivo de teste, e não da regra.

Um teste quebrado não diz nada sobre o código, nem o verde que vem depois de consertá-lo. Entre os extremos há um vermelho legítimo, mas fraco: `is not a function` no primeiro ciclo. Ele mostra que o teste chama a função, não que a asserção discrimina valores. O vermelho que vale mais é o seguinte, quando a função existe e devolve o valor errado.

Ler um vermelho é conferir quatro coisas:

1. o nome do teste corresponde ao critério que a tarefa implementa;
2. a mensagem fala de valor, e não de estrutura;
3. o esperado na mensagem é o da spec, e não o que o código devolve;
4. a contagem bate: falha exatamente o que deveria falhar, e o resto continua passando.

O quarto item é o mais esquecido: `3 failed` quando você esperava uma falha quer dizer que algo mais quebrou. E o Vitest transpila sem checar tipos; a suíte nunca substitui o typecheck, que é outro gate.

### Teoria do teste de mutação

Ver o teste falhar uma vez prova que ele discrimina um defeito: a ausência do código. A pergunta seguinte é mais exigente: que outros defeitos ele pega? O teste de mutação responde a essa pergunta de forma sistemática, e a teoria por trás dele explica tanto o seu poder quanto os seus limites.

#### Mutantes, operadores e score

Um *mutante* é uma cópia do programa com uma única alteração sintática pequena, gerada por um operador de mutação. A ferramenta gera centenas deles, roda a suíte contra cada um e classifica:

- **morto:** pelo menos um teste falhou; a suíte detectou o defeito;
- **sobrevivente:** todos os testes passaram; a suíte não distingue o mutante do original.

Os operadores reproduzem os deslizes que programadores cometem. Os mais reveladores:

- **troca de operador relacional e de limite:** `>` vira `>=`, `<` vira `<=`;
- **negação de condicional:** `if (c)` vira `if (!c)`, ou a condição vira `true` ou `false`;
- **troca de operador lógico:** `||` vira `&&`;
- **remoção de chamada ou de bloco:** o corpo de uma função ou um `continue` desaparece;
- **troca de método:** `toLowerCase()` vira `toUpperCase()`.

O *mutation score* é a fração de mutantes detectados sobre os mutantes válidos. Ele mede outra coisa que a cobertura. Cobertura diz que uma linha executou; mutação diz que alguma asserção depende do que a linha faz. Uma suíte com 100% de cobertura e asserções fracas pode deixar metade dos mutantes viva.

#### Por que mutações pequenas bastam

Uma objeção natural: defeitos reais não são uma troca de caractere. A resposta vem de DeMillo, Lipton e Sayward (1978), em duas hipóteses.

A *hipótese do programador competente* diz que programas escritos por profissionais competentes estão perto do correto; os defeitos que sobram são desvios pequenos da versão certa. O *efeito de acoplamento* diz que testes capazes de detectar todos os defeitos simples também detectam a maioria dos defeitos complexos, que são composições de simples.

Juntas, elas justificam o método: se a suíte mata os mutantes de primeira ordem, ela provavelmente mata os defeitos reais. E aqui há um argumento específico para agentes. O código que um modelo gera é plausível por construção. Ele raramente erra a estrutura; erra o operador, o lado do limite, a chamada no lugar errado. O `<` do Capítulo 1 é exatamente um mutante de limite. A hipótese do programador competente descreve o agente melhor do que descreve muita gente.

#### Mutantes equivalentes

Alguns mutantes não podem morrer. Um *mutante equivalente* é sintaticamente diferente do original e semanticamente idêntico: nenhuma entrada distingue os dois. Decidir equivalência de programas é indecidível no caso geral, por isso nenhuma ferramenta os descarta sozinha; eles aparecem como sobreviventes e baixam o score.

> **[Exemplo]** Stryker 10.1 sobre o código final do ranking: 52 mutantes, 51 mortos, 1 sobrevivente, score 98,08 (break em 80).
>
> ```text
> [Survived] MethodExpression
> src/ranking/bankRanking.ts:12:10
> -       .toLowerCase();
> +       .toUpperCase();
> ```
>
> `normalize` é aplicada ao termo e ao nome antes da comparação; trocar a caixa dos dois lados não muda o resultado.

Declarar um mutante equivalente é uma análise, e não um atalho. A troca de caixa só é equivalente se as duas direções forem simétricas para as entradas possíveis. Em Unicode geral não são (o "ß" alemão vira "SS" em maiúsculas), mas para o cadastro de bancos e o alfabeto do termo, são. Registre esse raciocínio junto da supressão, e não aceite "é equivalente" do agente sem ele. Um sobrevivente rotulado como equivalente por conveniência é um teste faltando com um álibi.

#### Testes tautológicos: os que sobrevivem e os que enganam

O Capítulo 1 apresentou o teste tautológico. A teoria de mutação permite separá-lo em duas famílias, e a distinção importa porque a ferramenta só pega uma delas.

**Testes sem sensibilidade** deixam mutantes vivos, e a mutação os denuncia:

- **espelho por reuso:** o esperado é calculado chamando a própria implementação, ou um helper que ela também usa. O mutante altera os dois lados da comparação, e o teste continua verde;
- **asserção sobre o mock, e não sobre o efeito:** o teste confere que `current()` foi chamado, mas não o que o serviço fez com a tabela. Qualquer mutação no cálculo sobrevive;
- **asserções fracas:** `toBeDefined()`, só o tamanho da lista, só "não lançou". O valor pode ser qualquer um.

**Testes sem oráculo independente** matam mutantes e, ainda assim, não provam nada sobre a regra:

- **espelho por cópia:** o esperado é calculado com a mesma lógica, copiada para o teste. A cópia carrega o defeito original;
- **snapshot aceito sem leitura:** o snapshot fixa a saída atual, certa ou errada;
- **esperado copiado da saída:** roda-se o código, cola-se o resultado no `expect`.

Esses três são sensíveis a mudanças, então o score sobe. O problema está no *oráculo*, a fonte do valor esperado: ele é o próprio código. O teste do Capítulo 1, que afirmava `5` para R$ 1.000,00, mataria o mutante `<` para `<=` sem dificuldade, e o defeito chegaria à produção com score alto.

A lição é precisa: **mutação mede sensibilidade, não correção do oráculo.** A correção do oráculo vem de fora do código: do critério de aceite da spec ou da caracterização de um consumidor que já está em produção. Repare que as duas últimas técnicas são, literalmente, como se escreve um teste de caracterização. A diferença é a intenção declarada: em código legado, fixar o comportamento atual é o objetivo; em código novo, é tautologia.

### Quebrar de propósito: a mutação manual

Rodar a ferramenta a cada tarefa é caro. A versão manual custa um minuto: depois do verde, aplique você mesmo o mutante mais provável, rode a suíte, confira que o teste certo fica vermelho e desfaça.

A escolha do mutante segue a hipótese do programador competente. Pergunte qual é o erro plausível que este código admite: o lado do limite, uma condição invertida, uma chamada movida para dentro do laço. Não sabote ao acaso; sabote onde o agente erraria.

> **[Exemplo]** Sabotagem do limite em `feeFor`, com `>` trocado por `>=`:
>
> ```text
> × charges lowFee at exactly the limit
> × AC-04 lowFee at the limit
> AssertionError: expected 5 to be 2
>       Tests  2 failed | 8 passed (10)
> ```
>
> Dois vermelhos, um por consumidor da política: o extrato, pela caracterização, e o ranking, pelo AC-04.

A segunda sabotagem plausível é a primeira falha do Capítulo 1: mover `current()` para dentro do laço. O provider falso a pega com `expected 3 to be 1` no AC-06, e a contagem mostra `Tests  1 failed | 9 passed (10)`. Uma linha movida, uma falha, no critério certo.

### O vermelho da caracterização

O exemplo acima mostra algo que só aparece em código legado: um vermelho num teste que não pertence à tarefa em curso. Ele tem semântica oposta à do vermelho do TDD.

No ciclo de TDD, o vermelho é esperado e desejado: ele vem antes do código. Na suíte de caracterização, o vermelho é um alarme: ele diz que o comportamento observado por um consumidor em produção mudou. Por isso a resposta também é oposta. Diante de um vermelho de caracterização, quem recua é a mudança, nunca o teste.

Há um caso em que o vermelho de caracterização revela um defeito real do legado. Mesmo assim, a correção não entra nesta branch. Ela muda o que o consumidor recebe, e isso é uma decisão de negócio, com spec própria, fora do escopo da história atual.

### Desconfie do vermelho "consertado" no teste

Quando um vermelho vira verde, a primeira pergunta é: qual arquivo mudou? Se foi o arquivo de teste, e não a implementação, pare.

O agente otimiza o objetivo declarado, e "fazer os testes passarem" pode ser satisfeito editando testes: o esperado ajustado ao valor que o código devolve; a asserção afrouxada, de `toBe` para `toBeGreaterThan`; o `.skip` num caso difícil; o `.only` que faz o resto da suíte nem rodar; o mock reescrito para devolver o que o código espera; o timeout aumentado até a flutuação sumir.

A regra: depois que você confirmou que um teste falhou pelo motivo certo, a única razão legítima para editá-lo é ele estar quebrado, e quem decide isso é você, olhando a mensagem. Um esperado que diverge da spec é a segunda falha do Capítulo 1 voltando pela porta dos fundos.

### Portão de Verificação Independente

A terceira falha do Capítulo 1 foi o "pronto" sem evidência. O Portão de Verificação Independente, que a skill `verification-before-completion` implementa, define o que um "pronto" exige:

- **frescor:** a evidência foi produzida depois da última mudança. Uma saída verde de três edições atrás não vale;
- **completude:** o comando é o da suíte inteira, e não o de um arquivo filtrado; a saída é lida inteira, e não resumida;
- **independência:** o mecanismo que produz a evidência não depende da narrativa do agente.

Chame a skill antes de aceitar qualquer "terminei":

```text
/verification-before-completion Confirme que a
Task 3 e a suíte completa estão verdes.
```

Mas repare no limite dela. A skill roda dentro do agente. Ela obriga o agente a rodar o comando e citar a saída, o que já elimina o "deve passar", mas continua sendo o agente relatando o próprio trabalho, no mesmo contexto que pode ter perdido detalhes. A independência tem graus: o agente rodando e citando; você rodando no seu terminal; o CI rodando num ambiente limpo, que o Capítulo 8 trata. A skill é o primeiro grau. A evidência do método começa no segundo.

### A evidência final: a suíte e o diff

**A suíte, rodada por você.** Fora da sessão, no seu terminal, rode `npm test` e leia a contagem: `Tests  10 passed (10)`, em 2 arquivos de teste. Confira o número contra o plano. Dez testes previstos, dez rodados. Uma contagem menor sem explicação é um teste apagado ou pulado.

**O diff, revisado com checklist.** Comece pelo tamanho e depois vá aos pontos sensíveis:

```bash
git diff --stat main...HEAD
git diff main...HEAD -- src/legacy/fees.ts
git log --oneline -- \
  src/legacy/fees.characterization.test.ts
git diff main...HEAD -- package.json \
  package-lock.json
```

O checklist de um revisor sênior:

- **Contrato público intacto.** No legado, a assinatura de `getFee` não mudou e só o corpo delega. Nenhum export removido ou renomeado.
- **Nenhum teste enfraquecido.** Nenhuma asserção afrouxada, nenhum `.skip` ou `.only` novo, nenhum teste apagado. O arquivo de caracterização tem um commit só, o da Task 0.
- **Nenhum esperado ajustado.** Cada valor literal num `expect` corresponde a um critério da spec ou ao comportamento caracterizado.
- **Nada fora do escopo.** Os arquivos do `--stat` estão contidos no mapa do plano, mais a spec e o plano.
- **Nenhuma dependência nova.** O diff de `package.json` e do lockfile está vazio. Dependência é superfície de ataque e decisão de arquitetura; não entra como efeito colateral de uma tarefa.

Enviar a branch é o último passo, e quem decide é você. O agente não tem credenciais de push nem de deploy.

### Erros comuns

> **[Aviso de Erro Comum]** Confiar no score. Um score alto com esperados copiados da saída mede sensibilidade, não correção. Confira a origem de cada valor esperado.

> **[Aviso de Erro Comum]** Aceitar a verificação da skill como a sua. A skill é o agente conferindo o próprio trabalho. A evidência é a suíte na sua tela e o diff lido por você.

### As seis evidências, reunidas

O fluxo mínimo terminou, e cada evidência do [Capítulo 4](#cap-4) tem lugar e mecanismo:

- **Requisito esclarecido:** a spec em `docs/superpowers/specs/`, com os oito critérios identificados e o AC-08 num commit próprio.
- **Plano revisável:** o plano em `docs/superpowers/plans/`, auditado contra os IDs, num commit.
- **Teste falhando antes do código:** os vermelhos de cada tarefa, com o motivo lido, mais as sabotagens que mostraram cada teste pegando o defeito plausível.
- **Teste passando depois:** os verdes, tarefa por tarefa, com a suíte de caracterização verde e intocada do começo ao fim.
- **Diff revisado por você:** o diff da branch, conferido com o checklist acima.
- **Resultado verificado por você:** `Tests  10 passed (10)` no seu terminal.

Sob as seis está a linha de base caracterizada, que não é uma sétima evidência, mas é o que permitiu mexer no legado sabendo que o extrato continua cobrando o mesmo.

Compare com o fim do Capítulo 1. Lá, o agente encerrou com "Os testes devem passar", e havia três falhas escondidas. Aqui, cada uma foi barrada no seu momento: a busca pelo código e o snapshot, na spec; a tarifa divergente, num vermelho da caracterização e do AC-04; e o "devem passar" virou uma contagem na sua tela. O [Capítulo 8](#cap-8) trata do que muda quando a história cresce e de como transformar cada uma dessas conferências num gate de pipeline que ninguém pula.

### Resumo

- Prova por Falha: um teste só prova algo se você o viu falhar pelo motivo certo; falhar (valor divergente) é diferente de quebrar (o teste nem rodou).
- Mutação mede se a suíte distingue defeitos pequenos e plausíveis; a hipótese do programador competente e o efeito de acoplamento justificam o método, e ele descreve bem os erros de um agente.
- Mutantes equivalentes exigem análise registrada; e um score alto não prova o oráculo: esperados copiados da saída matam mutantes e certificam o defeito.
- Quebrar o código de propósito é a mutação manual; no legado, o vermelho da caracterização é alarme, e quem recua é a mudança.
- O Portão de Verificação Independente exige evidência fresca, completa e independente; a skill é só o primeiro grau.
- A evidência final é sua: a suíte rodada no seu terminal e o diff revisado com o checklist sênior.
