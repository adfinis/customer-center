import Mirage, { faker } from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  subject: faker.hacker.phrase,
  description: faker.hacker.phrase,
  done_ratio: 0,
  project: function() {
    return {
      name: `${faker.company.bsAdjective()} ${faker.commerce.productName()} ${faker.hacker.verb()}`
    }
  },
  tracker: function() {
    return {
      name: faker.list.random('Bug', 'Task', 'Feature', 'Support', 'Project')()
    }
  },
  status: function() {
    return {
      name: faker.list.random('New', 'Taken', 'Closed', 'Needs Feedback')()
    }
  },
  priority: function() {
    return {
      name: 'Urgent'
    }
  },
  created_on: faker.date.past,
  updated_on: faker.date.recent
})
