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
    {{{BOOK\_TITLE\_EN}}};
  % Subtitle
  \node[anchor=north west, text=covermuted,
        font=\fontsize{17}{22}\selectfont,
        text width=11cm, align=left]
    at ([xshift=1.8cm, yshift=-11cm]current page.north west)
    {{{BOOK\_SUBTITLE\_EN}}};
  % Rule
  \draw[coveraccent, line width=3pt]
    ([xshift=1.8cm, yshift=-12.2cm]current page.north west) --
    ([xshift=7.8cm, yshift=-12.2cm]current page.north west);
  % Author
  \node[anchor=south west, text=covermuted,
        font=\fontsize{15}{20}\selectfont]
    at ([xshift=1.8cm, yshift=2.5cm]current page.south west)
    {{{AUTHOR\_NAME}}};
\end{tikzpicture}

\end{titlepage}
\nopagecolor
\tableofcontents
\clearpage
```
