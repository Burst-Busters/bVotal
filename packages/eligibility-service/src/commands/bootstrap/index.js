const {Bootstrapper} = require("./bootstrapper");

async function bootstrap({name}) {

    // TODO: using inquirer

    const votingOptions = []
    const voterCount = 100
    const voterTargetAmount = 0.2

    return await Bootstrapper.run({
        campaignName: name,
        targetBalance: voterCount * voterTargetAmount,
    });
}

module.exports = {
    bootstrap
}
