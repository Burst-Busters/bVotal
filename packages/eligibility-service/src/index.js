const { program } = require('commander');
const {start, bootstrap} = require('./commands')

program
    .command('start')
    .description('Starts the Eligibility Service')
    .action(start)

program.command('new <name> ')
    .description('Bootstraps a new election campaign')
    .action(async name => bootstrap({name}))


program.parseAsync(process.argv);
