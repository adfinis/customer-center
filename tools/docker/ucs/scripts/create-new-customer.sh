#!/bin/bash

shortname=$1
fullname=$2

### OU für Kunden erstellen
udm container/ou create --set name=$shortname --set description="$fullname" --position ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch

### Funktionsgruppen in der Kunden-OU erstellen
udm groups/group create --set name=$shortname-wiki --set description="Wiki-Funktion für Kunde $fullname" --position "ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"
udm groups/group create --set name=$shortname-redmine --set description="Redmine-Funktion für Kunde $fullname" --position "ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"
udm groups/group create --set name=$shortname-rhev --set description="RHEV-Funktion für Kunde $fullname" --position "ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"
udm groups/group create --set name=$shortname-mon --set description="Monitoring-Funktion für Kunde $fullname" --position "ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"
udm groups/group create --set name=$shortname-sysupport --set description="SySupport-Funktion für Kunde $fullname" --position "ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"

### Admin Benutzer erstellen
#password=`pwgen -s 12 1`
password=${shortname}123qwe

### Klammern und ^ um ersten Buchstaben gross zu setzen
adminuser=${shortname^}-admin
email="admin@${shortname}.ch"

udm users/user create \
  --position="ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set username="$adminuser" \
  --set firstname="Adminuser" \
  --set lastname="$shortname" \
  --set e-mail="$email" \
  --set description="Adminuser der Firma $fullname" \
  --set primaryGroup="cn=adsy-customer,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set password="$password"\
  --set shell="/bin/false"\
  --set CtxCfgTSLogon=0 \
  --policy-reference "cn=default-umc-users,cn=UMC,cn=policies,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --option samba \
  --option kerberos \
  --option person \
  --option posix \
  --set groups="cn=$shortname-wiki,ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set groups="cn=$shortname-redmine,ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set groups="cn=$shortname-rhev,ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set groups="cn=$shortname-sysupport,ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
  --set groups="cn=$shortname-mon,ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"

echo ""
echo "Folgenden Informationen im AdSy Wiki auf der Startseite des Kunden eintragen:";
echo "Administratorbenutzer:	$adminuser"
echo "Administratorpasswort:	$password"
echo ""
echo "Weitere Benutzer mit dem Skript create-new-user.sh erstellen."
echo ""
