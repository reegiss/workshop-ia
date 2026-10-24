BOOK_LANG ?= pt

.PHONY: all pdf epub docx book clean

all: pdf epub

pdf:
	./scripts/build-pdf.sh $(BOOK_LANG)

epub:
	./scripts/build-epub.sh $(BOOK_LANG)

docx:
	./scripts/build-docx.sh $(BOOK_LANG)

book:
	./scripts/generate-book.sh $(BOOK_LANG)

clean:
	rm -rf dist
