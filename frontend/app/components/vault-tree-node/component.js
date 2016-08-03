import Ember from 'ember'

export default Ember.Component.extend({
  visible: true,

  actions: {
    toggle() {
      this.set('visible', !this.get('visible'))
    }
  }
})
