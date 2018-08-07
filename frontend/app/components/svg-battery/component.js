import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
  percent: computed('percentage', function() {
    return 100 * this.percentage
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
  }),
  name: computed('percentage', function() {
    return this.percentage.toString().split('.')[1]
  })
})
