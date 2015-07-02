import Base from 'simple-auth/authorizers/base'

export default Base.extend({
  authorize(jqXHR, requestOptions) {
    let token = this.get('session.content.secure.data.token')

    if (token) {
      jqXHR.setRequestHeader('X-Authorization', token)
    }
  }
})
