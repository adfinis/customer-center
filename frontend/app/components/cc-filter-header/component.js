import Component from '@ember/component'

export default Component.extend({
  tagName: 'th',
  classNames: 'uk-width-1-5',

  actions: {
    search() {
      this.get('onSearch')({ attr: this.get('attr'), term: this.get('value') })
    },
    clearSearch() {
      this.get('onSearch')(null)
    }
  }
})
