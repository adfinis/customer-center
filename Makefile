install: install-frontend install-backend knex-migrations setup-vault setup-timed timed-test-data

install-frontend:
	cd frontend; yarn

install-backend:
	cd backend; yarn

test: test-backend test-frontend

test-backend:
	cd backend; yarn test

test-frontend:
	cd frontend; yarn test

knex-migrations:
	docker-compose exec backend make -C /usr/src/app migrations

setup-vault:
	./tools/docker/vault/scripts/init.sh

setup-timed:
	docker-compose exec timedbackend ./manage.py migrate
	docker-compose exec timedbackend ./manage.py createsuperuser

timed-test-data:
	docker-compose exec postgres psql -U test -d timed -f /tmp/timed-test-data.sql

setup-gitlab-runner:
	docker-compose exec gitlab-runner gitlab-runner register 

serve-local:
	docker-compose stop frontend
	cd frontend/;ember serve --proxy http://localhost:8080

deploy:
	(cd frontend; yarn; yarn build)
	(cd backend; yarn; yarn build; pm2 restart index)
