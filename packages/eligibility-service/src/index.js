const polka = require('polka')
const {middlewares} = require('./middlewares')
const {register, showAllTEST} = require('./handlers')
const {init} = require("./initDB");

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

const api = url => `api/${url}`

polka()
    .use(...middlewares)
    .post(api('register'), register )
    .get(api('showAllTEST'), showAllTEST)
    .listen(PORT || 3000, err => {
        init();
        if (err) console.log('error', err)
    })
