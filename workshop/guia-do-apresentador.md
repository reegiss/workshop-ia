# Desenvolvimento verificável com agentes de IA — guia do apresentador

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
- [ ] Testar, na sua máquina: a instalação do `pre-requisitos.md` (só as quatro skills),
      `/skills list` e o pedido da etapa 1 do guia.
- [ ] Testar o QR code do LinkedIn (slide 2) com o celular.
- [ ] Regerar o PDF se algum slide mudou.

## No dia, antes de começar

- [ ] Apresentação aberta em tela cheia (`F`) e janela do terminal pronta para demonstrar.
- [ ] `guia-do-participante.md` pronto para colar no chat do Teams.
- [ ] Timer à vista para o laboratório.
- [ ] Facilitador no chat, com a lista de quem escreveu "pronto".

## Como apresentar

- **Arquivo:** abra `index.html` no navegador. `F` liga a tela cheia; setas, espaço ou
  clique avançam e voltam; o ícone de casa no rodapé volta à capa.
- **Ir direto a um slide:** troque o final da URL pelo número, por exemplo `#9` para o
  primeiro slide de SDD. Útil nas perguntas.
- **Reserva:** deixe o `desenvolvimento-verificavel.pdf` aberto noutra janela. Se o navegador travar, você
  continua pelo PDF, que tem os mesmos 37 slides.
- **No Teams:** compartilhe **a janela do navegador**, não a tela inteira, e silencie as
  notificações. Deixe o terminal numa segunda janela para alternar durante o laboratório.
- **Se tiver segunda tela:** slides na tela compartilhada, este guia e o chat na sua.

## Cronograma

| Min | Slides | O que fazer |
|---|---|---|
| 0:00–1:30 | 1–3 | Abertura; pedir "pronto" no chat |
| 1:30–7:00 | 4–7 | Ritmo firme, sem demonstração |
| 7:00–8:00 | 8 | Definir "confiável" |
| 8:00–14:00 | 9–14 | SDD: o que é, o fluxo, o Spec Kit (1 min), o exemplo, a pergunta e o mapa |
| 14:00–15:00 | 15–16 | Contar os "pronto"; formar duplas para quem não tem ambiente; colar o guia no chat |
| 15:00–40:00 | 17–19 | Laboratório (ver abaixo) |
| 40:00–43:00 | 20 | Ler os checkpoints do chat |
| 43:00–49:00 | 21–22 | Escala e limites |
| 49:00–52:00 | 23 | Próximos passos |
| 52:00–60:00 | — | Perguntas e folga |

Se atrasar antes do laboratório, corte tempo dos slides 4–14, nunca do laboratório. Se o
ensaio estourar, o Spec Kit (slide 11) é o primeiro a sair.

## Slide a slide

Cada fala tem até 40 palavras. Use como base, não como texto para ler.

### 1 · Desenvolvimento verificável (0:30)
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
  resto para a retrospectiva, limites e perguntas."

### 4 · Rápido não quer dizer verificável (1,5 min)
- **Mensagem:** sem processo, a saída do agente é difícil de avaliar.
- **Fala:** "O agente gera código rápido. O problema é avaliar. Na lista de bancos: ninguém
  perguntou sobre o código, o teste copiou a ordem errada e o 'pronto' veio sem rodar
  nada. A revisão fica toda no fim."

### 5 · Anatomia de um agente (1,5 min)
- **Mensagem:** agente é modelo + harness; no laboratório, o Copilot CLI segue as skills.
- **Fala:** "O modelo só gera texto. Quem age é o harness: lê o código, roda o teste, vê
  falhar e corrige, sempre pedindo a sua permissão. No chat, o harness é você. No
  laboratório, é o Copilot CLI, e as skills dizem como ele trabalha."
- **Cuidado:** não prometa que todo harness lê o repositório ou roda testes. Depende da
  ferramenta e das permissões.

### 6 · Skill é um processo em arquivo (1,5 min)
- **Mensagem:** ferramenta é o que o agente consegue fazer; skill é como ele deve fazer.
- **Fala:** "Ferramenta é o que o agente consegue fazer; skill é como ele deve fazer. E custa
  pouco: até ser usada, só a descrição ocupa o contexto."

### 7 · Quatro skills para o fluxo mínimo (1 min)
- **Mensagem:** o laboratório usa só este fluxo.
- **Fala:** "O pacote tem catorze skills, mas hoje usamos quatro: esclarecer, planejar,
  testar primeiro e verificar. Cada uma evita um dos problemas que vimos no começo."

### 8 · Confiável = evidência observável (1 min)
- **Mensagem:** a definição usada no resto do workshop.
- **Fala:** "Quando eu disser 'confiável', é isto: seis evidências que você consegue ver,
  e cada uma tem um lugar: um arquivo, uma saída de teste, um diff. Sem elas, é só código
  que parece certo."

