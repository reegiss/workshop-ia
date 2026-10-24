#!/usr/bin/env bash
# Converts cover/cover-pt.svg and cover/cover-en.svg to cover.jpg / cover-en.jpg
# Requires: inkscape OR rsvg-convert (librsvg) + ImageMagick
set -euo pipefail

svg_to_jpg() {
  local src="$1"
  local dst="$2"

  if command -v inkscape &>/dev/null; then
    inkscape "$src" --export-type=png --export-filename="${dst%.jpg}.png" --export-width=1600
    convert "${dst%.jpg}.png" -quality 90 "$dst"
    rm "${dst%.jpg}.png"
  elif command -v rsvg-convert &>/dev/null && command -v convert &>/dev/null; then
    rsvg-convert -w 1600 "$src" | convert png:- -quality 90 "$dst"
  elif command -v rsvg-convert &>/dev/null; then
    rsvg-convert -w 1600 -f png "$src" -o "${dst%.jpg}.png"
    echo "⚠ ImageMagick not found. PNG saved at ${dst%.jpg}.png — convert manually to JPG."
  else
    echo "Error: install inkscape or librsvg (brew install librsvg) to export covers." >&2
    exit 1
  fi
}

svg_to_jpg "cover/cover-pt.svg" "cover.jpg"
echo "✓ cover.jpg"

svg_to_jpg "cover/cover-en.svg" "cover-en.jpg"
echo "✓ cover-en.jpg"
