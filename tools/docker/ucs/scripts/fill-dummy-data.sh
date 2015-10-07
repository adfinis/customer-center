#!/bin/bash

ldap_base="dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"

udm container/ou create --set name="customers" --set description="adsy customers" --position="$ldap_base"
udm groups/group create --set name="adsy-customer" --set description="adsy customer group" --position="ou=customers,$ldap_base"
udm policies/umc create --set name="adsy-customer-policy" --position="cn=UMC,cn=policies,$ldap_base"

udm settings/extended_attribute create \
  --position="cn=custom attributes,cn=univention,$ldap_base" \
  --set name=SySupport \
  --set module=users/user \
  --set tabName="SySupport Account" \
  --set tabPosition=2 \
  --set ldapMapping="univentionFreeAttribute1" \
  --set objectClass="univentionFreeAttributes" \
  --set longDescription="SySupport User mapping for the Adfinis SyGroup Customer Center" \
  --set shortDescription="SySupport AdSyCC mapping" \
  --set CLIName=sysupport \
  --set mayChange=1

/usr/ucs/scripts/create-new-customer.sh test1 "Test customer admin user one"
/usr/ucs/scripts/create-new-customer.sh test2 "Test customer admin user two"
/usr/ucs/scripts/create-new-customer.sh test3 "Test customer admin user three"
