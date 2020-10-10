const {Bootstrapper} = require("./bootstrapper");

async function bootstrap({name, votingOptions, voterCount, voterTargetAmount}) {
    return await Bootstrapper.run({
        campaignName: name,
        targetBalance: voterCount * voterTargetAmount,
    });
}

module.exports = {
    bootstrap
}
