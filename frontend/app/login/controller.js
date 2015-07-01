import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    async authenticate() {
      this.set('loading', true)
      this.set('errorMessage', null)

      let credentials = this.getProperties('identification', 'password')

      try {
        await this.get('session').authenticate('authenticator:custom', credentials)
      }
      catch (e) {
        this.set('errorMessage', e.error)
      }
      finally {
        this.set('loading', false)
      }
    }
  }
})
