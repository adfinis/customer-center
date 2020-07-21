import nodemailer from 'nodemailer';

import config from '../config';

export default function initializeNodemailer(app) {
  const transport = nodemailer.createTransport(config.mailTransporter);
  app.set('mailTransporter', transport);
}
