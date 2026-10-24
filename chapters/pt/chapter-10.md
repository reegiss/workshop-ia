## Apêndice A — Mapa das skills

O superpowers muda com o tempo: skills entram, saem e mudam de nome, então confira a lista na sua CLI antes de chamar qualquer uma. As quatro marcadas como fluxo mínimo são as que o livro usa do Capítulo 4 ao 7; as marcadas com o Capítulo 8 aparecem na escala e na entrega.

### Pensar antes de codar

- `brainstorming` (fluxo mínimo) — antes de qualquer trabalho novo: faz perguntas, propõe abordagens e termina num design aprovado, gravado como spec.
- `writing-plans` (fluxo mínimo) — quando há uma spec e ainda nenhum código; divide o trabalho em tarefas pequenas.
- `executing-plans` (Capítulo 8) — para executar o plano na própria sessão, sem subagentes.

### Qualidade e disciplina

- `test-driven-development` (fluxo mínimo) — antes de escrever código de implementação: o teste vem primeiro e precisa falhar.
- `systematic-debugging` — diante de um bug, um teste falhando ou um comportamento inesperado, antes de propor qualquer correção.
- `verification-before-completion` (fluxo mínimo) — antes de dizer que algo está pronto, corrigido ou passando: exige rodar a verificação e conferir a saída.

### Escala com agentes

- `subagent-driven-development` (Capítulo 8) — quando o plano tem tarefas independentes; um subagente por tarefa.
- `dispatching-parallel-agents` — quando há duas ou mais tarefas sem estado compartilhado nem dependência entre elas.
- `using-git-worktrees` (Capítulo 8) — para isolar o trabalho num worktree antes de executar um plano.

### Revisão e entrega

- `requesting-code-review` (Capítulo 8) — ao concluir tarefas ou antes do merge.
- `receiving-code-review` — ao receber o feedback de uma revisão, antes de aplicá-lo: conferir cada ponto tecnicamente, sem concordar por reflexo.
- `finishing-a-development-branch` (Capítulo 8) — com todos os testes verdes, para decidir como integrar a branch.

### Skills sobre as skills

Três skills do pacote não tratam do código, e sim do próprio uso de skills:

- `using-superpowers` — carregada no início da sessão; faz o agente procurar a skill certa e usá-la antes de responder.
- `writing-skills` — para criar, editar ou testar skills, como a `fee-rules` do Capítulo 3.
- `diagnosing-superpowers` — para entender por que uma sessão deu errado, como uma skill que não foi acionada ou um trabalho feito duas vezes.

Fora do superpowers, existem catálogos públicos de skills para outros assuntos. Antes de instalar qualquer uma, vale a regra do Capítulo 3: leia o `SKILL.md` e os scripts da pasta, como faria com um pull request.

## Apêndice B — Glossário

**Agente** — Programa que usa um modelo de linguagem para decidir e executar ações, como ler arquivos e rodar comandos. Neste livro, um agente é sempre a soma de um modelo com um harness.

**Branch** — Linha de desenvolvimento separada dentro de um repositório git. Permite trabalhar numa mudança sem afetar o código principal até a integração.

**CLI** — Sigla de *Command-Line Interface*: programa usado digitando comandos no terminal. Neste livro, as CLIs são o GitHub Copilot CLI e o Claude Code.

**Constituição** — No Spec Kit, documento com os princípios do projeto que toda spec deve respeitar. A spec muda a cada história; a constituição vale para todas.

**Contexto** — Tudo o que o modelo enxerga numa chamada: o pedido, os arquivos lidos, as saídas de comandos e as instruções do harness. Tem limite, e o que não está nele não existe para o modelo, fora o que ele aprendeu no treinamento.

**Critério de aceite** — Caso concreto, com entrada e resultado esperado, que mostra que um requisito da spec foi cumprido. Um bom critério de aceite vira um teste quase sem tradução.

**Desenvolvimento verificável** — Forma de trabalhar em que cada etapa deixa uma evidência que você consegue ver: antes, durante e depois do código. É o método apresentado neste livro.

