test:
	NODE_ENV=testing \
		node_modules/.bin/gulp test

lint:
	NODE_ENV=testing \
		node_modules/.bin/gulp lint

test-watch:
	NODE_ENV=testing \
		node_modules/.bin/gulp test-watch

migrations:
	node --require=@babel/register \
		node_modules/.bin/knex migrate:latest

test-migrations:
	node --require=@babel/register \
		node_modules/.bin/knex migrate:latest

.PHONY: test lint test-watch migrations
