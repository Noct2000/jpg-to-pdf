#!/usr/bin/env node

const { program } = require('commander');
const { getImageFiles } = require('./get-image-files');
const { createPdfFromImages } = require('./create-pdf-from-images');

program
    .usage('sourceDirectory targetFileName')
    .description('Converts jpg/jpeg/png files into one pdf file')
    .argument('[sourceDirectory]', 'Path to dir that consists images', '.')
    .argument('[targetFileName]', 'Filename for target pdf file', 'output.pdf')
    .option('-f, --format <string>', 'Set format for each page. For example, \'A4\' or \'A3\'')
    .addHelpCommand()
    .parse(process.argv);

const pdfRegex = /\.(pdf)$/i;
const pathToDir = program.args[0] ? program.args[0] : '.';
const availableSizes = new Set([
    'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
    'RA0', 'RA1', 'RA2', 'RA3', 'RA4',
    'SRA0', 'SRA1', 'SRA2', 'SRA3', 'SRA4',
    'EXECUTIVE', 'LEGAL', 'LETTER', 'TABLOID',
    '4A0', '2A0', 'FOLIO'

]);
const format = program.opts().format ? program.opts().format.toUpperCase() : null;
if (format && !availableSizes.has(format)) {
    console.log('Invalid format')
    console.log('Check available formats: ' + JSON.stringify([...availableSizes]));
    process.exit(1);
}

let outputFileName = program.args[1] ? program.args[1] : 'output';

outputFileName = outputFileName.replace(pdfRegex, '');
console.log(`outputFileName = ${outputFileName}`)

const images = getImageFiles(pathToDir);

if (images.length === 0) {
    console.log(`No images in dir: '${pathToDir}'`);
    process.exit(0);
}

createPdfFromImages(images, outputFileName, format);

console.log('Total images: ' + images.length);
