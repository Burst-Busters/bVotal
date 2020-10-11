const {program} = require('commander');
const {start, bootstrap, forgeBlock} = require('./commands')

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

program.parseAsync(process.argv);
