import { inject as service } from '@ember/service'
import Controller, { inject as controller } from '@ember/controller'

export default Controller.extend({
  passwordReset: controller('login.password-reset'),
  notify: service(),
  session: service(),

  // identification: 'admin1',
  // password: '123qweasd',

  init() {
    this._super(...arguments)

    this.set('errorMessage', {})
  },

  actions: {
    async authenticate() {
      this.set('loading', true)
      this.set('errorMessage.visible', null)

      try {
        let credentials = this.getProperties('identification', 'password')

        await this.session.authenticate('authenticator:custom', credentials)
      } catch (e) {
        this.set(
          'errorMessage',
          this.notify.error(e.message, { closeAfter: null })
        )
      } finally {
        this.set('loading', false)
      }
    },

    passwordreset() {
      let identification = this.identification

      if (identification) {
        this.passwordReset.send('passwordreset', identification)
        return
      }

      this.transitionToRoute('login.password-reset')
    }
  }
})
