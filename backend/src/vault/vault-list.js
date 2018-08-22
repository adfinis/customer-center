import http2 from 'http2'
import wrap from 'express-async-wrap'

let host, prefix

function stripPrefix(path) {
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length)
  }
  return path
}

async function listVault(token, path, client) {
  const result = {}

  const req = client.request({
    ':path': encodeURI(path) + '?list=true',
    'X-Vault-Token': token
  })

  req.setEncoding('utf8')

  // IMPORTANT: the data event can also be called if the sever has not yet
  // returned the whole data set. We need to concatenate untill the request ends.
  await new Promise(resolve => {
    let data = ''
    req.on('data', async rawResponse => {
      data += rawResponse
    })
    req.on('end', async () => {
      try {
        const resp = JSON.parse(data)
        if (resp.data && resp.data.keys) {
          result.values = resp.data.keys
            .filter(key => !key.endsWith('/'))
            .reduce((res, key) => {
              res[key] = { path: stripPrefix(path + key) }
              return res
            }, {})

          result.children = {}
          await Promise.all(
            resp.data.keys.filter(key => key.endsWith('/')).map(async key => {
              result.children[key] = await listVault(token, path + key, client)
            })
          )
        } else {
          result.values = {}
          result.children = {}
        }
      } catch (e) {
        console.log(path, ':', e)
      } finally {
        data = ''
      }
      resolve()
    })
  })

  return result
}

export default function vaultListhandler(service) {
  host = service.host
  prefix = service.prefix

  return wrap(async (req, res) => {
    try {
      const client = http2.connect(host)

      let response = await listVault(
        req.session.vaultToken,
        service.prefix + service.backend,
        client
      )
      client.destroy()
      res.send(response)
    } catch (e) {
      res.status(e.statusCode).send(e.message)
    }
  })
}
