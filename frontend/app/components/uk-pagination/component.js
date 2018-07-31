import Component from '@ember/component'

export default Component.extend({
  tagName: 'ul',
  classNames: ['uk-pagination', 'uk-flex-between'],

  actions: {
    load(next) {
      this.loadPage(this._getPage(this.get(`links.${next}`)))
    }
  },

  _getPage: link =>
    link
      .split('?')[1]
      .split('&')
      .map(p => p.split('='))
      .find(([k]) => k === 'page')[1]
})