### 9 · O que é SDD (1,5 min)
- **Mensagem:** a spec é a referência do trabalho, não um documento a mais.
- **Fala:** "SDD é desenvolvimento guiado por especificação. Sem spec, o agente preenche as
  lacunas sozinho, como a ordem da lista no slide 4. Com spec, as lacunas viram perguntas,
  e 'pronto' passa a ser cumprir a spec."

### 10 · SDD: a spec vem primeiro (0,5 min)
- **Mensagem:** cada etapa gera um artefato revisável.
- **Fala:** "SDD em quatro passos: spec, plano, tarefas e código. Cada um gera um artefato
  que você revisa antes do próximo, e o código é verificado contra a spec."

### 11 · Spec Kit: SDD como ferramenta (1 min)
- **Mensagem:** o mesmo método em outra ferramenta; hoje usamos o superpowers.
- **Fala:** "O Spec Kit, do GitHub, faz o mesmo caminho por comandos: spec, plano, tarefas e
  código. A novidade é a constituição: os princípios do projeto. Hoje não vamos usá-lo;
  confira o README antes de adotar."
- **Cuidado:** não compare desempenho entre Spec Kit e superpowers; não temos dados para isso.

### 12 · O exemplo, etapa a etapa (1,5 min)
- **Mensagem:** cada etapa vira um artefato concreto e revisável.
- **Fala:** "Este é o caso que vocês vão fazer: a spec tem critérios que dá para testar, o
  plano escolhe uma função pura e diz por quê, cada tarefa é um teste, e o código começa
  vermelho."

### 13 · O agente pergunta antes de codar (1 min)
- **Mensagem:** o brainstorming transforma um pedido vago em design aprovado.
- **Fala:** "Em vez de sair codando, o agente pergunta. Cada resposta vira um requisito:
  repare nos números. E o agente também propõe; você aprova. É a primeira evidência."
- **Cuidado:** o terminal do slide é ilustrativo; diga isso em voz alta.

### 14 · O fluxo de hoje já é SDD (0,5 min)
- **Mensagem:** os nomes do SDD, as skills e as etapas do laboratório são a mesma coisa.
- **Fala:** "Spec, no laboratório, é o Esclarecer, na etapa 1. Plano e tarefas são a etapa
  2. Código e verificação, a etapa 3: vermelho, verde e você roda o teste."

### 15 · Pronto para começar? (1 min)
- **Mensagem:** a instalação foi tarefa prévia; aqui só se confere.
- **Fala:** "Isso estava nos pré-requisitos. Siga os quatro passos: login, instalar, conferir
  (confira que aparecem as quatro skills) e o build da stack, e escreva 'pronto' no chat.
  O guia do participante está no chat: copie de lá. Quem não tiver ambiente acompanha a
  minha tela ou forma dupla."
- **Ação:** colar o `guia-do-participante.md` no chat.

### 16 · Regras do laboratório (1 min)
- **Mensagem:** segurança antes da prática.
- **Fala:** "O agente só faz o que você aprova. Lembram do harness pedindo permissão? Aqui é
  você quem decide. Leia cada comando antes de permitir. Nada de push, e nada de colar
  credenciais. Agora, juntos: na pasta do repositório, criem a branch e abram o copilot."
- **Transição:** use a frase de transição para o laboratório.

### 17 · Etapa 1: Esclarecer (8 min)
- **Mensagem:** requisito e design aprovados.
- **Fala:** "Oito minutos. Cole o pedido da sua stack e responda curto. Antes de aprovar,
  confira ordem, busca e acentos. Passou do tempo? Use o design pronto do guia."

### 18 · Etapa 2: Planejar (4 min)
- **Mensagem:** um plano pequeno e revisável.
- **Fala:** "Na mesma sessão, peça o plano curto. Confira: cada tarefa começa por um teste e
  a primeira é ordenar por nome. Se vier grande, peça para cortar."

### 19 · Etapa 3: Vermelho, depois verde (11 min)
- **Mensagem:** a evidência central do workshop.
- **Fala:** "O agente escreve o teste e para: você roda e vê vermelho. Ele implementa: você
  roda e vê verde. Não confie no relato do agente. Esse é o momento mais importante do
  workshop."

### 20 · O que as evidências mostraram (3 min)
- **Mensagem:** retrospectiva com dados do chat, não impressões.
- **Fala:** "Vamos ler o chat na ordem das etapas: a pergunta mais útil, quantas tarefas e
  quantos chegaram ao verde. Onde travou também é dado. E dos três problemas do começo,
  qual o processo evitou hoje?"

### 21 · Depois do primeiro teste (3 min)
- **Mensagem:** o mesmo método vale para o resto da tarefa.
- **Fala:** "Vocês fizeram a Tarefa 1. O resto é repetição com controle: tarefa a tarefa,
  revisão e fechamento. Essas skills não vieram na instalação de hoje: o comando está no
  slide 33. Subagentes só onde a sua ferramenta suportar."

