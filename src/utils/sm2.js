/**
 * SuperMemo 2 (SM-2) Algorithm implementation.
 * 
 * @param {number} quality - 0-5 grade (0=blackout, 5=perfect).
 * @param {object} previousData - { repetitionNumber, easinessFactor, interval }
 * @returns {object} - { repetitionNumber, easinessFactor, interval, nextReviewDate }
 */
export const calculateNextReview = (quality, previousData = {}) => {
    let {
        repetitionNumber = 0,
        easinessFactor = 2.5,
        interval = 0
    } = previousData;

    // Si la calidad es menor a 3, el usuario falló. Reiniciar repeticiones.
    if (quality < 3) {
        return {
            repetitionNumber: 0,
            easinessFactor: easinessFactor, // EF no suele cambiar al fallar, pero n sí.
            interval: 1, // Revisar mañana
            nextReviewDate: getFutureDate(1)
        };
    }

    // Actualizar EF
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const newEf = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    // EF no puede bajar de 1.3
    const finalEf = Math.max(newEf, 1.3);

    // Calcular intervalo
    let newInterval;
    const newRepetitionNumber = repetitionNumber + 1;

    if (newRepetitionNumber === 1) {
        newInterval = 1;
    } else if (newRepetitionNumber === 2) {
        newInterval = 6;
    } else {
        newInterval = Math.round(interval * finalEf);
    }

    return {
        repetitionNumber: newRepetitionNumber,
        easinessFactor: parseFloat(finalEf.toFixed(2)),
        interval: newInterval,
        nextReviewDate: getFutureDate(newInterval)
    };
};

// Helper para sumar días a hoy
const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
};
