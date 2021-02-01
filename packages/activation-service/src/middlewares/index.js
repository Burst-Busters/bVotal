const compression = require('compression')
const { json } = require('body-parser')
const cors = require('cors')
const { serveApi } = require('./serveApi')
const { logRequests } = require('./logRequests')

const middlewares = [
  cors(),
  compression({ threshold: 0 }),
  serveApi(),
  json(),
  logRequests()
]

module.exports = {
  middlewares
}
