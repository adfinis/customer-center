import Ember from 'ember'

export default Ember.Component.extend({
  classNames: [ 'flex-grow' ],

  didInsertElement() {
    this.$('nav').one('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', () => {
      this.$('nav').removeClass('slide-in')
    })
  },

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
