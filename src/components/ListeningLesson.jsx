import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

const AUDIO_CHALLENGES = {
    jp: {
        text: 'サーバーがダウンしています。直ちに再起動してください。',
        locale: 'ja-JP',
        options: [
            { id: 1, text: 'El servidor está funcionando correctamente.', correct: false },
            { id: 2, text: 'El servidor está caído. Reinicie inmediatamente.', correct: true },
            { id: 3, text: 'La base de datos necesita actualización.', correct: false }
        ]
    },
    kr: {
        text: '방화벽이 뚫렸습니다. 백업을 시작하세요.',
        locale: 'ko-KR',
        options: [
            { id: 1, text: 'El firewall ha sido brechado. Inicie el respaldo.', correct: true },
            { id: 2, text: 'El sistema está seguro. No se requiere acción.', correct: false },
            { id: 3, text: 'La conexión a internet es lenta.', correct: false }
        ]
    },
    en: {
        text: 'Unauthorized access detected in sector 7. Lockdown protocol initiated.',
        locale: 'en-US',
        options: [
            { id: 1, text: 'Acceso autorizado en sector 7. Protocolo de bienvenida.', correct: false },
            { id: 2, text: 'Mantenimiento programado en sector 7.', correct: false },
            { id: 3, text: 'Acceso no autorizado detectado. Protocolo de bloqueo iniciado.', correct: true }
        ]
    }
};

const ListeningLesson = ({ language = 'jp' }) => {
    const { speak, isSpeaking, hasVoices } = useTextToSpeech();
    const [revealed, setRevealed] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [challenge, setChallenge] = useState(AUDIO_CHALLENGES['jp']);

    useEffect(() => {
        setChallenge(AUDIO_CHALLENGES[language] || AUDIO_CHALLENGES['jp']);
        setRevealed(false);
        setSelectedOption(null);
    }, [language]);

    const handlePlay = () => {
        speak(challenge.text, challenge.locale);
        // Revelar opciones un poco después de empezar
        if (!revealed) {
            setTimeout(() => setRevealed(true), 1500);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono text-white">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <div className="z-10 w-full max-w-md bg-black/60 border border-green-500/30 p-8 rounded-xl backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,0,0.1)]">

                {/* Header Label */}
                <div className="flex justify-between items-center mb-8 border-b border-green-500/30 pb-2">
                    <span className="text-xs text-green-500 uppercase tracking-[0.2em] animate-pulse">● Live Intercept</span>
                    <span className="text-xs text-gray-500">FREQ: 140.85 MHz</span>
                </div>

                {/* Visualizer */}
                <div className="h-32 flex items-center justify-center gap-1 mb-8">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="w-2 bg-green-500/80 transition-all duration-75 rounded-full"
                            style={{
                                height: isSpeaking ? `${Math.random() * 100}%` : '4px',
                                opacity: isSpeaking ? 1 : 0.2
                            }}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={handlePlay}
                        disabled={isSpeaking}
                        className={`px-8 py-3 rounded-full border transition-all uppercase tracking-widest text-sm font-bold flex items-center gap-2
                    ${isSpeaking
                                ? 'bg-green-500/10 border-green-500 text-green-500 animate-pulse'
                                : 'bg-green-600 hover:bg-green-500 border-transparent text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]'}`}
                    >
                        {isSpeaking ? 'RECEIVING...' : '▶ PLAY TRANSMISSION'}
                    </button>
                </div>

                {/* Options (Hidden initially) */}
                <div className={`space-y-3 transition-all duration-1000 ${revealed ? 'opacity-100 filter-none' : 'opacity-30 blur-sm pointer-events-none'}`}>
                    {challenge.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className={`w-full p-4 text-left border rounded transition-all text-sm
                        ${selectedOption?.id === option.id
                                    ? (option.correct
                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                        : 'bg-red-500/20 border-red-500 text-red-400')
                                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 text-gray-300'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{option.text}</span>
                                {selectedOption?.id === option.id && (
                                    <span>{option.correct ? '✓' : '✗'}</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {!hasVoices && (
                    <div className="mt-4 text-xs text-red-400 text-center">
                        ⚠ Web Speech API not fully loaded or supported.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListeningLesson;
