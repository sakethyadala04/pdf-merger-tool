const PDFMerger = require('pdf-merger-js').default;

const mergepdfs = async (...pdfPaths) => {
  const merger = new PDFMerger();
  for (const p of pdfPaths) {
    console.log('Adding PDF:', p); // Log each file path
    await merger.add(p);
  }
  let d = new Date().getTime();
 const filename = `${d}.pdf`;
  await merger.save(`public/${filename}`);
  return filename; // Return the unique filename
};

module.exports = { mergepdfs };