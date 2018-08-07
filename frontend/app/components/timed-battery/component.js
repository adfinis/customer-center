import Component from '@ember/component'
import { computed } from '@ember/object'
import { next } from '@ember/runloop'

export default Component.extend({
  classNames: ['uk-flex', 'uk-flex-center'],

  didRender() {
    this._super(...arguments)
    let element = document.getElementById(`battery-body-${this.index}`)
    next(() => {
      element.style.height = `${100 * this.percentage}%`
      element.style.backgroundColor = this.color
    })
  },

  color: computed('percentage', function() {
    return this.percentage
      ? [
          '#ff0000',
          '#FC3800',
          '#F96E00',
          '#F6A400',
          '#F3D800',
          '#D5F000',
          '#9EED00',
          '#68EA00',
          '#33E700',
          '#00E500'
        ][Math.round(this.percentage * 10) - 1]
      : '#ff0000'
  })
})