**Diff** — Lista das diferenças entre duas versões de um código, linha a linha. Revisar o diff é a forma de conferir exatamente o que o agente mudou.

**Evidência** — Artefato concreto que mostra que uma etapa foi cumprida, como uma spec aprovada, um teste falhando ou um diff revisado, e não a palavra do agente de que terminou. O método deste livro produz seis: duas antes, duas durante e duas depois do código.

**Ferramenta** — Ação que o harness oferece ao modelo, como ler um arquivo, editar código ou rodar um comando no terminal. O modelo decide quando usar cada ferramenta; o harness a executa.

**Fluxo mínimo** — Sequência de quatro skills do superpowers usada neste livro, uma por etapa: `brainstorming` (esclarecer), `writing-plans` (planejar), `test-driven-development` (testar primeiro) e `verification-before-completion` (verificar). Cada etapa deixa uma evidência.

**Frontmatter** — Cabeçalho curto em YAML no topo de um arquivo Markdown, entre duas linhas com três hifens. Num `SKILL.md`, traz o nome (`name`) e a descrição (`description`) da skill.

**Função pura** — Função que recebe dados e devolve um resultado sem ler nem alterar nada fora dela. Dada a mesma entrada, devolve sempre a mesma saída, o que a torna fácil de testar.

**Harness** — Programa que envolve o modelo: monta o contexto, oferece ferramentas, executa as ações pedidas pelo modelo e devolve o resultado, em loop, respeitando as permissões. O GitHub Copilot CLI e o Claude Code são exemplos de harness; ligados a um modelo, cada um forma um agente.

**Loop** — Ciclo em que o modelo pede uma ação, o harness a executa e devolve o resultado, e o modelo decide o próximo passo. Repete até a tarefa terminar.

**MCP** — Sigla de *Model Context Protocol*, um padrão aberto para ligar serviços externos a um agente como ferramentas. Com ele, um mesmo servidor MCP funciona em agentes diferentes.

**Modelo** — Modelo de linguagem que recebe texto e gera texto como resposta. Sozinho, ele não lê arquivos nem roda comandos; quem faz isso é o harness.

**Permissão** — Autorização que você dá ao harness antes de uma ação com efeito, como rodar um comando ou editar um arquivo. Pode valer para uma vez ou ficar liberada para as próximas.

**Plano** — Documento que divide uma spec em passos pequenos e ordenados, cada um com o que fazer e como verificar. Um bom plano pode ser revisado por uma pessoa antes de qualquer linha de código.

**Plugin** — Pacote que a CLI instala e atualiza de uma vez, com skills e configurações. O superpowers pode ser instalado como plugin.

**Prompt** — Texto que você envia ao agente para pedir algo. Vale só para aquela conversa e não fica guardado como processo.

**SDD (Spec-Driven Development)** — Abordagem em que a especificação é escrita e aprovada antes do código e guia todo o trabalho. A spec vira a referência para o plano, os testes e a revisão; cada artefato (spec, plano, tarefas, código) é revisado antes do próximo.

**Skill** — Pasta com um arquivo `SKILL.md` que ensina ao agente um processo, como seguir TDD: um frontmatter com nome e descrição e, abaixo, as instruções. O agente a aciona quando a descrição combina com a tarefa ou quando você a chama pelo nome, com barra; diferente de um prompt, ela fica salva e pode ser reutilizada.

**Spec** — Especificação: descrição do que deve ser construído, em quatro partes: objetivo, requisitos, critérios de aceite e fora do escopo. É escrita antes do plano e aprovada por uma pessoa.

**Subagente** — Agente iniciado por outro agente para cuidar de uma tarefa específica, com contexto próprio. Ao terminar, devolve só o resultado ao agente principal.

**TDD (Test-Driven Development)** — Prática de escrever o teste antes do código de produção. O ciclo é: teste falhando (vermelho), código mínimo para passar (verde) e, se preciso, refatoração.

**Vermelho/verde** — Os dois estados de um teste no ciclo do TDD: vermelho quando falha e verde quando passa. Ver o vermelho antes do verde é a evidência de que o teste realmente verifica algo.

