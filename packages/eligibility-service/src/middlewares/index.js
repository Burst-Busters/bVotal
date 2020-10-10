const {json} = require('body-parser')
const cors = require('cors')
const {serveApi} = require('./serveApi')

module.exports.middlewares = [
    cors(),
    serveApi(),
    json(),
]
