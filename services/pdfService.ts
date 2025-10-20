
// This assumes jsPDF and html2canvas are loaded from a CDN in index.html
declare const jspdf: any;
declare const html2canvas: any;

export const generatePdf = async (filename: string): Promise<void> => {
  const content = document.getElementById('pdf-content');
  if (!content) {
    console.error("PDF content element not found");
    return;
  }

  try {
    const { jsPDF } = jspdf;
    const canvas = await html2canvas(content, {
      scale: 2, // Higher scale for better quality
      useCORS: true, 
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);

  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
