const { program } = require('commander');
const {start, bootstrap} = require('./commands')

program
    .command('start')
    .description('Starts the Eligibility Service')
    .action(start)

program.command('create')
    .description('Bootstraps a new election campaign')
    .action(bootstrap)


program.parseAsync(process.argv);
