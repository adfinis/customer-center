import Ember from 'ember'

const { inject } = Ember

export default Ember.Controller.extend({
  errorMessage: {},
  passwordReset: inject.controller('login.password-reset'),
  notify: inject.service(),
  session: inject.service(),

  actions: {
    async authenticate() {
      this.set('loading', true)
      this.set('errorMessage.visible', null)

      try {
        let credentials = this.getProperties('identification', 'password')

        await this.get('session').authenticate(
          'authenticator:custom',
          credentials
        )
      } catch (e) {
        this.set(
          'errorMessage',
          this.get('notify').error(e.message, { closeAfter: null })
        )
      } finally {
        this.set('loading', false)
      }
    },

    passwordreset() {
      let identification = this.get('identification')

      if (identification) {
        this.get('passwordReset').send('passwordreset', identification)
        return
      }

      this.transitionToRoute('login.password-reset')
    }
  }
})
