import { Router } from 'express';

import timedToken from './routes/timed/token';
import rtToken from './routes/rt/token';
import vaultToken from './routes/vault/token';

import auth from './routes/auth/routes';
import services from './routes/services/routes';
import user from './routes/user/routes';
import error from './routes/error/routes';

function requireAuthentication(request, response, next) {
  if (request.isAuthenticated()) return next();

  request.session.destroy(() => {
    next({ status: 401, message: 'Not Authorized' });
  });
}

const router = new Router();
export default router;

router.use(vaultToken);
router.use(timedToken);
router.use(rtToken);

router.use('/api/v1', auth);

router.use(requireAuthentication);

router.use('/api/v1', user);

router.use('/api', services);

router.get('/', (request, response) => {
  response.redirect('/api/v1');
});

router.use(error);
