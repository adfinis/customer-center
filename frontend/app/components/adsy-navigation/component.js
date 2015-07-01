import Ember from 'ember'

export default Ember.Component.extend({
  classNames: [ 'flex-grow' ],

  actions: {
    toggle() {
      this.$('.nav-side').toggleClass('nav-side--expand')
    },

    close() {
      this.$('.nav-side').removeClass('nav-side--expand')
    },

    invalidateSession() {
      this.get('session').invalidate()
    }
  }
})
