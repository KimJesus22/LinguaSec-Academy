/**
 * Validates a credit card number using the Luhn Algorithm (Mod 10).
 * 
 * Algorithm steps:
 * 1. Remove non-digits.
 * 2. Reverse the string.
 * 3. Double every second digit.
 * 4. If result > 9, subtract 9.
 * 5. Sum all digits.
 * 6. If sum is divisible by 10, it's valid.
 * 
 * @param {string} cardNumber 
 * @returns {boolean}
 */
export const isValidCard = (cardNumber) => {
    // 1. Remove spaces and non-digits
    const cleanNumber = cardNumber.replace(/\D/g, '');

    if (cleanNumber.length < 13) return false; // Basic length check

    let sum = 0;
    let shouldDouble = false;

    // Loop through values starting from the rightmost digit
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble; // Toggle for next iteration
    }

    return (sum % 10) === 0;
};
