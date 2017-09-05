import Ember from 'ember'
const { computed } = Ember

const defaultLength = 40

const component = Ember.Component.extend({
  tagName: '',

  clipped: computed('text', 'length', function() {
    const length = this.get('length') || defaultLength
    const text = this.get('text') || ''
    if (text.length <= length) {
      return text
    }
    return `${text.substring(0, length)}...`
  }).readOnly()
})

component.reopenClass({
  positionalParams: ['text']
})

export default component
