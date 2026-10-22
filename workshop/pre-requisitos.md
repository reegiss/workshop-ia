# Desenvolvimento verificável com agentes de IA — pré-requisitos

Faça isto **antes** do workshop. No dia não haverá tempo para instalação: vamos direto
para o laboratório.

Link de apoio - https://docs.github.com/pt/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli 

## 1. Node.js 22 ou superior

```bash
node --version
```

Se for menor que 22, atualize pelo site do Node.js ou pelo gerenciador que você já usa.

## 2. GitHub Copilot CLI

| Sistema | Comando |
|---|---|
| Mac | `brew install --cask copilot-cli` |
| Windows | `winget install GitHub.Copilot` (PowerShell 6 ou mais recente) |
| Qualquer um | `npm install -g @github/copilot` |

Depois, rode `copilot` e, dentro dele, digite `/login` e siga as instruções.

## 3. Superpowers: só as quatro skills do workshop

O pacote `obra/superpowers` tem 14 skills, mas o workshop usa quatro. Instale só elas (os
comandos são os mesmos no Mac e no Windows; instala em `~/.copilot/skills/`):

```bash
npx skills add obra/superpowers -g -a github-copilot -s brainstorming writing-plans test-driven-development verification-before-completion
```

Confira: rode `copilot`, digite `/skills list` e procure `brainstorming` na lista.

## 4. O repositório da sua stack, compilando

Clone o repositório como você já faz no dia a dia e **rode os testes uma vez**. O
primeiro build baixa dependências e pode levar mais de 15 minutos. Nos comandos abaixo,
troque o que está entre `< >` pelo nome do seu projeto, scheme ou módulo.

### iOS (só Mac, com o Xcode que o projeto pede)

```bash
xcodebuild test -project <SeuProjeto>.xcodeproj -scheme <SeuScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 16'
```

Se não tiver o iPhone 16 no simulador, veja os disponíveis com
`xcrun simctl list devices available` e troque o nome.

### Android

Se o build depende de um repositório privado de pacotes, deixe o acesso configurado como no
dia a dia.

Mac:

```bash
./gradlew :<seu-modulo>:testDebugUnitTest
```

Windows:

```powershell
.\gradlew.bat :<seu-modulo>:testDebugUnitTest
```

### Backend

Use o JDK que o projeto pede (`java.version` no `pom.xml`) e, se o projeto usar um
repositório Maven privado, o acesso que você já usa.

Mac:

```bash
./mvnw test
```

Windows:

```powershell
.\mvnw.cmd test
```

## 5. No dia

Entre na reunião com o terminal aberto na pasta do repositório. Na abertura, vamos pedir
que você escreva **pronto** no chat.

- **iOS:** deixe o simulador aberto e o projeto já compilado uma vez, para o primeiro
  teste não demorar.
- **Segurança:** no laboratório você vai trabalhar numa branch local, sem push,
  aprovar cada comando do agente e não expor credenciais. As instruções estão no guia do
  participante, que será compartilhado no chat.
