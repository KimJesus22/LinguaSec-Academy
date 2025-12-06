import React, { useState, useEffect } from 'react';
import { scenarios } from '../data/scenarios';

const ScenarioMode = ({ scenarioId = 'negotiation-seoul', onExit }) => {
    const [scenario, setScenario] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [confidence, setConfidence] = useState(50);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const foundScenario = scenarios.find(s => s.id === scenarioId);
        if (foundScenario) {
            setScenario(foundScenario);
            setCurrentNode(foundScenario.nodes[foundScenario.startNode]);
        }
    }, [scenarioId]);

    const handleChoice = (choice) => {
        const newConfidence = Math.min(100, Math.max(0, confidence + (choice.confidenceChange || 0)));
        setConfidence(newConfidence);

        // Add to history if needed
        setHistory([...history, {
            nodeId: currentNode.id,
            choice: choice.text,
            confidence: newConfidence
        }]);

        if (choice.nextId && scenario.nodes[choice.nextId]) {
            setCurrentNode(scenario.nodes[choice.nextId]);
        }
    };

    if (!scenario || !currentNode) return <div className="text-white">Cargando escenario...</div>;

    // Render Result Screen
    if (currentNode.end) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 animate-fade-in">
                <h2 className="text-4xl font-bold mb-4">{currentNode.success ? '¡Misión Cumplida!' : 'Misión Fallida'}</h2>
                <div className="text-6xl mb-6">{currentNode.success ? '🎉' : '💀'}</div>
                <p className="text-xl mb-8 text-center max-w-lg">{currentNode.translation}</p>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-md mb-8">
                    <p className="text-gray-400 mb-2 uppercase text-xs tracking-widest">Confianza Final</p>
                    <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ${currentNode.success ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                    <p className="text-right mt-1 font-mono">{confidence}%</p>
                </div>

                <button
                    onClick={onExit}
                    className="px-8 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-full font-bold transition-all"
                >
                    Volver al Cuartel General
                </button>
            </div>
        );
    }

    // Render Game Screen
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>

            {/* Header / Stats */}
            <div className="relative z-10 p-4 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-gray-700">
                <div className="flex items-center gap-4 w-full max-w-md">
                    <span className="text-xs uppercase text-gray-400 tracking-widest">Confianza</span>
                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${confidence > 70 ? 'bg-green-500' : confidence > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                    <span className="font-mono text-sm">{confidence}%</span>
                </div>
                <button onClick={onExit} className="text-gray-400 hover:text-white text-sm uppercase">Salir</button>
            </div>

            {/* Main Scene Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-4">

                {/* Character Avatar */}
                <div className="mb-8 relative animate-float">
                    <div className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-4 ${currentNode.emotion === 'angry' ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.5)]' :
                            currentNode.emotion === 'happy' ? 'border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.5)]' :
                                'border-blue-500 shadow-[0_0_30px_rgba(0,0,255,0.5)]'
                        } flex items-center justify-center bg-gray-800 text-6xl md:text-8xl overflow-hidden transition-all duration-500`}>
                        {currentNode.emotion === 'happy' ? '😊' : currentNode.emotion === 'angry' ? '😠' : '😐'}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-1 rounded-full border border-gray-600 min-w-[120px] text-center">
                        <p className="font-bold text-sm md:text-base text-white">{currentNode.speaker}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{currentNode.role}</p>
                    </div>
                </div>

                {/* Dialogue Box */}
                <div className="w-full max-w-2xl bg-black/60 backdrop-blur-md border border-gray-600 p-6 rounded-2xl shadow-2xl mb-8 min-h-[160px]">
                    <p className="text-xl md:text-2xl font-medium mb-4 leading-relaxed text-blue-100">
                        "{currentNode.dialogue}"
                    </p>
                    <p className="text-gray-400 italic text-sm border-t border-gray-700 pt-2">
                        {currentNode.translation}
                    </p>
                </div>

                {/* Choices */}
                <div className="w-full max-w-2xl grid gap-4">
                    {currentNode.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-neon-cyan p-4 rounded-xl text-left transition-all duration-200 hover:translate-x-1 flex flex-col"
                        >
                            <span className="text-lg text-white group-hover:text-neon-cyan transition-colors">{choice.text}</span>
                            {choice.subtext && <span className="text-xs text-gray-500 mt-1">{choice.subtext}</span>}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ScenarioMode;
