```{=latex}
\begin{titlepage}
\thispagestyle{empty}

\begin{tikzpicture}[remember picture, overlay]
  % Cover image, scaled to the page width; the
  % 1.6:1 image is taller than the 2:3 page, so it
  % is anchored at the bottom to keep the author
  \node[inner sep=0pt, anchor=south]
    at (current page.south)
    {\includegraphics[width=\paperwidth]{cover.jpg}};
\end{tikzpicture}

\end{titlepage}
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
