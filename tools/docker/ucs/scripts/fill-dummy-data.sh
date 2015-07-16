#!/bin/bash

udm container/ou create --set name="customers" --set description="adsy customers" --position dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch
udm groups/group create --set name="adsy-customer" --set description="adsy customer group" --position ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch

/usr/ucs/scripts/create-new-customer.sh test1 "Test customer one"
/usr/ucs/scripts/create-new-customer.sh test2 "Test customer two"
/usr/ucs/scripts/create-new-customer.sh test3 "Test customer three"
