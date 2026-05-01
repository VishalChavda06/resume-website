const downloadCvBtn = document.getElementById('downloadCvBtn');

if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', async function () {
    downloadCvBtn.disabled = true;

    try {
      const resumePage = document.querySelector('.page');
      const canvas = await html2canvas(resumePage, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageRatio = canvas.width / canvas.height;
      const pdfRatio = pageWidth / pageHeight;

      let renderWidth = pageWidth;
      let renderHeight = pageHeight;

      if (imageRatio > pdfRatio) {
        renderHeight = pageWidth / imageRatio;
      } else {
        renderWidth = pageHeight * imageRatio;
      }

      const offsetX = (pageWidth - renderWidth) / 2;
      const offsetY = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight);
      pdf.save('Vishal-Chavda-CV.pdf');
    } catch (error) {
      alert('Unable to download PDF. Please try again.');
      console.error(error);
    } finally {
      downloadCvBtn.disabled = false;
    }
  });
}
