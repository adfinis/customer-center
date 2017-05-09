import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  name: faker.hacker.phrase,
  identifier: faker.hacker.phrase,
  description: 0,
  status: 1,
  parent: null,
  created_on: faker.date.past,
  updated_on: faker.date.recent
})
