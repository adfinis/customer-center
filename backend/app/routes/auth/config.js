import fs from 'fs';

import config from '../../convict';

// Further information how to configure LDAP under:
// https://github.com/vesse/passport-ldapauth

export const ldapConnection = {
  url: config.get('ldap.host'),
  bindDn: config.get('ldap.bindDn'),
  bindCredentials: config.get('ldap.bindCredentials'),
};

if (config.get('ldap.cert')) {
  ldapConnection.tlsOptions = { ca: config.get('ldap.cert') };
}

export const ldapUsers = {
  searchBase: config.get('auth.userSearch.base'),
  searchFilter: config.get('auth.userSearch.filter'),
  searchAttributes: ['uid', 'sn', 'mail'],

  groupSearchBase: config.get('auth.userGroupsearch.base'),
  groupSearchFilter: config.get('auth.userGroupsearch.filter'),
  groupSearchScope: 'sub',
  groupDnProperty: 'dn',
  groupSearchAttributes: ['cn'],

  usernameField: 'uid',
  passwordField: 'userPassword',
};

export const ldapCustomers = {
  searchBase: config.get('auth.customerSearch.base'),
  searchFilter: config.get('auth.customerSearch.filter'),
  searchAttributes: ['uid', 'sn', 'mail'],

  groupSearchBase: config.get('auth.customerGroupsearch.base'),
  groupSearchFilter: config.get('auth.customerGroupsearch.filter'),
  groupSearchScope: 'sub',
  groupDnProperty: 'dn',
  groupSearchAttributes: ['cn'],

  usernameField: 'uid',
  passwordField: 'userPassword',
};
