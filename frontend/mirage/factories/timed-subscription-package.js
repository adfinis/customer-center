import { Factory, faker } from 'ember-cli-mirage'
import DjangoDurationTransform from 'adsycc/transforms/django-duration'
import moment from 'moment'

export default Factory.extend({
  duration() {
    return DjangoDurationTransform.create().serialize(
      moment.duration({
        hours: faker.random.arrayElement([100, 500, 1000, 25000])
      })
    )
  },
  price() {
    return faker.random.arrayElement([
      '1000 CHF',
      '2000 CHF',
      '5000 CHF',
      '10000 CHF',
      '50000 CHF'
    ])
  }
})
