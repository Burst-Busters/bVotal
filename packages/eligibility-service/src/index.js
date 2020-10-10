const polka = require('polka')
const {middlewares} = require('./middlewares')
const {register} = require('./handlers')

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

const api = url => `api/${url}`

polka()
    .use(...middlewares)
    .post(api('register'), register )
    .listen(PORT || 3000, err => {
        if (err) console.log('error', err)
    })
