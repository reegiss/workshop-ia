# Desenvolvimento verificável com agentes de IA — pré-requisitos

Faça isto **antes** do workshop. No dia não haverá tempo para instalação: vamos direto
para o laboratório.

## 1. Node.js 22 ou mais recente

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

## 3. Superpowers

Escolha **uma** das duas opções. Os comandos são os mesmos no Mac e no Windows.

**Opção A — padrão do skills.sh** (instala em `~/.copilot/skills/`):

```bash
npx skills add obra/superpowers -g -a github-copilot
```

O comando pergunta quais skills do pacote instalar: selecione todas.

**Opção B — plugin do Copilot CLI:**

```bash
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
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
- **Segurança:** no laboratório você vai trabalhar numa branch local com o push bloqueado,
  aprovar cada comando do agente e não expor credenciais. As instruções estão no guia do
  participante, que será compartilhado no chat.
