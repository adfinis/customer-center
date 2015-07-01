import Session from 'simple-auth/session'
import { computed } from 'ember-computed-decorators'

export default Session.extend({
  @computed('userId')
  async user() {
    let userId = this.get('userId')

    if (userId) {
      let store = this.container.lookup('store:main')
      let user  = await store.find('user', userId)

      this.set('user', user)

      return user
    }
  }
})
