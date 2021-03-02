import app from './express';
import debug from './debug';
import config from './convict';

import { name, version } from '../package.json';

// Uncaught Exceptions
process.on('uncaughtException', (error) => {
  debug.error(`Unhandled exception\n${error.stack}`);
  process.exit(1);
});

start();

function start() {
  // Development
  process.on('SIGINT', () => {
    console.log('');
    shutdownServer(server);
  });

  // Production / Staging
  process.on('SIGTERM', () => {
    debug.info('Server received termination signal.');
    shutdownServer(server);
  });

  // Show what is starting up.
  debug.info(`${name} v${version}`);
  debug.info(config.toString());

  const server = app.listen(config.get('app.port'), () => {
    debug.info('Server started up.');
  });
}

function shutdownServer(server) {
  // Shutdown Express.
  server.close();

  // Exit Node process.
  process.exit(0);
}
