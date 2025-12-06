import React, { useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizQuestionView from './QuizQuestionView';
import QuizResultUI from './QuizResultUI';
import SecurityWarningModal from './SecurityWarningModal';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const QuizComponent = ({ languageId, languageName, questions, onRetry, onExit }) => {
    const { user } = useAuth();

    const {
        currentQuestionIndex,
        currentQuestion,
        progress,
        selectedOption,
        isAnswerChecked,
        handleOptionClick,
        showResult,
        resultData,
        retry: hookRetry,
        showSecurityWarning,
        securityViolations,
        closeSecurityWarning
    } = useQuiz(questions);

    // Save result to DB when finished
    useEffect(() => {
        if (showResult && resultData && user) {
            const saveResult = async () => {
                const { error } = await supabase
                    .from('exam_results')
                    .insert([
                        {
                            user_id: user.id,
                            language: languageName,
                            score: resultData.score,
                            level: resultData.nivel
                        }
                    ]);

                if (error) {
                    console.error("Error saving result to DB:", error);
                } else {
                    console.log("Exam result saved successfully.");
                }
            };
            saveResult();
        }
    }, [showResult, resultData, user, languageName]);


    const handleRetry = () => {
        hookRetry();
        setIsReviewMode(false);
        onRetry();
    };

    // Review Mode State
    const [isReviewMode, setIsReviewMode] = React.useState(false);
    const [reviewIndex, setReviewIndex] = React.useState(0);
    const [reviewFeedback, setReviewFeedback] = React.useState(null); // { text, type }

    const handleStartPatching = () => {
        setIsReviewMode(true);
        setReviewIndex(0);
        setReviewFeedback(null);
    };

    const handleReviewOptionClick = (optionIndex) => {
        if (reviewFeedback) return; // Block multiple clicks

        const currentReviewQuestion = wrongAnswers[reviewIndex];
        const isCorrect = optionIndex === currentReviewQuestion.correctAnswer;

        // Simular feedback ya que no está en el JSON
        const feedbackText = isCorrect
            ? "¡CORRECTO! Parche aplicado exitosamente. (Razón: Regla gramatical 1.2)"
            : "INCORRECTO. La vulnerabilidad persiste. (Razón: Regla gramatical 1.2)";

        setReviewFeedback({
            text: feedbackText,
            isCorrect: isCorrect
        });
    };

    const nextReview = () => {
        if (reviewIndex < wrongAnswers.length - 1) {
            setReviewIndex(prev => prev + 1);
            setReviewFeedback(null);
        } else {
            // End of review
            setIsReviewMode(false);
            hookRetry(); // Reset quiz
            onRetry(); // Or go to main menu
        }
    };

    // Review Mode UI
    if (isReviewMode && wrongAnswers.length > 0) {
        const question = wrongAnswers[reviewIndex];
        return (
            <div className="w-full max-w-2xl bg-cyber-dark border border-yellow-500/50 p-8 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 animate-pulse"></div>
                <h2 className="text-yellow-500 font-mono mb-4 text-xl">
                    ⚠️ MODO PARCHEO: Vulnerabilidad [{reviewIndex + 1}/{wrongAnswers.length}]
                </h2>

                <h3 className="text-2xl text-white mb-8 font-bold">{question.question}</h3>

                <div className="space-y-4 mb-8">
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleReviewOptionClick(idx)}
                            disabled={!!reviewFeedback}
                            className={`w-full p-4 text-left border rounded transition-all
                                ${reviewFeedback
                                    ? (idx === question.correctAnswer
                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                        : (idx === reviewFeedback.selected ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-gray-700 text-gray-500 opacity-50')
                                    )
                                    : 'bg-gray-800 border-gray-600 hover:border-yellow-500 hover:text-yellow-400 text-gray-300'
                                }
                            `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {reviewFeedback && (
                    <div className={`p-4 rounded border mb-4 animate-fade-in-up ${reviewFeedback.isCorrect ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}>
                        <p className="font-bold mb-2">{reviewFeedback.isCorrect ? '✔ PARCHE APLICADO' : '❌ FALLO CRÍTICO'}</p>
                        <p>{reviewFeedback.text}</p>
                    </div>
                )}

                {reviewFeedback && (
                    <div className="flex justify-end">
                        <button
                            onClick={nextReview}
                            className="px-6 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-500 transition-colors uppercase"
                        >
                            {reviewIndex < wrongAnswers.length - 1 ? 'Siguiente Parche' : 'Finalizar Revisión'}
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // If intruder, resultData will be blocked
    if (showResult && resultData) {
        return (
            <QuizResultUI
                score={resultData.score}
                totalQuestions={resultData.total}
                levelData={{ nivel: resultData.nivel, nombre: resultData.nombre, color: resultData.color }}
                mensaje={resultData.mensaje}
                onRetry={handleRetry}
                onExit={onExit}
                languageName={languageName}
                isIntruder={resultData.nivel === "INTRUSO"}
                onStartPatching={wrongAnswers && wrongAnswers.length > 0 ? handleStartPatching : null}
                wrongAnswersCount={wrongAnswers ? wrongAnswers.length : 0}
            />
        );
    }

    return (
        <>
            {showSecurityWarning && (
                <SecurityWarningModal
                    onClose={closeSecurityWarning}
                    attempts={securityViolations}
                />
            )}

            <QuizQuestionView
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                progress={progress}
                selectedOption={selectedOption}
                isAnswerChecked={isAnswerChecked}
                onOptionClick={handleOptionClick}
            />
        </>
    );
};

export default QuizComponent;
