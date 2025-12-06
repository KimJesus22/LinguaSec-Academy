import React from 'react';

const TermsModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up p-4">
            <div className="bg-cyber-dark border border-neon-cyan w-full max-w-2xl h-[80vh] flex flex-col rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.2)] relative overflow-hidden">

                {/* Header */}
                <div className="bg-black/50 p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-neon-cyan uppercase tracking-widest flex items-center gap-2">
                        <span>⚖️</span> Acuerdo Legal
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        [X]
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 text-justify text-gray-300 font-mono text-xs md:text-sm space-y-4 custom-scrollbar">
                    <p className="font-bold text-white mb-4">
                        TÉRMINOS DE SERVICIO Y AVISO DE PRIVACIDAD
                    </p>

                    <p>
                        De conformidad con lo dispuesto en la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, LinguaSec Academy (en adelante "LA AGENCIA") pone a su disposición el presente Aviso de Privacidad.
                    </p>

                    <h3 className="text-neon-cyan font-bold mt-4">1. TRATAMIENTO DE DATOS</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <h3 className="text-neon-cyan font-bold mt-4">2. FINALIDAD DEL TRATAMIENTO</h3>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <h3 className="text-neon-cyan font-bold mt-4">3. TRANSFERENCIA DE DATOS (INTERPOL)</h3>
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>

                    <p className="mt-8 text-gray-500 italic text-center border-t border-gray-700 pt-4">
                        Última actualización: {new Date().toLocaleDateString()} // ID: LSA-LEGAL-2025
                    </p>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 bg-black/50 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 uppercase tracking-wider font-bold rounded"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
