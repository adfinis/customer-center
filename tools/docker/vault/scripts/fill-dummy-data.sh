#!/bin/bash

function post {
  curl \
    -X POST \
    -H "X-Vault-Token:myroot" \
    -H 'Content-type: application/json' \
    -d $2 \
    http://127.0.0.1:8200/v1/secret/$1
}

for i in {1..4}
do
  post "firewall/abc04-fw0$i.dummy-domain.ch" "{\"admin\":\"topsecret\"}"
done

for user in "Hans-Peter" "Max-Mustermann" "Bea-Beispiel" "Tom-Taylor" "Adfinis-SyGroup-AG"
do
  post "firewall/abc04-fw02.dummy-domain.ch/VPN_Benutzer-Client_VPN/$user" "{\"user\":\"topsecret\"}"
done

for user in "Firma_Example_AG" "Beat-Beispiel" "Martin-Frieden"
do
  post "firewall/ieu04-fw02.dummy-domain.ch/VPN_Benutzer-OpenVPN_Firma_Example_AG/$user" "{\"$user\":\"topsecret\"}"
done

for i in 10 11 12 13
do
  post "system/Server_Uni_Core/def04-sr$i.dummy-domain.ch" "{\"root\":\"topsecret\"}"
done

for i in 20 21 22 25
do
  post "system/Server_Diverse/def04-sr$i.dummy-domain.ch" "{\"root\":\"topsecret\"}"
done
