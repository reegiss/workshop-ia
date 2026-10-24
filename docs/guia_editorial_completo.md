# Relatório Mestre: Avaliação e Prompts Editoriais para Amazon KDP

Este documento unifica a avaliação crítica do tom e público-alvo do manuscrito original, bem como as diretrizes para elevar o nível técnico da obra. Na segunda parte, compila todos os prompts de instrução para a IA atuar como Editor Técnico Especialista em Amazon KDP, divididos por capítulo.

---

## PARTE 1: AVALIAÇÃO DE TOM, PÚBLICO E UPSKILLING

### Avaliação do Tom Atual
O tom do manuscrito é **pragmático, direto e instrucional**. Ele adota uma postura de "guia prático" (hands-on), utilizando uma linguagem acessível e conversacional em segunda pessoa.
* **Pontos Fortes:** Desmistifica a "mágica" da IA separando o modelo de linguagem do *harness*. Mantém um foco maduro em processos e geração de evidências (testes, diffs, specs) em vez de focar apenas em prompts mágicos.
* **Riscos:** O excesso de tutoria (hand-holding) sobre tarefas básicas de terminal e a simplicidade do domínio (uma função `if/else` de tarifa bancária) podem alienar desenvolvedores experientes.

### Público-Alvo Atual
O texto define seu público como "pessoas desenvolvedoras de qualquer linguagem". No entanto, pelo nível de profundidade e o escopo do projeto, o público real atinge **desenvolvedores Júnior a Pleno**. A barreira de complexidade arquitetural é baixa para profissionais Sênior.

### Estratégias para Aumentar o Nível (Upskilling)
Para elevar a obra a um padrão executivo e avançado de engenharia de software:

1. **Elevar a Complexidade do Domínio e Arquitetura:** Substituir a função pura isolada por um cenário de integração de sistemas, concorrência assíncrona ou mock de APIs externas. Mostrar o *Spec-Driven Development* (SDD) lidando com *race conditions* ou refatoração de código legado.
2. **Aprofundar Falhas Sistêmicas de LLMs:** Ir além do "modelo não fez perguntas". Discutir *degradação de janela de contexto* (o agente esquecer regras em sessões longas) e *alucinação de APIs*. Ensinar estratégias de mitigação técnica robustas.
3. **Integração com CI/CD e Qualidade Automatizada:** Tirar o foco exclusivo do terminal local. Mostrar como validar artefatos gerados pelo agente em *pipelines* de CI/CD, usar agentes para testes de mutação ou revisões estáticas em *Pull Requests*.
4. **Evoluir de "Comandos" para "Padrões de Projeto":** Abstrair a dependência de comandos específicos (como `/brainstorming`) para "AI Engineering Patterns". Tratar comandos como instâncias de padrões maiores de delegação, extração de requisitos e isolamento.

---

## PARTE 2: PROMPTS EDITORIAIS POR CAPÍTULO

Abaixo estão os prompts estruturados para guiar a revisão e adaptação do manuscrito original, capítulo a capítulo, focando nas diretrizes do Amazon Kindle Publishing Guidelines (formato Reflowable).

### Capítulo 00 - Capa, Folha de Rosto e Sumário
```text
# CONTEXTO E PAPEL
Você é um Editor Técnico Sênior e Especialista em Publicações Digitais na Amazon KDP. Seu papel é converter a estrutura de capa, folha de rosto e sumário do arquivo `chapter-00.md` em um padrão semanticamente compatível com o Amazon Kindle Publishing Guidelines, priorizando o formato Reflowable (texto fluido) e legibilidade em telas e-ink monocromáticas.

# INSTRUÇÕES DE EXECUÇÃO
1. Análise de Compatibilidade KDP:
   - Substitua marcações absolutas em LaTeX por HTML5 semântico e CSS inline limpo compatível com a engine do Kindle.
   - Ajuste o contraste dos elementos tipográficos para garantir legibilidade perfeita em Dark Mode e telas monocromáticas.

2. Estruturação da Folha de Rosto (Title Page):
   - Preencha ou oriente a substituição semântica dos metadados de autoria, título e subtítulo.

3. Sumário Digital (TOC Duplo):
   - Estruture o sumário visual (`table of contents`) com links âncora internos funcionais para cada capítulo.
   - Indique as diretrizes para gerar o menu de navegação nativo do Kindle sem quebras de layout.

# FORMATO DE SAÍDA
- Código limpo em HTML/CSS semântico pronto para o e-reader.
- Checklist de validação no Kindle Previewer.
```

