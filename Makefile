USERNAME?=user
PASSWORD?=123qweasd

install: install-frontend install-backend

install-frontend:
	cd frontend; yarn

install-backend:
	cd backend; yarn

test: test-backend test-frontend

test-backend:
	cd backend; yarn test

test-frontend:
	cd frontend; yarn test

setup-ldap:
	docker exec customercenter_ucs1_1 /usr/lib/univention-system-setup/scripts/setup-join.sh
	docker exec customercenter_ucs1_1 /usr/ucs/scripts/fill-dummy-data.sh

knex-migrations:
	docker exec customercenter_backenddev1_1 make -C /usr/src/app migrations

create-customer:
	docker exec -it customercenter_ucs1_1 /usr/ucs/scripts/create-new-customer.sh $(USERNAME) $(PASSWORD)

create-admin:
	docker exec -it customercenter_ucs1_1 /usr/ucs/scripts/create-new-admin.sh $(USERNAME) $(PASSWORD)

setup-vault:
	./tools/docker/vault/scripts/init.sh

setup-timed:
	docker-compose exec timed1 ./manage.py migrate
	docker-compose exec timed1 ./manage.py createsuperuser

serve-local:
	docker-compose stop frontenddev1
	cd frontend/;ember serve --proxy http://localhost:8080

deploy:
	(cd frontend; yarn; yarn build)
	(cd backend; yarn; yarn build; pm2 restart index)
