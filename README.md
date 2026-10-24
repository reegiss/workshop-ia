# Book Template

A Pandoc-based template for writing and publishing technical books in **pt-BR** and **English**, targeting Amazon KDP (PDF + EPUB + DOCX).

## Stack

- **Prose:** Markdown, one file per chapter
- **Build:** [Pandoc](https://pandoc.org) + XeLaTeX
- **Fonts:** Palatino (body), JetBrains Mono (code) — change in `kdp-pdf.yaml`
- **Output formats:** PDF (6×9 in, KDP-ready), EPUB, DOCX
- **Languages:** pt-BR (`chapters/`) and English (`chapters-en/`) in the same repo

## Quick start

### 1. Use this template

Click **"Use this template"** on GitHub to create a new repository.

### 2. Replace placeholders

Search for `{{` across all files and fill in:

| Placeholder | Description |
|---|---|
| `{{BOOK_TITLE}}` | Portuguese title |
| `{{BOOK_TITLE_EN}}` | English title |
| `{{BOOK_SUBTITLE}}` | Portuguese subtitle |
| `{{BOOK_SUBTITLE_EN}}` | English subtitle |
| `{{AUTHOR_NAME}}` | Author full name |
| `{{YEAR}}` | Publication year |

### 3. Write your chapters

Edit `chapters/chapter-NN.md` for pt-BR, `chapters-en/chapter-NN.md` for English.
Add new chapters by creating `chapter-03.md`, `chapter-04.md`, etc. (zero-padded).

### 4. Build

```bash
# Dependencies
brew install pandoc
brew install --cask mactex   # or texlive

# pt-BR
make pdf
make epub
make docx

# English
make pdf BOOK_LANG=en
make epub BOOK_LANG=en
make docx BOOK_LANG=en
```

Output lands in `dist/`.

### 5. Regenerate the combined markdown

```bash
make book           # → book.md (pt-BR)
make book BOOK_LANG=en  # → book-en.md (English)
```

## Directory structure

```
.
├── chapters/
│   ├── pt/             # pt-BR chapters (source of truth)
│   │   ├── chapter-00.md   # Title page
│   │   ├── chapter-01.md   # Introduction
│   │   └── chapter-02.md   # Chapter 1 skeleton
│   └── en/             # English translation
├── scripts/
│   ├── generate-book.sh
│   ├── build-pdf.sh
│   ├── build-epub.sh
│   ├── build-docx.sh
│   └── split-chapters.sh
├── dist/                # Generated outputs (gitignored)
├── kdp-metadata.yaml    # KDP metadata (pt-BR)
├── kdp-metadata-en.yaml # KDP metadata (en)
├── kdp-pdf.yaml         # PDF layout (shared)
├── kdp-epub.yaml        # EPUB config (shared)
├── Makefile
└── .gitignore
```

## Cover image

The `cover/` directory contains editable SVG templates (`cover-pt.svg`, `cover-en.svg`).
Open them in Figma, Inkscape, or any vector editor to customize.

To export to JPG (requires `inkscape` or `librsvg` + ImageMagick):

```bash
./scripts/export-cover.sh
```

This generates `cover.jpg` and `cover-en.jpg` in the repo root, which are picked up automatically by `make epub`.

## License

Replace with your own license.
