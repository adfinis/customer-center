import Component from '@ember/component'

export default Component.extend({
  tagName: '',
  maskPassword: true,
  actions: {
    show() {
      this.set('maskPassword', !this.get('maskPassword'))
    },
    save(index, entry) {
      this.get('on-save')(index, entry)
    },
    delete(index) {
      this.get('on-delete')(index)
    }
  }
})
