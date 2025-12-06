import React, { useState } from 'react';
import { isValidCard } from '../utils/luhn';
import { useSoundEffects } from '../hooks/useSoundEffects';

const PaymentModal = ({ onClose, onSuccess }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const { playClick, playSuccess, playError, playHover } = useSoundEffects();

    const handlePayment = (e) => {
        e.preventDefault();
        playClick();
        setError('');
        setIsProcessing(true);

        // Simulation delay
        setTimeout(() => {
            if (isValidCard(cardNumber)) {
                playSuccess();
                onSuccess();
                onClose();
            } else {
                playError();
                setError('Error: Tarjeta inválida detectada por Algoritmo de Luhn.');
                setIsProcessing(false);
            }
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in-up p-4">
            <div className="bg-cyber-dark border border-neon-purple w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(189,0,255,0.3)] relative overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-gray-700 text-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 uppercase tracking-widest">
                        PREMIUM UPGRADE
                    </h2>
                    <p className="text-xs text-gray-500 font-mono mt-1">SECURE PAYMENT GATEWAY // 256-BIT ENCRYPTION</p>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="mb-6 bg-yellow-900/20 border border-yellow-700/50 p-3 rounded text-xs text-yellow-500 font-mono flex gap-2">
                        <span>⚠️</span>
                        <p>SIMULACIÓN EDUCATIVA: No ingrese datos reales. Utilice tarjetas de prueba generadas por algoritmo (ej: 4242...)</p>
                    </div>

                    <form onSubmit={handlePayment} className="flex flex-col gap-4">
                        <div>
                            <label className="text-gray-400 text-xs uppercase mb-1 block">Número de Tarjeta</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                    maxLength={19}
                                    className="w-full bg-black border border-gray-600 rounded p-3 text-white focus:border-neon-purple focus:outline-none font-mono tracking-wider pl-10"
                                />
                                <span className="absolute left-3 top-3 text-gray-500">💳</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-gray-400 text-xs uppercase mb-1 block">Expiración</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    maxLength={5}
                                    className="w-full bg-black border border-gray-600 rounded p-3 text-white focus:border-neon-purple focus:outline-none font-mono text-center"
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="text-gray-400 text-xs uppercase mb-1 block">CVC</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                                    maxLength={4}
                                    className="w-full bg-black border border-gray-600 rounded p-3 text-white focus:border-neon-purple focus:outline-none font-mono text-center"
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-xs font-bold text-center animate-pulse">{error}</div>}

                        <button
                            type="button"
                            onClick={() => { playClick(); onClose(); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            [X]
                        </button>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            onMouseEnter={playHover}
                            className={`mt-4 w-full py-4 rounded font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden ${isProcessing
                                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                    : 'bg-neon-purple text-white hover:bg-white hover:text-neon-purple hover:shadow-[0_0_20px_rgba(189,0,255,0.6)]'
                                }`}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing Transaction...</span>
                                </div>
                            ) : (
                                'Confirmar Pago ($9.99)'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
