import Route from '@ember/routing/route'

export default Route.extend({
  resetController(controller) {
    controller.set('identification', null)
  },

  renderTemplate() {
    this.render({
      into: 'application'
    })
  }
})
