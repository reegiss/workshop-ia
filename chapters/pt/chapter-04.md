## Capítulo 3 — Skills: um processo em arquivo {#cap-3}

O [Capítulo 2](#cap-2) terminou com uma distinção: o prompt degrada com a sessão, e a skill é o único dos três mecanismos que transforma processo em artefato durável e auditável. Este capítulo trata a skill como engenharia, e não como recurso de ferramenta. Ele mostra como ela é versionada e revisada, como gasta o orçamento de contexto, por que o acionamento não é confiável e que padrões de engenharia o livro usa a partir daqui. No fim estão os comandos de instalação e o que muda quando a skill vem de terceiros.

### Skill é processo versionado

Uma skill é uma pasta com um `SKILL.md`. O arquivo tem um *frontmatter* com dois campos obrigatórios: `name`, em minúsculas e hifens, igual ao nome da pasta, e `description`. Abaixo vem o corpo, com as instruções em Markdown. A pasta pode trazer arquivos de apoio, como referências longas, modelos de documento e scripts. O formato segue um padrão aberto, o Agent Skills, e a mesma pasta funciona no Claude Code e no GitHub Copilot CLI.

O formato é trivial; o que importa é a consequência. Um processo de engenharia costuma morar em três lugares ruins: na cabeça das pessoas, numa página de wiki que ninguém atualiza ou num prompt que cada um cola do seu jeito. Nenhum deles tem versão, autoria, diff ou revisão. A skill tem tudo isso de graça, porque é um arquivo no repositório:

- **Mudança por PR.** Alterar o processo é abrir um pull request, com descrição do motivo, revisão e aprovação, como qualquer mudança de código.
- **Dono explícito.** Uma regra de CODEOWNERS sobre o diretório de skills define quem aprova mudanças no processo do time.
- **Histórico como justificativa.** O `git log` da skill explica por que um passo existe, o que evita a erosão comum de processo ("ninguém lembra por que fazemos isso, vamos pular").
- **Reprodutibilidade.** Duas pessoas do time, em duas CLIs diferentes, carregam o mesmo texto na mesma versão.

Uma skill de projeto deve ser específica. Ela codifica o que só vale ali: o módulo que não pode ser tocado sem rede de proteção, o contrato que não pode quebrar e a regra que não pode ser duplicada.

> **[Exemplo]** No `transfer-service`, uma skill de projeto em `.claude/skills/fee-rules/SKILL.md` guarda o que vale para o legado de tarifas:
>
> ```md
> ---
> name: fee-rules
> description: Use when changing src/legacy/,
>   fee calculation or fee tests.
> ---
> 1. Before editing src/legacy/, add
>    characterization tests; they must pass.
> 2. Keep the getFee signature unchanged.
> 3. Reuse the legacy fee rule; never copy it.
> ```

Repare no que o exemplo não faz. Ele não ensina TDD nem explica o que é teste de caracterização; isso é papel de skills gerais. Ele só amarra o processo geral aos pontos de risco deste repositório.

### Divulgação progressiva: orçamento de contexto

O Capítulo 2 mostrou que cada token no contexto compete por atenção e que a janela se deteriora antes de encher. Skills instaladas disputam o mesmo orçamento. O formato lida com isso por *divulgação progressiva* (*progressive disclosure*), em três níveis de custo:

1. **Metadados, sempre carregados.** O `name` e a `description` de cada skill disponível entram no contexto de toda sessão. O custo é baixo por skill, mas é fixo e se multiplica pelo número de skills instaladas.
2. **Corpo, ao acionar.** O corpo do `SKILL.md` entra no contexto só quando a skill é acionada, e a partir daí ocupa espaço como qualquer outro texto da sessão.
3. **Arquivos de apoio, sob demanda.** Referências e modelos só entram se o corpo mandar e o agente de fato ler. Scripts podem ser executados sem serem lidos, e aí só a saída entra no contexto.

Isso gera critérios de projeto para quem escreve skills:

- **A descrição é a interface.** Ela é o único texto que o modelo vê antes de decidir. Deve dizer quando usar, com gatilhos concretos (caminhos, tipos de tarefa, sintomas), e não o que a skill é.
- **O corpo é curto e imperativo.** Passos e regras verificáveis. Material de referência longo vai para arquivos de apoio, que o corpo aponta.
- **Trabalho determinístico vai para script.** Uma checagem que pode ser um comando é mais confiável executada do que descrita, e custa menos contexto.
- **Menos skills é melhor.** Cada skill instalada é custo fixo em toda sessão e mais uma descrição competindo pela escolha. Skills com descrições sobrepostas pioram as duas coisas.

### Acionamento não é determinístico

A skill entra em ação de duas formas: pela descrição, quando o modelo decide que ela se aplica ao pedido, ou pelo nome, quando você a invoca explicitamente com barra, como `/fee-rules`.

O acionamento pela descrição é uma inferência do modelo, sujeita a tudo o que o Capítulo 2 descreveu. Ele pode falhar de várias formas:

- o pedido não se parece com a descrição o bastante, e a skill não é acionada;
- duas descrições se sobrepõem, e a escolhida é a errada;
- a skill é acionada no começo da sessão, e o corpo é compactado ou perde peso horas depois, embora o agente continue agindo como se a seguisse;
- o modelo carrega a skill e pula um passo que julgou desnecessário para aquele caso.

Sob a ótica de zero-trust, isso define a regra de uso. **Quando o processo importa, chame a skill pelo nome.** O acionamento automático serve para conveniência, nas situações em que esquecer a skill custa pouco. Ele não serve como controle. E, mesmo chamada pelo nome, a skill só aumenta a probabilidade de o processo ser seguido. A confirmação vem do artefato que o processo deveria produzir: a spec gravada, o plano no repositório, o vermelho na saída do teste. Se o artefato não existe, o processo não aconteceu, diga o agente o que disser.

> **[Dica Prática]** Em mudanças de risco, invoque a skill pelo nome numa sessão nova e confira na transcrição que ela foi carregada antes do primeiro pedido de edição. Numa sessão longa, invoque de novo ao começar uma etapa, em vez de confiar que o corpo carregado lá atrás ainda pesa.

### Onde as skills moram

Cada CLI procura skills em dois escopos, e a escolha entre eles é uma decisão de governança, não de conveniência.

O **escopo de projeto** fica no repositório. A skill é versionada, revisada em PR e igual para todo o time. É o lugar de qualquer processo que o time considera obrigatório.

O **escopo pessoal** fica no seu diretório de usuário. A skill vale para todos os seus projetos, mas é invisível para quem revisa o seu trabalho. Serve para preferências e para processos gerais que você quer em qualquer repositório. Se o time depende de uma regra, ela não pode morar só no escopo pessoal de alguém.

*Claude Code*

- projeto: `.claude/skills/`;
- pessoal: `~/.claude/skills/`.

*Copilot CLI*

- projeto: `.github/skills/`, `.claude/skills/` ou `.agents/skills/`;
- pessoal: `~/.copilot/skills/` ou `~/.agents/skills/`.

Como `.claude/skills/` aparece nas duas listas, um time que usa as duas CLIs pode manter as skills do projeto ali. Evite o mesmo nome de skill em escopos diferentes: a regra de precedência varia entre CLIs e versões, e um processo ambíguo é um processo não auditável.

### Padrões de engenharia com IA

As falhas do Capítulo 1 não são específicas de uma ferramenta, e as respostas a elas também não. O livro organiza essas respostas como padrões de engenharia: cada um nomeia um problema recorrente do trabalho com agentes, um mecanismo que o resolve e a evidência que ele deixa. A skill é só o veículo. O padrão continua valendo se você trocar de CLI, de pacote de skills ou escrever a sua própria implementação.

O *superpowers*, pacote aberto de skills de engenharia criado por Jesse Vincent e publicado em `obra/superpowers`, é usado neste livro como implementação de referência de cada padrão. O pacote evolui; o livro não fixa quantas skills ele tem.

**Elicitação Guiada de Requisitos** (*Guided Requirements Elicitation*). Problema: o agente preenche lacunas do pedido em silêncio, com a interpretação mais provável. Mecanismo: antes de qualquer código, o agente explora o repositório, faz perguntas uma de cada vez, propõe abordagens com trade-offs e só grava a spec depois da sua aprovação. Evidência: requisito esclarecido. Referência: `brainstorming`.

**Decomposição Verificável** (*Verifiable Decomposition*). Problema: tarefas grandes demais para revisar e sem critério de pronto. Mecanismo: a spec vira um plano de tarefas pequenas, cada uma com arquivos explícitos, um teste que começa falhando e o comando que prova o resultado. Evidência: plano revisável. Referência: `writing-plans`.

**Prova por Falha** (*Fail-First Proof*). Problema: o teste escrito depois espelha a implementação e passa por construção. Mecanismo: o teste vem antes do código e precisa falhar pelo motivo certo; só então vem o código mínimo para passar. Evidências: teste falhando antes do código e teste passando depois. Referência: `test-driven-development`.

**Portão de Verificação Independente** (*Independent Verification Gate*). Problema: o loop termina quando o modelo decide, e "pronto" é texto. Mecanismo: nenhuma afirmação de conclusão sem o comando que a prova executado agora, com a saída lida. Evidência: resultado verificado. Referência: `verification-before-completion`.

**Delegação com Contexto Limpo** (*Clean-Context Delegation*). Problema: o contexto acumulado de uma sessão longa degrada a execução de cada tarefa nova. Mecanismo: um coordenador entrega cada tarefa a um subagente com contexto curado, recebe só o resultado e revisa antes da próxima. Referência: `subagent-driven-development`.

**Isolamento de Espaço de Trabalho** (*Workspace Isolation*). Problema: o agente altera a mesma árvore de arquivos em que você e outros agentes trabalham. Mecanismo: cada linha de trabalho ganha um worktree e uma branch próprios, e o resultado é uma branch para revisar. Referência: `using-git-worktrees`.

**Revisão Independente** (*Independent Review*). Problema: quem escreveu o código é o pior revisor dele, e isso vale também para o agente na mesma sessão. Mecanismo: a revisão é feita por um contexto que não participou da implementação, contra a spec e o plano, antes da sua leitura do diff. Referência: `requesting-code-review`.

**Caracterização antes da Mudança** (*Characterize Before Change*). Problema: em código legado sem testes, não existe especificação confiável do comportamento atual, e qualquer mudança pode quebrar um contrato sem que ninguém perceba. Mecanismo: antes de tocar o código, testes registram o que ele faz hoje. Eles nascem verdes, ao contrário do TDD, e só provam algo quando se quebra o legado de propósito e se vê o vermelho. Não há skill própria no superpowers; é o passo zero, e uma skill de projeto como a `fee-rules` é o lugar natural para exigi-lo. O resultado é a linha de base caracterizada, pré-requisito das seis evidências e não uma sétima.

O fluxo mínimo do livro usa os quatro primeiros: esclarecer, planejar, vermelho/verde, verificar. O [Capítulo 4](#cap-4) liga cada um à sua evidência e apresenta a variação para código legado. A [Parte II](#cap-5) executa o fluxo no exemplo. O [Capítulo 8](#cap-8) trata de delegação, isolamento e revisão quando o trabalho escala. O [Apêndice A](#apendice-a) mapeia o pacote completo.

### Instalando o superpowers

Há duas formas. Como *plugin*, o pacote inteiro é instalado e atualizado de uma vez. Um plugin pode trazer, além de skills, comandos e hooks que a CLI executa sem passar pelo modelo, então tudo o que a próxima seção diz vale em dobro para ele. Pela CLI `skills`, você instala só as skills escolhidas.

*Claude Code* (dentro da sessão):

```text
/plugin install superpowers@claude-plugins-official
```

*Copilot CLI*:

```bash
copilot plugin marketplace add \
  obra/superpowers-marketplace
copilot plugin install \
  superpowers@superpowers-marketplace
```

Só o fluxo mínimo, via `npx` (exige Node.js 22 ou superior). Aqui ele vai para o escopo pessoal do Claude Code; troque `claude-code` por `github-copilot` para o Copilot CLI, e omita `-g` para instalar no escopo do projeto:

```bash
npx skills add obra/superpowers -g \
  -a claude-code \
  -s brainstorming writing-plans \
  test-driven-development \
  verification-before-completion
```

Skills vindas de plugin podem aparecer com prefixo, como `superpowers:brainstorming`; é a mesma skill. O [Apêndice C](#apendice-c) reúne as equivalências entre as CLIs, inclusive como listar e invocar skills.

> **[Nota]** Os comandos foram conferidos na data de publicação. Se mudarem, o README de `obra/superpowers` traz as instruções atuais para cada CLI.

### Skills de terceiros: risco de cadeia de suprimentos

Uma skill de terceiros é uma dependência, e das mais privilegiadas que você pode adicionar. Uma biblioteca roda dentro do seu programa. Uma skill dirige um agente que, como mostrou o Capítulo 2, tem shell com os seus privilégios. Trate-a como problema de *cadeia de suprimentos* (*supply chain*).

Os vetores são os conhecidos de qualquer ecossistema de pacotes, com um agravante:

- **Instrução maliciosa no corpo.** Um passo que manda ler arquivos fora do escopo, rodar um script da própria pasta ou enviar dados para fora. Chega ao aprovador com a mesma cara de um passo legítimo.
- **Scripts e hooks.** Código executável dentro da pasta, ou do plugin, que roda com os seus privilégios, às vezes sem passar pela aprovação de comandos.
- **Injeção via arquivos de apoio.** Referências lidas sob demanda entram no contexto como qualquer saída de ferramenta.
- **Atualização comprometida.** A versão que você revisou era segura; a seguinte vem de uma conta comprometida ou de um mantenedor novo. É o mesmo padrão de ataques a pacotes npm, só que o payload é texto em linguagem natural, que nenhum scanner de dependências analisa.

O agravante é que o payload não precisa parecer código. Uma frase bem colocada no meio de cem linhas razoáveis é suficiente.

Os controles também são os de cadeia de suprimentos:

- **Revisão integral antes de instalar.** Leia o `SKILL.md` inteiro, os arquivos de apoio, os scripts e, num plugin, a configuração de hooks e de servidores MCP. Mesmo critério de um PR de alguém de fora do time.
- **Pinagem de versão.** Não deixe uma skill de terceiros flutuar para a versão mais recente. A forma mais simples e independente de CLI é incorporar ao repositório (*vendoring*) a pasta revisada, no escopo de projeto, registrando a origem e o commit de onde ela veio. A partir daí, a skill só muda por PR.
- **Reavaliação a cada atualização.** Atualizar é revisar o diff entre a versão pinada e a nova, não reinstalar. Diff que você não leu é código que você não aprovou.
- **Menor privilégio continua valendo.** Nenhuma skill justifica liberar padrões amplos de comando, expor credenciais ou dar ao agente acesso de push ou deploy.

> **[Aviso de Erro Comum]** Instalar como plugin com atualização automática e revisar só a primeira versão. O sintoma, quando aparece, é o agente executando passos que ninguém do time escreveu. Para evitar, pine a versão revisada no repositório e trate cada atualização como um PR de dependência, com diff lido e aprovação explícita.

Por fim, o limite que vale até para a skill mais confiável: ela orienta o agente, mas não o obriga. O controle está nos artefatos que o processo produz e nas verificações que não dependem do agente. O Capítulo 8 volta a esse limite.

### Resumo

- Skill é processo em arquivo: versionada, com dono, revisada em PR e reproduzível entre pessoas e CLIs. Skills de projeto amarram o processo geral aos pontos de risco do repositório.
- A divulgação progressiva gere o orçamento de contexto em três níveis (metadados, corpo, arquivos de apoio). Descrição precisa, corpo curto, trabalho determinístico em script e poucas skills.
- O acionamento pela descrição é não determinístico. Quando o processo importa, chame a skill pelo nome e confirme pelo artefato produzido, não pela palavra do agente.
- Os padrões de engenharia com IA são o conceito, e as skills do superpowers são implementações de referência. O fluxo mínimo usa Elicitação Guiada de Requisitos, Decomposição Verificável, Prova por Falha e Portão de Verificação Independente; em código legado, Caracterização antes da Mudança vem antes de tudo.
- Skills e plugins de terceiros são risco de cadeia de suprimentos: revise tudo antes de instalar, pine a versão no repositório e reavalie o diff a cada atualização.
