import React, { useState, useEffect, useRef } from 'react';
import { generateCertificateFromElement } from '../services/certificateService';
import { useSoundEffects } from '../hooks/useSoundEffects';
import CertificateTemplate from './CertificateTemplate';

const QuizResultUI = ({ score, totalQuestions, levelData, mensaje, onRetry, onExit, languageName, isIntruder = false }) => {
    const [userName, setUserName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [verificationStep, setVerificationStep] = useState(0); // 0: Idle, 1: Identity, 2: Interpol, 3: NOM-151, 4: Granted

    const { playClick, playHover, playSuccess } = useSoundEffects();

    // Ref for the certificate component
    const certificateRef = useRef(null);

    const handleVerification = () => {
        playClick();
        if (!userName.trim()) {
            alert("IDENTIFICACIÓN REQUERIDA: Ingrese su nombre clave.");
            return;
        }
        setVerificationStep(1);
    };

    useEffect(() => {
        if (verificationStep > 0 && verificationStep < 4) {
            const timer = setTimeout(() => {
                setVerificationStep(prev => prev + 1);
                playHover(); // Sound for each step
            }, 1000); // 1 segundo por paso
            return () => clearTimeout(timer);
        }
    }, [verificationStep, playHover]);

    const handleDownload = async () => {
        playSuccess();
        if (!certificateRef.current) return;

        setIsGenerating(true);

        // Small delay to allow UI to update (spinner)
        setTimeout(async () => {
            await generateCertificateFromElement(certificateRef.current, `Certificado_LinguaSec_${userName.replace(/\s+/g, '_')}.pdf`);
            setIsGenerating(false);
        }, 500);
    };

    const getLogMessage = () => {
        switch (verificationStep) {
            case 1: return "Verificando identidad del usuario...";
            case 2: return "Consultando base de datos de Interpol...";
            case 3: return "Validando firma digital conforme a la NOM-151...";
            case 4: return "ACCESO CONCEDIDO.";
            default: return "";
        }
    };

    return (
        <div className={`w-full max-w-2xl bg-cyber-dark border ${isIntruder ? 'border-neon-red shadow-[0_0_50px_rgba(255,7,58,0.3)]' : 'border-neon-cyan/50 shadow-[0_0_50px_rgba(0,243,255,0.15)]'} rounded-2xl p-8 text-center animate-fade-in-up relative overflow-hidden font-mono`}>
            {/* Hidden Container for Certificate Rendering */}
            <div style={{ position: 'absolute', top: -10000, left: -10000 }}>
                <CertificateTemplate
                    ref={certificateRef}
                    candidateName={userName}
                    language={languageName}
                    level={`${levelData.nivel} - ${levelData.nombre}`}
                    date={new Date().toLocaleDateString()}
                    signature="Cmdt. Shepard"
                />
            </div>

            {/* Decorative background glow */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${isIntruder ? 'bg-neon-red/10' : 'bg-neon-cyan/10'} rounded-full blur-3xl -z-10`}></div>

            <h2 className={`text-3xl md:text-4xl font-bold ${isIntruder ? 'text-neon-red' : 'text-white'} mb-2 uppercase tracking-widest animate-glitch title-glitch`}>
                {isIntruder ? 'ALERTA DE SEGURIDAD' : 'Informe de Nivelación'}
            </h2>
            <div className={`h-1 w-24 ${isIntruder ? 'bg-neon-red shadow-[0_0_10px_#ff073a]' : 'bg-neon-cyan shadow-[0_0_10px_#00f3ff]'} mx-auto mb-8 rounded-full`}></div>

            {!isIntruder && (
                <div className="mb-4">
                    <p className="text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">Puntaje Final</p>
                    <div className="text-5xl font-mono text-white mb-2">
                        <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">{score}</span>
                        <span className="text-gray-600 text-3xl"> / {totalQuestions}</span>
                    </div>
                </div>
            )}

            <div className="mb-8 p-6 bg-black/60 rounded-xl border border-gray-800 backdrop-blur-sm transform transition-all hover:border-gray-500">
                <p className="text-gray-300 text-lg mb-2 uppercase tracking-widest">{isIntruder ? 'Estado del Sujeto:' : 'Nivel Identificado:'}</p>
                <div className={`text-5xl md:text-6xl font-bold mb-2 ${levelData.color} drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] animate-pulse-glow`}>
                    {levelData.nivel}
                </div>
                <div className={`text-2xl font-light uppercase tracking-[0.3em] text-white`}>
                    {levelData.nombre}
                </div>
            </div>

            <p className={`text-gray-300 italic mb-8 text-lg px-4 border-l-2 ${isIntruder ? 'border-neon-red/50 bg-gradient-to-r from-neon-red/5' : 'border-neon-purple/50 bg-gradient-to-r from-neon-purple/5'} to-transparent py-4 text-left`}>
            > "{mensaje}"
            </p>

            {/* Certificate Generator Section (Hidden for Intruders) */}
            {!isIntruder && (
                <div className="mb-10 bg-black/80 p-6 rounded-xl border border-gray-700 relative overflow-hidden">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full pointer-events-none animate-scan"></div>

                    <h3 className="text-neon-cyan text-lg font-bold mb-4 uppercase tracking-wider flex items-center justify-center gap-2">
                        <span>🛡️</span> Certificación Oficial
                    </h3>

                    <div className="flex flex-col gap-4 items-center max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="NOMBRE CLAVE (Usuario)"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={verificationStep > 0}
                            className="bg-gray-900/80 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan w-full text-center tracking-widest uppercase disabled:opacity-50"
                        />

                        {verificationStep === 0 && (
                            <button
                                onClick={handleVerification}
                                onMouseEnter={playHover}
                                className="w-full px-6 py-3 rounded bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
                            >
                                [ INICIAR VALIDACIÓN ]
                            </button>
                        )}

                        {verificationStep > 0 && verificationStep < 4 && (
                            <div className="w-full bg-gray-900 border border-gray-700 rounded p-4 font-mono text-xs text-left h-24 flex flex-col justify-end text-green-400 gap-1 shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-reveal"></div>
                                {verificationStep >= 1 && <p>> {getLogMessage()}</p>}
                                <p className="animate-pulse">_</p>
                            </div>
                        )}

                        {verificationStep === 4 && (
                            <div className="w-full animate-fade-in-up">
                                <div className="text-neon-green text-xs mb-2 uppercase tracking-widest font-bold border-b border-neon-green/30 pb-1 mb-3">
                                >> ACCESO CONCEDIDO
                                </div>
                                <button
                                    onClick={handleDownload}
                                    onMouseEnter={playHover}
                                    disabled={isGenerating}
                                    className="w-full px-6 py-3 rounded bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-sm disabled:opacity-50 shadow-[0_0_15px_rgba(189,0,255,0.2)] hover:shadow-[0_0_25px_rgba(189,0,255,0.6)]"
                                >
                                    {isGenerating ? 'GENERANDO ARCHIVO...' : 'DESCARGAR CERTIFICADO OFICIAL'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => { playClick(); onRetry(); }}
                    onMouseEnter={playHover}
                    className="px-6 py-2 rounded-full text-gray-500 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300 uppercase text-xs tracking-widest border border-transparent hover:border-neon-cyan/30"
                >
                    [ Reiniciar ]
                </button>
                <button
                    onClick={() => { playClick(); onExit(); }}
                    onMouseEnter={playHover}
                    className="px-6 py-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 uppercase text-xs tracking-widest border border-transparent hover:border-red-500/30"
                >
                    [ Salir ]
                </button>
            </div>
        </div>
    );
};

export default QuizResultUI;
