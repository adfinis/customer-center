install: cache-clean install-frontend install-backend

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install

cache-clean:
	npm cache clean
	bower cache clean

test: test-backend test-frontend

test-backend:
	npm --prefix=./backend run test

test-frontend:
	npm --prefix=./frontend run test
