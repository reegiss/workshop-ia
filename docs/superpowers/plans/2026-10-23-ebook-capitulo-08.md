# Capítulo 8 — Escala, limites e próximos passos — plano

**Arquivo:** `chapters/pt/chapter-09.md`. **Meta:** ~1.700 palavras (1.500–1.900).

**Cabeçalho:** `## Capítulo 8 — Escala, limites e próximos passos`, seguido do antetítulo
`*Parte III — Além do primeiro teste*`.

## Roteiro (método acima do exemplo; nível dev experiente)

1. Abertura curta: a Parte II rodou o fluxo mínimo numa sessão, uma tarefa por vez. Este
   capítulo trata de três coisas: escalar o mesmo método, entregar o trabalho e reconhecer os
   limites.
2. `### Escalar: subagentes e worktrees`
   - `subagent-driven-development`: um subagente novo por tarefa do plano, com contexto montado
     só com o que a tarefa precisa. Depois de cada tarefa, duas revisões em sequência: primeiro
     se o código cumpre a spec (nem menos, nem mais), depois a qualidade do código.
   - Alternativa sem subagentes: `executing-plans`, que roda o plano em lote com pontos de
     revisão.
   - `using-git-worktrees`: um diretório de trabalho isolado por branch, para que o agente não
     mexa na sua cópia.
   - Quando usar: o plano já foi revisado e você confia no formato das tarefas. É por isso que
     o livro deixou isso para depois da Parte II.
   - O que muda para você: você deixa de ver cada vermelho ao vivo. As evidências passam a vir
     dos relatórios e das revisões, e você ainda confere o resultado final rodando os testes
     (`npm test`) e o diff (`git diff main`).
3. `### Revisar e entregar`
   - `requesting-code-review`: revisão independente antes de integrar.
   - `finishing-a-development-branch`: primeiro verifica os testes e, se falharem, não oferece
     opções. Com os testes passando, oferece exatamente quatro opções: merge local, push com PR,
     manter a branch ou descartar. O descarte exige que você digite `discard`.
   - A decisão de push é sua (regra do Cap. 2).
   - Instalação: essas skills vêm no pacote completo do superpowers. Quem fez a instalação
     seletiva do Cap. 3 com quatro skills instala o pacote (ver Cap. 3). Não repetir os comandos.
4. `### Limites`
   - **Custo:** tempo e tokens. Use o fluxo completo onde há dúvida ou risco. Uma correção de
     uma linha não precisa dele.
   - **Skill de terceiros:** é instrução para o seu agente. Revise o SKILL.md e os scripts
     antes de instalar.
   - **A skill orienta, não garante:** o agente pode pular etapas. Por isso a evidência é
     conferida por você, e o PR continua com a sua assinatura.
   - **Os controles da Parte II valem no dia a dia:** branch local, nada de push sem decisão
     sua, aprovação comando a comando, nada sensível, rodar o teste você mesmo. Só lembrar, sem
     reexplicar.
5. `### Numa história real`: o próximo passo é escolher uma história pequena do seu backlog e
   rodar o fluxo mínimo, conferindo as seis evidências (listadas em uma linha: requisito
   esclarecido, plano revisável, teste vermelho, teste verde, diff revisado, resultado
   verificado por você). Dois critérios para escolher a história: lógica com casos de borda e
   escopo de uma tarefa a três tarefas.
6. Fecho com a frase-tese: "Skill não torna o agente infalível; torna o trabalho dele
   verificável."
7. `### Resumo` com 4 ou 5 itens.

## Restrições

- Sem caixa `[Exemplo]` do Banco Azul. No máximo uma menção em prosa (por exemplo: as tarefas
  2 e 3 da história caberiam a subagentes).
- No máximo 3 caixas no capítulo, sem repetir avisos da Parte II.
- Sem telas de CLI inventadas. As quatro opções do `finishing` aparecem em prosa ou em lista,
  não como saída simulada.
- Não mencionar workshop, slides, laboratório, reunião nem sprint.
- Usar "worktree" é obrigatório, porque o verbete já existe no glossário.
