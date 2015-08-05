import Ember from 'ember'

const { inject } = Ember

export default Ember.Controller.extend({
  i18n: inject.service()
})
