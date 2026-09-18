# Workshop de 1 hora — Design

**Data:** 2026-09-18
**Status:** aprovado pelo usuário
**Base:** a apresentação atual (`index.html`, 18 slides) descrita em
`2026-09-18-apresentacao-superpowers-design.md`.

## Objetivo

Transformar a apresentação num workshop online de **60 minutos** pelo Microsoft Teams
para os desenvolvedores da equipe, com um laboratório prático em que cada pessoa aplica
o fluxo do superpowers (brainstorming → plano → execução com TDD) no próprio
repositório.

## Contexto dos participantes

- Online pelo Teams: o apresentador compartilha a tela e cada participante trabalha na
  própria máquina (Windows e Mac).
- Ferramenta: **GitHub Copilot CLI** (terminal).
- Repositórios, um por stack:

| Stack | Repositório | Observação |
|---|---|---|
| iOS | `cinv-lib-bnj-portability-ios` | Swift 6.2; testes via `xcodebuild` no simulador, **só no Mac** |
| Android | `cinv-lib-bnj-portability-android` | Kotlin + Compose; a `main` tem só o código de exemplo (`Sample…`) |
| Backend | `cinv-bff-portability-bmpf` | Spring Boot 3.5 + Maven; já tem `GET /institutions` com paginação e busca |

## Instalação do superpowers no Copilot CLI

Instalação oficial, conforme o README de `obra/superpowers`:

