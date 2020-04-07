import app from './app'
import * as Sentry from '@sentry/node'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  })
}

start(process.env.PORT)

function start(port = 3000) {
  app.listen(port, () => {
    console.log(`Backend listening on port: ${port}`)
  })
}
