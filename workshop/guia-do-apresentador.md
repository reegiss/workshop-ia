# Workshop Superpowers — guia do apresentador

Workshop online de **60 minutos** pelo Teams, com **25 minutos de laboratório** no
Copilot CLI. Este guia é só para quem apresenta. Os participantes usam o
`guia-do-participante.md` e os `pre-requisitos.md`.

**Tese:** skills tornam o trabalho com agentes verificável, porque cada etapa deixa uma
evidência que você pode revisar: requisito esclarecido, plano, teste vermelho e verde,
diff revisado.

## Frases-chave

- **Abertura:** "Agentes já escrevem código rápido. A pergunta de hoje é outra: como saber,
  com evidência, que o que ele fez está certo?"
- **Transição para o laboratório:** "Chega de slide. Nos próximos 25 minutos, cada um vai
  produzir as seis evidências no próprio repositório, começando por uma pergunta."
- **Encerramento:** "Skill não torna o agente infalível; torna o trabalho dele verificável.
  Confiável é o que você consegue mostrar: requisito, plano, teste e diff."

## Uma semana antes

- [ ] Confirmar que a política do cliente e da Stefanini permite usar o Copilot CLI nesses
      repositórios. Se não permitir, o laboratório inteiro vai para a trilha kata.
- [ ] Confirmar licença e acesso ao Copilot CLI de todos os participantes.
- [ ] Ensaiar o laboratório completo nas 3 stacks e anotar os tempos reais (build, primeiro
      teste, respostas do agente).
- [ ] Gravar uma demonstração curta das 3 etapas, para usar se a rede ou o Copilot falharem.
- [ ] Preparar a trilha kata: um repositório mínimo sem dependências corporativas
      (Swift Package sem UIKit, Kotlin/JVM, Java/Maven), para quem não conseguir compilar.
- [ ] Combinar um facilitador para acompanhar o chat durante o laboratório.
- [ ] Conferir a contagem de skills do pacote superpowers (hoje, 14) e os comandos de
      instalação na versão atual.

## Um dia antes

- [ ] Enviar `pre-requisitos.md` aos participantes.
- [ ] Testar, na sua máquina: `npx skills add obra/superpowers -g -a github-copilot`,
      `/skills list` e o pedido da etapa 1 do guia.
- [ ] Testar o QR code do LinkedIn (slide 2) com o celular.
- [ ] Regerar o PDF se algum slide mudou.

## No dia, antes de começar

- [ ] Apresentação aberta em tela cheia (`F`) e janela do terminal pronta para demonstrar.
- [ ] `guia-do-participante.md` pronto para colar no chat do Teams.
- [ ] Timer à vista para o laboratório.
- [ ] Facilitador no chat, com a lista de quem escreveu "pronto".

## Cronograma

| Min | Slides | O que fazer |
|---|---|---|
| 0:00–1:30 | 1–3 | Abertura; pedir "pronto" no chat |
| 1:30–9:30 | 4–7 | Ritmo firme, sem demonstração |
| 9:30–13:30 | 8–9 | Definir "confiável"; exemplo da lista de bancos |
| 13:30–15:00 | 10–11 | Contar os "pronto"; formar duplas para quem não tem ambiente; colar o guia no chat |
| 15:00–40:00 | 12–14 | Laboratório (ver abaixo) |
| 40:00–43:00 | 15 | Ler os checkpoints do chat |
| 43:00–49:00 | 16–17 | Escala e limites |
| 49:00–52:00 | 18 | Próximos passos |
| 52:00–60:00 | — | Perguntas e folga |

Se atrasar antes do laboratório, corte tempo dos slides 4–9, nunca do laboratório.

## Slide a slide

Cada fala tem até 40 palavras. Use como base, não como texto para ler.

### 1 · Superpowers (0:30)
- **Mensagem:** o tema é processo, não um modelo melhor.
- **Fala:** "Hoje não vou falar de um modelo melhor, e sim de processo: como fazer o agente
  trabalhar em etapas que conseguimos revisar e verificar."

