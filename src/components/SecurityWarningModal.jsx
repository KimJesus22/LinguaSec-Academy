import React from 'react';

const SecurityWarningModal = ({ onClose, attempts }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neon-red/20 backdrop-blur-md animate-pulse">
            <div className="bg-black border-2 border-neon-red p-8 max-w-md text-center rounded-xl shadow-[0_0_50px_rgba(255,7,58,0.5)] relative overflow-hidden">
                {/* Striped Background Effect */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,7,58,0.1)_10px,rgba(255,7,58,0.1)_20px)] pointer-events-none"></div>

                <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-neon-red animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-neon-red mb-4 font-mono uppercase tracking-widest animate-glitch" style={{ textShadow: '2px 2px 0px #000' }} >
                    ⚠️ ANOMALÍA DETECTADA
                </h2>

                <p className="text-white mb-6 font-mono font-bold text-lg">
                    Mantenga el foco en la terminal de evaluación.
                </p>

                <p className="text-red-400 text-sm mb-8 uppercase tracking-widest">
                    Advertencia de Seguridad {attempts}/2
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-neon-red text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-200"
                >
                    [ RECONOCER Y CONTINUAR ]
                </button>
            </div>
        </div>
    );
};

export default SecurityWarningModal;
