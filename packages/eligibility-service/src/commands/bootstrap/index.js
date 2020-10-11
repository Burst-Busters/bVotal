const {onShutdown} = require("node-graceful-shutdown");
const {Bootstrapper} = require("./bootstrapper");
const Context = require('./context')

onShutdown("bootstrapper", async function () {
    await Context.Database.close()
});

async function bootstrap({name}) {
    try {
        // TODO: pass into database
        const votingOptions = []

        return await Bootstrapper.run({
            campaignName: name,
            context: Context
        });
    } catch (e) {
        Context.Logger.error(e)
    }
}

module.exports = {
    bootstrap
}
