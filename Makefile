install: install-frontend install-backend knex-migrations setup-vault setup-timed timed-test-data

install-frontend:
	@yarn --cwd=frontend install

install-backend:
	@yarn --cwd=backend install

test: test-backend test-frontend

test-backend:
	@yarn --cwd=backend test

test-frontend:
	@yarn --cwd=frontend test

knex-migrations:
	docker-compose exec backend make -C /usr/src/app migrations

setup-vault:
	echo "Vault integration is disabled."
	#docker-compose exec vault sh ./tmp/vault/init.sh

setup-timed:
	docker-compose exec timedbackend ./manage.py migrate
	docker-compose exec timedbackend ./manage.py createsuperuser

timed-test-data:
	docker-compose exec postgres psql -U test -d timed -f /tmp/timed-test-data.sql

setup-gitlab-runner:
	docker-compose exec gitlab-runner gitlab-runner register

serve-local:
	docker-compose stop frontend
	@yarn --cwd=frontend start-proxy

deploy: install-frontend install-backend
	(cd frontend && yarn build)
	(cd backend && make migrations && yarn build && pm2 restart index)
