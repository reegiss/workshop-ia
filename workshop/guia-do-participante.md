# Desenvolvimento verificável com agentes de IA — guia do participante

Copie os comandos e pedidos **deste arquivo**, não da tela compartilhada.

## Regras do laboratório

- Trabalhe só numa **branch local** `workshop/seu-nome` (etapa 0). Nunca aprove um `git push`.
- **Aprove comando a comando.** Leia cada comando que o agente pedir para rodar. Nunca
  escolha "permitir tudo".
- **Nada sensível:** não cole segredos, tokens nem dados de clientes. Não peça ao agente
  para ler arquivos de credenciais (por exemplo `local.properties` com `JFROG_TOKEN`, ou `.env`).
- Ao fim de cada etapa, cole no chat do Teams o que o slide pedir.
- O agente vai criar arquivos em `docs/superpowers/` (design e plano). Eles ficam na sua
  branch local.

## Etapa 0 · Preparar a branch (1 min)

Na pasta do repositório (os comandos são os mesmos no Mac e no Windows):

```bash
git switch -c workshop/seu-nome
copilot
```

## Etapa 1 · Esclarecer (8 min)

Dentro do `copilot`, cole **o pedido da sua stack**.

### iOS

```text
Use a skill /brainstorming para esta história. Faça no máximo 3 perguntas e não implemente nada ainda.

Recorte: uma função pura (sem UI, rede ou ViewModel) que recebe uma lista de instituições e
um texto de busca e devolve a lista ordenada por nome e filtrada por nome ou código. Busca
vazia devolve todas, ordenadas. Coloque o tipo Institution e a função em Sources/Domain.
Testes com XCTest em Tests/portabilityTests.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

### Android

```text
Use a skill /brainstorming para esta história. Faça no máximo 3 perguntas e não implemente nada ainda.

Recorte: uma função pura (sem UI, rede ou ViewModel) que recebe uma lista de instituições e
um texto de busca e devolve a lista ordenada por nome e filtrada por nome ou código. Busca
vazia devolve todas, ordenadas. Coloque a data class e a função em
project/portability/src/main/java/domain. Testes JUnit em project/portability/src/test/java.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

### Backend

```text
Use a skill /brainstorming para esta história. Faça no máximo 3 perguntas e não implemente nada ainda.

Recorte: uma classe nova e pura (por exemplo InstitutionSorter), sem alterar o controller nem
o InstitutionService, que recebe uma lista de instituições e um texto de busca e devolve a
lista ordenada por nome e filtrada por nome ou código. Busca vazia devolve todas, ordenadas.
Testes JUnit em src/test/java.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

Responda às perguntas do agente e aprove o design.

**Checkpoint no chat:** a pergunta mais útil que o agente fez.

### Design pronto (use se passar de 8 minutos)

```text
Design aprovado, siga com ele: função filterAndSort(institutions, query).
- Ordena por nome, sem diferenciar maiúsculas nem acentos.
- Busca: o nome contém o texto (sem diferenciar maiúsculas nem acentos) ou o código começa com o texto.
- Busca vazia ou só com espaços devolve todas, ordenadas.
- Sem dependências externas.
```

## Etapa 2 · Planejar (4 min)

Na mesma sessão:

```text
Use a skill /writing-plans para criar o plano a partir do design aprovado. No máximo 3 tarefas,
cada uma começando por um teste. A Tarefa 1 deve ser: ordenar por nome.
```

Confira que a Tarefa 1 começa por um teste. Se algo sair do recorte, peça para cortar.

**Checkpoint no chat:** quantas tarefas o seu plano tem.

### Plano pronto (use se o plano não sair)

```text
Siga este plano:
Tarefa 1 — Ordenar por nome: teste com três bancos fora de ordem que espera a lista ordenada; implementar a ordenação.
Tarefa 2 — Filtrar por nome: teste em que "brasil" encontra "Banco do Brasil"; implementar o filtro.
Tarefa 3 — Filtrar por código e busca vazia: teste em que "00" encontra "001" e busca vazia devolve todas; implementar.
```

## Etapa 3 · Vermelho, depois verde (11 min)

```text
Execute somente a Tarefa 1 do plano usando a skill /test-driven-development. Escreva o teste
primeiro e pare para eu rodá-lo e ver que falha. Depois implemente o mínimo para passar.
Faça commit local e não faça push.
```

Rode o teste **você mesmo**: ele deve falhar antes da implementação e passar depois.
Revise com `git diff` antes do commit.

| Stack | Mac | Windows |
|---|---|---|
| iOS | `xcodebuild test -project app_demo/portabilityDemo.xcodeproj -scheme portabilityDemo -destination 'platform=iOS Simulator,name=iPhone 16'` | — (só Mac) |
| Android | `cd project && ./gradlew :portability:testDebugUnitTest --tests "*Institution*"` | `cd project; .\gradlew.bat :portability:testDebugUnitTest --tests "*Institution*"` |
| Backend | `./mvnw test -Dtest=InstitutionSorterTest` | `.\mvnw.cmd test "-Dtest=InstitutionSorterTest"` |

**Checkpoint no chat:** a saída do teste verde.

## Sem ambiente funcionando?

- Forme dupla com quem está com o ambiente pronto, ou acompanhe a tela do apresentador.
- As etapas 1 e 2 funcionam sem compilar nada: dá para praticar o brainstorming e o plano
  mesmo que o build não rode.

## Como continuar depois do workshop

Abra o `copilot` na mesma branch e peça:

```text
Use a skill /executing-plans para continuar o plano a partir da Tarefa 2.
```

Quando terminar, descarte a branch se não for usá-la:

```bash
git switch main
git branch -D workshop/seu-nome
```