### 2 · Quem apresenta (0:30)
- **Mensagem:** contexto de quem fala.
- **Fala:** "São mais de vinte anos em tecnologia, hoje com foco em iOS. Meu interesse aqui
  é prático: usar agentes sem abrir mão de testes e revisão."

### 3 · 60 minutos, 25 de prática (0:30)
- **Mensagem:** a maior parte do tempo é mão na massa.
- **Fala:** "Quinze minutos de conceito, vinte e cinco de prática no seu repositório e o
  resto para escala, limites e perguntas. Escreva 'pronto' no chat se o ambiente estiver ok."

### 4 · Rápido não é verificável (2 min)
- **Mensagem:** sem processo, a saída do agente é difícil de avaliar.
- **Fala:** "O agente gera código rápido. O problema é avaliar: foi o requisito certo? O
  teste prova algo? Sem processo, a revisão fica toda no fim, e cara."

### 5 · Chat responde, agente age (2 min)
- **Mensagem:** mais capacidade pede mais processo e controle.
- **Fala:** "No chat, quem executa é você. O agente pode executar, desde que você permita.
  Por isso precisamos definir como ele trabalha."
- **Cuidado:** não prometa que todo agente lê o repositório ou roda testes. Depende da
  ferramenta e das permissões.

### 6 · Skill é um processo em arquivo (2 min)
- **Mensagem:** uma skill é um método reutilizável e revisável.
- **Fala:** "Skill é um arquivo de instruções: como o agente deve conduzir um tipo de
  trabalho. Você lê, versiona e revisa, como qualquer código."

### 7 · Quatro skills para o fluxo mínimo (2 min)
- **Mensagem:** o laboratório usa só este fluxo.
- **Fala:** "O pacote tem catorze skills, mas hoje usamos quatro. É o fluxo mínimo:
  entender, planejar, testar primeiro e verificar."

### 8 · Confiável = evidência observável (2 min)
- **Mensagem:** a definição usada no resto do workshop.
- **Fala:** "Quando eu disser 'confiável', é isto: seis evidências que você consegue ver.
  Sem elas, é só código que parece certo."

### 9 · O agente pergunta antes de codar (2 min)
- **Mensagem:** o brainstorming transforma um pedido vago em design aprovado.
- **Fala:** "Em vez de sair codando, o agente pergunta. Cada resposta sua vira requisito
  escrito. É a primeira evidência."
- **Cuidado:** o terminal do slide é ilustrativo; diga isso em voz alta.

### 10 · Pronto para começar? (1 min)
- **Mensagem:** a instalação foi tarefa prévia; aqui só se confere.
- **Fala:** "Isso estava nos pré-requisitos. Confira as três linhas e escreva 'pronto' no
  chat. Quem não tiver, acompanha a minha tela ou forma dupla."
- **Ação:** colar o `guia-do-participante.md` no chat.

### 11 · Regras do laboratório (1 min)
- **Mensagem:** segurança antes da prática.
- **Fala:** "O agente só faz o que você aprova. Leia cada comando antes de permitir. Nada
  de push, e nada de colar credenciais."
- **Transição:** use a frase de transição para o laboratório.

### 12 · Etapa 1: Esclarecer (8 min)
- **Mensagem:** requisito e design aprovados.
- **Fala:** "Oito minutos. Se o agente fizer perguntas demais, responda de forma curta.
  Passou do tempo? Use o design pronto do guia."

### 13 · Etapa 2: Planejar (4 min)
- **Mensagem:** um plano pequeno e revisável.
- **Fala:** "Plano curto. Se vier grande, peça para cortar. O que interessa é a primeira
  tarefa: um teste."

### 14 · Etapa 3: Vermelho, depois verde (11 min)
- **Mensagem:** a evidência central do workshop.
- **Fala:** "Não confie no relato do agente: rode o teste. Vermelho antes, verde depois.
  Esse é o momento mais importante do workshop."

### 15 · O que as evidências mostraram (3 min)
- **Mensagem:** retrospectiva com dados do chat, não impressões.
- **Fala:** "Vamos olhar o chat: quem chegou ao verde e onde travou. Travar também é dado:
  mostra onde o processo protege."

