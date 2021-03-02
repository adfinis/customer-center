import fetch from 'node-fetch';
import rp from 'request-promise';

import config from '../../convict';

export async function timedLogin() {
  const { host, tokenPath, clientId, clientSecret } = config.get('idp');

  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);

  const uri = host + tokenPath;
  const options = {
    method: 'POST',
    body: data,
  };

  const response = await fetch(uri, options);

  // Do not use the refresh token. The token should
  // not be included in the response anyway.
  // https://tools.ietf.org/html/rfc6749#section-4.4.3
  const { access_token, expires_in } = await response.json();

  return {
    access: access_token,
    expires: Date.now() + expires_in * 1000,
  };
}

export async function getCustomer(timedToken, user) {
  const { host, prefix } = config.get('timed');

  const response = await rp({
    method: 'get',
    uri: `${host}${prefix}/customers`,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      Authorization: `Bearer ${timedToken}`,
    },
    qs: {
      reference: user.attributes.shortname,
    },
    json: true,
  });

  return response.data[0];
}
