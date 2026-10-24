#!/usr/bin/env bash
set -euo pipefail

BOOK_LANG="${1:-pt}"

if [ "$BOOK_LANG" = "en" ]; then
  CHAPTERS_DIR="chapters/en"
  OUTPUT="book-en.md"
  TITLE="{{BOOK_TITLE_EN}}"
else
  CHAPTERS_DIR="chapters/pt"
  OUTPUT="book.md"
  TITLE="{{BOOK_TITLE}}"
fi

first=true

{
  echo "# $TITLE"
  echo ""
  for file in "$CHAPTERS_DIR"/chapter-*.md; do
    if [ "$first" = true ]; then
      first=false
    else
      echo "---"
      echo ""
    fi
    cat "$file"
    echo ""
  done
} > "$OUTPUT"

echo "✓ $OUTPUT gerado."
