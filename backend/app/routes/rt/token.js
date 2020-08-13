import { refreshToken } from './helpers';
import config from '../../config';

export default async function tokenRefreshRT(request, response, next) {
  const { ttl } = config.services.rt;

  if (
    request.session.rtToken &&
    request.session.rtTokenTTL &&
    (new Date().getTime() - request.session.rtTokenTTL) / 1000 >= ttl
  ) {
    try {
      const newToken = await refreshToken(request.session.rtToken);
      request.session.rtToken = newToken;
      request.session.rtTokenTTL = new Date().getTime();
      request.session.update();
    } catch (error) {
      next(error);
    }
  }
  next();
}
