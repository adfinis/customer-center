import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  shortname: 'adsy',
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  language: 'en',
  sysupport: 'adsy',
  username() {
    return `${this.shortname}-${faker.name.firstName()}`
  },
  email() {
    return `${faker.name.firstName()}@${this.shortname}.com`
  },
  groups() {
    return [`${this.shortname}-vault`, `${this.shortname}-sysupport`]
  },
  emails() {
    let i = faker.random.number({ min: 1, max: 3 })
    let mails = []

    while (i--) {
      mails.push(`${faker.name.firstName()}@${this.shortname}.com`)
    }

    return mails
  }
})
