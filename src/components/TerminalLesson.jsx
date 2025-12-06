import React, { useState, useEffect, useRef } from 'react';

const CHALLENGES = {
    jp: {
        prompt: 'Comando de bloqueo en JAPONÉS requerido: [Fuego]',
        valid: ['hi', '火'],
        langName: 'Japonés'
    },
    kr: {
        prompt: 'Comando de bloqueo en COREANO requerido: [Fuego]',
        valid: ['bul', '불'],
        langName: 'Coreano'
    },
    en: {
        prompt: 'Comando de bloqueo en INGLÉS requerido: [Fuego]',
        valid: ['fire'],
        langName: 'Inglés'
    }
};

const TerminalLesson = ({ language = 'jp' }) => {
    const [input, setInput] = useState('');
    const challengeData = CHALLENGES[language] || CHALLENGES['jp'];

    const [history, setHistory] = useState([
        { type: 'system', text: 'Iniciando protocolo de seguridad...' },
        { type: 'system', text: 'Detectando intrusión...' },
        { type: 'challenge', text: 'ADVERTENCIA: Infiltración detectada.' },
        { type: 'challenge', text: challengeData.prompt }
    ]);
    const [isLocked, setIsLocked] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Reset history when language changes
    useEffect(() => {
        const newChallenge = CHALLENGES[language] || CHALLENGES['jp'];
        setHistory([
            { type: 'system', text: 'Iniciando protocolo de seguridad...' },
            { type: 'system', text: 'Detectando intrusión...' },
            { type: 'challenge', text: 'ADVERTENCIA: Infiltración detectada.' },
            { type: 'challenge', text: newChallenge.prompt }
        ]);
        setIsLocked(false);
        setInput('');
    }, [language]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    // Mantener foco en el input
    useEffect(() => {
        const handleClick = () => {
            if (!isLocked && inputRef.current) {
                inputRef.current.focus();
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isLocked]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            const newHistory = [...history, { type: 'user', text: command }];

            // Lógica de validación
            if (challengeData.valid.includes(command.toLowerCase())) {
                newHistory.push({ type: 'success', text: '> Acceso Concedido. Compilando siguiente módulo...' });
                setIsLocked(true);
            } else {
                newHistory.push({ type: 'error', text: '> Acceso Denegado. Error de Sintaxis.' });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-4 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {history.map((line, index) => (
                    <div key={index} className={`mb-2 ${line.type === 'error' ? 'text-red-500' :
                        line.type === 'success' ? 'text-blue-400' :
                            line.type === 'user' ? 'text-white' : 'text-green-500'
                        }`}>
                        {line.type === 'user' ? `user@linguasec:~$ ${line.text}` : line.text}
                    </div>
                ))}

                {!isLocked && (
                    <div className="flex items-center">
                        <span className="mr-2">user@linguasec:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-white w-full caret-green-500"
                            autoFocus
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Efecto decorativo CRT / Scanline opcional, pero mantiene simple por ahora */}
        </div>
    );
};

export default TerminalLesson;
