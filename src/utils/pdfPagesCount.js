export default function pdfPagesCount(pdfBlob) {
  return new Promise((done) => {
    const reader = new FileReader();
    reader.onload = function () {
      const raw = reader.result;
      const pages = raw.match(/\/Type[\s]*\/Page[^s]/g).length;

      done(pages);
    };
    reader.readAsBinaryString(pdfBlob);
  });
}
