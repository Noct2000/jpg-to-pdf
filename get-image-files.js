const { readdirSync } = require('fs');
const path = require('node:path');

const imgRegex = /^.*\.(png|jpe?g)$/i;

function getImageFiles(pathToDir) {
    let imageFiles = [];

    readdirSync(pathToDir).forEach((file) => {
        if (file.match(imgRegex)) {
            imageFiles.push(path.join(pathToDir, file));
        }
    });
    return imageFiles;
}

module.exports = { getImageFiles };
