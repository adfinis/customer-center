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
	docker exec adsycc_ucs1_1 /usr/lib/univention-system-setup/scripts/setup-join.sh
	docker exec adsycc_ucs1_1 /usr/ucs/scripts/fill-dummy-data.sh

knex-migrations:
	docker exec adsycc_backenddev1_1 make -C /usr/src/app migrations

create-user:
	docker exec -it adsycc_ucs1_1 /usr/ucs/scripts/create-new-user.sh

setup-vault:
	./tools/docker/vault/scripts/init.sh

deploy:
	(cd frontend; yarn; yarn build)
	(cd backend; yarn; yarn build; pm2 restart index)
