import Ember from 'ember'

export default Ember.Controller.extend({
  errorMessage: {},
  actions: {
    async authenticate() {
      this.set('loading', true)
      this.set('errorMessage.visible', null)

      try {
        let credentials = this.getProperties('identification', 'password')

        await this.get('session').authenticate('authenticator:custom', credentials)
      }
      catch (e) {
        this.set('errorMessage', this.notify.error(e.message, { closeAfter: null }))
      }
      finally {
        this.set('loading', false)
      }
    },

    passwordreset() {
      if (this.get('identification')) {
        // do reset
        this.notify.success('Instructions to reset your password have been sent to your email')
        return
      }

      this.transitionToRoute('login.password-reset')
    }
  }
})
