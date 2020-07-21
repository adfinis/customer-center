[![Build Status](https://travis-ci.org/adfinis-sygroup/customer-center.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/customer-center)

# Adfinis AG - Customer Center

This is still very much in progress.

## Prerequisites

Before you start, please make sure that the following tools are installed:

* Node + Yarn
* Docker + Docker Compose
* [Vault](https://www.vaultproject.io/downloads.html)

## Setup

* `ln -s config-dev.js backend/config.js` (for development)
* `make install-frontend install-backend`
* `docker-compose up -d`
* `make install`

## Configuration

*Info: for development setup see Development*

Set `ldap.bindCredentials` and `services.timed.password` in `backend/config.js` to their respective passwords.

To use the timedbackend service you need to configure the api user in the django admin.

Configure the endpoints as needed.

## Development

Run `make serve-local` to start the frontend directly.

The default password for all users is `123qweasd`.

## Deployment

Clone the repository and execute the following commands on your production system:

```
git pull
make deploy
```

### LDAP

To authenticate against LDAP, we used the [Passport LDAP authentication strategy](https://github.com/vesse/passport-ldapauth)
