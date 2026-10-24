## Capítulo 8 — Escala, limites e próximos passos {#cap-8}

*Parte III — Além do primeiro teste*

A [Parte II](#cap-5) rodou o fluxo mínimo numa sessão, uma tarefa por vez, com você lendo cada vermelho. Esse arranjo não escala: depende de um humano observando tudo ao vivo. Quando o volume cresce, delegar e isolar viram decisões de arquitetura, a evidência chega de segunda mão e o pipeline passa a ser o verificador que não depende nem do agente nem da sua atenção. No fim, ficam os limites que nenhuma dessas peças remove.

### Escalar é isolar estado

O [Capítulo 2](#cap-2) mostrou que uma sessão longa é estado acumulado e não auditável. Num plano de dez tarefas, a sétima é executada por um modelo que carrega, já compactados, os logs das seis anteriores, os arquivos que leu para elas e decisões que já não valem. Escalar não é rodar mais rápido; é impedir que o estado de uma unidade de trabalho contamine a seguinte. Os dois padrões de escala atacam dois tipos de estado.

#### Delegação com Contexto Limpo: isolar o estado do modelo

Na Delegação com Contexto Limpo, implementada pela `subagent-driven-development`, o agente principal deixa de implementar e passa a coordenar. Para cada tarefa do plano, ele inicia um subagente com um contexto curado: a spec, o plano e o texto da tarefa. Nada mais. O subagente implementa com a Prova por Falha, devolve um relatório e termina. O coordenador guarda apenas o plano e os relatórios, nunca os logs.

É um escopo léxico aplicado ao modelo. Cada tarefa começa com a instrução relevante numa janela quase vazia, onde a atenção funciona melhor, e nenhuma suposição vaza de uma tarefa para outra pela conversa. O que atravessa as fronteiras atravessa por arquivo versionado: spec, plano e commits. Daí um critério de projeto: se o subagente da tarefa quatro precisa de algo que só existe na conversa da tarefa três, o que está incompleto é o plano.

A skill acrescenta dois revisores por tarefa, nesta ordem:

- **Conformidade com a spec:** o código faz o que a tarefa pede, nem menos, nem mais. Um critério de aceite esquecido reprova aqui, e também uma função ou um parâmetro que ninguém pediu.
- **Qualidade:** só depois, a revisão olha nomes, duplicação, acoplamento e a qualidade dos testes.

A ordem é questão de custo: revisar a qualidade de um código que não cumpre a spec é polir a coisa errada. E os dois revisores também são modelos. A aprovação deles é um filtro barato, não um gate: reduz o que chega até você, sem substituir nenhuma evidência.

Quando a CLI não oferece subagentes, a `executing-plans` roda o plano em lotes na própria sessão, com pontos de revisão entre eles. É o mesmo princípio com um isolamento mais fraco: você troca a janela limpa por paradas obrigatórias.

#### Isolamento de Espaço de Trabalho: isolar o estado do sistema de arquivos

O subagente isola o que o modelo sabe. Ele não isola o que o modelo toca. O Isolamento de Espaço de Trabalho, implementado pela `using-git-worktrees`, cuida da segunda parte: o trabalho acontece num worktree, com diretório, índice e `HEAD` próprios, ligado a uma branch própria e compartilhando só o banco de objetos do repositório.

A analogia é a do isolamento de processos. Cada worktree é um espaço de endereçamento próprio, e a única interface entre ele e a sua cópia de trabalho é uma branch. O limite também é o mesmo: o isolamento cobre arquivos, não o ambiente. Portas de rede, banco de dados local, caches globais e variáveis de ambiente continuam compartilhados. Dois worktrees rodando testes de integração contra o mesmo banco não estão isolados. Estão em condição de corrida.

#### Quando paralelizar

A regra é a de concorrência de sempre: duas tarefas só rodam juntas quando não compartilham estado mutável. No plano, isso vira três perguntas:

- As duas tarefas editam algum arquivo em comum, incluindo lockfile, migrações e código gerado?
- Uma consome uma interface que a outra cria ou altera?
- Disputam algum recurso fora do repositório, como um schema, uma porta ou uma fila?

Qualquer "sim" serializa as duas. A `dispatching-parallel-agents` existe para o caso em que as três respostas são "não". Na dúvida, serialize: sequência custa tempo; conflito custa um merge que nenhum agente entende.

> **[Exemplo]** No plano do ranking, nenhuma tarefa é paralelizável. A Task 1 só pode começar com a caracterização da Task 0 verde, porque é ela que prova que a extração não mudou o legado. A Task 3 consome o `searchBanks` da Task 2 e edita o mesmo arquivo. Um plano curto e coeso costuma ser sequencial, e isso é um bom sinal.

Delegue só um plano revisado, com tarefas que começam por um teste, nomeiam os arquivos e têm critério de pronto. Delegar um plano ambíguo multiplica a ambiguidade.

### A evidência de segunda mão

Na Parte II, o "teste falhando antes do código" era uma saída que você leu. Com subagentes, ele chega dentro de um relatório, e um relatório é saída do agente: pelo princípio de zero-trust, uma alegação até ser conferida por um mecanismo que não dependa de quem a escreveu. Há três formas de fazer isso:

- **Exigir a saída literal.** Um relatório que diz "teste escrito, falhou e depois passou" sem mostrar a linha de asserção e o motivo volta para o subagente. "Expected 3 to be 1" é evidência; "o teste falhou como esperado" não é.
- **Tornar a ordem auditável.** Se o plano pedir um commit com o teste falhando antes do commit da implementação, o histórico da branch registra a Prova por Falha. Um checkout desse commit reproduz o vermelho a qualquer momento.
- **Delegar a sabotagem a uma máquina.** Quebrar o código de propósito, como no [Capítulo 7](#cap-7), é a versão manual do teste de mutação. Em escala, quem quebra o código é o Stryker no pipeline. Se você não viu o teste nascer vermelho, uma ferramenta precisa tentar fazê-lo falhar. Ela prova sensibilidade, não oráculo: a origem de cada esperado ainda se confere no diff, contra a spec.

As duas evidências finais não mudam de dono: a suíte rodada por você sobre a branch do worktree e o diff contra a branch principal lido por você.

### CI/CD: o pipeline como guardião zero-trust

A suíte que você rodou e o diff que você conferiu têm um ponto fraco comum: foram produzidos num ambiente que o agente também tocou. O pipeline é o único verificador que roda num ambiente limpo, com configuração que o agente não altera sem aprovação humana, e que não se cansa na décima história do dia. O [Capítulo 4](#cap-4) associou cada evidência a um gate; aqui está o pipeline inteiro. Ele não substitui as seis evidências, porque o vermelho anterior ao código não existe num pipeline, mas torna as outras inegociáveis.

#### Os gates

**1. Suíte completa, typecheck e lint.** O mínimo. O typecheck roda como gate próprio (`tsc --noEmit`) porque é a primeira defesa contra API inventada: um método que não existe na versão instalada não compila, por mais plausível que pareça no diff.

**2. Integridade dos testes.** Um agente sob pressão para "fazer passar" tem dois atalhos baratos: isolar o teste que interessa com `.only` e desligar o que incomoda com `.skip`. O primeiro o Vitest já barra, porque `allowOnly` é falso quando a variável `CI` está definida, e um `.only` esquecido faz a execução falhar. O segundo exige um gate explícito sobre o diff, que reprova qualquer `.skip` ou `.todo` adicionado na branch. Um teste desligado é um gate que alguém removeu sem pedir revisão.

**3. A caracterização como check obrigatório.** A suíte de caracterização do legado roda num job próprio, marcado como status check obrigatório na proteção da branch. Separada, ela aparece com nome próprio no PR, porque o vermelho ali tem outro significado: não "teste quebrado", e sim "o comportamento de produção mudou". Os arquivos dessa suíte ficam sob CODEOWNERS, para que nenhuma alteração neles entre sem a aprovação de quem responde pelo consumidor.

**4. Rastreabilidade entre spec e teste.** O `scripts/check-spec.mjs` recebe o caminho de uma spec e falha em dois casos: falta uma das quatro seções obrigatórias (Goal, Requirements, Acceptance criteria e Out of scope) ou algum identificador `AC-nn` da spec não aparece em nenhum arquivo `*.test.ts` versionado. O código completo está no [Apêndice D](#apendice-d).

```bash
node scripts/check-spec.mjs \
  docs/superpowers/specs/bank-ranking.md
```

> **[Exemplo]** Na primeira execução real, o script falhou:
>
> ```text
> no test for AC-07
> ```
>
> A suíte de caracterização cobria o AC-07, mas não o citava: o critério estava protegido sem ser rastreável. A correção foi pôr o identificador no `describe` da caracterização. Depois disso, o script imprimiu o caminho da spec seguido de `8 criteria traced`.

O gate confere a presença do identificador, não a semântica do teste: um teste chamado `AC-04` pode ser tautológico e passar. O gate seguinte cobre parte disso, a sensibilidade; a correção do oráculo continua dependendo de alguém conferir que o esperado veio da spec.

**5. Mutação incremental.** O Stryker mede se os testes distinguem o código certo de variações erradas dele. `--incremental` reaproveita os resultados da execução anterior, guardados em cache, e só reavalia os mutantes afetados pela mudança. O gate é o `thresholds.break`: abaixo dele, o processo termina com erro.

```json
{
  "testRunner": "vitest",
  "mutate": ["src/**/*.ts", "!src/**/*.test.ts"],
  "thresholds": {
    "high": 90, "low": 80, "break": 80
  }
}
```

O limiar não é 100, porque mutantes equivalentes existem. No código final do exemplo, o Stryker gerou 52 mutantes e matou 51. O sobrevivente troca `toLowerCase()` por `toUpperCase()` numa normalização aplicada aos dois lados da comparação, um caso real de mutante equivalente. O score de 98,08 passa, mas todo sobrevivente novo exige leitura: ou é equivalente e fica documentado, ou é um teste que falta.

**6. Branch protegida e revisão humana obrigatória.** Merge só por PR, com os checks acima obrigatórios e pelo menos uma aprovação humana. Specs e planos entram no mesmo PR que o código e são revisados como código.

**7. CODEOWNERS sobre o que define o comportamento.** A caracterização, as specs e a própria configuração do pipeline têm donos. Com a opção de exigir a revisão dos code owners ligada na proteção da branch, ninguém aprova uma mudança nesses arquivos no mesmo PR em que ela serve de atalho:

```text
*.characterization.test.ts  @acme/payments
docs/superpowers/specs/     @acme/payments
.github/                    @acme/platform
scripts/check-spec.mjs      @acme/platform
```

A última linha não é detalhe. Um gate que o PR pode editar não é um gate.

#### O agente sem credenciais

O último controle é o que fica fora do alcance do agente. O ambiente dele não tem token de push nem credencial de deploy: ele produz uma branch local e um diff, e o envio é seu. O deploy parte do pipeline, depois do merge, por um ambiente protegido com aprovação própria; nos jobs de PR, o token do pipeline só lê. O agente propõe, os gates verificam, o humano aprova e o pipeline publica. Nenhum elo pode, ao mesmo tempo, escrever o código e publicá-lo.

### Revisão Independente e o fechamento da branch

A Revisão Independente, implementada pela `requesting-code-review`, entrega a um revisor com contexto novo a spec, o plano e o intervalo de commits da branch, mas não a conversa que produziu o código. O modelo que escreveu o código racionaliza as próprias decisões, e um revisor que herda o contexto herda os pontos cegos. A revisão chega antes da sua leitura do diff, que você faz com os apontamentos na mão.

Os apontamentos também são saída de modelo. A `receiving-code-review` existe para tratá-los como hipóteses: cada um é verificado tecnicamente antes de ser aplicado, sem concordância por reflexo e sem rejeição por reflexo.

A `finishing-a-development-branch` fecha o trabalho. Ela começa rodando os testes e, se algum falhar, para sem oferecer nenhuma opção de integração. Com a suíte verde, oferece exatamente quatro caminhos:

1. fazer merge na branch principal, localmente;
2. enviar a branch e abrir um pull request;
3. manter a branch como está, para decidir depois;
4. descartar o trabalho, o que exige digitar `discard`.

A escolha é sua, e a regra do Capítulo 2 continua de pé: o push é uma decisão humana, tomada depois do diff revisado. Com o agente sem credenciais, a opção 2 é executada por você, por construção, e não por disciplina.

### Limites

#### Custo em tokens e tempo

Cada padrão cobra: perguntas, um plano para ler, um contexto montado e duas revisões por tarefa, minutos de mutação no pipeline. Em tokens, o custo cresce com o número de tarefas multiplicado pelo contexto curado, com spec e plano reenviados a cada subagente.

O critério de decisão é o custo de descobrir o erro tarde:

- **Fluxo completo** onde há regra de negócio com casos de borda, contrato consumido por outro módulo, dinheiro, permissão ou concorrência. Ali, como no [Capítulo 1](#cap-1), o erro encontrado depois do merge custa mais que todas as perguntas do começo.
- **Fluxo dispensado** numa correção de uma linha, num texto de interface ou numa mudança cuja verificação é óbvia. Os gates de CI continuam valendo; o que se dispensa é a cerimônia, e não a verificação.

#### Cadeia de suprimentos das skills

Uma skill é instrução executada com as suas permissões, e pode carregar uma leitura de arquivos alheios à tarefa, um script na própria pasta ou uma injeção de prompt num texto inofensivo. Vale a regra do [Capítulo 3](#cap-3), agora com a disciplina de uma dependência com acesso ao terminal:

- leia o `SKILL.md` e os scripts antes de instalar e a cada atualização, como um diff de dependência;
- fixe a versão incorporando ao repositório a pasta revisada (vendoring), com a origem e o commit registrados, para que a skill só mude por PR;
- ponha as skills do projeto sob CODEOWNERS, como as specs.

Ao trocar a instalação seletiva pelo pacote completo, o [Apêndice A](#apendice-a) lista o que entra.

#### Degradação de contexto e API inventada

As duas falhas do Capítulo 2 persistem em qualquer escala. Contra a degradação de contexto, a defesa é tirar o estado da conversa: decisões em arquivo versionado, sessões curtas por etapa que começam lendo spec e plano, subagentes com contexto curado, worktrees separados e critério de saída verificável fora da sessão. Uma regra combinada há duas horas e esquecida pelo modelo é inevitável; uma regra escrita na spec e conferida por um gate não depende da memória de ninguém.

A API inventada nasce do mesmo mecanismo que torna o modelo útil: ele gera o plausível, e o treino mistura versões. As defesas, em ordem de custo:

- **typecheck** como gate, que pega a maior parte;
- **vermelho lido**, porque um `is not a function` é um vermelho pelo motivo errado e não prova nada sobre o comportamento;
- **lockfile e documentação da versão instalada**, em que os tipos publicados no pacote instalado, e não a memória do modelo nem a documentação da versão mais recente, são a fonte da verdade;
- **revisão do diff**, conferindo cada chamada a uma biblioteca pouco familiar.

#### A skill orienta, não garante

Uma skill aumenta a chance de o processo ser seguido, sem torná-la certa. O modelo pode pular uma etapa, ler uma instrução de outro jeito, deixar de acionar a skill ou declarar cumprido um passo que não cumpriu, e mais agentes são mais lugares onde isso acontece. Por isso todo controle deste capítulo está fora do agente: a spec que você aprovou, o plano que você revisou, o vermelho que você leu, os gates que o pipeline executa e o diff que você conferiu. O PR sai com a sua aprovação, e a responsabilidade pelo que está nele continua sendo sua.

### Código legado e integração

**Caracterização como passo zero.** Em código legado sem testes, a primeira tarefa do plano registra o que o código faz hoje, incluindo o que parece errado: é o que Michael Feathers chama de teste de caracterização, em *Working Effectively with Legacy Code*. Esses testes são o inverso da Prova por Falha: nascem verdes. Para provar que protegem algo, quebra-se o legado de propósito e confere-se o vermelho. O resultado é a linha de base caracterizada, um pré-requisito para que o vermelho seguinte signifique mudança de comportamento, e não acidente. Ela não é uma sétima evidência. A partir dela, a extração segue o padrão strangler: a regra sai para uma função nova e testável, e o legado passa a delegar a ela, com a assinatura intacta.

**Testes de contrato para o consumidor.** Quando outro serviço depende do código legado, como o extrato depende do `getFee`, a assinatura e o comportamento são um contrato de interface. A caracterização registra o que o código faz. O contrato registra aquilo de que o consumidor depende, que costuma ser um subconjunto menor e mais estável. Quando a decisão "este comportamento é intencional" é tomada, o teste de caracterização vira teste de contrato e ganha um dono do lado do consumidor. Em contratos orientados ao consumidor, essas expectativas rodam no pipeline do provedor, e uma mudança que quebra o extrato falha antes do merge, não na fatura.

**Dublês de serviço.** Uma dependência externa entra por uma porta, uma interface pequena que o código consome, e os testes usam um dublê. É assim que um comportamento difícil de reproduzir, como o cache do pricing-service renovando entre duas leituras, vira um teste determinístico: o provider falso devolve uma versão nova da tabela a cada chamada, e o teste do snapshot único deixa de depender de sorte. O risco do dublê é divergir do serviço real em silêncio. A defesa é a mesma do parágrafo anterior: um teste de contrato contra o provedor verifica as suposições que o dublê codifica. O teste contra o serviço real fica para um ambiente separado.

### Numa história real

O próximo passo é sair do exemplo. Escolha uma história do seu backlog e rode o fluxo mínimo do começo ao fim, conferindo as seis evidências: requisito esclarecido, plano revisável, teste falhando antes do código, teste passando depois, diff revisado por você e resultado verificado por você.

Dois critérios para a primeira:

- **Lógica com casos de borda:** faixas, limites, arredondamento, ordenação, concorrência. É onde a Elicitação Guiada de Requisitos encontra lacunas e onde um vermelho pega um erro de verdade.
- **Escopo de uma a três tarefas,** numa sessão, com você lendo cada vermelho. Subagentes, worktrees e paralelismo ficam para quando o formato das tarefas já for confiável.

Em paralelo, comece pelo pipeline. Typecheck, integridade dos testes e rastreabilidade da spec custam uma tarde e valem para todo código que entrar depois, de agente ou de gente. A mutação incremental vem em seguida, com um `break` baixo que sobe à medida que os sobreviventes são lidos.

> **[Nota]** Quando uma etapa não couber na sua história, anote por quê antes de pular. Se o mesmo motivo voltar em várias histórias, ele é material para uma skill do projeto, versionada no repositório e sob CODEOWNERS.

### Os padrões sobrevivem às ferramentas

Os comandos deste livro vão mudar; os padrões, não. Elicitação Guiada de Requisitos, Decomposição Verificável, Prova por Falha e Portão de Verificação Independente formam o fluxo mínimo. Na escala, somam-se Delegação com Contexto Limpo, Isolamento de Espaço de Trabalho e Revisão Independente, e em código legado a Caracterização antes da Mudança vem antes de todos. Sem o superpowers, implemente cada padrão com o que houver: uma skill, um template de plano, um gate no pipeline. O que define o padrão é a evidência que ele deixa, não a ferramenta que a produz.

O livro começou com um agente rápido que entregou três falhas escondidas atrás de "os testes devem passar". O método não deixou o agente mais esperto. Ele mudou o que fica para trás a cada etapa: um arquivo revisado, uma saída lida, um gate que não negocia. Skill não torna o agente infalível; torna o trabalho dele verificável.

### Resumo

- Escalar é isolar estado. A Delegação com Contexto Limpo isola o estado do modelo, com spec, plano e tarefa como único contexto, e o Isolamento de Espaço de Trabalho isola o sistema de arquivos, como processos. Paralelize só tarefas sem estado mutável compartilhado.
- A revisão em dois estágios, primeiro a conformidade com a spec e depois a qualidade, é um filtro, e não um gate. Com subagentes, a evidência chega de segunda mão: exija a saída literal, torne a ordem auditável no histórico e deixe a sabotagem para o teste de mutação.
- O pipeline é o guardião zero-trust: suíte, typecheck e lint; integridade contra `.only` e `.skip`; caracterização como check obrigatório; `check-spec.mjs` para rastrear cada critério; Stryker incremental com `thresholds.break`; branch protegida e CODEOWNERS sobre specs, caracterização e o próprio pipeline.
- O agente não tem credenciais de push nem de deploy. A `finishing-a-development-branch` oferece quatro saídas, e o push é sempre seu.
- Os limites continuam: custo em tokens e tempo, cadeia de suprimentos das skills, degradação de contexto e API inventada. A skill orienta, não garante; por isso todo controle fica fora do agente.
- Em código legado, a caracterização é o passo zero, o contrato do consumidor ganha teste próprio e as dependências externas entram por portas com dublês verificados por contrato.
