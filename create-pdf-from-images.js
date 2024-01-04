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
        var openedImage = pdf.openImage(image);
        pdf.addPage(getPageSize(pageSizeFormat, openedImage))
            .image(openedImage, 0, 0);
    });
    pdf.end();

}

function getPageSize(format, openedImage) {
    if (format) {
        return { size: format };
    }

    return { size: [openedImage.width, openedImage.height] };
}

module.exports = { createPdfFromImages };
