test: 
	NODE_ENV=testing node_modules/.bin/babel-node node_modules/.bin/gulp test

lint:
	NODE_ENV=testing \
		node_modules/.bin/babel-node \
		node_modules/.bin/gulp lint

test-watch:
	NODE_ENV=testing \
		node_modules/.bin/babel-node \
		node_modules/.bin/gulp test-watch

migrations:
	node_modules/.bin/babel-node \
		node_modules/.bin/knex migrate:latest

test-migrations:
	NODE_ENV=testing node_modules/.bin/babel-node \
		node_modules/.bin/knex migrate:latest

.PHONY: test lint test-watch migrations
