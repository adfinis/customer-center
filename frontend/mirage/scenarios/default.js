export default function(server) {
  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  server.createList('user', 10)
  server.createList('redmineIssue', 256)
  server.createList('rtIssue', 128)

  for (let project of server.createList('timescoutProject', 3)) {
    server.create('timescoutHistory', {
      projectID: project.id,
      projectName: project.name
    })
    server.createList('timescoutTimesheet', 96, { projectID: project.id })
  }
}
