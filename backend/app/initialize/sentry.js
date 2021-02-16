import * as Sentry from '@sentry/node';

export default function initializeSentry(app) {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
  }

  app.use(Sentry.Handlers.requestHandler());
}
