import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speak = useCallback((text, locale) => {
        if (!text) return;

        // Cancelar cualquier audio previo
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = locale;

        // Intentar buscar una voz específica para el idioma que suene bien si es posible
        // (Esto es best-effort, ya que depende del OS)
        const voice = voices.find(v => v.lang.includes(locale) && !v.name.includes('Google')); // A veces las de Google en Chrome son buenas, otras veces queremos nativas.
        // Simplemente buscamos la primera que coincida con el locale
        const bestVoice = voices.find(v => v.lang === locale) || voices.find(v => v.lang.startsWith(locale.split('-')[0]));

        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [voices]);

    const cancel = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    return {
        speak,
        cancel,
        isSpeaking,
        hasVoices: voices.length > 0
    };
};