### 16 · Depois do primeiro teste (3 min)
- **Mensagem:** o mesmo método vale para o resto da tarefa.
- **Fala:** "O resto é repetição com controle: tarefa a tarefa, revisão e fechamento.
  Subagentes só onde a sua ferramenta suportar."

### 17 · Limites e controles (3 min)
- **Mensagem:** onde o método não compensa e o que não delegar.
- **Fala:** "Correção de uma linha não precisa de brainstorming. E skill de terceiros é
  código que orienta o seu agente: leia antes de instalar."

### 18 · Próximo passo: uma história real (3 min + perguntas)
- **Mensagem:** transformar o laboratório em hábito.
- **Fala:** "Escolham uma história pequena desta sprint e tragam as evidências: spec,
  plano, teste vermelho e verde, diff." Depois, a frase de encerramento e "Perguntas?".

## Conduzindo o laboratório (25 min)

| Min do lab | Etapa | Você | Facilitador no chat |
|---|---|---|---|
| 0–2 | Etapa 0 (branch, push bloqueado, `copilot`) | Mostrar os comandos na sua tela | Responder dúvidas de ambiente |
| 2–10 | Etapa 1 · Esclarecer | Aos 8 min, avisar: "design pronto no guia" | Coletar "a pergunta mais útil" |
| 10–14 | Etapa 2 · Planejar | Lembrar: "no máximo 3 tarefas" | Coletar o número de tarefas |
| 14–24 | Etapa 3 · Vermelho, depois verde | Aos 20 min, avisar: "faltam 4 minutos" | Contar quantos chegaram ao verde |
| 24–25 | Checkpoint | Encerrar e voltar aos slides | Resumir os números para o slide 15 |

**Critério de sucesso:** o teste falhou e depois passou, rodado pelo próprio participante,
e o diff foi revisado.

## Contingência

| Situação | O que fazer |
|---|---|
| Participante sem Copilot CLI (licença, política ou login) | Dupla com um colega ou acompanhar a sua tela |
| Build ou teste não roda | Trilha kata; ou praticar só as etapas 1 e 2, que não exigem compilar |
| Brainstorming passou de 8 min | Colar o "design pronto" do guia |
| Plano não sai ou vem enorme | Colar o "plano pronto" do guia |
| Agente trava ou dá erro | Nova sessão do `copilot`, colando o design aprovado |
| Rede ou cota fora do ar para muitos | Passar a demonstração gravada |
| Tempo estourado | Encurtar o slide 15 e ler só os números do chat |

## Riscos e controles

| Risco | Controle |
|---|---|
| Código do cliente no Copilot | Confirmar a política antes; trilha kata para quem não puder |
| Segredos e dados sensíveis | Não pedir ao agente que leia arquivos de credenciais (`local.properties`, `.env`); revisar o diff |
| Comando destrutivo | Aprovar comando a comando; nunca "permitir tudo" |
| Push remoto | `git remote set-url --push origin DESABILITADO` na etapa 0 do guia |
| Skills de terceiros | No laboratório, só `obra/superpowers`; revisar `SKILL.md` e scripts antes de adotar outras |
| Permissões excessivas | Abrir o `copilot` só na pasta do repositório |
| Confiança indevida na saída | Rodar o teste você mesmo e revisar o diff antes do commit |

As opções de bloqueio de ferramentas do Copilot CLI (por exemplo `--deny-tool`) variam
por versão. Confira na documentação da versão instalada antes de mencioná-las.

## Perguntas prováveis

- **"Funciona no VS Code, sem o CLI?"** O Copilot também lê skills em `.github/skills/`.
  Hoje praticamos no CLI; confira a documentação do seu ambiente.
- **"Isso não deixa o trabalho mais lento?"** Deixa, no começo. Use o fluxo completo onde há
  dúvida de regra ou risco; correção pequena não precisa.
- **"Posso criar skills da equipe?"** Sim: `writing-skills` (no apêndice) ensina a escrever
  e testar uma skill. É um bom próximo passo.
- **"O agente pode ignorar a skill?"** Pode. Por isso as evidências são verificadas por
  você, não pelo relato do agente.
