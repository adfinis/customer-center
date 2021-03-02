import { Router } from 'express';

import timedToken from './routes/timed/token';
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

router.use('/api/v1/health', (request, response) => {
  response.type('application/health+json');
  response.json({ status: 'pass' });
});

router.use(timedToken);

router.use('/api/v1', auth);

router.use(requireAuthentication);

router.use('/api/v1', user);

router.use('/api', services);

router.get('/', (request, response) => {
  response.redirect('/api/v1');
});

router.use(error);

export default router;
