import crypto     from 'crypto'
import { Router } from 'express'
import redis      from 'redis'
import PWGen      from './pwgen'
import User       from './user/model'
import config     from '../config.json'

const router = new Router
export default router

const client = redis.createClient(
  config.redis.port,
  config.redis.host,
  config.redis.options
)

// TODO: Should we report errors on this route?
router.post('/send-new-password', async(req, res, next) => {
  try {
    let ident = req.body.identification
    let token = await createToken(token)
    let user  = await new User({ username: ident }).fetch({ required: true })

    await setToken(ident, token)

    console.log(token)

    // Send email

    res.send({ data: {
      message: 'Great success!',
      href: 'https://www.youtube.com/watch?v=J88-RdWnNT0'
    } })
  }
  catch (e) {
    next(e)
  }
})

router.get('/reset-password/:token', async(req, res, next) => {
  try {
    if (!req.params.token) {
      return next({ status: 404, message: 'Not found' })
    }

    let ident = await getIdent(req.params.token)

    if (!ident) {
      return next({ status: 404, message: 'Not found' })
    }

    client.del(`pw-reset-token-${req.params.token}`)

    let password = createPassword(12)

    // Set LDAP password

    res.send({ data: { password } })
  }
  catch (e) {
    next(e)
  }
})

function createPassword(len) {
  let gen = new PWGen
  gen.maxLength = len
  return gen.generate()
}

function createToken() {
  return new Promise((resolve, reject) =>
    crypto.randomBytes(42, (err, buffer) => {
      if (err) return reject(err)
      resolve(buffer.toString('hex'))
    })
  )
}

function setToken(ident, token) {
  return new Promise((resolve, reject) =>
    client.set(`pw-reset-token-${token}`, ident, err =>
      err ? reject(err) : resolve()
    )
  )
}

function getIdent(token) {
  return new Promise((resolve, reject) =>
    client.get(`pw-reset-token-${token}`, (err, ident) =>
      err ? reject(err) : resolve(ident)
    )
  )
}
