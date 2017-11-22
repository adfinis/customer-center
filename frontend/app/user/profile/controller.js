import { inject as service } from '@ember/service'
import Controller from '@ember/controller'
import moment from 'moment'

/**
 * User profile controller
 *
 * @class UserProfileController
 * @public
 */
export default Controller.extend({
  /**
   * I18n service to change user locale
   *
   * @property {EmberI18n} i18n
   * @public
   */
  i18n: service(),

  /**
   * User profile actions
   *
   * @property {Object} actions
   * @public
   */
  actions: {
    /**
     * Sets the current locale
     *
     * @param {string} locale The new locale
     * @return {void}
     */
    setLocale (locale) {
      this.set('model.language', locale)
      this.set('i18n.locale', locale)
      moment.locale(locale)
      // Setting html locale to support hyphenation
      document.documentElement.lang = locale
      this.send('save')
    },

    /**
     * Save the user
     *
     * @return {Promise}
     */
    async save () {
      this.set('error', false)
      this.set('loading', true)

      try {
        await this.model.save()
      } catch (e) {
        this.set('error', e)
      } finally {
        this.set('loading', false)
      }
    }
  }
})
