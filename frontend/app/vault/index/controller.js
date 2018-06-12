import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

export default Controller.extend({
  init() {
    this._super(...arguments)
  },
  media: service(),
  showTree: computed(
    'media.{isDesktop,isMobile,isTablet}',
    'detail',
    function() {
      return (
        this.get('media.isDesktop') ||
        ((this.get('media.isMobile') || this.get('media.isTablet')) &&
          !this.get('detail'))
      )
    }
  )
})
