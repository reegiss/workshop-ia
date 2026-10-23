## Capítulo 5 — Esclarecer

*Parte II — Na prática*

A Parte II começa aqui, com as mãos no teclado. Neste capítulo, o mesmo pedido vago do Capítulo 1 vira uma spec aprovada por você. No fim, a primeira das seis evidências, o requisito esclarecido, vai estar num arquivo do repositório.

### Preparando o projeto

A história precisa de um projeto pequeno: Node.js, TypeScript e o Vitest, um executor de testes para JavaScript e TypeScript. Abra o terminal na pasta onde você guarda seus projetos e rode os comandos abaixo. Eles são iguais no macOS, no Linux e no Windows.

```bash
mkdir bank-search
cd bank-search
git init
npm init -y
npm install -D typescript vitest
npm pkg set scripts.test="vitest run"
```

Cada linha faz uma coisa:

- `mkdir` e `cd` criam a pasta do projeto e entram nela;
- `git init` transforma a pasta num repositório git;
- `npm init -y` cria o `package.json`, o arquivo que descreve o projeto, com as respostas padrão;
- `npm install -D` instala o TypeScript e o Vitest como dependências de desenvolvimento;
- `npm pkg set` troca o script `test` padrão, criado pelo `npm init`, por um que roda o Vitest uma vez e termina.

Agora abra a pasta no seu editor. Crie um arquivo chamado `.gitignore`, com uma única linha:

```text
node_modules
```

Ele diz ao git para ignorar a pasta `node_modules`, onde o npm guardou as dependências. Elas são baixadas de novo a qualquer momento e não precisam entrar nos commits. Crie o arquivo pelo editor, e não com um comando de terminal: no PowerShell, o redirecionamento grava o arquivo numa codificação que o git pode não entender.

Ainda no editor, crie a pasta `src` e, dentro dela, o arquivo `banks.ts`:

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

Esse arquivo é o cadastro dos bancos. O tipo `Bank` diz o que cada banco tem: o código do banco, o nome e as tarifas das duas faixas. A constante `FEE_RANGE_LIMIT` guarda o limite entre as faixas. A lista `banks` traz três bancos fictícios, com o Banco Azul do Capítulo 1 entre eles.

Repare no que já está aí. O código do banco existe. O limite de R$ 1.000,00 existe. No Capítulo 1, o agente errou a busca e a faixa, mas não por falta de dados. O que faltava era decisão: o termo vale para o código do banco? O limite fica em qual faixa? Nenhum arquivo responde a isso. Quem responde é você.

Feche a preparação com um commit e crie a branch da história:

```bash
git add .
git commit -m "chore: initial project"
git switch -c feature/bank-search
```

`git add .` prepara todos os arquivos, menos os ignorados. `git commit` grava essa primeira versão. `git switch -c` cria a branch `feature/bank-search` e muda para ela. A partir daqui, tudo o que você e o agente fizerem fica nessa branch, separado da versão inicial.

> **[Nota]** O projeto ainda não tem nenhum teste, e é de propósito. Não rode `npm test` agora: sem arquivos de teste, o Vitest termina com erro. Os testes chegam no Capítulo 7, um para cada critério de aceite da spec que você vai aprovar neste capítulo.

### Regras de trabalho

Antes de chamar o agente, combine três regras com você mesmo. Elas vêm do Capítulo 2 e valem para toda a Parte II.

- **Trabalhe numa branch local.** Tudo acontece em `feature/bank-search`, na sua máquina. Não rode `git push` e não aprove um `git push` do agente. Enviar código ao repositório remoto é uma decisão sua, tomada depois de revisar o diff.
- **Aprove comando a comando.** Quando o agente pedir permissão para rodar algo, leia o comando antes de aceitar. Pergunte a si mesmo o que ele faz. Neste capítulo, espere comandos que só leem, como `git log`, a criação do arquivo da spec e um commit. Um comando que instale pacotes, apague arquivos ou envie algo para fora foge do que esta etapa pede: recuse e pergunte por quê.
- **Não ponha nada sensível no contexto.** O projeto é fictício e não tem senhas, tokens nem chaves de API. Mantenha assim. Se for repetir o exercício num projeto real, deixe arquivos de credenciais fora da pasta em que o agente trabalha.

