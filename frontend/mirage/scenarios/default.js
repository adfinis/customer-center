export default function(server) {
  server.createList('user', 1, 'customer')
  server.createList('user', 1, 'intern')
  server.createList('user', 1, 'admin')

  // timed
  server.createList('timed-subscription-package', 3)
  server.createList('timed-subscription-project', 10)
}
