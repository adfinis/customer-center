#!/bin/bash

username=$1
password=$2

ldap_base="dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"

udm groups/group create --set name=wiki --set description="Wiki-Funktion für Admin" --position "cn=groups,$ldap_base"
udm groups/group create --set name=redmine --set description="Redmine-Funktion Admin" --position "cn=groups,$ldap_base"
udm groups/group create --set name=rhev --set description="RHEV-Funktion Admin" --position "cn=groups,$ldap_base"
udm groups/group create --set name=mon --set description="Monitoring-Funktion Admin" --position "cn=groups,$ldap_base"
udm groups/group create --set name=sysupport --set description="SySupport-Funktion Admin" --position "cn=groups,$ldap_base"
udm groups/group create --set name=vault --set description="Vault-Funktion Admin" --position "cn=groups,$ldap_base"

udm groups/group create --set name="adsy-user" --set description="adsy user group" --position="cn=groups,$ldap_base"
udm users/user create \
      --position="cn=users,$ldap_base" \
      --set username="$username" \
      --set firstname="Solaire" \
      --set lastname="Astora" \
      --set description="Solaire of Astora" \
      --set primaryGroup="cn=adsy-user,cn=groups,$ldap_base" \
      --set password="$password"\
      --set e-mail="$username@adfinis-sygroup.ch" \
      --set shell="/bin/bash"\
      --set CtxCfgTSLogon=0 \
      --option kerberos \
      --option person \
      --option posix \
      --set groups="cn=wiki,cn=groups,$ldap_base" \
      --set groups="cn=redmine,cn=groups,$ldap_base" \
      --set groups="cn=rhev,cn=groups,$ldap_base" \
      --set groups="cn=sysupport,cn=groups,$ldap_base" \
      --set groups="cn=mon,cn=groups,$ldap_base" \
      --set groups="cn=vault,cn=groups,$ldap_base"