Essas regras podem parecer exagero para um projeto de três bancos. Não são. O objetivo é treinar o hábito num lugar seguro, para que ele já esteja pronto no dia em que o projeto for de verdade.

### O mesmo pedido, agora com a skill

Abra a CLI dentro da pasta do projeto. A pasta importa: é ela que o agente vai enxergar.

*Claude Code*

```bash
claude
```

*Copilot CLI*

```bash
copilot
```

Na sessão, digite o pedido. É o mesmo do Capítulo 1, com duas diferenças: a skill na frente e uma linha a mais no fim.

```text
/brainstorming Crie a busca de bancos para a
tela de transferência. Filtre pelo termo
digitado e ordene pela tarifa do valor
informado. Escreva a spec em inglês.
```

A barra seguida do nome chama a skill diretamente, como você viu no Capítulo 3. Se você instalou o superpowers como plugin, a CLI pode mostrar a skill com o nome do pacote na frente, como `/superpowers:brainstorming`. Use o nome que aparecer na lista da sua CLI.

A última linha pede a spec em inglês. A conversa com o agente continua em português, mas a spec é um artefato do projeto, assim como o código. Ela vai ser lida junto com os nomes de funções e as descrições de testes, todos em inglês. Manter tudo no mesmo idioma evita traduzir de cabeça na hora de conferir um contra o outro.

Agora observe a primeira resposta. No Capítulo 1, ela trouxe três funções e um arquivo de testes. Desta vez, não vem código nenhum. Primeiro, o agente explora o projeto: lê arquivos como o `package.json` e o `src/banks.ts` e pode olhar o histórico do git. Depois, ele faz uma pergunta.

Esse é o comportamento que a skill ensina. Antes de propor qualquer coisa, entender o que existe. Antes de decidir qualquer coisa, perguntar a quem sabe.

### Uma pergunta por vez

A skill `brainstorming` faz uma pergunta por vez, de preferência de múltipla escolha. Isso tem um motivo: uma pergunta isolada é fácil de responder com cuidado; cinco perguntas juntas costumam receber cinco respostas apressadas.

O diálogo abaixo é ilustrativo e segue a ordem das dúvidas que o pedido deixou abertas. Cada bloco traz a pergunta do agente e a sua resposta.

```text
Agente: A busca deve comparar o termo com o
nome do banco, com o código do banco ou com
os dois?
  A) Só o nome
  B) Só o código do banco
  C) Os dois

Você: C, os dois.
```

Essa é a pergunta que faltou no Capítulo 1. Lá, o agente escolheu "só o nome" em silêncio, e quem digitava "001" recebia uma lista vazia. Aqui, a escolha é sua e fica registrada.

```text
Agente: Para o nome, a busca deve ignorar
maiúsculas e acentos? Por exemplo, "ambar"
deve encontrar "Banco Âmbar"?

Você: Sim. O nome contém o termo, ignorando
maiúsculas e acentos.
```

O cadastro tem um banco com acento, e o agente reparou nisso ao ler o `src/banks.ts`. Sem a pergunta, a busca poderia funcionar para "azul" e falhar para "ambar", e ninguém notaria até alguém digitar sem acento.

```text
Agente: Para o código do banco, a comparação
deve ser exata? O termo "1" deve encontrar o
banco "001"?

Você: Só igualdade exata. "1" não encontra
"001".
```

Nome e código do banco são buscados de jeitos diferentes, e isso também era uma decisão escondida. Um "contém" aplicado ao código faria "1" encontrar os três bancos, o que não ajuda ninguém.

```text
Agente: O cadastro define
FEE_RANGE_LIMIT = 1000. Uma transferência de
exatamente R$ 1.000,00 fica na faixa baixa
ou na alta?

Você: Na faixa baixa. A faixa baixa vai até o
limite, inclusive.
```

Você sabe essa resposta desde o Capítulo 1. O agente não sabe, e agora ele pergunta em vez de chutar. No Capítulo 1, o agente escolheu "menor que" no limite da faixa, e o teste escrito depois congelou o erro. Agora a regra certa entra escrita na spec, antes de qualquer código. No Capítulo 7, um teste nascido dessa regra vai provar que o código a cumpre.

