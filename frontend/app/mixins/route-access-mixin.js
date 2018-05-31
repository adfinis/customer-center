import Mixin from '@ember/object/mixin'
import { inject as service } from '@ember/service'

export default Mixin.create({
  session: service(),

  async beforeModel(transition) {
    let user = await this.get('session.user')
    if (
      !this.get('groups').every(
        role => user.get(role) || user.get('groups').includes(role)
      )
    ) {
      transition.abort()
      this.transitionTo('/')
    }
  }
})
