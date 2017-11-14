[![Build Status](https://travis-ci.org/adfinis-sygroup/adsycc.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/adsycc)

# Adfinis SyGroup AG - Customer Center

This is still very much in progress.

## Prerequisites

Before you start, please make sure that the following tools are installed:
* node + npm
* bower
* docker + docker-compose
* vault (https://www.vaultproject.io/downloads.html)

## Setup

```shell
make install
docker-compose up

# setup LDAP structure
make setup-ldap
# sometimes the setup gets stuck with the message:
# Restarting bind9 daemon: ...done.
# Just interrupt it and run:
docker exec adsycc_ucs1_1 /usr/ucs/scripts/fill-dummy-data.sh


# apply DB migrations
make knex-migrations

# fill vault with dummy data
make setup-vault

# finish setup of the timed backend
make setup-timed
```

## Configuration
Copy and rename the `config.example.js` to `config.js` and configure the needed endpoints.

Unclear parts of the configuration will have a comment with further information.

## Development

Run `docker-compose up` (inital setup) or `docker-compose start`.

## Deployment

Clone the repository and execute the following commands on your production system:
```
git pull
make deploy
```

### LDAP
To authenticate against LDAP, we used the [Passport LDAP authentication strategy](https://github.com/vesse/passport-ldapauth)
