import { inject as service } from '@ember/service'
import { hash } from 'rsvp'
import Route from '@ember/routing/route'
import { translationMacro as t } from 'ember-i18n'

export default Route.extend({
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: service(),

  /**
   * Notify service
   *
   * @property [EmberNotify] notify
   * @public
   */
  notify: service(),

  i18n: service(),

  successMessage: t('timescout.abo-reload-success'),

  /* eslint-disable camelcase */
  model({ project_id, abotype_id }) {
    let abos = {
      data: this.get('timescout').fetchAbos(abotype_id),
      projectID: project_id
    }

    return hash(abos)
  },

  actions: {
    async load(abo_id, project_id) {
      try {
        this.get('timescout').sendTimeLoad(project_id, abo_id)
        this.get('notify').info(this.get('successMessage.string'))
        this.transitionTo('timescout')
      } catch (err) {
        this.get('notify').error(err.message)
      }
    }
  }
})
