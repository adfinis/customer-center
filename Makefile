install: cache-clean install-frontend install-backend

install-frontend:
	cd frontend && npm install
	cd frontend && bower install

install-backend:
	cd backend && npm install

cache-clean:
	bower cache clean

test: test-backend test-frontend

test-backend:
	npm --prefix=./backend run test

test-frontend:
	npm --prefix=./frontend run test

setup-ldap:
	docker exec adsycc_ucs1_1 /usr/lib/univention-system-setup/scripts/setup-join.sh
	docker exec adsycc_ucs1_1 /usr/ucs/scripts/fill-dummy-data.sh

create-user:
	docker exec -it adsycc_ucs1_1 /usr/ucs/scripts/create-new-user.sh

setup-vault:
	./tools/docker/vault/scripts/init.sh
