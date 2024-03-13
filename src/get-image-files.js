const {readdirSync} = require('fs');
const path = require('node:path');

const imgRegex = /^.*\.(png|jpe?g)$/i;

/**
 * Gets array of absolute image paths in given dir.
 * @param {string} pathToDir path to dir with images.
 * @return {Array} array of full pathes of images in the dir.
 */
function getImageFiles(pathToDir) {
  const imageFiles = [];

  readdirSync(pathToDir).forEach((file) => {
    if (file.match(imgRegex)) {
      imageFiles.push(path.join(pathToDir, file));
    }
  });
  return imageFiles;
}

module.exports = {getImageFiles};
