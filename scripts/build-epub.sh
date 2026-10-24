#!/usr/bin/env bash
set -euo pipefail

BOOK_LANG="${1:-pt}"

command -v pandoc >/dev/null || { echo "Error: pandoc not found" >&2; exit 1; }

mkdir -p dist

if [ "$BOOK_LANG" = "en" ]; then
  CHAPTERS_DIR="chapters/en"
  METADATA_FILE="kdp-metadata-en.yaml"
  LAYOUT_FILE="kdp-epub-en.yaml"
  OUTPUT="dist/book-en.epub"
  TOC_TITLE="Table of Contents"
  COVER="cover-en.jpg"
else
  CHAPTERS_DIR="chapters/pt"
  METADATA_FILE="kdp-metadata.yaml"
  LAYOUT_FILE="kdp-epub.yaml"
  OUTPUT="dist/book.epub"
  TOC_TITLE="Sumário"
  COVER="cover.jpg"
fi

shopt -s nullglob
files=("$CHAPTERS_DIR"/chapter-*.md)
[[ ${#files[@]} -gt 0 ]] || { echo "Error: no chapter files found in $CHAPTERS_DIR/" >&2; exit 1; }

cmd=(pandoc "${files[@]}"
  --metadata-file="$METADATA_FILE"
  --metadata-file="$LAYOUT_FILE"
  --shift-heading-level-by=-1
  --css=kdp-epub.css
  --lua-filter=scripts/kdp-format.lua
  --syntax-highlighting=monochrome
  --toc-depth=1
  -V "toc-title=$TOC_TITLE")

if [ -f "$COVER" ]; then
  cmd+=(--epub-cover-image="$COVER")
else
  echo "⚠ $COVER not found — EPUB generated without cover."
fi

cmd+=(--output="$OUTPUT")
"${cmd[@]}"

echo "✓ $OUTPUT generated."
