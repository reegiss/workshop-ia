# Slide 11 (regras do laboratório) — Design

**Data:** 2026-10-21
**Status:** aprovado pelo usuário
**Base:** `index.html`, `styles.css` e `workshop/guia-do-apresentador.md` na branch
`feat/introducao-agentica`.

## Objetivo

1. Mostrar no slide os comandos da etapa 0 (branch e push bloqueado), feitos juntos.
2. Trocar o rodapé, que repetia o slide 10, por uma prévia do laboratório.
3. Dar exemplos concretos de arquivos sensíveis.

## Escopo do CSS

`.rules` e `.rule` também são usados em outros slides. As regras novas ficam presas a
`#s-regras`.

## Cards (`#s-regras .rules`)

| Card | Título (não muda) | Texto |
|---|---|---|
| 1 | Branch local, sem push | `workshop/seu-nome`, com o push bloqueado. |
| 2 | Aprove comando a comando | Leia cada comando antes de permitir. Nunca “permitir tudo”. (não muda) |
| 3 | Nada sensível | Não cole segredos, tokens nem dados de clientes. Não peça para ler `.env` nem `local.properties`. |

Os cards ficam mais baixos (padding e margem menores) para abrir espaço ao bloco abaixo.

## Bloco da etapa 0

Abaixo dos cards:

- Rótulo "Etapa 0 · 1 min · juntos" no estilo `.catalog-label` / `.deep-label` (mono
  pequeno, maiúsculo).
- Cartão de terminal no estilo do "Como começar" do slide 31 (`pre.code-card.code-card--dark`),
  com `$` em `.prompt` (laranja), largura do conteúdo:

```
$ git switch -c workshop/seu-nome
$ git remote set-url --push origin DESABILITADO
$ copilot
```

- Legenda pequena em `--ink-2`: "A 2ª linha faz qualquer `git push` falhar. Para desfazer:
  veja o guia."

Os comandos são os da etapa 0 do guia do participante, iguais no Mac e no Windows.

## Rodapé

Sai `<p class="howto-note">Os pedidos estão no guia do participante…</p>`. Entra, no pé do
slide: "A seguir: 25 minutos, três etapas, um checkpoint no chat em cada uma."

## Guia do apresentador

Na entrada "### 11 · Regras do laboratório (1 min)", a fala passa a ser: "O agente só faz o
que você aprova. Lembram do harness pedindo permissão? Aqui é você quem decide. Leia cada
comando antes de permitir. Nada de push, e nada de colar credenciais. Agora, juntos: criem a
branch e bloqueiem o push." A mensagem e a transição não mudam.

## Fora do escopo

- O PDF: adiado até o fim das edições.
- O passo 1 do slide 12 ("Crie a branch…"), que passa a repetir a etapa 0: fica para a
  revisão do slide 12.
- Scripts de teste: a conferência é por screenshot e `?check`.

## Critérios de aceite

- O slide 11 mostra os três cards com os textos da tabela, o rótulo, os três comandos, a
  legenda e o rodapé novo.
- No screenshot, nada colide e o slide termina acima da faixa do contador; `?check` sem
  transbordo.
- Os outros slides com `.rules` não mudam.
- O guia tem a fala nova do slide 11.
