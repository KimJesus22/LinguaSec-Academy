import React, { createContext, useState, useContext, useEffect } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        // Persist mute preference
        const saved = localStorage.getItem('linguasec_mute');
        return saved === 'true';
    });

    const toggleMute = () => {
        setIsMuted(prev => {
            const newVal = !prev;
            localStorage.setItem('linguasec_mute', newVal);
            return newVal;
        });
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSoundContext = () => useContext(SoundContext);
