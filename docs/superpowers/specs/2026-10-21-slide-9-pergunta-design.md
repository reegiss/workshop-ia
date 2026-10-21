# Slide 9 (o agente pergunta antes de codar) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Mostrar a saída que o slide promete: o design aprovado.
2. Corrigir a quebra das linhas longas do terminal.
3. Reduzir o aviso "ilustrativo" a uma legenda.

## Layout (`#s-pergunta`)

- O `.lead` atual ocupa a largura toda (texto não muda).
- Abaixo, uma linha em três partes: o terminal à esquerda, uma seta "→" (em `--accent`) e
  o cartão do design à direita, alinhados ao topo.
- A legenda fica logo abaixo do terminal.
- O `div.concept` deste slide é substituído por essa estrutura; as regras novas ficam presas
  a `#s-pergunta` (o `.concept` do slide 6 não muda).

## Terminal

Cada fala vira uma linha em bloco com recuo pendente: o rótulo ("agente ›" / "você   ›")
fica à esquerda e a continuação de uma linha quebrada fica alinhada ao texto, não embaixo
do rótulo. As cores dos rótulos (`.term-agent`, `.term-you`) não mudam.

Diálogo (as cinco falas atuais e uma nova no fim):

```
agente › Como a lista deve ser ordenada?
você   › Por nome, sem diferenciar maiúsculas.
agente › A busca vale para nome, código ou os dois?
você   › Os dois. Código só por prefixo.
agente › “credito” deve encontrar “Crédito”?
você   › Sim, sem diferenciar acentos.
```

## Cartão do design

- Fundo e borda de cartão, como os outros cartões do deck.
- Topo: o caminho `docs/superpowers/specs/` em mono pequeno, em `--ink-2`, e o rótulo
  **DESIGN APROVADO** no canto direito, em mono pequeno e maiúsculo, em `--accent` (estilo
  dos rótulos do slide 6).
- Lista com três itens, em `--ink`:
  - Ordena por nome, sem diferenciar maiúsculas nem acentos
  - Busca: nome contém o texto, ou código começa com ele
  - Busca vazia devolve todas, ordenadas

## Legenda

"Exemplo ilustrativo, não é saída real do agente." em mono pequeno (cerca de 20px), em
`--ink-2` e apagado, abaixo do terminal. Sai o `<p class="howto-note">` atual.

## Guia do apresentador

Na entrada "### 9 · O agente pergunta antes de codar (2 min)", a fala passa a ser:
"Em vez de sair codando, o agente pergunta. Repare: é exatamente a pergunta que faltou no
slide 4. Cada resposta vira requisito escrito, num design que você aprova. É a primeira
evidência." A mensagem e o cuidado não mudam.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- Marcar no terminal a ligação com o slide 4 (fica na fala).
- Scripts de teste: a conferência é por screenshot e `?check`.

## Critérios de aceite

- O slide 9 mostra o texto de abertura, o terminal com as seis falas, a seta, o cartão do
  design e a legenda.
- No screenshot, linhas quebradas do terminal ficam alinhadas ao texto; nada colide; o
  slide termina acima da faixa do contador; `?check` sem transbordo.
- O guia tem a fala nova do slide 9.
