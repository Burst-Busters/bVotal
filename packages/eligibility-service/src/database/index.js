const {open} = require('./open')
const {close} = require('./close')
const {reset} = require('./reset')
const {EligibleVoter, Campaign, ActivatedAccount} = require('./model')

module.exports = {
    reset,
    open,
    close,
    EligibleVoter,
    Campaign,
    ActivatedAccount
}
