# Workshop Superpowers — guia do participante

Copie os comandos e pedidos **deste arquivo**, não da tela compartilhada.

## Regras do laboratório

- Trabalhe só numa **branch local** `workshop/seu-nome`. **Nada de push.**
- Não cole segredos, tokens nem dados de clientes no agente.
- Ao fim de cada etapa, cole no chat do Teams o que o slide pedir.
- O agente vai criar arquivos em `docs/superpowers/` (design e plano). Eles ficam na sua
  branch local.

## Etapa 1 · Brainstorming (10 min)

Na pasta do repositório:

```bash
git switch -c workshop/seu-nome
copilot
```

Dentro do `copilot`, cole **o pedido da sua stack**:

### iOS

```text
Use a skill /brainstorming para esta história. Não implemente nada ainda.

Recorte para este repositório: modelo Institution, interface de repositório, use case e
um ViewModel com os estados carregando, lista, vazio e erro, com busca local. Os dados
vêm de um stub com JSON local (sem backend). Testes com XCTest no ViewModel e no use case.
A tela em SwiftUI fica fora.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

### Android

```text
Use a skill /brainstorming para esta história. Não implemente nada ainda.

Recorte para este repositório: seguindo o padrão do Sample que já existe, modelo,
use case e um ViewModel com UIState (carregando, lista, vazio e erro), com busca local.
Os dados vêm de um stub (sem backend). Testes unitários com JUnit no ViewModel e no
use case. A tela em Compose fica fora.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

### Backend

```text
Use a skill /brainstorming para esta história. Não implemente nada ainda.

Recorte para este repositório: o endpoint GET /institutions já existe
(InstitutionV1Controller e InstitutionService). Evolua-o para filtrar por
institutionType e ordenar por nome. Testes em InstitutionServiceTest e
InstitutionV1ControllerTest.

História:
Como cliente que quer trazer investimentos de outro banco, quero escolher o banco de
origem numa lista, para iniciar a portabilidade sem digitar dados do banco.

Exemplo de item:
{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}
```

Responda às perguntas do agente e aprove o design.

**Checkpoint no chat:** a pergunta mais útil que o agente fez.

## Etapa 2 · O plano (5 min)

Na mesma sessão:

```text
Use a skill /writing-plans para criar o plano de implementação a partir do design
aprovado. Tarefas pequenas, com o teste antes do código em cada uma.
```

Leia o plano. Se algo sair do recorte da sua stack, peça para cortar.

**Checkpoint no chat:** quantas tarefas o seu plano tem.

## Etapa 3 · Primeira tarefa com TDD (10 min)

```text
Execute somente a Tarefa 1 do plano usando a skill /test-driven-development.
Mostre o teste falhando antes de implementar. Faça commit local e não faça push.
```

Confira: o teste falha primeiro (vermelho), depois passa (verde). Revise com `git diff`.

Para rodar os testes você mesmo:

| Stack | Mac | Windows |
|---|---|---|
| iOS | `xcodebuild test -project app_demo/portabilityDemo.xcodeproj -scheme portabilityDemo -destination 'platform=iOS Simulator,name=iPhone 16'` | — (só Mac) |
| Android | `cd project && ./gradlew :portability:testDebugUnitTest` | `cd project; .\gradlew.bat :portability:testDebugUnitTest` |
| Backend | `./mvnw test -Dtest=InstitutionServiceTest` | `.\mvnw.cmd test "-Dtest=InstitutionServiceTest"` |

**Checkpoint no chat:** a saída do teste passando.

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