```
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

O Copilot CLI também lê skills avulsas em `.github/skills/` (projeto) e
`~/.copilot/skills/` (pessoal). `/skills reload` recarrega e `/skills info <nome>`
confere uma skill ([GitHub Docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)).

**A verificar na implementação** (antes de colocar nos slides e no guia):
1. como listar/confirmar as skills do plugin dentro do Copilot CLI;
2. como pedir explicitamente uma skill numa sessão do Copilot CLI;
3. o comando exato de testes unitários de cada repositório (Windows e Mac).

## A história do laboratório

Texto entregue aos participantes, propositalmente curto para o brainstorming ter o que
perguntar:

> **Como** cliente que quer trazer investimentos de outro banco,
> **quero** escolher o banco de origem numa lista,
> **para** iniciar a portabilidade sem digitar dados do banco.
>
> Exemplo de item:
> `{"code": "001", "institutionType": "1", "name": "Banco do Brasil", "cnpj": "00000000000191"}`

Recorte por repositório:

| Repo | O que implementar | Testes |
|---|---|---|
| iOS | Modelo `Institution`, interface de repositório, use case e `ViewModel` com estados carregando / lista / vazio / erro e busca local. Dados de um stub com JSON local. | XCTest no ViewModel e no use case |
| Android | O mesmo recorte em Kotlin, seguindo o padrão do `Sample`: modelo, use case, `ViewModel` com `UIState`, busca local, dados de um stub. | JUnit no ViewModel e no use case |
| Backend | Evoluir `GET /institutions`: filtrar por `institutionType` e ordenar por nome. | `InstitutionServiceTest` e `InstitutionV1ControllerTest` |

Fora do laboratório: a tela em SwiftUI ou Compose (desafio extra para quem terminar).

## Roteiro de 60 minutos

| Tempo | Bloco |
|---|---|
| 0:00 | Abertura, roteiro e checagem da tarefa prévia no chat |
| 0:03 | O problema, chat vs agente, o que é uma skill |
| 0:10 | Mapa do superpowers, Pensar antes de codar, detalhe do brainstorming |
| 0:17 | Superpowers no Copilot CLI e regras do laboratório |
| 0:20 | **Laboratório (25 min):** brainstorming (10), plano (5), primeira tarefa com TDD (10) |
| 0:45 | Qualidade, escala, revisão e o fluxo completo (ritmo rápido) |
| 0:52 | Retrospectiva no chat, cuidados, skills por plataforma, próximos passos |
| 0:57 | Perguntas |

## Nova ordem dos slides

**Sequência principal (19 slides):**

1. Capa (sem mudança)
2. Roteiro — **refeito**: blocos com o tempo de cada um, em vez de números de slide
3. O problema
4. Chat isolado vs agente
5. O que é uma skill
6. Mapa do superpowers
7. Grupo 1 — Pensar antes de codar
8. Detalhe: brainstorming
9. **Novo — Superpowers no Copilot CLI:** os dois comandos de instalação, onde ficam
   as skills (`.github/skills/`, `~/.copilot/skills/`) e como confirmar que carregaram
10. **Novo — Regras do laboratório:** só branch local `workshop/<seu-nome>`, **sem push**
    para o remoto; não colar segredos nem dados de clientes no agente; checkpoints no
    chat do Teams; comandos no guia do participante (link no chat)
11. **Novo — Lab, etapa 1 · brainstorming (10 min)**
12. **Novo — Lab, etapa 2 · plano (5 min)**
13. **Novo — Lab, etapa 3 · primeira tarefa com TDD (10 min)**
14. Grupo 2 — Qualidade e disciplina
15. Grupo 3 — Escala com agentes
16. Grupo 4 — Revisão e entrega
17. O fluxo completo — **corrigido**: comando de instalação do Copilot CLI no lugar
    do `npx skills add`
18. **Novo — Quando não usar e cuidados:** correções de uma linha não pedem o fluxo
    completo; custa mais tempo e tokens; skills de terceiros exigem revisão do
    `SKILL.md`; a revisão humana continua obrigatória
19. **Novo — Próximos passos:** terminar o laboratório em casa (guia), usar o
    brainstorming na próxima história real, conhecer as skills da sua plataforma
    (apêndice), trazer o resultado na próxima reunião; "Perguntas?"

**Apêndice (depois do slide 19):**

20. Divisória "Apêndice"
21. obra e o skills.sh
22. Detalhe: writing-plans
23. Detalhe: executing-plans
24. iOS · Swift
25. Android · Kotlin
26. Backend · Java

Nos slides de plataforma, o rodapé troca o `npx skills add …` por: "No Copilot CLI:
coloque a skill em `.github/skills/` ou `~/.copilot/skills/`" + "Revise o `SKILL.md`
antes de instalar".

## Visual dos slides de laboratório

- Fundo azul-marinho (`--navy`), para o público reconhecer na hora que é hora de
  praticar.
- Kicker `Laboratório · etapa N de 3` e o tempo da etapa em destaque (ex.: `10 min`).
- Passos numerados (é uma sequência real), com o texto a colar em fonte monoespaçada.
- Bloco **Checkpoint** no rodapé: o que colar no chat do Teams ao terminar a etapa.
  - Etapa 1: a pergunta mais útil que o agente fez.
  - Etapa 2: quantas tarefas o plano tem.
  - Etapa 3: a saída do teste passando (vermelho → verde).
- Texto maior que nos demais slides (mínimo 30px no palco), para ler bem no
  compartilhamento do Teams.

## Materiais fora dos slides

Pasta `workshop/` neste repositório:

1. **`workshop/pre-requisitos.md`** — checklist para enviar um dia antes:
   instalar o Copilot CLI e fazer login; instalar o superpowers (dois comandos);
   clonar o repositório da sua stack; **rodar o build e os testes uma vez**
   (o primeiro build no Gradle/Xcode demora); aviso de que o laboratório de iOS
   exige Mac. Seções separadas para Windows e Mac quando os comandos diferirem.
2. **`workshop/guia-do-participante.md`** — o arquivo compartilhado no chat do Teams
   durante o workshop, porque ninguém copia texto de tela compartilhada. Contém: as
   regras do laboratório, o comando para criar a branch, a história completa, o recorte
   da sua stack, o texto de cada etapa para colar no Copilot CLI, o comando de testes
   da sua stack e "como continuar depois do workshop".

## Fora do escopo

- Nome do apresentador e data na capa (o usuário não informou; incluir quando vier).
- Notas do apresentador.
- Exportação para PDF.
- Implementar a história nos repositórios da equipe: quem implementa são os
  participantes, durante o laboratório. Os commits deles ficam só na branch local
  `workshop/<nome>`, sem push. Este trabalho não altera esses repositórios.

## Verificação

- Capturas de tela de todos os slides em 1920×1080, sem texto cortado ou sobreposto.
- Os comandos do guia e dos slides conferidos na documentação oficial (itens "a
  verificar" acima) antes de finalizar.
