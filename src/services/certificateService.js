import jsPDF from 'jspdf';

/**
 * Genera y descarga un certificado PDF oficial.
 * @param {object} data - Datos para el certificado { nombre, idioma, nivel, fecha }.
 */
export const generateCertificate = ({ nombre, idioma, nivel, fecha }) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Configuración de colores
    const bgBlack = '#0a0a0a';
    const neonCyan = '#00f3ff';
    const neonPurple = '#bd00ff';
    const white = '#ffffff';

    // Fondo
    doc.setFillColor(bgBlack);
    doc.rect(0, 0, 297, 210, 'F');

    // Bordes Decorativos
    doc.setLineWidth(1);
    doc.setDrawColor(neonCyan);
    doc.rect(10, 10, 277, 190); // Borde exterior

    doc.setLineWidth(0.5);
    doc.setDrawColor(neonPurple);
    doc.rect(15, 15, 267, 180); // Borde interior

    // Esquinas tecnológicas
    const cornerSize = 10;
    doc.setLineWidth(2);
    doc.setDrawColor(neonCyan);

    // Top-Left
    doc.line(10, 10, 10 + cornerSize, 10);
    doc.line(10, 10, 10, 10 + cornerSize);

    // Top-Right
    doc.line(287 - cornerSize, 10, 287, 10);
    doc.line(287, 10, 287, 10 + cornerSize);

    // Bottom-Left
    doc.line(10, 200 - cornerSize, 10, 200);
    doc.line(10, 200, 10 + cornerSize, 200);

    // Bottom-Right
    doc.line(287 - cornerSize, 200, 287, 200);
    doc.line(287, 200 - cornerSize, 287, 200);

    // Título App
    doc.setFont("helvetica", "bold");
    doc.setTextColor(neonCyan);
    doc.setFontSize(36);
    doc.text("LINGUASEC ACADEMY", 148.5, 50, { align: "center" });

    // Subtítulo
    doc.setFontSize(14);
    doc.setTextColor(200, 200, 200);
    doc.text("CERTIFICADO OFICIAL DE NIVELACIÓN", 148.5, 65, { align: "center" });
    doc.setLineWidth(0.5);
    doc.setDrawColor(neonPurple);
    doc.line(70, 70, 227, 70);

    // Cuerpo del texto
    doc.setFont("helvetica", "normal");
    doc.setTextColor(white);
    doc.setFontSize(18);
    doc.text("Por la presente se certifica que:", 148.5, 90, { align: "center" });

    // Nombre del usuario (Grande)
    doc.setFont("courier", "bold"); // Look más técnico
    doc.setTextColor(neonPurple);
    doc.setFontSize(32);
    doc.text(nombre.toUpperCase(), 148.5, 110, { align: "center" });

    // Texto de detalle
    doc.setFont("helvetica", "normal");
    doc.setTextColor(white);
    doc.setFontSize(16);
    const texto = `Ha completado satisfactoriamente el diagnóstico de ${idioma}, obteniendo el nivel`;
    doc.text(texto, 148.5, 130, { align: "center" });

    // Nivel Obtenido
    doc.setFont("helvetica", "bold");
    doc.setTextColor(neonCyan);
    doc.setFontSize(28);
    doc.text(`[ ${nivel} ]`, 148.5, 145, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(white);
    doc.setFontSize(14);
    doc.text("según el Marco Común Europeo de Referencia para las lenguas (MCER).", 148.5, 155, { align: "center" });

    // Fecha y Firma
    const firmaY = 180;

    // Fecha
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text(`Fecha: ${fecha}`, 40, firmaY);

    // Firma
    doc.setFont("courier", "italic");
    doc.setTextColor(neonPurple);
    doc.text("CyberDirector", 230, firmaY, { align: "center" });
    doc.setDrawColor(neonPurple);
    doc.line(200, firmaY - 5, 260, firmaY - 5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(white);
    doc.setFontSize(10);
    doc.text("Director de Seguridad", 230, firmaY + 5, { align: "center" });

    // Guardar
    doc.save(`Certificado_LinguaSec_${nombre.replace(/\s+/g, '_')}.pdf`);
};
