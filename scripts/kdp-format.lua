-- Keeps front matter specific to each output format.
-- EPUB: drops raw LaTeX blocks, so no untitled page opens the book.
-- PDF: drops divs marked .epub-only (the EPUB table of contents).
local is_epub = FORMAT:match('epub') ~= nil

function RawBlock(el)
  if is_epub and el.format == 'latex' then
    return {}
  end
end

function Div(el)
  if not is_epub and el.classes:includes('epub-only') then
    return {}
  end
end
