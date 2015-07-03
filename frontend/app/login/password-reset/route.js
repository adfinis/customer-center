import Ember from 'ember'

export default Ember.Route.extend({
  resetController(controller) {
    controller.set('identification', null)
  },

  renderTemplate() {
    this.render({
      into: 'application'
    })
  }
})
