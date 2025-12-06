import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const LanguageCard = ({ language, flag, nativeText, onClick }) => {
    const { playHover } = useSoundEffects();

    return (
        <div
            onClick={onClick}
            onMouseEnter={playHover}
            className="w-full max-w-sm bg-cyber-dark border border-gray-700 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] group relative overflow-hidden"
        >
            {/* Background Glitch Effect on Hover */}
            <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex flex-col items-center relative z-10">
                <span className="text-6xl mb-4 drop-shadow-md">{flag}</span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{language}</h3>
                <p className="text-gray-400 text-sm font-mono tracking-widest uppercase items-center flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-neon-green transition-colors"></span>
                    {nativeText}
                </p>
            </div>

            {/* Decorative corner lines */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-neon-cyan transition-all duration-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-neon-cyan transition-all duration-500"></div>
        </div>
    );
};

export default LanguageCard;
