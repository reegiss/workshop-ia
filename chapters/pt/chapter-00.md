```{=latex}
\definecolor{coverbg}{HTML}{1a1a2e}
\definecolor{covershape}{HTML}{16213e}
\definecolor{coveraccent}{HTML}{e94560}
\definecolor{covermuted}{HTML}{a0aec0}

\begin{titlepage}
\thispagestyle{empty}
\pagecolor{coverbg}

\begin{tikzpicture}[remember picture, overlay]
  % Accent bar
  \fill[coveraccent]
    (current page.north west) rectangle
    ([xshift=14pt]current page.south west);
  % Decorative triangle
  \fill[covershape]
    (current page.north east) --
    ([yshift=-16cm]current page.north east) --
    ([xshift=-16cm]current page.north east) -- cycle;
  % Title
  \node[anchor=north west, text=white,
        font=\fontsize{34}{44}\selectfont\bfseries,
        text width=11cm, align=left]
    at ([xshift=1.8cm, yshift=-4cm]current page.north west)
    {Desenvolvimento Verificável com Agentes de Código};
  % Subtitle
  \node[anchor=north west, text=covermuted,
        font=\fontsize{17}{22}\selectfont,
        text width=11cm, align=left]
    at ([xshift=1.8cm, yshift=-11cm]current page.north west)
    {Evidências, Spec-Driven Development e TDD no terminal};
  % Rule
  \draw[coveraccent, line width=3pt]
    ([xshift=1.8cm, yshift=-12.2cm]current page.north west) --
    ([xshift=7.8cm, yshift=-12.2cm]current page.north west);
  % Author
  \node[anchor=south west, text=covermuted,
        font=\fontsize{15}{20}\selectfont]
    at ([xshift=1.8cm, yshift=2.5cm]current page.south west)
    {Regis Araujo Melo};
\end{tikzpicture}

\end{titlepage}
\nopagecolor
```

## Aviso editorial {#aviso-editorial .unnumbered .unlisted}

© 2026 Regis Araujo Melo. Todos os direitos reservados.

Nenhuma parte desta obra pode ser reproduzida ou distribuída sem autorização por escrito do autor, exceto em citações breves com indicação da fonte.

Comandos, nomes de skills e opções das CLIs foram conferidos em outubro de 2026 e podem mudar em versões posteriores. Confira a documentação da sua CLI antes de executá-los.

As informações são fornecidas sem garantia. Revise todo comando e todo código antes de executá-los no seu ambiente.

Claude Code é marca da Anthropic. GitHub Copilot é marca da GitHub, Inc. Os nomes identificam os produtos e não indicam afiliação nem endosso.

```{=latex}
\tableofcontents
\clearpage
```

::: epub-only
## Sumário {#sumario .unnumbered}

- [Introdução](#introducao)

**Parte I — Fundamentos**

- [Capítulo 1 — Rápido não é verificável](#cap-1)
- [Capítulo 2 — Agente = modelo + harness](#cap-2)
- [Capítulo 3 — Skills: um processo em arquivo](#cap-3)
- [Capítulo 4 — Evidência e Spec-Driven Development](#cap-4)

**Parte II — Na prática**

- [Capítulo 5 — Esclarecer](#cap-5)
- [Capítulo 6 — Planejar](#cap-6)
- [Capítulo 7 — Vermelho, depois verde](#cap-7)

**Parte III — Além do primeiro teste**

- [Capítulo 8 — Escala, limites e próximos passos](#cap-8)

**Apêndices**

- [Apêndice A — Mapa das skills](#apendice-a)
- [Apêndice B — Glossário](#apendice-b)
- [Apêndice C — Equivalências entre as CLIs](#apendice-c)
- [Apêndice D — Projeto do exemplo](#apendice-d)
:::
