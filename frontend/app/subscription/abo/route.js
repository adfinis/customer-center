import Ember from 'ember'
import { translationMacro as t } from 'ember-i18n'

const { inject } = Ember

export default Ember.Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  subscription: inject.service(),

  /**
   * Notify service
   *
   * @property [EmberNotify] notify
   * @public
   */
  notify: inject.service(),

  i18n: inject.service(),

  successMessage: t('timescout.abo-reload-success'),

  /* eslint-disable camelcase */
  model({ project_id, abotype_id }) {
    let abos = {
      data: this.get('subscription').fetchAbos(abotype_id),
      projectID: project_id
    }

    return Ember.RSVP.hash(abos)
  },

  actions: {
    async load(abo_id, project_id) {
      try {
        this.get('subscription').sendTimeLoad(project_id, abo_id)
        this.get('notify').info(this.get('successMessage.string'))
        this.transitionTo('subscription')
      } catch (err) {
        this.get('notify').error(err.message)
      }
    }
  }
})
