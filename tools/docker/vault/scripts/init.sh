#!/bin/bash

vault auth myroot
vault auth-enable userpass
vault write auth/userpass/users/Test1-admin password=test1123qwe policies=root

# write some secrets
for i in {1..4}
do
  vault write "secret/firewall/abc04-fw0$i.dummy-domain.ch" admin=topsecret
done

for user in "Hans-Peter" "Max-Mustermann" "Bea-Beispiel" "Tom-Taylor" "Adfinis-SyGroup-AG"
do
  vault write "secret/firewall/abc04-fw02.dummy-domain.ch/VPN_Benutzer-Client_VPN/$user" user=topsecret
done
