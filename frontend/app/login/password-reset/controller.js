import Ember from 'ember'
import { translationMacro as t } from 'ember-i18n'

export default Ember.Controller.extend({
  login: Ember.inject.controller(),
  i18n:  Ember.inject.service(),

  errorMessage: {},

  successMessage:               t('login.sent-new-password'),
  missingIdentificationMessage: t('login.missing-identification'),

  actions: {
    async passwordreset(identification) {
      this.set('errorMessage.visible', null)

      if (!identification) {
        this.set('errorMessage',
          this.notify.error(this.get('missingIdentificationMessage.string'), { closeAfter: null }))
        return
      }

      try {
        // Send mail
        // await password reset

        this.notify.success(this.get('successMessage.string'))
        this.set('login.identification', identification)
        this.transitionToRoute('login')
      }
      catch (e) {
        this.set('errorMessage',
          this.notify.error(e.message, { closeAfter: null }))
      }
    }
  }
})
