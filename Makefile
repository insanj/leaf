SHELL := /bin/bash -o pipefail

PUBLIC_URL=myleaf.fun

.PHONY: build
build: 
	npm run build
	rm -r -f docs
	mv build docs
	echo "$(PUBLIC_URL)" > docs/CNAME