import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  description: faker.hacker.phrase,
  time() {
    return {
      hours: faker.random.number({ max: 8 }),
      minutes: faker.random.number({ max: 59 })
    }
  },

  date() {
    return Number(faker.date.recent())
  },
  doneBy: faker.name.findName
})
