import Ember from 'ember'
import fetch from 'fetch'
import Base from 'ember-simple-auth/authenticators/base'

export default Base.extend({
  serverTokenRevocationEndpoint: '/api/v1/logout',
  session: 'session:custom',

  async authenticate(credentials) {
    let { identification: username, password } = credentials

    let response = await fetch('/api/v1/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    let json = await response.json()

    if (!response.ok) {
      let { errors: [{ detail }] } = json

      throw new Error(detail)
    }

    return json
  },
  async restore(properties) {
    if (Ember.isEmpty(properties.data.token)) {
      throw new Error('No token to restore found')
    }

    return properties
  },
  invalidate({ data }) {
    return fetch('/api/v1/logout', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'X-Authorization': data.token
      }
    })
  }
})
