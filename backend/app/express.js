import express from 'express';

import * as initialize from './initialize';
import router from './router';
import config from './convict';

const app = express();

app.set('env', config.get('env'));
app.set('x-powered-by', false);

initialize.sentry(app);
initialize.morgan(app);
initialize.bodyParser(app);
initialize.passport(app);

app.use(router);

export default app;
