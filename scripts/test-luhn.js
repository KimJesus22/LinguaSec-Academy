
import { isValidCard } from '../src/utils/luhn.js';

console.log("🔍 Iniciando Test de Algoritmo de Luhn (Módulo 10)...");

const testCases = [
    { number: "4242424242424242", expected: true, desc: "Valid Stripe Test Card" },
    { number: "4532015112830366", expected: true, desc: "Valid Visa" },
    { number: "1234567812345678", expected: false, desc: "Invalid Sequential" },
    { number: "1234567812345670", expected: true, desc: "Valid Checksum for Sequential" }, // Calculated valid
    { number: "0000 0000 0000 0000", expected: true, desc: "Valid Zeros (Spaces)" },
    { number: "1111", expected: false, desc: "Too Short" }
];

let passed = 0;
testCases.forEach(test => {
    const result = isValidCard(test.number);
    const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
    console.log(`${status}: ${test.desc} (${test.number}) -> ${result}`);
    if (result === test.expected) passed++;
});

console.log(`\nResultados: ${passed}/${testCases.length} Pruebas Aprobadas.`);
if (passed === testCases.length) {
    console.log("✨ El Algoritmo es Matemáticamente Correcto.");
} else {
    console.error("⚠️ Errores detectados en la lógica.");
    process.exit(1);
}
