import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  subject: faker.hacker.phrase,
  status: faker.list.random('New', 'Taken', 'Closed'),
  created: faker.date.past,
  lastUpdated: faker.date.recent
})
