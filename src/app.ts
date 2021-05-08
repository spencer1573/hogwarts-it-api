import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/** HEADERS */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

/** ROUTES */
app.use('/', routes)

/** ERROR HANDLING */
app.use((req, res, next) => {
  const error = new Error('not found')

  return res.status(404).json({
    message: error.message,
  })
})

/** SERVER */
const httpServer = http.createServer(app)
httpServer.listen(3000, () => console.info('server running on 3000'))