**Worktree** — Cópia de trabalho adicional de um repositório git, ligada a outra branch, numa pasta separada. Permite que um agente trabalhe isolado sem mexer na pasta principal.

## Apêndice C — Equivalências entre as CLIs

Este apêndice reúne, para consulta rápida, os comandos e as pastas que o Capítulo 3 e o Capítulo 5 apresentam. Em cada bloco, a primeira forma é a do Claude Code e a segunda, a do Copilot CLI.

### Instalar o pacote como plugin

*Claude Code* (dentro da sessão):

```text
/plugin install superpowers@claude-plugins-official
```

*Copilot CLI* (no terminal):

```bash
copilot plugin marketplace add \
  obra/superpowers-marketplace
copilot plugin install \
  superpowers@superpowers-marketplace
```

### Instalar só algumas skills

O comando é o mesmo nas duas CLIs e exige Node.js 22 ou superior. Muda só o valor de `-a`:

- *Claude Code*: `-a claude-code`;
- *Copilot CLI*: `-a github-copilot`.

Com as quatro skills do fluxo mínimo, na pasta pessoal do Claude Code:

```bash
npx skills add obra/superpowers -g \
  -a claude-code \
  -s brainstorming writing-plans \
  test-driven-development \
  verification-before-completion
```

Sem `-g`, as skills vão para a pasta do projeto em que você está.

### Pastas de skills

*Claude Code*

- projeto: `.claude/skills/`;
- pessoal: `~/.claude/skills/`.

*Copilot CLI*

- projeto: `.github/skills/`, `.claude/skills/` ou `.agents/skills/`;
- pessoal: `~/.copilot/skills/` ou `~/.agents/skills/`.

A pasta `.claude/skills/` do projeto serve às duas CLIs. Num time que usa ambas, é o lugar das skills do projeto.

### Conferir as skills instaladas

- *Claude Code*: digite `/` na sessão e procure a skill na lista.
- *Copilot CLI*: digite `/skills list` na sessão.

Se uma skill recém-instalada não aparecer, feche a sessão e abra outra.

### Chamar uma skill

Nas duas CLIs, digite uma barra, o nome da skill e, em seguida, o pedido:

```text
/brainstorming Crie a busca de bancos para a
tela de transferência.
```

Quando o superpowers foi instalado como plugin, a skill pode aparecer com o nome do pacote na frente, como `/superpowers:brainstorming`. É a mesma skill; use o nome que a sua CLI listar.

> **[Nota]** Os comandos deste apêndice foram conferidos em outubro de 2026. As CLIs mudam com frequência; se algum comando não funcionar, confira a documentação da versão que você usa.

## Apêndice D — Projeto do exemplo

Este é o projeto que os Capítulos 5 a 7 usam, reunido num só lugar para quem quiser reproduzir cada etapa com o agente. O código final é o ponto de chegada, não o ponto de partida: na prática, quem o escreve é o agente, guiado pelas skills.

O apêndice segue a ordem da história. A preparação e o cadastro dos bancos são a única parte que você digita sozinho, antes de abrir a CLI. Os dois arquivos do fim servem para comparar com o que o seu agente produziu, não para copiar antes da hora.

### Preparação

Os comandos são iguais no macOS, no Linux e no Windows. Rode-os numa pasta vazia, fora de qualquer outro repositório:

```bash
mkdir bank-search
cd bank-search
git init -b main
npm init -y
npm install -D typescript vitest
npm pkg set scripts.test="vitest run"
```

No editor, crie o `.gitignore` com uma única linha, `node_modules`, e o arquivo `src/banks.ts` da seção seguinte. Depois, feche a preparação com o commit inicial e crie a branch da história:

```bash
git add .
git commit -m "chore: initial project"
git switch -c feature/bank-search
```

Nesse ponto o projeto ainda não tem testes. É o estado em que o Capítulo 5 começa, e `npm test` termina com erro até o primeiro arquivo de teste existir.

### Ponto de partida: src/banks.ts

