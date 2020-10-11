const {program} = require('commander');
const {start, bootstrap, forgeBlock, createHashes} = require('./commands')

program
    .name('bvotal-service')

program
    .command('start [options]')
    .description('Starts the Eligibility Service')
    .action(start)

// TODO more args here
program.command('bootstrap <name>')
    .description('Bootstraps a new election campaign')
    .action(async name => bootstrap({name}))

program.command('forgeBlock <secretPhrase>')
    .description('Forges a block (only for local development)')
    .action(async secretPhrase => forgeBlock({secretPhrase}))

program.command('createHashes [count]')
    .description('Create a certain amount of elgibility hashes')
    .action(count => createHashes({count}))

program.parseAsync(process.argv);
