/**
 * Evalúa el puntaje y retorna el nivel MCER correspondiente.
 * @param {number} puntaje - Número de respuestas correctas.
 * @returns {object} Objeto con nivel, nombre descriptivo y clase de color.
 */
export const calcularNivelMCER = (puntaje) => {
    if (puntaje <= 2) return { nivel: "A1", nombre: "Acceso", color: "text-gray-400" };
    if (puntaje <= 4) return { nivel: "A2", nombre: "Plataforma", color: "text-blue-400" };
    if (puntaje <= 6) return { nivel: "B1", nombre: "Umbral", color: "text-green-400" };
    if (puntaje <= 8) return { nivel: "B2", nombre: "Avanzado", color: "text-neon-cyan" };
    return { nivel: "C1/C2", nombre: "Dominio", color: "text-neon-purple" };
};

/**
 * Retorna un mensaje motivacional basado en el nivel obtenido.
 * @param {string} nivel - El código del nivel (ej. "A1", "C1/C2").
 * @returns {string} Mensaje motivacional.
 */
export const getMensajeMotivacional = (nivel) => {
    switch (nivel) {
        case "A1": return "Todo viaje comienza con un primer paso. ¡Sigue adelante!";
        case "A2": return "¡Buen comienzo! Ya tienes las bases, ahora a construir.";
        case "B1": return "¡Excelente! Ya puedes defenderte en situaciones cotidianas.";
        case "B2": return "¡Impresionante! Tu fluidez está despegando hacia niveles profesionales.";
        case "C1/C2": return "¡Increíble! Eres un maestro del idioma. El ciberespacio es tuyo.";
        default: return "Sigue practicando.";
    }
};
