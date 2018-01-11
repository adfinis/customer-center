[![Build Status](https://travis-ci.org/adfinis-sygroup/customer-center.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/customer-center)

# Adfinis SyGroup AG - Customer Center

This is still very much in progress.

## Prerequisites

Before you start, please make sure that the following tools are installed:
* node + yarn
* docker + docker-compose
* vault (https://www.vaultproject.io/downloads.html)

To use the sysupport/timed part, clone the timed-backend repository on the same level as customer-center:

```shell
git clone git@github.com:adfinis-sygroup/timed-backend.git
```

## Setup

```shell
make install
docker-compose up

# setup LDAP structure
make setup-ldap
# sometimes the setup gets stuck with the message:
# Restarting bind9 daemon: ...done.
# Just interrupt it and run:
docker exec customercenter_ucs1_1 /usr/ucs/scripts/fill-dummy-data.sh


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
