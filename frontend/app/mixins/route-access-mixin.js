import Mixin from '@ember/object/mixin'
import { inject as service } from '@ember/service'

export default Mixin.create({
  session: service(),

  async beforeModel(transition) {
    if (!this._hasPermissions(await this.get('session.user'))) {
      transition.abort()
      this.transitionTo('/')
    }
  },

  _hasPermissions(user) {
    return this.groups.every(
      role => user.get(role) || user.get('groups').includes(role)
    )
  }
})
