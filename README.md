[![Build Status](https://travis-ci.org/adfinis-sygroup/customer-center.svg?branch=main)](https://travis-ci.org/adfinis-sygroup/customer-center)

# Adfinis AG - Customer Center

Adfinis customer support portal with LDAP and Timed integration.

## Prerequisites

* Node + Yarn
* Docker + Docker Compose

## Setup

* `git clone git@github.com:adfinis-sygroup/customer-center.git`
* `cd customer-center`
* `make init`

## Development

Run `make serve-local` to start the frontend directly.

### Test Accounts
* `admin1`
* `user1`
* `customer1`
* `customer2`

The password for all users is `123qweasd`.

### Debugger
To attach a debugger you need to run the backend with `yarn debug` (in the container). There is a configuration file for VSCode but you can use any Node debugger to attach to the service.

### Timed Backend
The data source for the Customer Center is a Timed backend instance. The development instance is available at http://localhost:8000/admin/ and you will have had to create the credentials (superuser) when running `make init`.

### KeyCloak
To simulate our SSO we are running a KeyCloak instance. All you ever need is the admin console. The DirectGrant is configured through a "client" named `timed-confidential`.
* Address  
  http://localhost:8080/auth/admin/
* Username  
  `admin`
* Password  
  `admin`

### phpLDAPadmin
* Address  
  http://localhost:6443/
* Username (prefilled)  
  `cn=admin,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch`
* Password  
  `123qwe`

### MailHog
All sent emails can be viewed via the MailHog web-interface at http://localhost:8025/.

## Deployment

Clone the repository and execute the following commands on your production system:

```
git pull
make deploy
```
