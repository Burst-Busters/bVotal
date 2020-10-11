const { program } = require('commander');
const {start, bootstrap} = require('./commands')

program
    .command('start [options]')
    .description('Starts the Eligibility Service')
    .action(start)

// TODO more args here
program.command('bootstrap <name>')
    .description('Bootstraps a new election campaign')
    .action(async name => bootstrap({name}))


program.parseAsync(process.argv);
