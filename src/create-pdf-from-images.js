const PDFDocument = require('pdfkit');
const {createWriteStream} = require('fs');

/**
 * Creates pdf file from given images.
 * @param {Array} images array of absolute paths.
 * @param {string} outputFileName pdf file name.
 * @param {string} pageSizeFormat size of page in pdf.
 * @return {void}
 */
function createPdfFromImages(
    images,
    outputFileName,
    pageSizeFormat,
) {
  const pdf = new PDFDocument({
    autoFirstPage: false,
  });
  pdf.pipe(createWriteStream(
    outputFileName ?
    `${outputFileName}.pdf` :
    'out.pdf',
  ));
  images.forEach((image) => {
    const openedImage = pdf.openImage(image);
    pdf.addPage(getPageSize(pageSizeFormat, openedImage));
    pdf.image(
        openedImage,
        0, 0,
        getImageOptions(openedImage, pdf.page, pageSizeFormat),
    );
  });
  pdf.end();
}

/**
 * Creates object for page size.
 * @param {string} format size of page in pdf.
 * @param {ImageSrc} openedImage opened image by pdfkit.
 * @return {{size: [int, int]}}
 */
function getPageSize(format, openedImage) {
  if (format) {
    return {size: format};
  }

  return {size: [openedImage.width, openedImage.height]};
}

/**
 * Creates object for page size.
 * @param {ImageSrc} openedImage opened image by pdfkit.
 * @param {PDFPage} page page from PDFDocument
 * @param {string} format size of page in pdf.
 * @return {ImageOption}
 */
function getImageOptions(openedImage, page, format) {
  if (!format) {
    return {};
  }

  return {scale: Math.min(
      page.width / openedImage.width,
      page.height / openedImage.height,
  )};
}

module.exports = {createPdfFromImages};
