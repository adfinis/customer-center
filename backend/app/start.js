import app from './express';
import debug from './debug';

start(process.env.PORT);

function start(port = 3000) {
  app.listen(port, () => {
    debug.log(`Backend listening on port: ${port}`);
  });
}
