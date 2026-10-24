#!/usr/bin/env bash
set -euo pipefail

BOOK_LANG="${1:-pt}"

command -v pandoc  >/dev/null || { echo "Error: pandoc not found" >&2; exit 1; }
command -v xelatex >/dev/null || { echo "Error: xelatex not found" >&2; exit 1; }

mkdir -p dist

if [ "$BOOK_LANG" = "en" ]; then
  CHAPTERS_DIR="chapters/en"
  METADATA_FILE="kdp-metadata-en.yaml"
  LAYOUT_FILE="kdp-pdf-en.yaml"
  OUTPUT="dist/book-en.pdf"
  TOC_TITLE="Table of Contents"
else
  CHAPTERS_DIR="chapters/pt"
  METADATA_FILE="kdp-metadata.yaml"
  LAYOUT_FILE="kdp-pdf.yaml"
  OUTPUT="dist/book.pdf"
  TOC_TITLE="Sumário"
fi

shopt -s nullglob
files=("$CHAPTERS_DIR"/chapter-*.md)
[[ ${#files[@]} -gt 0 ]] || { echo "Error: no chapter files found in $CHAPTERS_DIR/" >&2; exit 1; }

pandoc "${files[@]}" \
  --metadata-file="$METADATA_FILE" \
  --metadata-file="$LAYOUT_FILE" \
  --pdf-engine=xelatex \
  --lua-filter=scripts/kdp-format.lua \
  --output="$OUTPUT"

echo "✓ $OUTPUT generated."
