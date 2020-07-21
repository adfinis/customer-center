import { refreshToken } from './helpers';
import config from '../../config';

const timeElapsed = time => new Date().getTime() - time;

/**
 * If the user is logged into vault and the defined TTL of the vault token
 * is expired, try to renew it
 *
 * @return {function} middleware function
 */
export default async function refreshTokenVault(request, response, next) {
  const { ttl } = config.services.vault;

  if (
    request.session.vaultTokenTTL &&
    timeElapsed(request.session.vaultTokenTTL) >= ttl
  ) {
    try {
      await refreshToken(request.session.vaultToken);
      request.session.vaultTokenTTL = new Date().getTime();
      request.session.update();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
}
