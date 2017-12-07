import Base from 'ember-simple-auth/authorizers/base'

export default Base.extend({
  authorize(authenticated, setRequestHeader) {
    if (authenticated.data.token) {
      setRequestHeader('X-Authorization', authenticated.data.token)
    }
  }
})
