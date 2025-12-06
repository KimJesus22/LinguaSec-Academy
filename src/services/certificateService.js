import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificateFromElement = async (element, fileName = 'Certificado_LinguaSec.pdf') => {
    if (!element) {
        console.error("No element provided for certificate generation");
        return;
    }

    try {
        // Generate Canvas from DOM element
        const canvas = await html2canvas(element, {
            scale: 2, // Higher resolution
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');

        // Create PDF (Landscape, A4)
        // A4 Landscape size: 297mm x 210mm
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate aspect ratio to fit image
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.width / imgProps.height;

        // Fit to page (leaving small margin if desired, or full bleed)
        // Here we maximize width
        const width = pdfWidth;
        const height = width / ratio;

        // Center vertically if height is less than page height
        const yOffset = (pdfHeight - height) / 2;

        pdf.addImage(imgData, 'PNG', 0, Math.max(0, yOffset), width, height);
        pdf.save(fileName);

    } catch (error) {
        console.error("Error generating certificate PDF:", error);
        alert("Error generando el certificado. Por favor intente nuevamente.");
    }
};
