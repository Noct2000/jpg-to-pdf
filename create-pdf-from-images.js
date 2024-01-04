const PDFDocument = require('pdfkit');
const { createWriteStream } = require('fs');

function createPdfFromImages(
    images,
    outputFileName,
    pageSizeFormat
) {
    let pdf = new PDFDocument({
        autoFirstPage: false
    });
    pdf.pipe(createWriteStream(outputFileName ? `${outputFileName}.pdf` : 'out.pdf'));
    images.forEach((image) => {
        let openedImage = pdf.openImage(image);
        pdf.addPage(getPageSize(pageSizeFormat, openedImage));
        pdf.image(openedImage, 0, 0, getImageOptions(openedImage, pdf.page, pageSizeFormat));
    });
    pdf.end();
}

function getPageSize(format, openedImage) {
    if (format) {
        return { size: format };
    }

    return { size: [openedImage.width, openedImage.height] };
}

function getImageOptions(openedImage, page, format) {
    if (!format) {
        return {};
    }

    return {scale : Math.min(page.width / openedImage.width, page.height / openedImage.height)};
}

module.exports = { createPdfFromImages };