O cadastro traz três bancos fictícios e o limite entre as duas faixas de tarifa. Ele tem todos os dados de que a história precisa; o que falta são as decisões que o `brainstorming` arranca de você no Capítulo 5.

```ts
export type Bank = {
  code: string;
  name: string;
  lowFee: number;
  highFee: number;
};

export const FEE_RANGE_LIMIT = 1000;

export const banks: Bank[] = [
  { code: "001", name: "Banco Azul",
    lowFee: 2, highFee: 5 },
  { code: "012", name: "Banco Verde",
    lowFee: 3, highFee: 4 },
  { code: "123", name: "Banco Âmbar",
    lowFee: 2, highFee: 6 },
];
```

### Ponto de chegada

Os dois arquivos abaixo são o resultado das três tarefas do plano do Capítulo 6, executadas em TDD no Capítulo 7: a tarifa por faixa, a busca por nome ou código do banco e a ordenação por tarifa, com o nome como desempate.

O seu agente pode chegar a um código diferente, com outros nomes de variáveis ou outra forma de normalizar o texto. Isso não é problema. O que precisa coincidir são os comportamentos que os testes descrevem, porque eles vêm direto dos critérios de aceite da spec.

Dois desses comportamentos têm história própria. O termo vazio, que devolve todos os bancos, foi uma lacuna revelada durante o plano, no Capítulo 6, e entrou na spec por decisão sua. O desempate pelo nome, com Âmbar antes de Azul, pega a comparação ingênua entre nomes: por código de caractere, "Â" vem depois de "Z" e Azul vai para a frente. A correção é `localeCompare(..., "pt-BR")`. Se o seu código passar nos oito testes, ele cobre os dois.

`src/bankSearch.ts`:

```ts
import { type Bank, FEE_RANGE_LIMIT } from "./banks";

export function calculateFee(
  bank: Bank, amount: number
): number {
  return amount <= FEE_RANGE_LIMIT
    ? bank.lowFee
    : bank.highFee;
}

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

export function sortByFee(
  banks: Bank[], amount: number
): Bank[] {
  return [...banks].sort((a, b) =>
    calculateFee(a, amount) -
      calculateFee(b, amount) ||
    a.name.localeCompare(b.name, "pt-BR")
  );
}
```

`src/bankSearch.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { banks } from "./banks";
import {
  calculateFee, searchBanks, sortByFee,
} from "./bankSearch";

const blueBank = banks[0];
const names = (list: { name: string }[]) =>
  list.map((b) => b.name);

describe("calculateFee", () => {
  it("charges lowFee up to the limit", () => {
    const fee = calculateFee(blueBank, 1000);
    expect(fee).toBe(2);
  });

  it("charges highFee above the limit", () => {
    const fee = calculateFee(blueBank, 1000.01);
    expect(fee).toBe(5);
  });
});

describe("searchBanks", () => {
  it("ignores case", () => {
    const found = searchBanks(banks, "AZUL");
    expect(names(found)).toEqual(["Banco Azul"]);
  });

  it("ignores accents", () => {
    const found = searchBanks(banks, "ambar");
    expect(names(found)).toEqual(["Banco Âmbar"]);
  });

  it("finds the exact code", () => {
    const found = searchBanks(banks, "001");
    expect(names(found)).toEqual(["Banco Azul"]);
  });

  it("does not match part of a code", () => {
    expect(searchBanks(banks, "1")).toEqual([]);
  });

  it("finds all banks for an empty term", () => {
    expect(searchBanks(banks, "")).toHaveLength(3);
  });
});

describe("sortByFee", () => {
  it("sorts by fee, then by name", () => {
    const all = searchBanks(banks, "");
    expect(names(sortByFee(all, 500))).toEqual([
      "Banco Âmbar", "Banco Azul", "Banco Verde",
    ]);
  });
});
```

Com os dois arquivos no lugar, `npm test` deve mostrar `Tests  8 passed (8)`.

> **[Nota]** O projeto foi conferido com Node 24 e Vitest 5. Versões futuras podem mudar a saída, não o método.
