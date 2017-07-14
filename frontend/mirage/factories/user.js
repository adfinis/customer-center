import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  shortname: 'adsy',
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  username() {
    return `${this.shortname}-${faker.name.firstName()}`
  },
  email() {
    return `${faker.name.firstName()}@${this.shortname}.com`
  },
  groups() {
    return [
      `${this.shortname}-redmine`,
      `${this.shortname}-mon`,
      `${this.shortname}-rt`,
      `${this.shortname}-sysupport`,
      `${this.shortname}-wiki`
    ]
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
