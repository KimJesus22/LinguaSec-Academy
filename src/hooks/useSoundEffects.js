import { useCallback } from 'react';
import { useSoundContext } from '../context/SoundContext';

// Simple Audio Context singleton to avoid recreation
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const useSoundEffects = () => {
    const { isMuted } = useSoundContext();

    const playTone = useCallback((freq, type, duration, vol = 0.1) => {
        if (isMuted) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }, [isMuted]);

    const playHover = useCallback(() => {
        // High frequency tech blip
        playTone(800, 'sine', 0.05, 0.05);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Percussive low tone + high texture
        playTone(200, 'square', 0.1, 0.1);
        setTimeout(() => playTone(600, 'triangle', 0.05, 0.05), 10);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        playTone(400, 'sine', 0.1, 0.1);
        setTimeout(() => playTone(600, 'sine', 0.1, 0.1), 100);
        setTimeout(() => playTone(1000, 'sine', 0.2, 0.1), 200);
    }, [playTone]);

    const playError = useCallback(() => {
        playTone(150, 'sawtooth', 0.3, 0.2);
        setTimeout(() => playTone(100, 'sawtooth', 0.3, 0.2), 100);
    }, [playTone]);

    return { playHover, playClick, playSuccess, playError };
};
