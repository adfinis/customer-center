import Component from '@ember/component'

export default Component.extend({
  tagName: '',
  maskPassword: true,
  actions: {
    show() {
      this.set('maskPassword', !this.maskPassword)
    },
    save(index, entry) {
      this['on-save'](index, entry)
    },
    delete(index) {
      this['on-delete'](index)
    }
  }
})
