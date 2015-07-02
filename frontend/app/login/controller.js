import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    async authenticate() {
      this.set('loading', true)
      this.set('errorMessage', null)

      try {
        let credentials = this.getProperties('identification', 'password')

        await this.get('session').authenticate('authenticator:custom', credentials)
      }
      catch (e) {
        this.set('errorMessage', e.message)
      }
      finally {
        this.set('loading', false)
      }
    },

    passwordreset() {
      if (this.get('identification')) {
        // do reset
        return
      }

      this.transitionToRoute('login.password-reset')
    }
  }
})
