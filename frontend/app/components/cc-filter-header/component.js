import Component from '@ember/component'

export default Component.extend({
  tagName: 'th',
  classNames: 'uk-width-1-5',

  actions: {
    search() {
      this.onSearch({ attr: this.attr, term: this.value })
    },
    clearSearch() {
      this.onSearch(null)
    }
  }
})
