#!/bin/bash

### customer or partner, with list of existing
echo "Wähle Typ: Kunden [1], Partner [2] oder AdSy [3]:"
read usertype

if [ $usertype -eq 1 ]
then
  type=customers
  echo ""
  univention-ldapsearch -xLLL ou=* -b ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch ou | grep ou: | awk '{print $2}' | sort
  echo ""
  echo "Kunden wählen:"
  read shortname
elif [ $usertype -eq 2 ]
then
  type=partner
  echo ""
  univention-ldapsearch -xLLL ou=* -b ou=partner,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch ou | grep ou: | awk '{print $2}' | sort
  echo ""
  echo "Partner wählen:"
  read shortname
elif [ $usertype -eq 3 ]
then
  type=adsy
else
  echo "Bitte 1, 2 oder 3 wählen:"
  exit
fi

### ask for names
echo ""
echo "Namen des neuen Benutzers eingeben:"
echo "Vorname:"
read firstname
echo "Nachname:"
read lastname
echo "Email:"
read email

### create user
password=$(pwgen -s 12 1)

if [ $usertype -eq 3 ]
then
  echo "internen Benutzernamen eingeben:"
  read username
else
  #username=`echo $firstname | sed 's/ü/ue/g' | sed 's/ä/ae/g' | sed 's/ö/oe/g' | sed 's/Ü/Ue/g' | sed 's/Ä/Ae/g' | sed 's/Ö/Oe/g'``echo $lastname | tr '[:upper:]' '[:lower:]' | sed 's/ü/ue/g' | sed 's/ä/ae/g' | sed 's/ö/oe/g' | sed 's/ //g
  # use ${foo,,} to change to lower case because "tr '[:upper:]' '[:lower:]'" breaks when using umlaute
  # ${firstname,,} outpus $firstname in lowercase
  username=$(echo ${firstname,,}${lastname,,} | sed 's/ü/ue/g' | sed 's/ä/ae/g' | sed 's/ö/oe/g' | sed 's/ //g' | iconv -f UTF-8 -t ASCII//TRANSLIT)
  # make first letter uppercase
  username="${username^}"
fi


case "$type" in
  customers)
    udm users/user create \
      --position="ou=$shortname,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set username="$username" \
      --set firstname="$firstname" \
      --set lastname="$lastname" \
      --set description="$firstname $lastname" \
      --set primaryGroup="cn=adsy-customer,ou=customers,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set password="$password"\
      --set e-mail="$email" \
      --set shell="/bin/false"\
      --set CtxCfgTSLogon=0 \
      --policy-reference "cn=adsy-customer-policy,cn=UMC,cn=policies,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"\
      --option samba \
      --option kerberos \
      --option person \
      --option posix
    ;;
  partner)
    udm users/user create \
      --position="ou=$shortname,ou=partner,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set username="$username" \
      --set firstname="$firstname" \
      --set lastname="$lastname" \
      --set description="$firstname $lastname" \
      --set primaryGroup="cn=adsy-partner,ou=partner,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set password="$password"\
      --set e-mail="$email" \
      --set shell="/bin/false"\
      --set CtxCfgTSLogon=0 \
      --policy-reference "cn=adsy-partner-policy,cn=UMC,cn=policies,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"\
      --option samba \
      --option kerberos \
      --option person \
      --option posix
    ;;
  adsy)
    udm users/user create \
      --position="cn=users,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set username="$username" \
      --set firstname="$firstname" \
      --set lastname="$lastname" \
      --set description="$firstname $lastname" \
      --set primaryGroup="cn=adsy-user,cn=groups,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
      --set password="$password"\
      --set e-mail="$email" \
      --set shell="/bin/bash"\
      --set CtxCfgTSLogon=0 \
      --option samba \
      --option kerberos \
      --option person \
      --option posix
    ;;
esac

echo ""
echo "Bei Kunden: folgenden Informationen im AdSy Wiki auf der Kundenseite eintragen:";
echo "Benutzername: $username"
echo "Passwort:     $password"
echo "Emailadresse: $email"
echo ""

if [ $usertype -eq 3 ]
then
  exit
else
  echo "Wollen Sie den Benutzer in Gruppen einteilen? y/n"
  read askgroup

  case "$askgroup" in
    y)
      echo "Folgende Gruppen existieren: "
      # list all groups from partner or customer
      univention-ldapsearch -xLLL sambaGroupType=2 -b ou=$shortname,ou=$type,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch cn | grep cn: | awk '{print $2}'
      echo "Bitte Namen der Gruppe angeben oder N falls keine mehr."
      read groupname
      until [[ $groupname == "N" || $groupname == "n" ]]
      do
        udm users/user modify \
          --dn="uid=$username,ou=$shortname,ou=$type,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch" \
          --set groups="cn=$groupname,ou=$shortname,ou=$type,dc=adsy-ext,dc=becs,dc=adfinis-sygroup,dc=ch"
        echo "Bitte Namen der Gruppe angeben oder N falls keine mehr."
        read groupname
      done
      ;;
    n)
      exit
      ;;
  esac
fi
