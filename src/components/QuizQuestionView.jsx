import React from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const QuizQuestionView = ({
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    selectedOption,
    isAnswerChecked,
    onOptionClick
}) => {
    const { playHover, playClick, playSuccess, playError } = useSoundEffects();

    const handleOptionSelect = (index) => {
        if (isAnswerChecked) return;

        // Determine sound based on correctness (optimistic feedback directly on click if needed, 
        // or rely on visual state, but here we trigger general click first or specific result)
        if (index === currentQuestion.correctAnswer) {
            playSuccess();
        } else {
            playError();
        }

        onOptionClick(index);
    };

    return (
        <div className="w-full max-w-3xl flex flex-col gap-6 animate-fade-in-up">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4 border border-gray-800 relative">
                <div className="absolute inset-0 bg-gray-900/50"></div>
                <div
                    className="h-full bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,243,255,0.5)] relative z-10"
                    style={{ width: `${Math.max(progress, 2)}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                </div>
            </div>

            <div className="bg-cyber-dark border border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-gray-700 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-gray-800 select-none pointer-events-none group-hover:text-gray-800/80 transition-colors">
                    {currentQuestionIndex + 1}
                </div>

                <div className="mb-4">
                    <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded border ${currentQuestionIndex < 3 ? 'border-green-500/50 text-green-400' :
                            currentQuestionIndex < 7 ? 'border-yellow-500/50 text-yellow-400' :
                                'border-red-500/50 text-red-400'
                        }`}>
                        {currentQuestion.level}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed min-h-[4rem]">
                    {currentQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        let buttonStyle = "border-gray-700 bg-gray-800/30 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5";

                        if (isAnswerChecked) {
                            if (index === currentQuestion.correctAnswer) {
                                buttonStyle = "border-neon-green bg-neon-green/10 text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.4)] animate-pulse";
                            } else if (index === selectedOption) {
                                buttonStyle = "border-neon-red bg-neon-red/10 text-neon-red shadow-[0_0_15px_rgba(255,7,58,0.4)]";
                            } else {
                                buttonStyle = "border-gray-800 text-gray-600 opacity-30 blur-[0.5px]";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                onMouseEnter={playHover}
                                disabled={isAnswerChecked}
                                className={`p-5 rounded-xl border-2 text-left transition-all duration-300 font-medium relative overflow-hidden font-mono ${buttonStyle}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm opacity-50 border border-current rounded w-6 h-6 flex items-center justify-center shrink-0">
                                        {['A', 'B', 'C', 'D'][index]}
                                    </span>
                                    <span>{option}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between items-center text-gray-600 font-mono text-xs uppercase tracking-wider">
                <span>Sistema de Evaluación Activo</span>
                <span>Pregunta {currentQuestionIndex + 1} / {totalQuestions}</span>
            </div>
        </div>
    );
};

export default QuizQuestionView;
