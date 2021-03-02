import nodemailer from 'nodemailer';

import config from './convict';

export default nodemailer.createTransport({
  host: config.get('smtp.host'),
  port: config.get('smtp.port'),
  secure: config.get('smtp.secure'),
  requireTLS: config.get('smtp.requireTLS'),
});
