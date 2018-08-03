import { Factory, faker } from 'ember-cli-mirage'

export default Factory.extend({
  username() {
    return faker.internet.userName()
  },
  fullName() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`
  },
  email() {
    return faker.internet.email()
  }
})
