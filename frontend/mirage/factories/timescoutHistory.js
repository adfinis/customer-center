import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  projectName() {
    return `${faker.company.bsAdjective()} ${faker.commerce.productName()} ${faker.hacker.verb()}`
  },
  leaseTime: faker.random.number({ max: 200 }),
  leaseStamp: faker.date.past,
  acknowledged: faker.random.boolean,
  confirmedBy: faker.name.findName
})
