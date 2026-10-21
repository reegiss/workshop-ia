# Slide 5 (anatomia de um agente) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Tirar a repetição: cada conceito aparece uma vez no diagrama (só o nome) e uma vez na
   lista de definições.
2. Trocar o loop abstrato por uma volta concreta, do exemplo da lista de bancos.
3. Fechar o slide com uma ponte para o laboratório, sem repetir o "processo" do slide 4.

## Diagrama (`#s-agentes .anatomy-diagram`)

Layout atual mantido: diagrama à esquerda, `dl.anatomy-defs` à direita.

- As quatro caixas mostram só o nome: "Harness", "Contexto", "Modelo (LLM)" e
  "Ferramentas · MCP". Os `<span>` de legenda dentro de cada `.an-label` saem do HTML.
- Os nomes das caixas sobem um pouco de tamanho, só em `#s-agentes`, para ocupar o espaço
  das legendas. O diagrama não cresce; as caixas ficam mais baixas e com mais respiro.
- As setas "age →" e "← observa" (`.an-arrows`) continuam.
- O `aria-label` da figura não muda.
- Regras de CSS das legendas (`.an-label span`) que ficarem sem uso saem do `styles.css`.

## Loop (`.an-loop`)

Texto novo, no mesmo estilo mono de hoje:

```
lê o código da lista → roda o teste → vê falhar → corrige ↻
```

Sem nome de arquivo, para servir às três stacks (iOS, Android, Backend). A permissão sai
desta linha; ela continua na definição de Harness.

## Lista de definições

Não muda.

## Fechamento

- Fica: `<p class="an-chat">No chat, <strong>o harness é você</strong>: você copia, cola e
  executa.</p>`.
- A última linha (`.vs-punch`) passa a ser: `No laboratório, o harness é o Copilot CLI, e as
  <em>skills</em> dizem como ele trabalha.` A classe e o estilo continuam (o `<em>` em azul).

## Guia do apresentador

Na entrada "### 5 · Anatomia de um agente (2 min)":

- **Mensagem:** "agente é modelo + harness; no laboratório, o Copilot CLI segue as skills."
- **Fala:** "O modelo só gera texto. Quem age é o harness: lê o código, roda o teste, vê
  falhar e corrige, sempre pedindo a sua permissão. No chat, o harness é você. No
  laboratório, é o Copilot CLI, e as skills dizem como ele trabalha."
- **Cuidado:** não muda.

## Fora do escopo

- O PDF: adiado até o fim das edições, como combinado.
- A definição de Contexto (item 4 da avaliação) e o tamanho do diagrama (abordagem B).
- Outros slides.

## Critérios de aceite

- `?check` não acusa nenhum slide (`data-overflow=""`), e a apresentação continua com 35
  slides.
- O diagrama do slide 5 não tem legendas: nenhum `<span>` dentro de `.an-label`.
- O slide 5 mostra o loop novo e a última linha nova; "No chat, o harness é você" continua.
- No screenshot, os nomes das caixas são legíveis, nada colide e o slide termina acima da
  faixa do contador.
- O guia do apresentador tem a mensagem e a fala novas do slide 5.
