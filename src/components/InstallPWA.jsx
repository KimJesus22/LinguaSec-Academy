import React, { useState, useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const { playClick, playSuccess } = useSoundEffects();

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent browser from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setIsInstallable(true);
            console.log("PWA: Install Prompt Captured");
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        playClick();
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`PWA: User response to install prompt: ${outcome}`);

        if (outcome === 'accepted') {
            playSuccess();
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    if (!isInstallable) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black border border-neon-cyan text-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-neon-cyan hover:text-black transition-all duration-300 animate-pulse-glow"
        >
            <span className="text-xl">⬇️</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:inline">Instalar App</span>
            <span className="font-bold text-xs uppercase tracking-widest md:hidden">Instalar</span>
        </button>
    );
}
