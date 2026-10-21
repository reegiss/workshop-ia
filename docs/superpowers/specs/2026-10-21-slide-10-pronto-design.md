# Slide 10 (pronto para começar?) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Conferir também que o repositório da stack compila (item 4 dos pré-requisitos).
2. Fazer do slide uma lista de verificação, não de instalação.
3. Destacar a única ação pedida: escrever "pronto" no chat.
4. Dizer de onde copiar os comandos: o guia do participante, colado no chat.

## Lista de verificação (`#s-copilot .howto`)

Três `.howto-row`, cada uma com um ✓ antes do nome (círculo em `--g4` com ✓ branco, como
no slide 8):

| Nome | Texto |
|---|---|
| Copilot CLI | Abra o `copilot` e confira o login com `/login`. |
| Superpowers | Instale com `npx skills add obra/superpowers -g -a github-copilot` e confira: `/skills list` mostra `brainstorming`. |
| Repositório | O build da sua stack roda. Os comandos estão no guia. |

A linha "Instalação" sai; o comando `npx skills add …` passa para a linha Superpowers, para não pedir a lista antes da instalação. Regras de
CSS que ficarem sem uso (`.install-options`, `.install-label`, `.howto-row pre`) saem do
`styles.css`; as classes `.howto*` só existem neste slide.

## Socorro

Abaixo da lista, duas linhas pequenas em `--ink-2`:

- "Prefere o plugin do Copilot CLI? Os comandos estão nos pré-requisitos."
- "O guia do participante está no chat: copie os comandos de lá, não da tela."

## Chamada

- No pé do slide, grande, no estilo de `.vs-punch`: "Tudo certo? Escreva *pronto* no
  chat." com "pronto" em `--accent`.
- Abaixo, menor, em `--ink-2`: "Sem ambiente? Forme dupla ou acompanhe a tela do
  apresentador."

## Guia do apresentador

Na entrada "### 10 · Pronto para começar? (1 min)", a fala passa a ser: "Isso estava nos
pré-requisitos. Confira as três linhas, inclusive se o build roda, e escreva 'pronto' no
chat. O guia do participante está no chat: copie de lá. Quem não tiver ambiente acompanha a
minha tela ou forma dupla." A mensagem e a ação não mudam.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Os pré-requisitos e o guia do participante.
- Scripts de teste: a conferência é por screenshot e `?check`.

## Critérios de aceite

- O slide 10 mostra as três verificações com ✓, as duas linhas de socorro, a chamada e o
  plano B, sem o comando de instalação.
- No screenshot, nada colide e o slide termina acima da faixa do contador; `?check` sem
  transbordo.
- O guia tem a fala nova do slide 10.
