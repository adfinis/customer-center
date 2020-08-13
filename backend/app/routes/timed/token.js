import { timedLogin } from './helpers';

export default async function refreshToken(request, response, next) {
  const token = request.session.timedTokens || {};

  if (token.expires && token.expires <= Date.now()) {
    try {
      request.session.timedTokens = await timedLogin();
      request.session.update();
    } catch (error) {
      next(error);
    }
  }

  next();
}
