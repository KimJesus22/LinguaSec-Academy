import React from 'react';

const LanguageCard = ({ language, flag, nativeText, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative bg-cyber-dark border border-gray-800 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] flex flex-col items-center justify-center gap-4 text-center h-80 w-full max-w-sm"
        >
            <div className="text-6xl transform transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                {flag}
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white tracking-widest uppercase transition-colors group-hover:text-neon-cyan">
                    {language}
                </h3>
                <span className="text-4xl text-gray-500 font-serif group-hover:text-neon-purple transition-colors duration-300">
                    {nativeText}
                </span>
            </div>

            <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-neon-cyan text-sm tracking-widest font-mono border-b border-neon-cyan pb-1">
                    INICIAR / START
                </span>
            </div>
        </div>
    );
};

export default LanguageCard;
