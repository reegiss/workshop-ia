## Apêndice A — Mapa das skills {#apendice-a}

Cada skill do superpowers é tratada neste livro como implementação de referência de um padrão. O mapa abaixo liga cada uma ao seu padrão canônico, quando há um, e diz quando ela entra. O pacote muda com o tempo: skills entram, saem e mudam de nome. Confira a lista na sua CLI antes de chamar qualquer uma.

### Fluxo mínimo

- `brainstorming` — **Elicitação Guiada de Requisitos.** Antes de qualquer trabalho novo: explora o repositório, pergunta uma coisa de cada vez, propõe abordagens com trade-offs e grava a spec aprovada. Evidência: requisito esclarecido.
- `writing-plans` — **Decomposição Verificável.** Com a spec aprovada e nenhum código: tarefas pequenas, com arquivos explícitos, teste inicial e comando de verificação. Evidência: plano revisável.
- `test-driven-development` — **Prova por Falha.** Antes de qualquer código de produção: o teste vem primeiro e falha pelo motivo certo. Evidências: teste falhando antes do código e teste passando depois.
- `verification-before-completion` — **Portão de Verificação Independente.** Antes de qualquer afirmação de "pronto", "corrigido" ou "passando": o comando roda agora e a saída é lida. Evidência: resultado verificado.

### Escala

- `subagent-driven-development` — **Delegação com Contexto Limpo.** Um subagente por tarefa, com spec, plano e tarefa como único contexto, e revisão em dois estágios: conformidade com a spec, depois qualidade.
- `using-git-worktrees` — **Isolamento de Espaço de Trabalho.** Um worktree e uma branch por linha de trabalho; isola arquivos, não o ambiente.
- `executing-plans` — sem padrão próprio; variação da Delegação com Contexto Limpo para CLIs sem subagentes. Executa o plano em lotes, na mesma sessão, com pontos de revisão.
- `dispatching-parallel-agents` — sem padrão próprio; aplica a Delegação com Contexto Limpo a tarefas sem estado mutável compartilhado, em paralelo.

### Revisão e entrega

- `requesting-code-review` — **Revisão Independente.** Um revisor sem a conversa da implementação compara a branch com a spec e o plano, antes da sua leitura do diff.
- `receiving-code-review` — complemento da Revisão Independente: cada apontamento é verificado tecnicamente antes de ser aplicado.
- `finishing-a-development-branch` — fechamento: roda a suíte e, só com ela verde, oferece as quatro saídas (merge local, PR, manter, descartar). O push é decisão sua.

### Depuração

- `systematic-debugging` — sem padrão canônico no livro. Diante de um bug ou de um teste falhando, investiga a causa antes de propor correção, o que aplica ao diagnóstico a mesma recusa ao plausível que o Portão de Verificação Independente aplica ao "pronto".

### Skills sobre as skills

