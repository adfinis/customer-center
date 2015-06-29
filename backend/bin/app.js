import app from '../src/app'

start(process.env.PORT)

function start(port = 3000) {
  app.listen(port, () => {
    console.log(`Backend listening on port: ${port}`)
  })
}
