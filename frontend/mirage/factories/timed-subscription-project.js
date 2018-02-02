import { Factory, faker } from 'ember-cli-mirage'
import DjangoDurationTransform from 'customer-center/transforms/django-duration'
import moment from 'moment'

export default Factory.extend({
  name() {
    return faker.commerce.productName()
  },
  purchasedTime() {
    return DjangoDurationTransform.create().serialize(
      moment.duration({
        hours: faker.random.number(100),
        minutes: faker.random.arrayElement([15, 30, 45, 0])
      })
    )
  },
  spentTime() {
    return DjangoDurationTransform.create().serialize(
      moment.duration({
        hours: faker.random.number(100),
        minutes: faker.random.arrayElement([15, 30, 45, 0])
      })
    )
  },
  afterCreate(project, server) {
    server.createList('timed-subscription-order', 5, { project })
    server.createList('timed-report', 5)
  }
})
