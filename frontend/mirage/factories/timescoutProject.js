import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  name: faker.hacker.noun,
  totalBookedTime() {
    return {
      hours: faker.random.number({ max: 200 }),
      minutes: faker.random.number({ max: 59 })
    }
  },
  totalUsedTime() {
    return {
      hours: faker.random.number({ max: 200 }),
      minutes: faker.random.number({ max: 59 })
    }
  },
  availableTime() {
    return {
      hours: faker.random.number({ max: 200 }),
      minutes: faker.random.number({ max: 59 })
    }
  }
})