- `using-superpowers` — carregada no início da sessão; faz o agente procurar a skill aplicável antes de responder.
- `writing-skills` — para criar, editar e testar skills de projeto, como a `fee-rules` do [Capítulo 3](#cap-3).
- `diagnosing-superpowers` — para investigar uma sessão que deu errado, como uma skill não acionada ou um trabalho repetido.

### Sem skill própria

- **Caracterização antes da Mudança.** O passo zero em código legado não tem skill no superpowers. Exija-o numa skill de projeto ou no template do plano, e torne a suíte resultante um check obrigatório no pipeline, como no [Capítulo 8](#cap-8).

Qualquer skill fora do superpowers segue a regra de cadeia de suprimentos do Capítulo 3: revisão integral antes de instalar, versão fixada no repositório e diff relido a cada atualização.

## Apêndice B — Glossário {#apendice-b}

**Agente** — Programa que usa um modelo de linguagem para decidir e executar ações, como ler arquivos e rodar comandos. Neste livro, um agente é sempre a soma de um modelo com um harness.

**Alucinação de API** — Chamada a uma função, opção ou parâmetro plausível que não existe na versão instalada, ou que existiu em outra. É estrutural: o modelo gera o provável, o treino mistura versões e APIs internas não estão no treino. Defesas: typecheck, vermelho lido, lockfile e tipos da versão instalada, revisão do diff.

**Cadeia de suprimentos (supply chain)** — Conjunto de código e instruções de terceiros que entra no seu ambiente. Skills, plugins e servidores MCP são dependências privilegiadas: dirigem um agente com shell e os seus privilégios. Pede revisão integral, versão fixada e reavaliação a cada atualização.

**Caracterização (teste de)** — Teste que registra o que um código faz hoje, incluindo o que parece errado, sem julgar se está certo (Michael Feathers, *Working Effectively with Legacy Code*). Nasce verde, ao contrário do TDD, e só prova que protege algo quando se quebra o código de propósito e se vê o vermelho. O conjunto forma a *linha de base caracterizada*: uma suíte que congela o contrato atual, deve continuar verde sem alteração durante toda a mudança e é pré-requisito das seis evidências, e não uma sétima.

**Caracterização antes da Mudança** (*Characterize Before Change*) — Padrão do passo zero em código legado: antes de qualquer mudança, testes de caracterização fixam o comportamento atual, para que o vermelho seguinte signifique mudança de comportamento, e não acidente. Não tem skill própria no superpowers.

**Compactação** — Liberação de espaço na janela de contexto feita pelo harness quando ela enche: truncar saídas antigas, descartar turnos ou resumir o histórico com o próprio modelo. O resumo não avisa o que perdeu, e decisões de borda costumam ser as primeiras a sumir.

**Constituição** — No Spec Kit, documento com os princípios do projeto que toda spec deve respeitar. A spec muda a cada história; a constituição vale para todas.

**Contexto** — Tudo o que o modelo enxerga numa chamada: prompt de sistema, definições de ferramentas, instruções, metadados das skills e o histórico de pedidos, leituras e saídas. É finito, medido em tokens, e degrada antes de encher.

**Contrato de interface** — Assinatura e comportamento observável de que um consumidor depende, como o `getFee` legado para o serviço de extrato. A caracterização registra tudo o que o código faz; o contrato, só o que o consumidor usa. Testes de contrato orientados ao consumidor rodam essas expectativas no pipeline do provedor.

**Costura** (*seam*) — No vocabulário de Feathers, ponto onde o comportamento pode ser trocado sem editar o código sob teste. Em código orientado a objetos, a costura mais limpa é uma porta recebida por injeção de dependência. Critério que depende de rede, relógio ou estado global sem costura não é testável de forma determinística.

**Critério de aceite** — Caso concreto, com entrada e resultado esperado, que mostra que um requisito da spec foi cumprido. Com um identificador (`AC-nn`), torna-se rastreável até o teste que o cobre.

**Decomposição Verificável** (*Verifiable Decomposition*) — Padrão em que a spec vira um plano de tarefas pequenas, cada uma com arquivos explícitos, um teste que começa falhando e o comando que prova o resultado. Evidência: plano revisável. Referência: `writing-plans`.

**Degradação de contexto** — Perda de fidelidade de uma sessão longa: compactação que descarta detalhes, recuperação pior do meio do contexto (*lost in the middle*), saídas ruidosas que competem com as instruções e instruções antigas que perdem peso. Torna a sessão longa um estado acumulado e não auditável.

**Delegação com Contexto Limpo** (*Clean-Context Delegation*) — Padrão em que um coordenador entrega cada tarefa a um subagente com contexto curado (spec, plano e tarefa), recebe só o resultado e revisa antes da próxima. Isola o estado do modelo. Referência: `subagent-driven-development`.

**Desenvolvimento verificável** — Forma de trabalhar em que cada etapa deixa uma evidência que você consegue ver e que não depende da palavra do agente: antes, durante e depois do código. É o método deste livro.

**Divulgação progressiva** (*progressive disclosure*) — Forma como as skills gastam o orçamento de contexto, em três níveis: metadados sempre carregados, corpo ao acionar e arquivos de apoio sob demanda. Por isso a descrição é a interface da skill.

**Dublê de serviço** — Implementação falsa de uma dependência externa, plugada por uma porta, que torna determinístico um comportamento difícil de reproduzir com o serviço real. Diverge do serviço em silêncio se não for verificado por um teste de contrato.

**Elicitação Guiada de Requisitos** (*Guided Requirements Elicitation*) — Padrão em que, antes de qualquer código, o agente explora o repositório, pergunta uma coisa de cada vez, propõe abordagens com trade-offs e só grava a spec depois da sua aprovação. Evidência: requisito esclarecido. Referência: `brainstorming`.

**Evidência** — Artefato concreto que mostra que uma etapa foi cumprida, como uma spec aprovada, um teste visto falhando ou um diff revisado, e não a palavra do agente. O método produz seis: requisito esclarecido, plano revisável, teste falhando antes do código, teste passando depois, diff revisado por você e resultado verificado por você.

**Ferramenta** — Ação que o harness oferece ao modelo, como ler um arquivo, editar código ou rodar um comando. O modelo decide quando usar; o harness executa, sob a política de permissões.

**Fluxo mínimo** — As quatro skills usadas neste livro, uma por etapa: `brainstorming` (esclarecer), `writing-plans` (planejar), `test-driven-development` (vermelho/verde) e `verification-before-completion` (verificar).

**Fronteira de confiança** — Linha entre um componente não confiável e o que ele afeta. No agente, o modelo é o principal não confiável, e a permissão é o ponto de aplicação da política entre o que ele propõe e o que acontece. É porosa por composição de permissões, por fadiga de aprovação e porque instrução não é controle.

**Frontmatter** — Cabeçalho YAML no topo de um `SKILL.md`, com o nome (`name`) e a descrição (`description`) da skill.

**Gate** — Verificação automatizada e bloqueante no pipeline, que barra o merge quando falha: suíte, typecheck, rastreabilidade, mutação, revisão obrigatória. Cada evidência tem um gate correspondente. O gate não substitui a evidência local: pega o mesmo erro mais tarde, quando a etapa foi pulada.

**Harness** — Programa que envolve o modelo: monta o contexto, oferece ferramentas, aplica as permissões e executa o loop de ações. É a parte determinística do agente. O GitHub Copilot CLI e o Claude Code são exemplos.

**Hipótese do programador competente** — Premissa do teste de mutação (DeMillo, Lipton e Sayward, 1978): programas escritos por profissionais competentes estão perto do correto, e os defeitos restantes são desvios pequenos. Junto com o *efeito de acoplamento*, segundo o qual testes que detectam os defeitos simples também detectam a maioria dos complexos, justifica medir a suíte com mutantes de primeira ordem. Descreve bem o código de um agente: plausível na estrutura, errado no operador ou no limite.

**Hook** — Comando que o harness ou um plugin dispara em eventos do loop, como antes de uma edição ou ao fim de um turno, sem passar pelo modelo. Por ser determinístico, é lugar para controles que precisam valer sempre; vindo de terceiros, é código com os seus privilégios.

**Implementação de referência** — Implementação concreta de um padrão, usada como modelo e não como definição. Neste livro, cada skill do superpowers é a implementação de referência de um padrão de engenharia com IA; o padrão continua valendo em outra CLI, outro pacote ou um processo do próprio time.

**Injeção de dependência** — Entrega das dependências a um componente por fora, em geral pelo construtor, em vez de ele importá-las ou lê-las de estado global. É o que permite plugar um dublê numa porta.

**Injeção de prompt** (*prompt injection*) — Instrução embutida em dado que o agente lê, como um comentário de código, uma issue ou um README, que o modelo trata com o mesmo status do seu pedido. Na forma indireta, quem controla o dado controla parte do agente.

**Isolamento de Espaço de Trabalho** (*Workspace Isolation*) — Padrão em que cada linha de trabalho ganha um worktree e uma branch próprios. Isola o estado do sistema de arquivos, como o isolamento de processos, mas não o ambiente (portas, bancos, caches). Referência: `using-git-worktrees`.

**Lost in the middle** — Efeito descrito por Liu et al. (2023): modelos recuperam pior a informação do meio de contextos longos do que a do começo ou do fim. Numa sessão de agente, o meio é onde ficam as decisões já tomadas.

**MCP** — Sigla de *Model Context Protocol*, padrão aberto para ligar serviços externos a um agente como ferramentas. Um servidor MCP é código de terceiros com acesso de execução ou um token seu.

**Modelo** — Modelo de linguagem: função sem estado sobre o contexto, que recebe o contexto inteiro a cada chamada e devolve uma continuação. Sozinho, não lê arquivos nem roda comandos; a "memória" da sessão é o histórico que o harness reenvia.

**Mutação (teste de)** — Técnica que gera variações pequenas do código (mutantes), trocando operadores relacionais e limites, negando condicionais ou removendo chamadas, e roda a suíte contra cada uma. Mutante que faz algum teste falhar está morto; o que passa sobreviveu. O *mutation score* é a fração de mortos sobre os avaliados. Mede a sensibilidade da suíte, não a correção do oráculo. Fundamentos na hipótese do programador competente. Neste livro, a ferramenta é o Stryker, com `thresholds.break` como gate de CI.

**Mutante equivalente** — Mutante que não muda o comportamento observável do programa e, por isso, nenhum teste consegue matar. Exemplo real: trocar `toLowerCase()` por `toUpperCase()` numa normalização aplicada aos dois lados da comparação. É o motivo de o limiar de mutação não ser 100.

**Oráculo (de teste)** — A fonte do valor esperado num teste. Precisa ser independente do código testado: o critério de aceite da spec ou o comportamento caracterizado de um consumidor em produção. Um oráculo derivado da implementação produz teste tautológico, mesmo com score de mutação alto.

**Padrões de engenharia com IA** — Formas recorrentes de restringir o agente para que ele produza artefatos verificáveis. Cada um nomeia um problema, um mecanismo e a evidência que deixa. Os oito canônicos deste livro: Elicitação Guiada de Requisitos, Decomposição Verificável, Prova por Falha, Portão de Verificação Independente, Delegação com Contexto Limpo, Isolamento de Espaço de Trabalho, Revisão Independente e Caracterização antes da Mudança.

**Permissão** — Autorização que o harness exige antes de uma ação com efeito, como rodar um comando ou editar um arquivo. É a fronteira de confiança entre o modelo e o sistema; vale tanto quanto a leitura de quem aprova e não substitui a ausência de capacidade, como um agente sem credencial de push.

**Plano** — Documento que divide uma spec em tarefas pequenas e ordenadas, cada uma com arquivos, teste inicial e comando de verificação. Revisado antes de qualquer código e versionado com ele.

**Plugin** — Pacote que a CLI instala e atualiza de uma vez, com skills, comandos, hooks e configurações. O superpowers pode ser instalado como plugin.

**Porta** (*port*) — Interface pequena, definida pelo código que a consome, por onde entra uma dependência externa, como o `FeeTableProvider` para o pricing-service. Recebida por injeção de dependência, é a costura que permite trocar o serviço real por um dublê nos testes.

**Portão de Verificação Independente** (*Independent Verification Gate*) — Padrão em que nenhuma afirmação de conclusão é aceita sem o comando que a prova executado agora, com a saída lida. Evidência: resultado verificado. Referência: `verification-before-completion`.

**Prova por Falha** (*Fail-First Proof*) — Padrão em que o teste vem antes do código e precisa falhar pelo motivo certo; só então vem o código mínimo para passar. Evidências: teste falhando antes do código e teste passando depois. Referência: `test-driven-development`.

**Rastreabilidade** — Ligação verificável entre um requisito e o teste que o cobre. Neste livro, cada critério de aceite tem um identificador `AC-nn`, e o `check-spec.mjs` falha no CI se algum deles não aparecer em nenhum arquivo de teste. Confere a presença, não a qualidade do teste.

**Revisão Independente** (*Independent Review*) — Padrão em que a revisão é feita por um contexto que não participou da implementação, contra a spec e o plano, antes da sua leitura do diff. Referência: `requesting-code-review`.

**SDD (Spec-Driven Development)** — Engenharia de requisitos executável: a especificação é escrita e aprovada antes do código e guia o plano, os testes e a revisão, com critérios identificados ligados a testes por um vínculo que um script confere no CI. Cada artefato (spec, plano, tarefas, código) é revisado antes do próximo.

**Skill** — Pasta com um `SKILL.md` que descreve um processo para o agente: frontmatter com nome e descrição e, abaixo, as instruções. Por ser arquivo, é versionada e revisável em PR. O acionamento pela descrição não é determinístico: o modelo decide se a skill se aplica, e pode errar.

**Snapshot** — Leitura única e imutável de um estado que pode mudar, usada do começo ao fim de uma operação, como a tabela de tarifas lida uma vez por requisição. Não confundir com o *snapshot test*, que compara a saída com um arquivo gravado e vira teste tautológico quando é aceito sem leitura.

**Spec** — Especificação do que deve ser construído, com quatro seções: objetivo, requisitos, critérios de aceite, cada um com um ID (`AC-nn`), e fora do escopo. Escrita antes do plano, aprovada por uma pessoa e revisada no PR como código.

**Spec Kit** — Kit aberto do GitHub para praticar SDD com um agente, publicado em `github/spec-kit`. Conduz cada etapa por um comando, começando pela constituição do projeto.

**Strangler** — Padrão de migração incremental em que a lógica sai do código antigo para um componente novo e testável, e o antigo passa a delegar a ele com a interface intacta, até poder ser removido. Neste livro, o `getFee` legado delega à função pura `feeFor`.

**Subagente** — Agente iniciado por outro agente para uma tarefa específica, com contexto próprio. Ao terminar, devolve só o resultado ao coordenador.

**Superpowers** — Pacote aberto de skills de engenharia de software, publicado em `obra/superpowers`. Neste livro, é a implementação de referência dos padrões; o Apêndice A mapeia o pacote.

**TDD (Test-Driven Development)** — Prática de escrever o teste antes do código de produção, no ciclo vermelho, verde e refatoração. Neste livro, o vermelho visto é tratado como evidência, e não como ritual.

**Teste tautológico** — Teste cujo valor esperado deriva da implementação, e não do requisito; passa por construção e congela o erro. Há duas famílias. Os *sem sensibilidade* (espelho por reuso, asserção sobre o mock em vez do efeito, asserções fracas) deixam mutantes vivos, e a mutação os denuncia. Os *sem oráculo independente* (espelho por cópia, snapshot aceito sem leitura, esperado copiado da saída) matam mutantes e, ainda assim, certificam o defeito.

**Token** — Unidade em que o modelo lê e gera texto: fragmentos de palavra cujo tamanho varia com a língua e o tipo de conteúdo. Código, JSON e logs rendem mais tokens por linha do que prosa. A janela de contexto e o custo são medidos em tokens.

**Tríade letal** — Combinação descrita por Simon Willison (2025): acesso a dados privados, exposição a conteúdo não confiável e capacidade de comunicação externa. Um agente com as três pode ser induzido, por injeção de prompt, a ler um segredo e mandá-lo para fora.

**Vendoring** — Incorporar ao repositório a cópia revisada de uma dependência, registrando a origem e o commit de onde veio. Para skills de terceiros, é a forma mais simples de fixar a versão: a partir dali, a skill só muda por PR.

**Vermelho/verde** — Os dois estados de um teste no ciclo do TDD. Ver o vermelho, pelo motivo certo, antes do verde é a evidência de que o teste verifica algo.

**Worktree** — Cópia de trabalho adicional de um repositório git, com diretório, índice e `HEAD` próprios, ligada a outra branch e compartilhando o banco de objetos.

**Zero-trust** — Princípio aplicado neste livro ao desenvolvimento com IA: toda saída do agente, incluindo código, relatório e "pronto", é não confiável até ser verificada por um mecanismo que não dependa dele, como um teste visto falhando, um comando rodado por você ou um gate de CI.

## Apêndice C — Equivalências entre as CLIs {#apendice-c}

Referência rápida dos comandos e pastas apresentados no [Capítulo 3](#cap-3). Em cada bloco, a primeira forma é a do Claude Code e a segunda, a do Copilot CLI. As barras invertidas só quebram o comando para caber na página.

### Instalar o pacote como plugin

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

### Instalar só algumas skills

O comando é o mesmo nas duas CLIs (Node.js 22 ou superior); muda o valor de `-a`: `claude-code` ou `github-copilot`. Com `-g`, a instalação vai para a pasta pessoal; sem ele, para o projeto atual.

```bash
npx skills add obra/superpowers -g \
  -a claude-code \
  -s brainstorming writing-plans \
  test-driven-development \
  verification-before-completion
```

### Pastas de skills

*Claude Code*

- projeto: `.claude/skills/`;
- pessoal: `~/.claude/skills/`.

*Copilot CLI*

- projeto: `.github/skills/`, `.claude/skills/` ou `.agents/skills/`;
- pessoal: `~/.copilot/skills/` ou `~/.agents/skills/`.

A pasta `.claude/skills/` do projeto serve às duas CLIs. Num time que usa ambas, é o lugar das skills do projeto, versionadas e sob revisão.

### Conferir e chamar

- *Claude Code*: `/` na sessão lista as skills.
- *Copilot CLI*: `/skills list`.

As duas CLIs leem as skills no início da sessão. Nas duas, a chamada explícita é uma barra, o nome da skill e o pedido:

```text
/brainstorming <a história, como está no
backlog>
```

Instalada como plugin, a skill pode aparecer com o prefixo do pacote, como `/superpowers:brainstorming`. É a mesma skill.

> **[Nota]** Comandos conferidos em outubro de 2026. As CLIs mudam com frequência; na divergência, vale a documentação da versão instalada.

## Apêndice D — Projeto do exemplo {#apendice-d}

Este é o `transfer-service` usado na [Parte II](#cap-5), reduzido ao necessário para reproduzir cada etapa. O código de chegada é referência para comparar com o que o seu agente produzir, e não para copiar antes da hora: na prática, quem o escreve é o agente, conduzido pelas skills e pelos gates.

### Estrutura e dependências

```text
transfer-service/
  docs/specs/bank-ranking.md
  scripts/check-spec.mjs
  src/
    banks.ts
    fees/feePolicy.ts
    legacy/fees.ts
    legacy/fees.characterization.test.ts
    pricing/feeTable.ts
    ranking/bankRanking.ts
    ranking/bankRanking.test.ts
  package.json
  stryker.config.json
```

Os arquivos de `fees/` e `ranking/`, a caracterização, a spec e o script nascem durante a história. No repositório de referência, a spec fica em `docs/specs/` por simplicidade; gravada pela `brainstorming`, ela estaria em `docs/superpowers/specs/`. A configuração do Stryker está no [Capítulo 8](#cap-8). As dependências de desenvolvimento:

```json
{
  "devDependencies": {
    "@stryker-mutator/core": "^10.1.1",
    "@stryker-mutator/vitest-runner": "^10.1.1",
    "typescript": "^7.0.2",
    "vitest": "^5.0.5"
  }
}
```

### Ponto de partida

O cadastro de bancos, `src/banks.ts`:

```ts
export type Bank = { code: string; name: string };

export const banks: Bank[] = [
  { code: "001", name: "Banco Azul" },
  { code: "012", name: "Banco Verde" },
  { code: "123", name: "Banco Âmbar" },
];
```

Os tipos da tabela de tarifas e a porta do pricing-service, `src/pricing/feeTable.ts`:

```ts
export type FeeRange = {
  lowFee: number;
  highFee: number;
};

export type FeeTable = {
  version: number;
  limit: number;
  fees: Record<string, FeeRange>;
};

export interface FeeTableProvider {
  current(): Promise<FeeTable>;
}
```

O legado original, `src/legacy/fees.ts`, sem testes e lendo a tabela global mutável que o serviço de extrato também usa:

```ts
import type { FeeTable } from "../pricing/feeTable";

// Loaded at startup and replaced by the nightly
// pricing sync. Used by the statement service.
let FEE_TABLE: FeeTable;

export function loadFeeTable(table: FeeTable) {
  FEE_TABLE = table;
}

export function getFee(
  code: string, amount: number
): number {
  const f = FEE_TABLE.fees[code];
  if (!f) throw new Error("unknown bank " + code);
  if (amount > FEE_TABLE.limit) return f.highFee;
  return f.lowFee;
}
```

### Ponto de chegada

A política extraída, `src/fees/feePolicy.ts`. É uma função pura sobre um snapshot da tabela, com o limite inclusivo herdado do legado:

```ts
import type { FeeTable } from "../pricing/feeTable";

export function feeFor(
  table: FeeTable, code: string, amount: number
): number | undefined {
  const range = table.fees[code];
  if (!range) return undefined;
  return amount > table.limit
    ? range.highFee
    : range.lowFee;
}
```

O legado depois da Task 1, `src/legacy/fees.ts`, delegando à política (strangler), com a assinatura e a mensagem de erro intactas:

```ts
import { feeFor } from "../fees/feePolicy";
import type { FeeTable } from "../pricing/feeTable";

// Loaded at startup and replaced by the nightly
// pricing sync. Used by the statement service.
let FEE_TABLE: FeeTable;

export function loadFeeTable(table: FeeTable) {
  FEE_TABLE = table;
}

export function getFee(
  code: string, amount: number
): number {
  const fee = feeFor(FEE_TABLE, code, amount);
  if (fee === undefined) {
    throw new Error("unknown bank " + code);
  }
  return fee;
}
```

O serviço de ranking, `src/ranking/bankRanking.ts`, com a lista de bancos e o provider injetados e uma única leitura da tabela por requisição:

```ts
import type { Bank } from "../banks";
import { feeFor } from "../fees/feePolicy";
import type { FeeTableProvider }
  from "../pricing/feeTable";

export type RankedBank = Bank & {
  fee: number;
  tableVersion: number;
};

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function searchBanks(
  banks: Bank[], term: string
): Bank[] {
  const t = normalize(term);
  return banks.filter((b) =>
    normalize(b.name).includes(t) ||
    b.code === term
  );
}

export class BankRankingService {
  constructor(
    private readonly banks: Bank[],
    private readonly tables: FeeTableProvider,
  ) {}

  async rank(
    term: string, amount: number
  ): Promise<RankedBank[]> {
    // One snapshot per request: a refresh in the
    // middle cannot mix two table versions.
    const table = await this.tables.current();
    const ranked: RankedBank[] = [];
    const found = searchBanks(this.banks, term);
    for (const bank of found) {
      const fee = feeFor(table, bank.code, amount);
      if (fee === undefined) continue;
      ranked.push({
        ...bank, fee, tableVersion: table.version,
      });
    }
    return ranked.sort((a, b) =>
      a.fee - b.fee ||
      a.name.localeCompare(b.name, "pt-BR")
    );
  }
}
```

A suíte de caracterização, `src/legacy/fees.characterization.test.ts`. O `AC-07` no `describe` é a correção que o `check-spec.mjs` exigiu na primeira execução:

```ts
import { beforeEach, describe, expect, it }
  from "vitest";
import { getFee, loadFeeTable } from "./fees";

// Pins what production does today. Not the spec:
// a red here means behavior changed.
describe("AC-07 legacy getFee, as is", () => {
  beforeEach(() => {
    loadFeeTable({
      version: 1,
      limit: 1000,
      fees: { "001": { lowFee: 2, highFee: 5 } },
    });
  });

  it("charges lowFee at exactly the limit", () => {
    expect(getFee("001", 1000)).toBe(2);
  });

  it("charges highFee above the limit", () => {
    expect(getFee("001", 1000.01)).toBe(5);
  });

  it("throws for an unknown bank", () => {
    expect(() => getFee("999", 10))
      .toThrow("unknown bank 999");
  });
});
```

Os testes do ranking, `src/ranking/bankRanking.test.ts`. O provider falso devolve uma versão nova da tabela a cada chamada, como um cache renovado entre duas leituras:

```ts
import { describe, expect, it } from "vitest";
import { banks } from "../banks";
import type { FeeTable, FeeTableProvider }
  from "../pricing/feeTable";
import { BankRankingService, searchBanks }
  from "./bankRanking";

const v1: FeeTable = {
  version: 1,
  limit: 1000,
  fees: {
    "001": { lowFee: 2, highFee: 5 },
    "012": { lowFee: 3, highFee: 4 },
    "123": { lowFee: 2, highFee: 6 },
  },
};

// Returns a newer table on every call, like a
// cache refreshed between two reads.
function refreshingProvider(): FeeTableProvider & {
  calls: number;
} {
  return {
    calls: 0,
    async current() {
      this.calls++;
      return { ...v1, version: this.calls };
    },
  };
}

const names = (list: { name: string }[]) =>
  list.map((b) => b.name);

describe("searchBanks", () => {
  it("AC-01 ignores case and accents", () => {
    expect(names(searchBanks(banks, "AZUL")))
      .toEqual(["Banco Azul"]);
    expect(names(searchBanks(banks, "ambar")))
      .toEqual(["Banco Âmbar"]);
  });

  it("AC-02 matches the exact code only", () => {
    expect(names(searchBanks(banks, "001")))
      .toEqual(["Banco Azul"]);
    expect(searchBanks(banks, "1")).toEqual([]);
  });

  it("AC-03 returns all banks for ''", () => {
    expect(searchBanks(banks, "")).toHaveLength(3);
  });
});

describe("BankRankingService", () => {
  it("AC-04 lowFee at the limit", async () => {
    const service = new BankRankingService(
      banks, refreshingProvider());
    const [azul] = await service.rank("001", 1000);
    expect(azul.fee).toBe(2);
  });

  it("AC-05 fee, then name", async () => {
    const service = new BankRankingService(
      banks, refreshingProvider());
    const ranked = await service.rank("", 500);
    expect(names(ranked)).toEqual([
      "Banco Âmbar", "Banco Azul", "Banco Verde",
    ]);
  });

  it("AC-06 uses one table snapshot", async () => {
    const provider = refreshingProvider();
    const service = new BankRankingService(
      banks, provider);
    const ranked = await service.rank("", 500);
    expect(provider.calls).toBe(1);
    const versions = ranked.map(
      (r) => r.tableVersion);
    expect(new Set(versions)).toEqual(new Set([1]));
  });

  it("AC-08 skips banks missing from the table",
    async () => {
      const { "123": _, ...fees } = v1.fees;
      const service = new BankRankingService(
        banks,
        { current: async () => ({ ...v1, fees }) },
      );
      const ranked = await service.rank("", 500);
      expect(names(ranked)).toEqual([
        "Banco Azul", "Banco Verde",
      ]);
    });
});
```

A spec, `docs/specs/bank-ranking.md`:

```markdown
# Bank ranking by fee

## Goal
Help the customer pick the cheapest bank for
the transfer they are about to make.

## Requirements
- Search by bank name or bank code.
- Fees come from the same policy the statement
  service charges with.

## Acceptance criteria
- AC-01 "azul" and "AZUL" find Banco Azul;
  "ambar" finds Banco Âmbar.
- AC-02 "001" finds Banco Azul; "1" finds none.
- AC-03 "" (empty) finds all banks.
- AC-04 Banco Azul fee for 1000 is 2; for
  1000.01 is 5.
- AC-05 Order for 500: Âmbar, Azul, Verde.
- AC-06 One fee table snapshot per request.
- AC-07 Legacy getFee keeps its signature and
  its characterization suite passes unchanged.
- AC-08 A bank missing from the snapshot is
  left out of the ranking.

## Out of scope
- Fee exemptions and promotions.
- Changes to the statement service.
```

O gate de rastreabilidade, `scripts/check-spec.mjs`:

```js
// Fails CI when a spec misses a required section
// or an acceptance criterion has no test.
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const [spec] = process.argv.slice(2);
const text = readFileSync(spec, "utf8");
const errors = [];

for (const h of ["Goal", "Requirements",
  "Acceptance criteria", "Out of scope"]) {
  if (!text.includes(`## ${h}`)) {
    errors.push(`missing section: ${h}`);
  }
}

const ids = new Set(text.match(/AC-\d+/g));
const tests = execSync(
  "git ls-files '*.test.ts'", { encoding: "utf8" }
).split("\n").filter(Boolean)
  .map((f) => readFileSync(f, "utf8")).join("\n");

for (const id of ids) {
  if (!tests.includes(id)) {
    errors.push(`no test for ${id}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`${spec}: ${ids.size} criteria traced`);
```

Com tudo no lugar, a suíte termina com `Tests  10 passed (10)` em dois arquivos de teste, o `check-spec.mjs` rastreia os oito critérios e o Stryker registra 52 mutantes, 51 mortos e um sobrevivente equivalente, com score de 98,08.

> **[Nota]** O projeto foi conferido com Node 24, Vitest 5 e Stryker 10.1. Versões futuras podem mudar a saída, não o método.
