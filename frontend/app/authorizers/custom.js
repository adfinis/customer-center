import Base from 'ember-simple-auth/authorizers/base'

export default Base.extend({
  authorize({ data }, setRequestHeader) {
    if (data.token) {
      setRequestHeader('X-Authorization', data.token)
      setRequestHeader('Accept', 'application/vnd.api+json')
      setRequestHeader('Content-Type', 'application/json')
    }
  }
})
