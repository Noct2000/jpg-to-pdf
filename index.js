#!/usr/bin/env node

const { program } = require('commander');

program
    .usage('sourceDirectory targetFileName')
    .description('Converts jpg/jpeg/png files into one pdf file')
    .argument('[sourceDirectory]', 'Path to dir that consists images', '.')
    .argument('[targetFileName]', 'Filename for target pdf file', 'output.pdf')
    .option('-f, --format <string>', 'Set format for each page. For example, \'A4\' or \'A3\'')
    .addHelpCommand()
    .parse(process.argv);