### 22 · Limites e controles (3 min)
- **Mensagem:** onde o método não compensa e o que não delegar.
- **Fala:** "Correção de uma linha não precisa de brainstorming. E skill de terceiros é
  código que orienta o seu agente: leia antes de instalar. A skill orienta, não garante: por
  isso as evidências. E os controles de hoje valem no dia a dia."

### 23 · Próximo passo: uma história real (3 min + perguntas)
- **Mensagem:** transformar o laboratório em hábito.
- **Fala:** "Escolham uma história pequena desta sprint e tragam as seis evidências da
  tela." Depois, a frase de encerramento (na tela) e "Perguntas?".

## Conduzindo o laboratório (25 min)

| Min do lab | Etapa | Você | Facilitador no chat |
|---|---|---|---|
| 0–2 | Etapa 0 (branch local, `copilot`) | Mostrar os comandos na sua tela | Responder dúvidas de ambiente |
| 2–10 | Etapa 1 · Esclarecer | Aos 8 min, avisar: "design pronto no guia" | Coletar "a pergunta mais útil" |
| 10–14 | Etapa 2 · Planejar | Lembrar: "no máximo 3 tarefas" | Coletar o número de tarefas |
| 14–24 | Etapa 3 · Vermelho, depois verde | Aos 20 min, avisar: "faltam 4 minutos" | Contar quantos chegaram ao verde |
| 24–25 | Checkpoint | Encerrar e voltar aos slides | Resumir os números para o slide 20 |

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
| Laboratório falhou para a maioria | Assumir a condução: faça as três etapas na sua tela, pedindo as respostas ao público, e devolva o tempo restante para perguntas |
| Tempo estourado | Encurtar o slide 20 e ler só os números do chat |

## Riscos e controles

| Risco | Controle |
|---|---|
| Código do cliente no Copilot | Confirmar a política antes; trilha kata para quem não puder |
| Segredos e dados sensíveis | Não pedir ao agente que leia arquivos de credenciais (`local.properties`, `.env`); revisar o diff |
| Comando destrutivo | Aprovar comando a comando; nunca "permitir tudo" |
| Push remoto | Branch local; negar qualquer `git push` que o agente pedir |
| Skills de terceiros | No laboratório, só `obra/superpowers`; revisar `SKILL.md` e scripts antes de adotar outras |
| Permissões excessivas | Abrir o `copilot` só na pasta do repositório |
| Confiança indevida na saída | Rodar o teste você mesmo e revisar o diff antes do commit |

As opções de bloqueio de ferramentas do Copilot CLI (por exemplo `--deny-tool`) variam
por versão. Confira na documentação da versão instalada antes de mencioná-las.

## Mapa do apêndice (slides 24–37)

| Slide | Conteúdo | Quando usar |
|---|---|---|
| 24 | Divisória "Material de apoio" | Só de passagem |
| 25 | Mapa das 14 skills, com o que usamos hoje | "Quais são as outras skills?" |
| 26–29 | Os quatro grupos, com antes e depois de cada skill | Dúvida sobre uma skill específica |
| 30–32 | brainstorming, writing-plans e executing-plans em detalhe | "Como funciona por dentro?" |
| 33 | O fluxo completo em sete etapas, com a instalação | "Como fica o fluxo inteiro?" |
| 34 | obra e o skills.sh | "De onde vêm essas skills?" |
| 35–37 | Skills por plataforma: iOS, Android e backend Java | "Tem algo para a minha stack?" |

## Depois do workshop

- [ ] Compartilhar no chat o `desenvolvimento-verificavel.pdf` e os dois guias.
- [ ] Registrar o que travou no laboratório (ambiente, agente, tempo) para ajustar a
      próxima edição.
- [ ] Combinar a próxima reunião em que cada um traz as evidências da sua história.
- [ ] Se alguém ficou sem ambiente, ajudar a resolver antes dessa reunião.

## Perguntas prováveis

- **"Funciona no VS Code, sem o CLI?"** O Copilot também lê skills em `.github/skills/`.
  Hoje praticamos no CLI; confira a documentação do seu ambiente. (Slides 35–37 mostram as
  pastas de skills.)
- **"Isso não deixa o trabalho mais lento?"** Deixa, no começo. Use o fluxo completo onde há
  dúvida de regra ou risco; correção pequena não precisa.
- **"Posso criar skills da equipe?"** Sim: `writing-skills` ensina a escrever e testar uma
  skill. É um bom próximo passo. (Slide 29.)
- **"O agente pode ignorar a skill?"** Pode. Por isso as evidências são verificadas por
  você, não pelo relato do agente. (Slide 8.)
- **"Isso é Spec-Driven Development?"** É a mesma ideia: a spec antes do código. Slides
  9–14 mostram o paralelo e o Spec Kit do GitHub.
- **"Quanto custa em tokens?"** Não temos medição para apresentar. Vale medir numa história
  real e comparar com o retrabalho que o método evita.
