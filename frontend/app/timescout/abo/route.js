import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n'

const { inject } = Ember

export default Ember.Route.extend({
 
  /**
   * Timescout service
   *
   * @property {TimescoutService} timescout
   * @public
   */
  timescout: inject.service(),

  /**
   * Notify service
   *
   * @property [EmberNotify] notify
   * @public
   */
  notify: inject.service(),

  i18n: inject.service(),

  successMessage: t('timescout.abo-reload-success'),

  model({ project_id, abotype_id }) {
    let abos = {
      data: this.get('timescout').fetchAbos(abotype_id),
      projectID: project_id
    }

    return Ember.RSVP.hash(abos)
  },

  actions: {
    async load(abo_id, project_id) {
      try {
        let value = this.get('timescout').sendTimeLoad(project_id, abo_id)
        this.get('notify').info(this.get('successMessage.string'))
        this.transitionTo('timescout')
      }
      catch(err) {
        this.get('notify').error(err.message)
      }
    }
  }
});
