import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  maskPassword: true,
  actions: {
    edit() {
      this.set('edit', true)
    },
    show() {
      this.set('maskPassword', !this.get('maskPassword'))
    },
    save(index, entry) {
      this.sendAction('save', index, entry)
    },
    delete(index) {
      this.sendAction('delete', index)
    },
    cancel() {
      this.set('edit', false)
    }
  }
})
