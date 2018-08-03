export default function(server) {
  server.createList('user', 1, 'customer')
  server.createList('user', 1, 'employee')
  server.createList('user', 1, 'admin')

  // timed
  server.createList('timed-subscription-package', 3)
  server.createList('timed-subscription-project', 10)

  //rt
  server.createList('rt-ticket', 100)
}
