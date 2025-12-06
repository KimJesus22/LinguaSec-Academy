import React, { useRef, useState } from 'react';
import { generateCertificateFromElement } from '../services/certificateService';
import CertificateTemplate from './CertificateTemplate';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useAuth } from '../context/AuthContext';
import { logUserAction } from '../services/auditService';

const QuizResultUI = ({ score, totalQuestions, levelData, mensaje, onRetry, onExit, languageName, isIntruder = false, onStartPatching, wrongAnswersCount = 0, onShowDashboard }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const [candidateName, setCandidateName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [securityCheckProgress, setSecurityCheckProgress] = useState(0);
    const [securityStatus, setSecurityStatus] = useState('');

    const certificateRef = useRef(null);
    const { playClick, playSuccess, playError, playHover } = useSoundEffects();
    const { user } = useAuth(); // Get user for logging

    const handleDownload = async () => {
        if (!candidateName.trim()) {
            playError();
            alert("Por favor ingresa tu nombre de agente.");
            return;
        }

        playClick();
        setIsGenerating(true);
        setSecurityStatus('Verificando identidad del usuario...');

        // Simulation Sequence
        setTimeout(() => { setSecurityCheckProgress(30); setSecurityStatus('Consultando base de datos de Interpol...'); }, 1000);
        setTimeout(() => { setSecurityCheckProgress(70); setSecurityStatus('Validando firma digital conforme a la NOM-151...'); }, 2000);
        setTimeout(async () => {
            setSecurityCheckProgress(100);
            setSecurityStatus('ACCESO CONCEDIDO. Generando documento oficial...');
            playSuccess();

            try {
                await generateCertificateFromElement(certificateRef.current, `Certificado_LinguaSec_${candidateName.replace(/\s+/g, '_')}`);

                // Log Action with User ID
                if (user) {
                    logUserAction(user.id, 'CERTIFICATE_DOWNLOADED');
                }

                setSecurityStatus('Descarga completada.');
            } catch (error) {
                console.error("Error generating certificate", error);
                setSecurityStatus('Error en la generación. Intente nuevamente.');
                playError();
            } finally {
                setIsGenerating(false);
            }
        }, 3500);
    };

    return (
        <div className="w-full max-w-2xl bg-cyber-dark border border-gray-700 rounded-2xl p-8 text-center animate-fade-in-up relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">

            {isIntruder && (
                <div className="absolute inset-0 bg-red-900/90 z-50 flex flex-col items-center justify-center p-8 text-white animate-pulse">
                    <h1 className="text-6xl font-bold mb-4">INTRUSO</h1>
                    <p className="text-2xl font-mono uppercase tracking-widest text-center">
                        Se ha detectado actividad sospechosa. Su acceso ha sido revocado permanentemente.
                    </p>
                    <div className="mt-8 p-4 border border-white rounded">
                        SCORE: 0 / 10
                    </div>
                    <button
                        onClick={onExit}
                        className="mt-8 px-8 py-3 bg-black border border-white hover:bg-white hover:text-black transition-colors uppercase font-bold"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}

            {/* Hidden Certificate Template for Capture */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
                <div ref={certificateRef}>
                    <CertificateTemplate
                        candidateName={candidateName}
                        language={languageName}
                        level={levelData}
                        date={new Date().toLocaleDateString()}
                        signature="Director de LinguaSec"
                    />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Resultados de la Evaluación</h2>
            <div className={`text-6xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] text-${levelData.color?.replace('text-', '') || 'neon-cyan'}`} style={{ color: levelData.color === 'text-neon-green' ? '#39ff14' : levelData.color === 'text-neon-cyan' ? '#00f3ff' : levelData.color === 'text-neon-purple' ? '#bd00ff' : '#ff003c' }}>
                {score} / {totalQuestions}
            </div>

            <div className="mb-8">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Nivel Identificado</p>
                <div className={`text-4xl font-bold ${levelData.color} title-glitch`}>
                    {levelData.nivel}: {levelData.nombre}
                </div>
            </div>

            <p className="text-gray-300 italic mb-8 border-l-4 border-gray-600 pl-4 text-left">
                "{mensaje}"
            </p>

            {/* Certificate Section */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 mb-8">
                <h3 className="text-neon-cyan font-bold mb-4 flex items-center justify-center gap-2">
                    <span>📜</span> EMISIÓN DE CERTIFICADO OFICIAL
                </h3>

                <input
                    type="text"
                    placeholder="Nombre completo del Agente"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-black border border-gray-600 rounded p-3 text-white mb-4 focus:border-neon-cyan focus:outline-none font-mono text-center uppercase"
                />

                {/* Security Progress Bar */}
                {isGenerating && (
                    <div className="mb-4">
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-neon-green transition-all duration-300 ease-out"
                                style={{ width: `${securityCheckProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-neon-green mt-2 font-mono animate-pulse">{securityStatus}</p>
                    </div>
                )}

                <button
                    onClick={handleDownload}
                    onMouseEnter={playHover}
                    disabled={isGenerating}
                    className={`w-full py-3 rounded font-bold uppercase tracking-wider transition-all duration-300 ${isGenerating ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-neon-cyan text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]'}`}
                >
                    {isGenerating ? 'Procesando...' : 'Descargar Certificado Oficial'}
                </button>
            </div>

            {/* Patching Protocol Button */}
            {onStartPatching && (
                <div className="mb-8 animate-pulse">
                    <button
                        onClick={() => { playClick(); onStartPatching(); }}
                        className="w-full py-4 rounded font-bold uppercase tracking-widest bg-red-600/20 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)] flex items-center justify-center gap-2"
                        onMouseEnter={playHover}
                    >
                        <span>⚠️</span> {wrongAnswersCount} VULNERABILIDADES DETECTADAS - INICIAR PARCHEO
                    </button>
                </div>
            )}

            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => { playClick(); onRetry(); }}
                    className="px-6 py-2 rounded-full border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all uppercase text-sm"
                    onMouseEnter={playHover}
                >
                    Reintentar Misión
                </button>
                <button
                    onClick={() => { playClick(); onExit(); }}
                    className="px-6 py-2 rounded-full border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all uppercase text-sm"
                    onMouseEnter={playHover}
                >
                    Salir
                </button>
            </div>

            {/* Dashboard Link */}
            <div className="mt-8 pt-8 border-t border-gray-800">
                <button
                    onClick={() => { playClick(); onShowDashboard && onShowDashboard(); }}
                    className="text-neon-cyan hover:text-white underline uppercase tracking-widest text-sm"
                >
                    [ 🗺️ ACCEDER AL CENTRO DE MANDO ]
                </button>
            </div>
        </div>
    );
};

export default QuizResultUI;
