import Ember from 'ember'

export default Ember.Component.extend({
  notify: Ember.inject.service(),
  i18n: Ember.inject.service(),

  multiline: false,

  actions: {
    copy() {
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(this.$('.value')[0])
      selection.removeAllRanges()
      selection.addRange(range)
      if (document.execCommand('copy')) {
        this.get('notify').success(
          this.get('i18n').t('vault.clipboard-success')
        )
      } else {
        this.get('notify').error(this.get('i18n').t('vault.clipboard-error'))
      }
      selection.removeAllRanges()
    }
  }
})