### Capítulo 01 - Introdução
```text
# CONTEXTO E PAPEL
Atue como um Editor Técnico Sénior especializado na preparação de manuscritos para a Amazon KDP (Reflowable). Analise o ficheiro `chapter-01.md` (Introdução) garantindo que as convenções visuais e o contrato de leitura estejam rigorosamente otimizados para e-readers de e-ink.

# INSTRUÇÕES DE EXECUÇÃO
1. Validação Pedagógica e Andragógica:
   - Verifique a clareza dos objetivos em «O que você vai conseguir fazer».
   - Proponha a inserção de um microdiagrama de fluxo semântico compacto antecipando as seis evidências.

2. Padronização dos Blocos de Destaque (Callouts):
   - Estruture os blocos (`[Nota]`, `[Dica Prática]`, etc.) com marcação HTML/CSS compatível com KDP, evitando recuos profundos.

3. Otimização Tipográfica e Interatividade:
   - Assegure que comandos e referências de terminal não sofram quebras artificiais.
   - Garanta hiperligações internas (links âncora) operacionais.

# FORMATO DE SAÍDA
- Diagnóstico técnico.
- Marcação semântica recomendada para blocos de destaque.
- Trecho revisto demonstrando melhorias.
```

### Capítulo 02 (Capítulo 1 - Rápido não é verificável)
```text
# CONTEXTO E PAPEL
Atue como um Editor Técnico Sénior especialista na Amazon KDP. O seu objetivo é analisar e otimizar o ficheiro `chapter-02.md`, assegurando rigor didático e estabilidade visual para a engine do Kindle.

# INSTRUÇÕES DE EXECUÇÃO
1. Análise Pedagógica e Didática:
   - Melhore o contraste didático nas «Três falhas típicas», propondo um quadro comparativo (O que o agente assumiu vs. O que a regra exigia vs. O teste cúmplice gerado).
   
2. Estabilidade de Layout e Renderização KDP:
   - Garanta o uso rigoroso de espaços sem quebra (`&nbsp;`) em moedas (ex.: `R$&nbsp;1.000,00`).
   - Otimize blocos de código TypeScript para evitar wraps truncados sob ampliação de fontes.
   - Diferencie visualmente inputs de prompt e outputs da IA.

# FORMATO DE SAÍDA
- Diagnóstico técnico detalhado.
- Trecho revisto com o novo quadro comparativo e formatação KDP.
```

### Capítulo 03 (Capítulo 2 - Agente = modelo + harness)
```text
# CONTEXTO E PAPEL
Atue como um Editor Técnico Sénior (Reflowable KDP). Analise e refine o ficheiro `chapter-03.md`, assegurando clareza didática andragógica e formatação semântica à prova de falhas em apps Kindle.

# INSTRUÇÕES DE EXECUÇÃO
1. Aprimoramento Didático:
   - Na secção «Prompt, ferramenta e skill», introduza uma tabela didática síntese (Conceito, Representação, Memória, Persistência).

2. Ajustes de Formatação e Estabilidade KDP:
   - Adapte caixas de diálogo simuladas de terminal (`<div>` de destaque) evitando recuos manuais rígidos.
   - Aplique proteção de quebra de linha (`white-space: nowrap` ou `<code>`) a comandos curtos no meio do texto.

# FORMATO DE SAÍDA
- Diagnóstico técnico.
- Proposta de formatação HTML/CSS.
- Trecho revisto.
```

### Capítulo 04 (Capítulo 3 - Skills)
```text
# CONTEXTO E PAPEL
Atue como Editor Técnico Sénior (Reflowable KDP). Refine o ficheiro `chapter-04.md` assegurando rigor didático, segurança de código e estabilidade visual.

# INSTRUÇÕES DE EXECUÇÃO
1. Resolução de Riscos de Layout KDP:
   - Corrija aninhamentos problemáticos (delimitadores YAML dentro de blockquotes) usando `<figure>` ou `<div>`.
   - Reformate comandos CLI longos com quebras de barra invertida (`\`) para clareza e facilidade de cópia.
   - Proteja caminhos de diretórios longos contra soft wraps destrutivos.

2. Validação Pedagógica:
   - Reforce visualmente o paralelismo entre as falhas do Cap 1 e as skills do fluxo mínimo.

# FORMATO DE SAÍDA
- Diagnóstico técnico e pedagógico.
- Código semântico HTML/CSS adaptado para os blocos de configuração.
```

