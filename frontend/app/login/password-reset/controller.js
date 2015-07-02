import Ember from 'ember'

export default Ember.Controller.extend({
  errorMessage: {},
  actions: {
    async passwordreset() {
      this.set('errorMessage.visible', null)

      let identification = this.get('identification')

      if (!identification) {
        this.set('errorMessage',
          this.notify.error('Please provide an username', { closeAfter: null }))
        return
      }

      try {
        // Send mail
        // await password reset

        this.notify.success('Instructions to reset your password have been sent to your email')
        this.transitionToRoute('login')
      }
      catch (e) {
        this.set('errorMessage',
          this.notify.error(e.message, { closeAfter: null }))
      }
    }
  }
})
