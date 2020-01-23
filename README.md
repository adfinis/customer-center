[![Build Status](https://travis-ci.org/adfinis-sygroup/customer-center.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/customer-center)

# Adfinis SyGroup AG - Customer Center

This is still very much in progress.

## Prerequisites

Before you start, please make sure that the following tools are installed:

* node + yarn
* docker + docker-compose
* vault (https://www.vaultproject.io/downloads.html)

## Setup

```shell
make install-frontend install-backend
docker-compose up
make install
```

## Configuration

Set `ldap.bindCredentials` and `services.timed.password` in `backend/config.js` to their respective passwords.

To use the timedbackend service you need to configure the api user in the django admin.

Configure the endpoints as needed.

## Development

Change `config-dev.js` to `config.js`

Run `docker-compose up` (inital setup) or `docker-compose start`.

## Deployment

Clone the repository and execute the following commands on your production system:

```
git pull
make deploy
```

### LDAP

To authenticate against LDAP, we used the [Passport LDAP authentication strategy](https://github.com/vesse/passport-ldapauth)
