## Capítulo 7 — Vermelho, depois verde

Com a spec e o plano aprovados, entra o código, e ele só chega depois de um teste que você viu falhar. Este capítulo mostra como conduzir o agente nessa etapa e como conferir as quatro evidências que faltam: teste falhando, teste passando, diff revisado e resultado verificado por você.

### O que esta etapa resolve

Esta etapa ataca as duas falhas do Capítulo 1 que sobraram depois da spec e do plano.

A segunda falha era o teste que copia a saída: escrito depois do código, ele afirma o que o código faz, não o que a regra pede, e passa junto com o erro. O plano já pôs o teste antes do código no papel. Falta garantir que isso aconteça na execução, e que o teste prove alguma coisa. Um teste só prova algo se você o viu falhar, e falhar pelo motivo certo.

A terceira falha era o "pronto" sem evidência: o agente prevê o resultado e o apresenta no tom de quem conferiu. A resposta é simples de dizer e fácil de pular: "pronto" exige evidência nova, produzida depois da última mudança, e lida por você.

### Conduzindo o agente

#### O pedido

Uma tarefa do plano por vez, na mesma sessão em que você aprovou o plano ou numa nova, já que tudo está no arquivo:

```text
/test-driven-development Execute a Task 1 do
plano da busca de bancos.
```

Quando a tarefa fechar, repita o pedido com o número da próxima. Executar uma tarefa por pedido mantém cada ciclo pequeno o bastante para você ler cada vermelho.

Continue aprovando comando a comando. Nesta etapa, o esperado é pouco: criar ou editar os arquivos que o plano lista, rodar `npm test` e fazer um commit por tarefa. Instalar um pacote, mexer em configuração ou tocar arquivo fora do plano foge do combinado: recuse e pergunte por quê.

#### O que esperar da skill

A `test-driven-development` impõe um ciclo curto e não negocia a ordem:

- **Nenhum código de produção antes de um teste falhando.** O agente escreve o teste da tarefa, roda e mostra o vermelho antes de tocar na implementação.
- **Confirmação do motivo.** A skill pede que o agente leia a falha e confirme que ela é a esperada: a função não existe, ou devolve o valor errado. Falha por erro de digitação ou de import não conta como vermelho; é teste quebrado, e o agente deve consertá-lo antes de seguir.
- **Código mínimo.** Só o necessário para aquele teste passar, sem antecipar a próxima tarefa.
- **Verde.** O agente roda de novo e mostra o teste passando, junto com os anteriores.
- **Código escrito antes do teste é descartado.** Se aparecer implementação antes do vermelho, a regra é apagar e recomeçar pelo teste, não "aproveitar" e escrever o teste em volta. É aqui que a skill é mais dura que o TDD de costume, e é exatamente o que impede a segunda falha.

No primeiro ciclo de cada tarefa, o vermelho costuma ser o mais óbvio: a função ainda não existe, e a saída diz `is not a function` (ou `Cannot find module`, se nem o arquivo existe ainda). É o motivo certo, mas prova pouco. O vermelho que interessa é o seguinte, quando a função existe e devolve o valor errado.

#### Onde intervir

A skill conduz o ciclo; você confere os pontos em que ele pode enganar.

**Leia o motivo de cada vermelho.** Não basta ver vermelho. Leia o nome do teste e a mensagem, e pergunte: esta falha é a que a regra prevê? Se a mensagem fala de sintaxe, de um caminho de import errado ou de um nome trocado, o teste não falhou: quebrou. Peça a correção do teste e um novo vermelho antes de aceitar qualquer código.

**Quebre o código de propósito.** O agente pode acertar a implementação de primeira, e aí você nunca vê o teste proteger nada. Depois do verde, introduza você mesmo o erro mais provável (um operador de comparação, um caso de borda), rode `npm test`, confira que o teste certo fica vermelho e desfaça. Leva um minuto e transforma "o teste existe" em "o teste pega este erro".

**Desconfie de vermelho "consertado" no teste.** Quando um vermelho some, olhe o que mudou. Se a mudança foi no arquivo de testes, e não na implementação, pare e pergunte por quê. Um valor esperado diferente do que está na spec é a segunda falha voltando pela porta dos fundos.

**Chame a verificação antes de aceitar "pronto".** Ao fim da última tarefa, antes de aceitar qualquer "terminei":

```text
/verification-before-completion Confirme que a
implementação da busca de bancos está pronta.
```

A regra dela é a resposta direta à terceira falha: nenhuma afirmação de "pronto" ou "passou" sem rodar o comando completo, agora, e ler a saída inteira. Ela também pode entrar sozinha pela descrição, quando o agente estiver prestes a encerrar; chamar pelo nome tira a dúvida.

