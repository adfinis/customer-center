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
    return (
      (this.groups.requireAll
        ? this.groups.requireAll.every(
            role => user.get(role) || user.get('groups').includes(role)
          )
        : true) &&
      (this.groups.requireOne
        ? this.groups.requireOne.some(
            role => user.get(role) || user.get('groups').includes(role)
          )
        : true)
    )
  }
})
