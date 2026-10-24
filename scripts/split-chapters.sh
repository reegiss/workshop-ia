#!/usr/bin/env bash
# Splits book.md (or book-en.md) back into chapters/chapter-NN.md files.
# Usage: ./scripts/split-chapters.sh [pt|en]
set -euo pipefail

BOOK_LANG="${1:-pt}"

if [ "$BOOK_LANG" = "en" ]; then
  INPUT="book-en.md"
  OUTPUT_DIR="chapters/en"
else
  INPUT="book.md"
  OUTPUT_DIR="chapters/pt"
fi

[[ -f "$INPUT" ]] || { echo "Error: $INPUT not found" >&2; exit 1; }

mkdir -p "$OUTPUT_DIR"

awk -v dir="$OUTPUT_DIR" '
  /^---$/ { next }
  /^## / {
    if (outfile) close(outfile)
    n++
    outfile = sprintf("%s/chapter-%02d.md", dir, n)
  }
  outfile { print > outfile }
' "$INPUT"

echo "✓ Chapters written to $OUTPUT_DIR/"
