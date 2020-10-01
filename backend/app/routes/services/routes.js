import { Router } from 'express';

import config from '../../config';
import createTimedProxy from '../../proxies/timed';

let router = new Router();
export default router;

const { timed } = config.services;

router.use('/proxy/timed', createTimedProxy(timed));
