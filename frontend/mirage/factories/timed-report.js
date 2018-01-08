import { Factory, faker, association } from 'ember-cli-mirage'
import DjangoDurationTransform from 'adsycc/transforms/django-duration'
import DjangoDateTransform from 'adsycc/transforms/django-date'
import moment from 'moment'

export default Factory.extend({
  comment: faker.lorem.text,
  date() {
    return DjangoDateTransform.create().serialize(moment(faker.date.past(10)))
  },
  duration() {
    return DjangoDurationTransform.create().serialize(
      moment.duration({
        hours: faker.random.number(100),
        minutes: faker.random.arrayElement([15, 30, 45, 0])
      })
    )
  },
  user: association()
})
