import { Router } from 'express';

import config from '../../config';
import vaultRoutes from '../vault/routes';

import createVaultProxy from '../../proxies/vault';
import createTimedProxy from '../../proxies/timed';
//import createGitlabProxy from '../../proxies/gitlab'
//import createRTProxy from '../../proxies/rt'

let router = new Router();
export default router;

const { timed, vault /*, gitlab, rt*/ } = config.services;

router.use('/vault', vaultRoutes);
router.use('/proxy/vault', createVaultProxy(vault));
router.use('/proxy/timed', createTimedProxy(timed));
//router.use('/proxy/gitlab', createGitlabProxy(gitlab))
//router.use('/proxy/rt', createRTProxy(rt))
