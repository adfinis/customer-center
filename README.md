[![Build Status](https://travis-ci.org/adfinis-sygroup/customer-center.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/customer-center)

# Adfinis AG - Customer Center

Adfinis customer support portal with LDAP and Timed integration.

## Prerequisites

* Node + Yarn
* Docker + Docker Compose

## Setup

* `git clone git@github.com:adfinis-sygroup/customer-center.git`
* `cd customer-center`
* `./provisioning/init.sh`

## Configuration

*Info: for development setup see Development*

Set `ldap.bindCredentials` and `services.timed.password` in `backend/config.js` to their respective passwords.

To use the timedbackend service you need to configure the api user in the django admin.

Configure the endpoints as needed.

## Development

Run `make serve-local` to start the frontend directly.

The default password for all users is `123qweasd`.
### Debugger
To attach a debugger you need to run the backend with `yarn debug` (in the container). There is a configuration file for VSCode but you can use any Node debugger to attach to the service.


## Deployment

Clone the repository and execute the following commands on your production system:

```
git pull
make deploy
```

### LDAP

To authenticate against LDAP, we used the [Passport LDAP authentication strategy](https://github.com/vesse/passport-ldapauth).