> **[Exemplo]** O erro do Capítulo 1, agora com o teste do limite escrito antes. Se o agente implementar a tarifa assim:
>
> ```ts
> return amount < FEE_RANGE_LIMIT
> ```
>
> a saída de `npm test` mostra:
>
> ```text
> × charges lowFee up to the limit
> AssertionError: expected 5 to be 2
>       Tests  1 failed | 1 passed (2)
> ```
>
> É o vermelho pelo motivo certo: a função existe e cobra R$ 5,00 onde a regra pede R$ 2,00. A correção é um caractere, `<=`. No Capítulo 1, o mesmo erro passou pelos testes e ficou num commit; aqui, foi barrado antes, por um teste que nasceu da spec.

### A evidência

Ao fim das tarefas, quatro evidências precisam existir, e duas delas dependem de você.

**Teste falhando, depois passando.** As saídas vermelhas e verdes de cada tarefa aparecem no terminal da sessão. Elas são evidência porque você as leu na hora, com o motivo conferido. Copie as que importam para a descrição do pull request, como sugeriu o Capítulo 4; o terminal rola e elas somem.

**O resultado verificado por você.** A verificação da skill cobre a parte do agente. A sua é rodar no seu terminal, fora da sessão:

```bash
npm test
```

e ler a contagem final. Não o resumo do agente: a sua tela.

**O diff revisado.** Revise a branch inteira de uma vez:

```bash
git diff main
```

Confira, nesta ordem:

- só os arquivos esperados: os que o plano lista, mais a spec e o plano;
- nenhum teste enfraquecido, apagado ou marcado para pular;
- nenhum `expect` ajustado ao código: cada valor esperado bate com um critério de aceite da spec;
- nada fora do escopo: nenhuma função, dependência ou refatoração que a spec não pediu.

O plano faz um commit por tarefa na branch local, e o `git diff main` revisa a soma deles. Com commits por tarefa, a revisão que o Capítulo 4 pôs antes do commit acontece antes do `git push`. Enviar a branch é o último passo, e quem decide é você.

### Erros comuns

> **[Aviso de Erro Comum]** Aceitar vermelho por motivo errado. O sintoma é um `SyntaxError`, um import com caminho errado ou um nome de função digitado errado, seguido de "o teste falhou, vou implementar". O vermelho existiu, mas não disse nada sobre a regra. Para evitar, leia a mensagem antes de liberar o próximo comando e exija um vermelho que fale do comportamento.

> **[Aviso de Erro Comum]** Teste que nunca falhou. O agente escreve teste e código no mesmo passo, ou acerta de primeira, e tudo fica verde sem um vermelho no caminho. Esse teste pode passar com qualquer implementação. Para evitar, quebre o código de propósito e veja o teste certo falhar antes de aceitar a tarefa.

> **[Aviso de Erro Comum]** Aceitar "deve passar". O agente encerra com "os testes devem passar" ou "isso resolve", sem uma saída de comando logo acima. Previsão não é evidência. Para evitar, peça a verificação e rode `npm test` você mesmo.

### As seis evidências, reunidas

O fluxo mínimo terminou, e cada evidência do Capítulo 4 tem um lugar:

- **Requisito esclarecido:** a spec, em `docs/superpowers/specs/`, num commit.
- **Plano revisável:** o plano, em `docs/superpowers/plans/`, num commit.
- **Teste falhando antes do código:** os vermelhos de cada tarefa, com o motivo lido por você.
- **Teste passando depois:** os verdes, tarefa por tarefa.
- **Diff revisado por você:** o `git diff main`, conferido com a lista acima.
- **Resultado verificado por você:** o `npm test` rodado no seu terminal.

> **[Exemplo]** O fim da história do Banco Azul, no `npm test` que você rodou:
>
> ```text
>  Test Files  1 passed (1)
>       Tests  8 passed (8)
> ```

Compare com o fim do Capítulo 1. Lá, o agente encerrou com "Os testes devem passar", e havia três falhas escondidas. Aqui, cada uma foi barrada no seu momento: a busca pelo código do banco, na spec; o limite da faixa, num vermelho; e o "devem passar" virou `8 passed` na sua tela.

O método funcionou numa história pequena, numa sessão, com você aprovando cada passo. O Capítulo 8 trata do que muda quando a história cresce: subagentes, custo em tempo e tokens e os limites do que uma skill consegue garantir.

### Resumo

- Um teste só prova algo se você o viu falhar pelo motivo certo; vermelho por import ou digitação é teste quebrado.
- A `test-driven-development` impõe a ordem: teste, vermelho conferido, código mínimo, verde. Código escrito antes do teste é descartado.
- Seus pontos de intervenção: ler cada vermelho, quebrar o código de propósito, desconfiar de vermelho "consertado" no teste e chamar a `verification-before-completion` antes de aceitar "pronto".
- A evidência final é sua: `npm test` no seu terminal e `git diff main` revisado, sem testes enfraquecidos nem `expect` ajustado ao código.
- Nada sai da branch local sem decisão sua.
