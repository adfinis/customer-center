import { Router } from 'express';

import createTimedProxy from '../../proxies/timed';
import config from '../../convict';

let router = new Router();
export default router;

router.use(
  '/proxy/timed',
  createTimedProxy({
    type: 'timed',
    host: config.get('timed.host'),
    prefix: config.get('timed.prefix'),
  })
);
