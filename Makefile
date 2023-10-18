install-deps:
	npm install

build: install-deps
	npm run build

publish: build
	npm publish