```text
Agente: Quando dois bancos têm a mesma tarifa
para o valor informado, qual deve vir
primeiro?
  A) A ordem do cadastro
  B) Ordem alfabética pelo nome
  C) Ordem pelo código do banco

Você: B, pelo nome.
```

Essa dúvida nem apareceu no Capítulo 1, e é justamente por isso que ela importa. Para R$ 500,00, o Banco Azul e o Banco Âmbar cobram R$ 2,00 cada. Sem a pergunta, a ordem entre os dois dependeria de um detalhe da implementação. Com a resposta, Âmbar vem antes de Azul, sempre.

Com as dúvidas fechadas, o agente muda de modo. Em vez de perguntar, ele propõe duas ou três abordagens, explica o que cada uma troca e recomenda uma. Por exemplo:

```text
Agente: Proponho três abordagens:
  A) Três funções puras em src/bankSearch.ts:
     searchBanks, calculateFee e sortByFee.
     (recomendada)
  B) Uma classe que guarda o cadastro e
     expõe os três métodos.
  C) Uma única função que busca, calcula e
     ordena de uma vez.

Você: A.
```

A classe guardaria o cadastro como estado, sem ganho aqui: ele já é uma lista exportada. A função única misturaria as três regras, e um teste falhando não diria qual delas quebrou.

Uma **função pura** recebe dados e devolve um resultado, sem ler nem alterar nada fora dela. Dada a mesma entrada, devolve sempre a mesma saída. Por isso ela é fácil de testar: cada critério de aceite vira uma chamada e uma comparação. Três funções pequenas também deixam o plano do Capítulo 6 dividir o trabalho em tarefas pequenas, uma por função.

Repare no que mudou em relação ao Capítulo 1. O agente fez as mesmas escolhas que antes fez sozinho. A diferença é que cada uma passou por você.

> **[Nota]** O diálogo acima é ilustrativo. O seu agente vai perguntar com outras palavras, talvez em outra ordem, talvez juntando ou separando dúvidas. Não tente reproduzir o texto. O que importa é que as cinco decisões sejam suas, e não do agente.

> **[Dica Prática]** Se o agente pular uma das dúvidas, não espere a spec para descobrir. Responda à pergunta seguinte e acrescente a que faltou, com a sua decisão. Por exemplo: "E uma transferência de R$ 1.000,00 fica na faixa baixa, inclusive."

### Do design à spec

Escolhida a abordagem, o agente apresenta o design. Ele não entrega tudo de uma vez: mostra uma seção por vez e pede a sua aprovação antes de seguir. Nesta história, as seções podem tratar, por exemplo, da busca, da tarifa e da ordenação. Leia cada uma como leria a spec, porque é isso que ela vai virar. Se algo estiver errado, diga agora. Corrigir uma seção do design custa uma frase.

Quando você aprova a última seção, o agente grava a spec num arquivo em `docs/superpowers/specs/`, com a data e o tema no nome, terminando em `-design.md`. Depois, faz o commit desse arquivo na sua branch. Esse commit é uma ação com efeito, então a CLI deve pedir a sua permissão, a menos que você já tenha liberado esse comando. Leia o comando antes de aceitar: ele deve adicionar só o arquivo da spec.

Por fim, o agente pede que você revise o arquivo gravado. Abra-o no editor. O trecho abaixo mostra como uma spec dessa história pode ficar.

> **[Exemplo]** Trecho da spec gravada pelo agente:
>
> ```md
> # Bank search
>
> ## Goal
> Show matching banks, cheapest first.
>
> ## Requirements
> - Match the name (contains, ignoring
>   case and accents) or the exact code.
> - Fee: lowFee up to FEE_RANGE_LIMIT,
>   inclusive; highFee above it.
> - Sort by fee, ascending; ties by name.
>
> ## Acceptance criteria
> - "azul" and "AZUL" find Banco Azul;
>   "ambar" finds Banco Âmbar.
> - "001" finds Banco Azul; "1" finds no
>   bank.
> - Banco Azul fee for 1000 is 2; for
>   1000.01 is 5.
> - Order for 500: Âmbar, Azul, Verde.
>
> ## Out of scope
> - Fee exemptions or promotions.
> - The confirmation screen.
> ```

