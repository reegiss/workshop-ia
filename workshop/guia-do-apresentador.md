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
- [ ] Testar, na sua máquina: `npx skills add obra/superpowers -g -a github-copilot`,
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
- **Ir direto a um slide:** troque o final da URL pelo número, por exemplo `#20` para o
  primeiro slide de SDD. Útil nas perguntas.
- **Reserva:** deixe o `desenvolvimento-verificavel.pdf` aberto noutra janela. Se o navegador travar, você
  continua pelo PDF, que tem os mesmos 35 slides.
- **No Teams:** compartilhe **a janela do navegador**, não a tela inteira, e silencie as
  notificações. Deixe o terminal numa segunda janela para alternar durante o laboratório.
- **Se tiver segunda tela:** slides na tela compartilhada, este guia e o chat na sua.

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

O bloco de SDD (slides 20–22) é opcional e não está no cronograma. Se for usá-lo, veja a
seção abaixo.

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

### 4 · Rápido não quer dizer verificável (2 min)
- **Mensagem:** sem processo, a saída do agente é difícil de avaliar.
- **Fala:** "O agente gera código rápido. O problema é avaliar. Na lista de bancos: ninguém
  perguntou sobre o código, o teste copiou a ordem errada e o 'pronto' veio sem rodar
  nada. A revisão fica toda no fim."

### 5 · Anatomia de um agente (2 min)
- **Mensagem:** agente é modelo + harness; no laboratório, o Copilot CLI segue as skills.
- **Fala:** "O modelo só gera texto. Quem age é o harness: lê o código, roda o teste, vê
  falhar e corrige, sempre pedindo a sua permissão. No chat, o harness é você. No
  laboratório, é o Copilot CLI, e as skills dizem como ele trabalha."
- **Cuidado:** não prometa que todo harness lê o repositório ou roda testes. Depende da
  ferramenta e das permissões.

### 6 · Skill é um processo em arquivo (2 min)
- **Mensagem:** ferramenta é o que o agente consegue fazer; skill é como ele deve fazer.
- **Fala:** "Ferramenta é o que o agente consegue fazer; skill é como ele deve fazer. E custa
  pouco: até ser usada, só a descrição ocupa o contexto."

### 7 · Quatro skills para o fluxo mínimo (2 min)
- **Mensagem:** o laboratório usa só este fluxo.
- **Fala:** "O pacote tem catorze skills, mas hoje usamos quatro: esclarecer, planejar,
  testar primeiro e verificar. Cada uma evita um dos problemas que vimos no começo."

### 8 · Confiável = evidência observável (2 min)
- **Mensagem:** a definição usada no resto do workshop.
- **Fala:** "Quando eu disser 'confiável', é isto: seis evidências que você consegue ver,
  e cada uma tem um lugar: um arquivo, uma saída de teste, um diff. Sem elas, é só código
  que parece certo."

### 9 · O agente pergunta antes de codar (2 min)
- **Mensagem:** o brainstorming transforma um pedido vago em design aprovado.
- **Fala:** "Em vez de sair codando, o agente pergunta. Repare: é exatamente a pergunta que
  faltou no slide 4. Cada resposta vira requisito escrito, num design que você aprova. É a
  primeira evidência."
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

## Bloco opcional: SDD (3 slides, no apêndice)

Três slides sobre Spec-Driven Development, logo depois da divisória do apêndice. Eles não
estão no cronograma; use quando fizer sentido. Sugestões de momento:

- **Depois do slide 8** (Confiável = evidência): para dar nome ao que vem a seguir. Custa
  cerca de 4 minutos; compense nos slides 4 a 7.
- **Depois do slide 16** (Depois do primeiro teste): para mostrar que o laboratório já foi
  SDD. Custa cerca de 4 minutos; tire das perguntas.
- **Nas perguntas:** se alguém citar Spec Kit ou SDD.

### SDD: a spec vem primeiro (1–2 min)
- **Mensagem:** definir o quê e o porquê antes do como.
- **Fala:** "SDD é uma ideia simples: a especificação vem antes do código e guia tudo
  depois dela. Spec, plano, tarefas e só então código, verificado contra a spec."

### O fluxo que praticamos já é SDD (1 min)
- **Mensagem:** as skills do laboratório cobrem as etapas do SDD.
- **Fala:** "Repare que o laboratório já seguiu esse caminho: o brainstorming gerou a spec,
  o writing-plans gerou plano e tarefas, e o TDD implementou com evidência."

### Spec Kit: SDD como ferramenta (1 min)
- **Mensagem:** o GitHub oferece o mesmo método como ferramenta própria.
- **Fala:** "O Spec Kit, do GitHub, transforma essas etapas em comandos. Os nomes mudam entre
  versões: confira o README antes de usar."
- **Cuidado:** não compare desempenho entre Spec Kit e superpowers; não temos dados para isso.

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
| Laboratório falhou para a maioria | Assumir a condução: faça as três etapas na sua tela, pedindo as respostas ao público, e devolva o tempo restante para perguntas |
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

## Mapa do apêndice (slides 19–35)

| Slide | Conteúdo | Quando usar |
|---|---|---|
| 19 | Divisória "Material de apoio" | Só de passagem |
| 20–22 | SDD e Spec Kit | "Isso é SDD?", "E o Spec Kit?" |
| 23 | Mapa das 14 skills, com o que usamos hoje | "Quais são as outras skills?" |
| 24–27 | Os quatro grupos, com antes e depois de cada skill | Dúvida sobre uma skill específica |
| 28–30 | brainstorming, writing-plans e executing-plans em detalhe | "Como funciona por dentro?" |
| 31 | O fluxo completo em sete etapas, com a instalação | "Como fica o fluxo inteiro?" |
| 32 | obra e o skills.sh | "De onde vêm essas skills?" |
| 33–35 | Skills por plataforma: iOS, Android e backend Java | "Tem algo para a minha stack?" |

## Depois do workshop

- [ ] Compartilhar no chat o `desenvolvimento-verificavel.pdf` e os dois guias.
- [ ] Registrar o que travou no laboratório (ambiente, agente, tempo) para ajustar a
      próxima edição.
- [ ] Combinar a próxima reunião em que cada um traz as evidências da sua história.
- [ ] Se alguém ficou sem ambiente, ajudar a resolver antes dessa reunião.

## Perguntas prováveis

- **"Funciona no VS Code, sem o CLI?"** O Copilot também lê skills em `.github/skills/`.
  Hoje praticamos no CLI; confira a documentação do seu ambiente. (Slides 33–35 mostram as
  pastas de skills.)
- **"Isso não deixa o trabalho mais lento?"** Deixa, no começo. Use o fluxo completo onde há
  dúvida de regra ou risco; correção pequena não precisa.
- **"Posso criar skills da equipe?"** Sim: `writing-skills` ensina a escrever e testar uma
  skill. É um bom próximo passo. (Slide 27.)
- **"O agente pode ignorar a skill?"** Pode. Por isso as evidências são verificadas por
  você, não pelo relato do agente. (Slide 8.)
- **"Isso é Spec-Driven Development?"** É a mesma ideia: a spec antes do código. Slides
  20–22 mostram o paralelo e o Spec Kit do GitHub.
- **"Quanto custa em tokens?"** Não temos medição para apresentar. Vale medir numa história
  real e comparar com o retrabalho que o método evita.
