import rp from 'request-promise';
import config from '../../config';

export async function rtLogin(username, password) {
  const { host, authPath } = config.services.rt;
  const response = await rp({
    method: 'post',
    uri: `${host}${authPath}`,
    headers: {
      Accept: 'application/json'
    },
    body: {
      username,
      password
    },
    json: true
  });

  return response.token;
}

export async function refreshToken(token) {
  const { host, authRefresh } = config.services.rt;
  const response = await rp({
    method: 'post',
    uri: `${host}${authRefresh}`,
    headers: {
      accept: 'application/json'
    },
    body: {
      token
    },
    json: true
  });

  return response.token;
}