### Capítulo 05 (Capítulo 4 - Evidência e SDD)
```text
# CONTEXTO E PAPEL
Atue como Consultor Editorial KDP. Analise o ficheiro `chapter-05.md` garantindo rigor instrucional e estabilidade em telas e-ink.

# INSTRUÇÕES DE EXECUÇÃO
1. Validação Pedagógica e Didática:
   - Organize visualmente as «seis evidências» vinculando o artefato ao seu local (repositório vs. terminal).
   - Destaque a progressão de custo do erro (frase na spec vs. refatoração de código).

2. Otimização de Layout KDP:
   - Evite tabelas largas no mapeamento do "fluxo mínimo". Utilize estruturas verticais.
   - Mantenha `&nbsp;` em dados monetários e `<code>` protegido para caminhos de diretórios.

# FORMATO DE SAÍDA
- Diagnóstico e marcação semântica sugerida.
```

### Capítulo 06 (Capítulo 5 - Esclarecer)
```text
# CONTEXTO E PAPEL
Atue como Editor Técnico Sénior KDP. Otimize o ficheiro `chapter-06.md` priorizando a conformidade com e-readers monocromáticos.

# INSTRUÇÕES DE EXECUÇÃO
1. Otimização KDP:
   - Formate o diálogo humano-IA em estruturas semânticas (`<div class="terminal-dialog">`) para evitar quebras em listas de múltipla escolha.
   - Proteja strings curtas no bloco `Acceptance criteria` com estilo monoespaçado.
   - Agrupe e harmonize as 4 caixas consecutivas de alerta para não sobrecarregar o ecrã verticalmente.

2. Validação Pedagógica:
   - Reforce a fronteira entre decisões de negócio (autoridade humana) e técnica (IA).

# FORMATO DE SAÍDA
- Diagnóstico técnico e estrutural de CSS para diálogos e callouts.
```

### Capítulo 07 (Capítulo 6 - Planejar)
```text
# CONTEXTO E PAPEL
Atue como Editor Técnico KDP. Analise `chapter-07.md` garantindo uma visualização livre de falhas de renderização.

# INSTRUÇÕES DE EXECUÇÃO
1. Otimização KDP e Layout:
   - Substitua sintaxe crua de checklist Markdown (`- [ ]`) por caracteres Unicode compatíveis ou HTML limpo, prevenindo colapsos no Kindle.
   - Proteja nomes de arquivos com datas (`AAAA-MM-DD`) contra hifenização automática indesejada.
   - Harmonize a sequência de blocos de `Aviso de Erro Comum`.

# FORMATO DE SAÍDA
- Trechos corrigidos, marcação e diagnóstico de renderização.
```

### Capítulo 08 (Capítulo 7 - Vermelho, depois verde)
```text
# CONTEXTO E PAPEL
Atue como Editor Técnico Sénior KDP. Analise `chapter-08.md` assegurando clareza visual para blocos de código e logs de terminal.

# INSTRUÇÕES DE EXECUÇÃO
1. Otimização de Layout KDP:
   - Formate saídas de consola (Vitest) em blocos `<pre><code>` que suportem bem os símbolos de interface (como `×` e `|`).
   - Ajuste o contraste dos trechos de código TypeScript ternário.

2. Validação Didática:
   - Reforce a prática de "falsificação deliberada" (quebrar o teste de propósito) como técnica avançada de QA.

# FORMATO DE SAÍDA
- CSS recomendado para consola e texto revisto.
```

### Capítulo 09 (Capítulo 8 - Escala, limites)
```text
# CONTEXTO E PAPEL
Atue como Editor KDP. Avalie `chapter-09.md` assegurando apresentação de nível executivo.

# INSTRUÇÕES DE EXECUÇÃO
1. Validação Pedagógica:
   - Fortaleça a seção de custos (tempo e tokens), consolidando o conhecimento arquitetural.
   
2. Otimização de Layout KDP:
   - Estruture listas contendo opções e comandos em inglês de forma limpa, evitando margens distorcidas.
   - Controle o espaçamento de blocos Bash de múltiplas linhas.

# FORMATO DE SAÍDA
- Diagnóstico, formatação recomendada.
```

### Capítulo 10 (Apêndices)
```text
# CONTEXTO E PAPEL
Atue como Editor Técnico KDP para formatar o `chapter-10.md` (Apêndices), garantindo navegabilidade e estabilidade de código extenso.

# INSTRUÇÕES DE EXECUÇÃO
1. Layout e Código Extenso KDP:
   - Quebre secções visualmente para garantir bom roteamento do TOC.
   - No Apêndice D, aplique CSS para código TypeScript extenso (compacto, sem `overflow-x`, indentação de 2 espaços).
   - No Apêndice C, garanta blocos sequenciais verticais em vez de tabelas laterais comparativas (que quebram em ecrãs).
   - Formate o Glossário (Apêndice B) com listas de definição HTML (`<dl>`) ou hanging indent.

# FORMATO DE SAÍDA
- Código fonte estruturado para Kindle e marcação HTML/CSS.
```