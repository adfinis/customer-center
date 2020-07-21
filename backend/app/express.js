import express from 'express';

import * as initialize from './initialize';
import router from './router';

const app = express();
export default app;

initialize.sentry(app);
initialize.morgan(app);
initialize.bodyParser(app);
initialize.passport(app);
initialize.nodemailer(app);

app.use(router);
