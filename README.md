[![Build Status](https://travis-ci.org/adfinis-sygroup/adsycc.svg?branch=master)](https://travis-ci.org/adfinis-sygroup/adsycc)

# Adfinis SyGroup AG - Customer Center

This is still very much in progress.

## Prerequisites

Before you start, please make sure that the following tools are installed:
* node + npm
* bower
* docker + docker-compose

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
docker exec -it adsycc_backenddev1_1 /bin/bash
cd /usr/src/app/
make migrations

# fill vault with dummy data
make setup-vault
```