Compare o trecho com o diálogo. Cada resposta sua está ali. "Os dois" virou "the name or the exact code". "Ignorando maiúsculas e acentos" virou "ignoring case and accents". "Na faixa baixa, inclusive" virou "up to FEE_RANGE_LIMIT, inclusive". "Pelo nome" virou "ties by name".

Repare também nas quatro partes que o Capítulo 4 apresentou: objetivo, requisitos, critérios de aceite e fora do escopo. A sua spec real pode ser mais longa e ter outras seções, como a abordagem escolhida e os arquivos que vão mudar. As quatro partes precisam estar lá.

Os critérios de aceite merecem atenção especial. Cada um é um caso concreto, com entrada e resultado esperado. No Capítulo 7, cada critério vira um teste, escrito antes do código. O critério "Banco Azul fee for 1000 is 2" é exatamente o teste que, no Capítulo 1, nasceu depois do código afirmando 5.

### Conferindo a primeira evidência

A spec gravada é a primeira das seis evidências: o requisito esclarecido. É também a Dica Prática do Capítulo 2 posta em prática: as decisões saíram da conversa e foram para um arquivo, que qualquer sessão nova pode ler. Mas ela só é evidência se você a conferir. Antes de seguir, percorra esta lista com o arquivo aberto:

- **Cada resposta sua está na spec.** As cinco decisões do diálogo aparecem escritas: nome e código do banco, maiúsculas e acentos, igualdade exata no código, R$ 1.000,00 na faixa baixa e desempate pelo nome. Se faltar uma, peça ao agente para incluí-la.
- **Os critérios de aceite são verificáveis.** Cada um tem uma entrada e um resultado que um teste pode comparar. "The search works well" não é critério; "'001' finds Banco Azul" é.
- **O fora do escopo está escrito.** Ele diz o que a história não vai fazer. É essa seção que impede o agente de "aproveitar" e mexer na tela de confirmação.
- **O commit existe.** Rode `git log --oneline` no terminal. A lista deve mostrar o commit inicial, que você fez, e acima dele o commit da spec, feito pelo agente na branch `feature/bank-search`. Se você pediu correções, pode haver outros commits no topo. Rode também `git status`: nenhum arquivo da spec deve aparecer pendente.

Se algum item falhar, corrija agora. Peça o ajuste ao agente, leia de novo e confira que a correção também entrou num commit. Uma frase mudada na spec custa segundos. A mesma mudança no Capítulo 7 custaria um teste, um trecho de código e uma revisão.

> **[Aviso de Erro Comum]** Aprovar a spec sem ler. Depois de responder a cinco perguntas, é tentador achar que a spec só pode estar certa. O sintoma é seguir para o plano sem ter aberto o arquivo. O agente pode ter resumido uma resposta, trocado "até" por "abaixo de" ou esquecido o fora do escopo. Para evitar, confira a spec contra o diálogo, item por item, antes de dizer que ela está aprovada.

Quando a spec estiver aprovada, a skill oferece o próximo passo: seguir para a skill `writing-plans` e transformar a spec num plano. O Capítulo 6 começa daí.

### Resumo

- O projeto exemplo tem Node.js, TypeScript, Vitest e o cadastro em `src/banks.ts`, com uma branch local para a história. O que faltava no Capítulo 1 não eram dados, eram decisões.
- Três regras valem para toda a Parte II: branch local sem `git push`, aprovar comando a comando e nada sensível no contexto.
- Com `/brainstorming`, o mesmo pedido vago vira uma pergunta por vez. Cada decisão, da busca pelo código do banco ao desempate pelo nome, passa por você.
- O agente propõe abordagens, apresenta o design em seções e grava a spec em `docs/superpowers/specs/`, com commit.
- A spec só vira evidência depois que você a confere: suas respostas, critérios verificáveis, fora do escopo e o commit no `git log`.
