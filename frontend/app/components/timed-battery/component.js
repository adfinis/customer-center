import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
  didRender() {
    this._super(...arguments)
    this.animate
  },

  animate: computed('percentage', function() {
    let element = document.getElementById(`battery-body-${this.index}`)
    element.animate(
      [{ height: '170px' }, { height: `${100 * this.percentage}%` }],
      {
        delay: 200,
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
    element.style.backgroundColor = this.color
  }),

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
