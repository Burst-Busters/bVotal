const polka = require('polka')
const {middlewares} = require('./middlewares')
const {register, showEligibles} = require('./handlers')
const Database = require("./database");
const Config = require("./config");

const api = url => `api/${url}`;

(async () => {
    await Database.initialize({reset: Config.IsDebugMode})
    polka()
        .use(...middlewares)
        .post(api('register'), register)
        .get(api('showEligibles'), showEligibles)
        .listen(Config.ServicePort, err => {
            console.log('Listening to localhost:', Config.ServicePort)
            if (err) console.log('error', err)
        })
})()
