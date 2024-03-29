init:
	./provisioning/init.sh

install: install-frontend setup-timed timed-test-data

install-frontend:
	@yarn --cwd=frontend install

test: test-frontend

test-frontend:
	@yarn --cwd=frontend test

setup-timed:
	docker-compose exec timedbackend ./manage.py migrate
	docker-compose exec timedbackend ./manage.py createsuperuser

timed-test-data:
	docker-compose exec postgres psql -U test -d timed -f /tmp/timed-test-data.sql

serve-local:
	docker-compose stop frontend
	@yarn --cwd=frontend start-proxy

deploy: install-frontend
	@yarn --cwd=frontend build
