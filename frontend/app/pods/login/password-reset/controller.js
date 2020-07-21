import { inject as service } from '@ember/service'
import Controller, { inject as controller } from '@ember/controller'
import fetch from 'fetch'
import { translationMacro as t } from 'ember-i18n'

/**
 * Login password-reset controller
 *
 * @class LoginPasswordResetController
 * @public
 */
export default Controller.extend({
  login: controller(),
  i18n: service(),

  successMessage: t('login.sent-new-password'),
  missingIdentificationMessage: t('login.missing-identification'),

  init() {
    this._super(...arguments)

    this.set('errorMessage', {})
  },

  actions: {
    // eslint-disable-next-line max-statements
    async passwordreset(identification) {
      this.set('errorMessage.visible', null)

      if (!identification) {
        this.set(
          'errorMessage',
          this.notify.error(this.get('missingIdentificationMessage.string'), {
            closeAfter: null
          })
        )
        return
      }

      try {
        let res = await fetch('/api/v1/send-new-password', {
          method: 'post',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ identification })
        })

        if (!res.ok) {
          let { errors: [error] } = await res.json()
          throw new Error(error.detail)
        }

        this.notify.success(this.get('successMessage.string'))
        this.set('login.identification', identification)
        this.transitionToRoute('login')
      } catch (e) {
        this.set(
          'errorMessage',
          this.notify.error(e.message, { closeAfter: null })
        )
      }
    }
  }
})
