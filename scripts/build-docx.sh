#!/usr/bin/env bash
set -euo pipefail

BOOK_LANG="${1:-pt}"

command -v pandoc >/dev/null || { echo "Error: pandoc not found" >&2; exit 1; }

mkdir -p dist

if [ "$BOOK_LANG" = "en" ]; then
  CHAPTERS_DIR="chapters/en"
  METADATA_FILE="kdp-metadata-en.yaml"
  OUTPUT="dist/book-en.docx"
  TOC_TITLE="Table of Contents"
else
  CHAPTERS_DIR="chapters/pt"
  METADATA_FILE="kdp-metadata.yaml"
  OUTPUT="dist/book.docx"
  TOC_TITLE="Sumário"
fi

CHAPTERS=("$CHAPTERS_DIR"/chapter-*.md)

echo "Building DOCX ($BOOK_LANG) → $OUTPUT"

pandoc "${CHAPTERS[@]}" \
  --metadata-file="$METADATA_FILE" \
  --toc \
  --toc-depth=2 \
  --table-of-contents \
  -V toc-title="$TOC_TITLE" \
  --standalone \
  -o "$OUTPUT"

echo "✓ $OUTPUT generated."
