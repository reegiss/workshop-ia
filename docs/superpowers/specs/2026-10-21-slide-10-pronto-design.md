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

## Lista de passos (`#s-copilot ol.howto`)

Quatro `.howto-row` numeradas (círculo em `--accent` com o número), na ordem em que o
participante faz:

| # | Nome | Texto |
|---|---|---|
| 1 | Login | Abra o `copilot` e entre com `/login`. |
| 2 | Instalar | `npx skills add obra/superpowers -g -a github-copilot -s brainstorming writing-plans test-driven-development verification-before-completion` (bloco em duas linhas; só as quatro skills do fluxo mínimo) |
| 3 | Conferir | De volta ao `copilot`: `/skills list` mostra `brainstorming`. |
| 4 | Repositório | O build da sua stack roda. Os comandos estão no guia. |

A instalação vem antes da conferência, para o slide não pedir a lista de skills antes de
instalar. Os comandos aparecem em caixas escuras, com respiro em volta. Regras de CSS que
ficarem sem uso (`.install-options`, `.install-label`, `.howto-row pre`) saem do
`styles.css`; as classes `.howto*` só existem neste slide.

## Socorro

Abaixo da lista, duas linhas pequenas em `--ink-2`:

- "Faltou algo? Os comandos estão nos pré-requisitos." (a opção de plugin sai: ela instala o pacote inteiro)
- "O guia do participante está no chat: copie os comandos de lá, não da tela."

## Chamada

- No pé do slide, grande, no estilo de `.vs-punch`: "Tudo certo? Escreva *pronto* no
  chat." com "pronto" em `--accent`.
- Abaixo, menor, em `--ink-2`: "Sem ambiente? Forme dupla ou acompanhe a tela do
  apresentador."

## Guia do apresentador

Na entrada "### 10 · Pronto para começar? (1 min)", a fala passa a ser: "Isso estava nos
pré-requisitos. Siga os quatro passos: login, instalar, conferir e o build da stack, e escreva 'pronto' no
chat. O guia do participante está no chat: copie de lá. Quem não tiver ambiente acompanha a
minha tela ou forma dupla." A mensagem e a ação não mudam.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Os pré-requisitos e o guia do participante.
- Scripts de teste: a conferência é por screenshot e `?check`.

## Critérios de aceite

- O slide 10 mostra os quatro passos numerados, as duas linhas de socorro, a chamada e o
  plano B, sem o comando de instalação.
- No screenshot, nada colide e o slide termina acima da faixa do contador; `?check` sem
  transbordo.
- O guia tem a fala nova do slide 10.
