import { Factory, faker, trait } from 'ember-cli-mirage'
import DjangoDurationTransform from 'customer-center/transforms/django-duration'
import DjangoDateTransform from 'customer-center/transforms/django-date'
import moment from 'moment'

export default Factory.extend({
  duration() {
    return DjangoDurationTransform.create().serialize(
      moment.duration({
        hours: faker.random.number(200),
        minutes: faker.random.arrayElement([15, 30, 45, 0])
      })
    )
  },
  acknowledged: false,
  ordered() {
    return DjangoDateTransform.create().serialize(moment(faker.date.past(10)))
  },
  isAcknowledged: trait({
    acknowledged: true
  })
})
