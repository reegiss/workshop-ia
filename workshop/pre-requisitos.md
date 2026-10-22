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
primeiro build baixa dependências e pode levar mais de 15 minutos.

### iOS — `cinv-lib-bnj-portability-ios` (só Mac, Xcode 26.2)

```bash
make demo-project
xcodebuild test -project app_demo/portabilityDemo.xcodeproj -scheme portabilityDemo \
  -destination 'platform=iOS Simulator,name=iPhone 16'
```

Se não tiver o iPhone 16 no simulador, veja os disponíveis com
`xcrun simctl list devices available` e troque o nome.

### Android — `cinv-lib-bnj-portability-android`

O build usa o Artifactory da empresa: deixe o acesso configurado como no dia a dia
(`local.properties` / `JFROG_TOKEN`).

Mac:

```bash
cd project
./gradlew :portability:testDebugUnitTest
```

Windows:

```powershell
cd project
.\gradlew.bat :portability:testDebugUnitTest
```

### Backend — `cinv-bff-portability-bmpf`

Use o JDK que o projeto pede (`java.version` no `pom.xml`) e o acesso ao repositório
Maven corporativo que você já usa.

Mac:

```bash
./mvnw test -Dtest=InstitutionServiceTest
```

Windows:

```powershell
.\mvnw.cmd test "-Dtest=InstitutionServiceTest"
```

## 5. No dia

Entre no Teams com o terminal aberto na pasta do repositório. Na abertura, vamos pedir
que você escreva **pronto** no chat.

- **iOS:** deixe o simulador aberto e o projeto já gerado (`make demo-project`), para o
  primeiro teste não demorar.
- **Segurança:** no laboratório você vai trabalhar numa branch local, sem push,
  aprovar cada comando do agente e não expor credenciais. As instruções estão no guia do
  participante, que será compartilhado no chat.
