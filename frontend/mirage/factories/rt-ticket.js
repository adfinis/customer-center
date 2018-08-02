import { Factory, faker, association, trait } from 'ember-cli-mirage'
import moment from 'moment'

import DjangoDateTimeTransform from 'customer-center/transforms/django-datetime'
import ENV from 'customer-center/config/environment'

export default Factory.extend({
  effectiveid() {
    return faker.random.number()
  },
  created() {
    return DjangoDateTimeTransform.create().serialize(moment(faker.date.past()))
  },
  updated() {
    return DjangoDateTimeTransform.create().serialize(
      moment(faker.date.recent())
    )
  },
  subject() {
    return faker.lorem.sentence()
  },
  status() {
    return faker.random.arrayElement(ENV.APP.rt.states)
  },

  creator: association(),
  owner: association(),

  new: trait({
    status: 'new'
  }),
  open: trait({
    status: 'open'
  }),
  stalled: trait({
    status: 'stalled'
  }),
  resolved: trait({
    status: 'resolved'
  }),
  rejected: trait({
    status: 'rejected'
  }),
  deleted: trait({
    status: 'deleted'
  }),

  testname: trait({
    subject: 'averyspecificteststring'
  })
})
