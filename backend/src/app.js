import fs         from 'fs'
import path       from 'path'
import express    from 'express'
import bodyParser from 'body-parser'
import morgan     from 'morgan'
import passport   from 'passport'
import redis      from 'redis'
import jwt        from 'jwt-redis-session'
import debug      from 'debug'
import API        from './classes/api'
import login      from './login'
import services   from './services'
import config     from '../config.json'

const app = express()
export default app

app.log = {}
app.log.error = debug('app:error')
app.log.debug = debug('app:debug')

const env = app.get('env')

/* istanbul ignore next */
if (env === 'production') {
  app.use(morgan('combined'))
}
else if (env === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json({
  type: [ 'application/json', 'application/vnd.api+json' ]
}))

app.use(jwt({
  client:     redis.createClient(config.redis.port, config.redis.host, config.redis.options),
  secret:     config.login.secret,
  keyspace:   'session:',
  maxAge:     86400, // seconds
  algorithm:  'HS256', // sha256
  requestKey: 'session',
  requestArg: 'Authorization'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/v1', login)

app.use((req, res, next) => {
  if (req.isAuthenticated()) return next()

  next({ status: 401, message: 'Not Authorized' })
})

const modulePath = path.join(__dirname, 'modules')
const resources  = fs.readdirSync(modulePath)

for (let resource of resources) {
  API.register(resource)
  app.use(API.endpoint(resource))
}

app.use(services)

app.get('/v1', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify(API.index(), null, 2))
})

app.get('/', (req, res) => {
  res.redirect('/api/v1')
})

app.use((err, req, res, next) => {
  let status = err.status || 500

  res.status(status)

  if (status === 500) {
    app.log.error(err)
  }

  res.send({
    errors: [ { status, detail: err.message } ]
  })
})
