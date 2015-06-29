import express from 'express'
import morgan  from 'morgan'

let app = express()
export default app

let env = app.get('env')

/* istanbul ignore next */
if (env === 'production') {
  app.use(morgan('combined'))
}
else if (env === 'development') {
  app.use(morgan('dev'))
}

app.get('/api', (req, res) => {
  res.type('text')
  res.send(`Hello World ${process.env.TEST}!`)
})
