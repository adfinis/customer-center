import Component from '@ember/component'

export default Component.extend({
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
