import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  description: faker.hacker.phrase,
  time: function() {
    return {
      hours:   faker.random.number({ max: 200 }),
      minutes: faker.random.number({ max: 59 })
    }
  },

  date: function() {
    return +faker.date.recent()
  },
  doneBy: faker.name.findName
})
