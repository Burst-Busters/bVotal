const {start} = require('./start')
const {bootstrap} = require('./bootstrap')
const {forgeBlock} = require('./forgeBlock')
const {createHashes} = require('./createHashes')

module.exports = {
    start,
    bootstrap,
    forgeBlock,
    createHashes,
    // TODO: campaignEnd
}
