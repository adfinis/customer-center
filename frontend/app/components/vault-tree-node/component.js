import Ember from 'ember'

export default Ember.Component.extend({
  visible: true,

  showOnOverview(property) {
    return property !== 'path'
  },

  actions: {
    toggle() {
      this.set('visible', !this.get('visible'))
    }
  }
})
