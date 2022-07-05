start:
	npm start

install:
	npm ci

publish:
	npm publish --access=public

# TODO: добавить линтеры и тесты
lint:
	npx eslint .

test:
	echo no tests